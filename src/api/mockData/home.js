export default {
  getTableData: () => {
    return {
      code: 200,
      data: [
        { name: "Laptop", todayBuy: 50, monthBuy: 300, totalBuy: 1200 },
        { name: "Smartphone", todayBuy: 80, monthBuy: 400, totalBuy: 1500 },
        { name: "Headphones", todayBuy: 30, monthBuy: 150, totalBuy: 800 },
        { name: "Tablet", todayBuy: 20, monthBuy: 100, totalBuy: 500 },
        { name: "SmartWatch", todayBuy: 35, monthBuy: 100, totalBuy: 500 },
      ],
    };
  },
  getCountData: () => {
    return {
      code: 200,
      data: [
        {
          name: "今日已支付訂單",
          value: 34,
          icon: "DocumentChecked",
          color: "#2ec7c9",
        },
        {
          name: "今日新增會員",
          value: 19,
          icon: "User",
          color: "#ffb980",
        },
        {
          name: "今日平台收益",
          value: "16,000",
          icon: "Money",
          color: "#2ec7c9",
        },
        {
          name: "今日未支付訂單",
          value: 66,
          icon: "DocumentDelete",
          color: "#5ab1ef",
        },
        {
          name: "今日使用人數",
          value: 2315,
          icon: "UserFilled",
          color: "#2ec7c9",
        },

        {
          name: "本周平台收益",
          value: "76,000",
          icon: "Wallet",
          color: "#2ec7c9",
        },
      ],
    };
  },
  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: [
            "2024-10-01",
            "2024-10-02",
            "2024-10-03",
            "2024-10-04",
            "2024-10-05",
            "2024-10-06",
            "2024-10-07",
          ],
          data: [
            {
              Laptop: 120,
              Smartphone: 250,
              Headphones: 400,
              Tablet: 300,
              Smartwatch: 180,
            },
            {
              Laptop: 250,
              Smartphone: 300,
              Headphones: 150,
              Tablet: 200,
              Smartwatch: 350,
            },
            {
              Laptop: 180,
              Smartphone: 100,
              Headphones: 350,
              Tablet: 250,
              Smartwatch: 220,
            },
            {
              Laptop: 300,
              Smartphone: 200,
              Headphones: 250,
              Tablet: 150,
              Smartwatch: 400,
            },
            {
              Laptop: 350,
              Smartphone: 150,
              Headphones: 300,
              Tablet: 100,
              Smartwatch: 250,
            },
            {
              Laptop: 200,
              Smartphone: 400,
              Headphones: 180,
              Tablet: 350,
              Smartwatch: 100,
            },
            {
              Laptop: 400,
              Smartphone: 180,
              Headphones: 200,
              Tablet: 220,
              Smartwatch: 300,
            },
          ],
        },
        soldData: [
          { name: "Laptop", value: 1200 },
          { name: "Smartphone", value: 457 },
          { name: "Headphones", value: 540 },
          { name: "Tablet", value: 350 },
          { name: "Smartwatch", value: 120 },
        ],
        userData: [
          { date: "周一", new: 55, active: 1272 },
          { date: "周二", new: 78, active: 2115 },
          { date: "周三", new: 96, active: 1533 },
          { date: "周四", new: 71, active: 1147 },
          { date: "周五", new: 105, active: 1340 },
          { date: "周六", new: 41, active: 1258 },
          { date: "周日", new: 192, active: 2315 },
        ],
      },
    };
  },
};
