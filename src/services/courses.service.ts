import courses from '../mocks/courses.json'

class CourseServices {
    async getAll(){
        return await courses;
    }
}

export default CourseServices;