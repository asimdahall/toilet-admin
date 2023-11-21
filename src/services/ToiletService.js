import axios from "axios";

const API_URL = "http://localhost:3000/toilets";

class ToiletService {
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  create(data) {
    return axios.post(API_URL, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  addReview(id, review) {
    return axios.post(`${API_URL}/${id}/reviews`, review);
  }

  deleteReview(id, user) {
    return axios.delete(`${API_URL}/${id}/reviews`, { data: { user } });
  }
}

export default new ToiletService();
