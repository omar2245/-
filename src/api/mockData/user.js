import Mock from "mockjs";

export default {
  getUserData: (config) => {
    const { name, page = 1, limit = 10 } = parseUrlParams(config.url);

    const mockList = userList.filter((user) => {
      if (name && user.name.indexOf(name) === -1) return false;
      return true;
    });

    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );

    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length,
      },
    };
  },
  deleteUser: (config) => {
    const { id } = parseUrlParams(config.url);

    if (!id) {
      return {
        code: 500,
        message: "發生錯誤",
      };
    } else {
      userList = userList.filter((user) => user.id !== id);

      return {
        code: 200,
        message: "刪除成功",
      };
    }
  },
  addUser: (config) => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body);

    userList.unshift({
      id: Mock.Random.guid(),
      name,
      addr,
      age,
      birth,
      sex,
    });

    return {
      code: 200,
      message: "編輯使用者成功",
    };
  },
  editUser: (config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);

    userList.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = parseInt(sex);
      }
    });

    return {
      code: 200,
      message: "新增使用者成功",
    };
  },
};

const generateRandomUser = (id) => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Isabel",
    "Jack",
  ];
  const streets = [
    "Main St",
    "Elm St",
    "Maple Ave",
    "Oak St",
    "Pine St",
    "Cedar Rd",
    "Birch St",
    "Spruce St",
    "Willow St",
  ];
  const cities = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
  ];

  // 隨機生成資料
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStreet = streets[Math.floor(Math.random() * streets.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomYear = 1950 + Math.floor(Math.random() * 60); // 隨機年
  const randomMonth = String(1 + Math.floor(Math.random() * 12)).padStart(
    2,
    "0"
  ); // 隨機月
  const randomDay = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0"); // 隨機日
  const randomSex = Math.round(Math.random()); // 隨機性別
  const randomAge = 2024 - randomYear; // 計算年齡

  return {
    id: Mock.Random.guid(),
    birth: `${randomYear}-${randomMonth}-${randomDay}`,
    addr: `${Math.floor(Math.random() * 1000)} ${randomStreet}, ${randomCity}`,
    age: randomAge,
    name: randomName,
    sex: randomSex,
  };
};

let userList = Array.from({ length: 100 }, (_, i) => generateRandomUser(i + 1));

function parseUrlParams(url) {
  // 建立 URL 物件
  const urlObj = new URL(url, window.location.origin);

  // 使用 URLSearchParams 解析查詢參數
  const params = new URLSearchParams(urlObj.search);

  // 將查詢參數轉換為對象
  const paramsObj = {};
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
}
