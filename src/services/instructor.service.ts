import instructor from '../mocks/instructors.json'

class InstructorServices {
   async getAll(){
     return await instructor;
   }
}

export default InstructorServices;