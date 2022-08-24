<template>
  <div class="all">
    <form action="">
      <div class="login-box">
        <h3>로그인</h3>
        <hr />

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

        <div class="button-group">
          <div class="log-button">
            <button type="button" class="btn btn-danger btn-sm">로그인</button>
          </div>

          <div class="join-button">
            <button type="button" class="btn btn-danger btn-sm">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "TheLogin",
  data() {
    return { message: "Login" };
  },
};
</script>

<style>
.all {
  text-align: center;
}
.login-box {
  height: 300px;
  width: 400px;
  display: inline-block;
  text-align: left;
}
h2 {
  text-align: left;
}
.button-group {
  text-align: right;
}
.log-button {
  display: inline-block;
  padding-right: 20px;
}
.join-button {
  display: inline-block;
}
</style>
