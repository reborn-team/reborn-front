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

<script>
import "../css/views/login.css";

export default {
  name: "TheLogin",
  data() {
    return { message: "Login" };
  },
};
</script>
