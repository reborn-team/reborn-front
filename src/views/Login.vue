<template lang="ko">
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
import axios from "axios";
import "../css/views/Login.css";
import router from "@/router/router";

export default {
  name: "TheLogin",
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const email = ref("");
    const password = ref("");

    const loginHandler = async () => {
      if (state.email === "") {
        alert("ID를 입력해주세요");
        email.value.focus();
        return;
      } else if (state.password === "") {
        alert("비밀번호를 입력해주세요");
        password.value.focus();
        return;
      }
      async function routerPush() {
        await router.push(`/`);
        await router.go(0);
      }

      const url = "/api/v1/login";
      const headers = { "Content-Type": "application/json; charset=utf-8" };
      const body = { email: state.email, password: state.password };
      await axios
        .post(url, body, { headers })
        .then(function (res) {
          if (res.status == 200) {
            sessionStorage.setItem("TOKEN", res.headers.authorization);
            alert("로그인 되었습니다.");
            routerPush();
          }
        })
        .catch(() => {
          alert("로그인에 실패했습니다");
        });
    };

    return { state, email, password, loginHandler, message: "로그인" };
  },
};
</script>