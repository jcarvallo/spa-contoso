import departaments from '../mocks/departaments.json'

class DepartamentServices {
    async getAll(){
       return await departaments;
    }
}

export default DepartamentServices;