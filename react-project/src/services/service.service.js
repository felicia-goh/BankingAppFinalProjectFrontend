import http from "../http-common";


class ServiceDateService {
    getServiceRequest(account_id, service_id) {
        return http.get(`accounts/${account_id}/services/${service_id}`);
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

export default new ServiceDateService();
