import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import permissionApi from "./mockData/permission";

Mock.mock(/api\/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, "get", homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);

Mock.mock(/api\/user\/getUserData/, "get", userApi.getUserData);
Mock.mock(/api\/user\/deleteUser/, "delete", userApi.deleteUser);
Mock.mock(/api\/user\/addUser/, "post", userApi.addUser);
Mock.mock(/api\/user\/editUser/, "put", userApi.editUser);

Mock.mock(/api\/permission\/getMenu/, "post", permissionApi.getMenu);
