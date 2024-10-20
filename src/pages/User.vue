<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>

    <el-form :inline="true">
      <el-form-item :model="searchForm">
        <el-input
          v-model="searchForm.name"
          placeholder="請輸入用戶名稱"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜尋</el-button>
        <el-button type="primary" @click="handleReset" plain>清除</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :label="item.label"
        :prop="item.prop"
        :width="item.width || 125"
        :key="item.id"
      />

      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >
            編輯
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDelete(scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="config.total"
      style="padding-top: 20px; justify-self: flex-end"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用戶' : '編輯用戶'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="userForm" :rules="rules" ref="addUserForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="userForm.name"
              placeholder="請輸入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年齡" prop="age">
            <el-input
              v-model.number="userForm.age"
              placeholder="請輸入年齡"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性別" prop="sex">
            <el-select v-model="userForm.sex" placeholder="請選擇">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="userForm.birth"
              type="date"
              placeholder="請選擇出生日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row width="100%">
        <el-form-item label="地址" prop="addr">
          <el-input v-model="userForm.addr" placeholder="請輸入地址" />
        </el-form-item>
      </el-row>

      <el-row style="justify-content: flex-end">
        <el-button type="primary" plain @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">確定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from "vue";

const { proxy } = getCurrentInstance();

// dialog
const action = ref("add");
const dialogVisible = ref(false);
const userForm = reactive({
  sex: "1",
});
const rules = reactive({
  name: [{ required: true, message: "必填", trigger: "blur" }],
  age: [
    { required: true, message: "必填", trigger: "blur" },
    { type: "number", message: "年齡必須為數字" },
  ],
  sex: [{ required: true, message: "必填", trigger: "change" }],
  birth: [{ required: true, message: "必填" }],
  addr: [{ required: true, message: "必填" }],
});
const addUserForm = ref();
// table
const tableData = ref([]);
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年齡",
  },
  {
    prop: "sex",
    label: "性別",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
]);
const config = reactive({
  page: 1,
  limit: 10,
  name: "",
  total: 0,
});
const searchForm = ref({
  name: "",
});

// table
const getUserData = async () => {
  const res = await proxy.$api.getUserData(config);
  const { data } = res;
  tableData.value = data.list.map((item) => ({
    ...item,
    sex: item.sex ? "男" : "女",
  }));
  config.total = data.count;
};
function handleSearch() {
  config.name = searchForm.value.name.trim();
  getUserData();
}
function handleEdit(row) {
  action.value = "edit";
  dialogVisible.value = true;
  nextTick(() => {
    Object.assign(userForm, { ...row, sex: row.sex.toString() });
  });
}
function handleDelete(row) {
  ElMessageBox.confirm(`您確定要刪除「${row.name}」嗎?`).then(async () => {
    const res = await proxy.$api.deleteUser(row.id);

    ElMessage({
      showClose: true,
      message: "刪除成功",
      type: "success",
    });
    getUserData();
  });
}
function handleReset() {
  Object.assign(config, {
    page: 1,
    limit: 10,
    name: "",
    total: 0,
  });
  searchForm.value.name = "";
  getUserData();
}
function handlePageChange(page) {
  config.page = page;
  getUserData();
}

// dialog
function handleAdd() {
  action.value = "add";
  dialogVisible.value = true;
}

function timeFormatting(time) {
  let now = new Date(time);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDay();
  function formatDate(d) {
    return d < 10 ? "0" + d : d;
  }
  return `${year}-${formatDate(month)}-${formatDate(day)}`;
}
function onSubmit() {
  addUserForm.value.validate();
  addUserForm.value.validate(async (val) => {
    if (val) {
      let res = null;
      const dateFormReg = /^\d{4}-\d{2}-\d{2}$/;

      userForm.birth = dateFormReg.test(userForm.birth)
        ? userForm.birth
        : timeFormatting(userForm.birth);

      // request
      if (action.value === "add") {
        res = await proxy.$api.addUser(userForm);
      } else {
        res = await proxy.$api.editUser(userForm);
      }

      // req判斷
      if (res) {
        addUserForm.value.resetFields();
        getUserData();
        handleClose();
      } else {
        ElMessage({
          showClose: true,
          message: "新增使用者失敗",
          type: "error",
        });
      }
    }
  });
}
function handleClose() {
  // reset form
  addUserForm.value.resetFields();
  dialogVisible.value = false;
}
function handleCancel() {
  // reset form
  addUserForm.value.resetFields();
  dialogVisible.value = false;
}
onMounted(() => {
  getUserData();
});
</script>

<style scoped>
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select-clearn {
  width: 88%;
}
</style>
