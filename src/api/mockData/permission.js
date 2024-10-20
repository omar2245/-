import Mock from "mockjs";

export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);

    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          token: "1",
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首頁",
              icon: "house",
              url: "home",
            },
            // {
            //   path: "/order",
            //   name: "order",
            //   label: "訂單管理",
            //   icon: "tickets",
            //   url: "order",
            // },
            {
              path: "/user",
              name: "User",
              label: "用戶管理",
              icon: "user",
              url: "user",
            },
            {
              path: "/other",
              label: "其他",
              icon: "location",
              url: "other",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "頁面1",
                  icon: "setting",
                  url: "page1",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "頁面2",
                  icon: "setting",
                  url: "page2",
                },
              ],
            },
          ],
        },
      };
    } else if (username === "order" && password === "order") {
      return {
        code: 200,
        data: {
          token: "2",
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首頁",
              icon: "house",
              url: "home",
            },
            {
              path: "/order",
              name: "order",
              label: "訂單管理",
              icon: "tickets",
              url: "order",
            },
          ],
        },
      };
    } else {
      return {
        code: 500,
        message: "密碼錯誤",
      };
    }
  },
};
