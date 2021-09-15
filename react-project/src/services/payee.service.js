import http from "../http-common";


class PayeeService {

  create(account_id, data) {
    return http.post(`/accounts/${account_id}/payees/new`, data);
  }

  getAll(account_id) {
    return http.get(`/accounts/${account_id}/payees`);
  }

}

export default new PayeeService();
