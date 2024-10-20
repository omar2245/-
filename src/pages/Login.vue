<template>
  <div class="login-page">
    <div class="login-container">
      <el-form class="login-form">
        <h2>登入後台系統</h2>
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="請輸入使用者名稱"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="請輸入密碼"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import { useMenuStore } from "../stores/menu";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const { proxy } = getCurrentInstance();
const loginForm = reactive({ username: "admin", password: "admin" });
const router = useRouter();
const store = useMenuStore();

const handleLogin = async () => {
  try {
    const res = await proxy.$api.getMenu(loginForm);
    console.log(res);

    store.updateMenuList(res.data.menuList);
    store.token = res.data.token;
    router.replace("/home");
  } catch (error) {
    console.log(error);
    ElMessage({ showClose: true, message: "登入失敗", type: "error" });
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://images.pexels.com/photos/631477/pexels-photo-631477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    no-repeat center center fixed;
  background-size: cover;
}

.login-container {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.2);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
}

.login-form {
  width: 300px;
}

h2 {
  margin-bottom: 20px;
  color: white;
}

.el-input {
  color: white;
}

.el-input__inner {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.el-button {
  width: 100%;
}
</style>
