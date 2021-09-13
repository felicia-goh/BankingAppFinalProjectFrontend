import http from "../http-common";

class AccountDataService {
    getAll() {
        return http.get("/accounts");
    }

    get(user_id) {
        return http.get(`/users/${user_id}/accounts`);
    }

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

export default new AccountDataService();
