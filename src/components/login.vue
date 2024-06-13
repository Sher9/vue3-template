<template>
  <div class="login-container">
    <div class="login-middle">
      <div class="img-box">
        <img style="width: 300px; height: 300px" src="../assets/img/data.png" />
      </div>
      <div class="login-box">
        <div class="login-logo">
          <img style="width: 80%; height: 80%" src="../assets/img/logo.png" alt />
        </div>
        <div class="login-content">
          <h4 class="login-title">管理后台模版</h4>
          <el-form
            class="login-form"
            status-icon
            :rules="loginRules"
            ref="loginRef"
            :model="loginForm"
            label-width="0"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                auto-complete="off"
                size="small"
                placeholder="请输入用户名"
                :prefix-icon="User"
                @keyup.enter="handleLogin"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password" style="margin-top: 20px">
              <el-input
                :type="passwordType"
                v-model="loginForm.password"
                size="small"
                auto-complete="off"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                @keyup.enter="handleLogin"
              >
              </el-input>
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button
                :loading="loading"
                size="small"
                type="primary"
                class="login-submit"
                @click.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-bottom">©2024 版权信息</div>
  </div>
</template>

<script setup>
import useUserStore from "@/store/modules/user";
import { User, Lock } from "@element-plus/icons-vue";
const userStore = useUserStore();
const { proxy } = getCurrentInstance();
const loading = ref(false);
const loginForm = ref({
  //用户名
  username: "",
  //密码
  password: "",
});

const loginRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const passwordType = ref("password");

const showPassword = () => {};

const handleLogin = () => {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginForm.value)
        .then(() => {
          loading.value = false;
          window.location.href = "./index.html#/";
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-image: url("../assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login-middle {
    width: 50%;
    height: 75%;
    background: #fff;
    float: right;
    margin-right: 5%;
    border-radius: 26px;
    margin: 5%;
    display: flex;
    -moz-box-shadow: 0 0 10px #a1a1a1;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);
    .img-box {
      width: 45%;
      height: 100%;
      background-color: #e0edfd;
      text-align: center;
      border-top-left-radius: 26px;
      border-bottom-left-radius: 26px;
      img {
        margin-top: 35%;
      }
    }
    .login-box {
      width: 55%;
      .login-logo {
        width: 220px;
        height: 65px;
        margin-left: 10%;
        margin-top: 10%;
      }
      .login-content {
        width: 80%;
        margin: auto;
        margin-top: 10%;
        .login-form {
          i {
            color: #333;
            font-size: 18px;
          }
          .el-form-item__content {
            width: 100%;
          }
          .el-form-item .el-input {
            width: 90%;
          }
        }
      }
      .login-title {
        color: #333;
        font-weight: 500;
        font-size: 24px;
        text-align: left;
        letter-spacing: 4px;
      }
    }
  }
  .login-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
    color: #fff;
  }
}

.login-submit {
  width: 90%;
  height: 45px;
  background: none;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: 300;
  background-color: #409eff;
  border-color: #409eff;
  cursor: pointer;
  font-family: "neo";
  transition: 0.25s;
  color: #fff;
  border-radius: 6px;
  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
}
</style>
