import http from "../http-common";

class TransactionDataService {
    getAll() {
        return http.get("/transactions");
    }

    get(account_id) {
        return http.get(`/accounts/${account_id}/transactions`);
    }

    create(account_id, data) {
        return http.post(`/accounts/${account_id}/transactions/new`, data);
    }

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

export default new TransactionDataService();
