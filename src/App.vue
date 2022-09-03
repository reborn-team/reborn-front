<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src="./assets/img/header/ribbon.png"
            alt=""
            width="50"
            height="35"
            href="../src/views/Main.vue"
          />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/workout/"
                >프로그램</a
              >
            </li>

            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/workout/list"
                >운동정보</a
              >
            </li>

            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/board">운동일지</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/nearby"
                >주변 헬스장</a
              >
            </li>
          </ul>

          <a class="navbar-brand" href="/mypage/goal">
            <img
              src="./assets/img/header/person.svg"
              alt=""
              width="30"
              height="25"
            />
          </a>

          <a class="navbar-brand" href="/login">
            <img
              src="./assets/img/header/login.svg"
              alt=""
              width="30"
              height="25"
            />
          </a>
        </div>
      </div>
    </nav>
  </div>
  <hr />
  <router-view />
</template>

<script>
import "./css/views/App.css";

export default {
  name: "App",
  components: {},
};
</script>

<style>
* {margin: 0; padding: 0; box-sizing: border-box; font-family: sans-serif;}
html, body {width:100vw; height:100%;}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app hr {
  border: 0;
  height: 2px;
  background: red;
  padding: 0;
  margin: 0;
}

.title {
  display: flex;
  text-decoration: underline red;
  margin: 50px auto;
}
</style>
