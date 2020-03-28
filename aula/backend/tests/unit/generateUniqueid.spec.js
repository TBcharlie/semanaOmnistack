const generateUniqueId =  require('../../src/utils/generateUniqueid')

describe('Generate Unique Id', ()=> {
    it('shoud generate an unique Id',() =>{
        const id = generateUniqueId()

        expect(id).toHaveLength(8)
    })
})