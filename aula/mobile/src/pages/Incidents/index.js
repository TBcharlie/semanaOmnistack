import React, {useEffect,useState} from 'react'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native'



import logoImg from '../../assets/logo.png'
import styles from './styles'

import api from '../../services/api'

export default function Incidents(){
    const navigation = useNavigation()
    const [incidents, setIncidentes] = useState([])
    const [total, setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total > 0 && incidents.length === total){
            return;
        }
        
        
      try{
        setLoading(true)
        const response = await api.get('/incidents',{
            params:{page}
        })
        setIncidentes([...incidents,...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page+1)
        setLoading(false)

      }catch(err){

      }
        
    }

    useEffect(() => {
        loadIncidents()

        }
    ,[total])


    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident})
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image  source={logoImg}/>
                <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total} casos.</Text></Text>
            </View>
            <Text style={styles.title}>Bem vindo.</Text>
            <Text style={styles.description}>Escolha um dos caos abaixo e salve o dia.</Text>

            <FlatList style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                data={incidents} 
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item:incident})=> (
                    <View style={styles.incident} >
                    <Text style={styles.incidentProperty}>Ong:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL' }).format(incident.value)}</Text>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right' size={16} color='#E02041'/>
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    )
}