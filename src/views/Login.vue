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
            id="colFormLabelSm"
            placeholder="내용을 입력해주세요"
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
            id="colFormLabelSm"
            placeholder="내용을 입력해주세요"
          />
        </div>
      </div>

      <div id="loginBtn">
        <div class="login-button">
          <a href="/">
            <button type="button" class="btn btn-danger btn-sm">로그인</button>
          </a>
        </div>

        <div class="join-button">
          <a href="/join">
            <button type="button" class="btn btn-danger btn-sm">
              회원가입
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script charset='utf-8'>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useRouter } from "vue-router";
import "../css/views/login.css";

export default {
  name: "TheLogin",
  setup() {
    const router = useRouter();
    const state = reactive({ email: "adasd@n.co", pw: "21312312" });
    const email = ref("");
    const pw = ref("");

    const loginHandler = async () => {

      // 유효성
      if (state.email === "") {
        alert("Check Email");
        email.value.focus();
        return false;
      } else if (state.pw === "") {
        alert("Check Password");
        pw.value.focus();
        return false;
      }

      const url = "http://localhost:8080/api/v1/login";
      const headers = { "Content-Type": "application/json; charset=utf-8" };
      const body = { email: state.email, pw: state.pw };
      await axios.post(url, body, { headers }).then(function (res) {

        if (res.data != null) {
          sessionStorage.setItem("TOKEN", res.data.token);
          sessionStorage.setItem("email", res.data.email);
          alert("로그인되었습니다.");
          router.push({ name: "Login" });
        } else {
          alert("로그인 실패하였습니다.");
        }

      });
    };

    return { state, email, pw, loginHandler };
  },
  data() {
    return { message: "Login" };
  },
};
</script>
