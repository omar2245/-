<template>
  <el-row class="home" :gutter="20">
    <el-col :span="10" style="margin-top: 20px">
      <el-card shadow="hover">
        <el-row class="user">
          <el-avatar
            :size="150"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <div class="user-info">
            <p class="username">Admin</p>
            <p class="role">管理員</p>
          </div>
        </el-row>

        <div class="login-info">
          <p>上次登入時間：<span>2024-10-9</span></p>
          <p>上次登入地點：<span>新北市中和區</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column
            v-for="(label, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="label"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="14" style="margin-top: 20px">
      <div class="num">
        <el-card
          shadow="hover"
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <div class="icons-content">
            <component :is="item.icon" class="icons"> </component>
          </div>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card class="top-echart" shadow="hover">
        <div ref="orderChart" style="height: 240px; width: 100%"></div
      ></el-card>

      <div class="graph">
        <el-card>
          <div ref="userChart" style="height: 240px"></div>
        </el-card>

        <el-card>
          <div ref="soldChart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import * as echarts from "echarts";
const tableData = ref([]);
const countData = ref([]);
const chartOptions = reactive({
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {},
  yAxis: {
    type: "value",
  },
  series: [],
  color: ["#4A90E2", "#9B59B6", "#F7A6B8", "#6B5B95", "#A3CEF1"],
});
const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "",
    left: "left",
  },
  series: [
    {
      type: "pie",
      top: "20%",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
});
const orderChart = ref();
const userChart = ref();
const soldChart = ref();

const tableLabel = ref({
  name: "產品",
  todayBuy: "今日購買",
  monthBuy: "本月購買",
  totalBuy: "總購買",
});
const { proxy } = getCurrentInstance();
const getTableData = async () => {
  const res = await proxy.$api.getTableData();

  tableData.value = res.data;
};
const getCountData = async () => {
  const res = await proxy.$api.getCountData();
  countData.value = res.data;
};
const getChartData = async () => {
  const {
    data: { orderData, userData, soldData },
  } = await proxy.$api.getChartData();

  // 對折線圖的x軸和series賦值
  const lineChart = echarts.init(orderChart.value);
  chartOptions.title.text = "訂單統計";
  chartOptions.xAxis.data = orderData.date;
  chartOptions.series = Object.keys(orderData.data[0]).map((val) => {
    return {
      name: val,
      data: orderData.data.map((item) => item[val]),
      type: "line",
    };
  });
  lineChart.setOption(chartOptions);

  // 渲染使用者bar chart
  const barChart = echarts.init(userChart.value);
  chartOptions.title.text = "使用者統計";
  chartOptions.xAxis.data = userData.map((d) => d.date);
  chartOptions.series = [
    { name: "新增用戶", data: userData.map((d) => d.new), type: "bar" },
    { name: "活躍用戶", data: userData.map((d) => d.active), type: "bar" },
  ];
  barChart.setOption(chartOptions);

  // Pie chart渲染
  const pieChart = echarts.init(soldChart.value);

  pieOptions.series[0].data = soldData;
  pieChart.setOption(pieOptions);
};

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
});
</script>

<style>
.home {
  overflow: hidden;
  height: 100%;
}
.user {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 24px;
  gap: 24px;
  .user-info {
    p {
      line-height: 40px;
    }
    .username {
      font-weight: 700;
      font-size: 36px;
    }
    .role {
      color: #999;
    }
  }
}
.login-info {
  margin-top: 20px;
  p {
    line-height: 30px;
    font-size: 16px;
    color: #999;
    span {
      color: #666;
      margin-left: 8px;
    }
  }
}
.user-table {
  margin-top: 20px;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icons-content {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #66b1ff;
  }
  .icons {
    width: 40px;
    height: 40px;
    font-size: 30px;
    color: white;
    text-align: center;
  }
  .detail {
    padding: 16px;
    display: flex;

    flex-direction: column;
    justify-content: center;
    .num {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .txt {
      font-size: 15px;
      color: #999;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  .el-card {
    width: 48%;
  }
}
</style>
