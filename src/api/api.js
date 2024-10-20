import request from "./request";

export default {
  getTableData() {
    return request({ url: "/home/getTableData" });
  },
  getCountData() {
    return request({ url: "/home/getCountData" });
  },
  getChartData() {
    return request({ url: "/home/getChartData" });
  },
  getUserData(data) {
    return request({ url: "/user/getUserData", data });
  },
  deleteUser(id) {
    return request({
      url: "/user/deleteUser",
      method: "delete",
      data: { id },
    });
  },
  addUser(data) {
    return request({
      url: "/user/addUser",
      method: "post",
      data,
    });
  },
  editUser(data) {
    return request({
      url: "/user/editUser",
      method: "put",
      data,
    });
  },
  getMenu(data) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data,
    });
  },
};
