// import departaments from '../mocks/departaments.json'
import axios from "axios";

class DepartamentServices {
  URL = "http://localhost:5000/department";

  async getAll() {
    return await axios(this.URL);
  }

  async create(data: any) {
    return await axios.post(this.URL, data);
  }

  async update(data: any, id: number) {
    return await axios.put(`${this.URL}?id=${id}`, data);
  }

  async delete(id: number) {
    return await axios.delete(this.URL, { params: { id } });
  }


}

export default DepartamentServices;