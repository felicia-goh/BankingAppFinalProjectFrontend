import http from "../http-common";

class LoginDataService {
    login(data) {
        return http.post("/login", data);
    }

    // get(id) {
    //     return http.get(`/users/${id}`);
    // }

    // create(data) {
    //     return http.post("/users", data);
    // }

    // update(id, data) {
    //     return http.put(`/users/${id}`, data);
    // }

    // delete(id) {
    //     return http.delete(`/users/${id}`);
    // }

    // deleteAll() {
    //     return http.delete(`/users`);
    // }

    // findByName(name) {
    //     return http.get(`/users/name/${name}`);
    // }

}

export default new LoginDataService();
