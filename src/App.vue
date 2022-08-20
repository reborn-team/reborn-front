<template>
  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">

      <a class="navbar-brand" href="#">
        <img src="./assets/img/header/ribbon.png" alt="" width="50" height="35" href="../src/views/Main.vue"/>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              프로그램
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">생성하기</a></li>
              <li><a class="dropdown-item" href="#">기록하기</a></li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="#">운동정보</a>
          </li>

          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="#">운동일지</a>
          </li>

          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="#">주변 헬스장</a>
          </li>
        </ul>

        <a class="navbar-brand" href="#">
          <img src="./assets/img/header/person.svg" alt="" width="30" height="25" href="./views/Join.vue"/>
        </a>

        <a class="navbar-brand" href="#">
          <img src="./assets/img/header/login.svg" alt="" width="30" height="25" />
        </a>
        
      </div>
    </div>
  </nav>
  <hr>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app hr{
  border: 0;
  height: 2px;
  background: red;
  color: red;
  padding: 0;
  margin: 0;
}

.title {
  display: flex;
  text-decoration: underline red;
  margin: 50px 170px;
}
</style>
