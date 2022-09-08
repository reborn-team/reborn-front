<template>
  <div id="login">
    <h1 class="title">{{ message }}</h1>
    <hr />

    <div id="login-box">
      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >ID</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-sm"
            ref="email"
            v-model="state.email"
            placeholder="ID를 입력해주세요"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >Password</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control form-control-sm"
            ref="password"
            v-model="state.password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>

      <div id="loginBtn">
        <div class="login-button">
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="loginHandler"
        >로그인</button>
        </div>

        <div class="join-button">
          <a href="/join">
            <button
              type="button"
              class="btn btn-danger btn-sm"
            >회원가입</button><br />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
// import { useRouter } from "vue-router";
import axios from "axios";
import "../css/views/login.css";
import router from "@/router/router";

export default {
  name: "TheLogin",
  setup() {
    // const router = useRouter();
    const state = reactive({
      email: "reborn111@naver.com",
      password: "1",
    });
    const email = ref("");
    const password = ref("");

    const loginHandler = async () => {
      // 유효성
      if (state.email === "") {
        alert("Check Email");
        email.value.focus();
        return;
      } else if (state.password === "") {
        alert("Check Password");
        password.value.focus();
        return;
      }

      // 토큰
      const url = "/api/v1/login";
      const headers = { "Content-Type": "application/json; charset=utf-8" };
      const body = { email: state.email, password: state.password };
      await axios.post(url, body, { headers }).then(function (res) {
        console.log(res.data);

        if (res.status == 200) {
          sessionStorage.setItem("TOKEN", res.headers.authorization);
          alert("로그인 되었습니다.");
          router.push("/");
        } else {
          alert("로그인 실패")
        }
      });
    };

    return { state, email, password, loginHandler, message: "Login" };
  },
};
</script>
