<template>
  <div id="navbar">
    <nav class="navbar navbar-expand">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src="./assets/img/header/ReBORN.png"
            alt=""
            width="60"
            height="50"
            href="../src/views/Main.vue"
          />
        </a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/program/"
                >프로그램</a
              >
            </li>

            <li class="nav-item dropdown">
            <a class="nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >루틴관리</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/workout">운동 리스트</a></li>
              <li>
                <a class="dropdown-item" href="/workout/myworkout">나의 리스트</a>
              </li>
            </ul>
          </li>

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/board"
                >운동일지</a>
            </li>

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/nearby"
                >주변 헬스장</a>
            </li>
          </ul>

          <li class="nav-item dropdown" style="list-style: none; margin: 5px 4px 0 0">
            <a
              class="nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src="./assets/img/header/person.svg" alt="" width="30" height="25"/>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/mypage/goal">달성도</a></li>
              <li>
                <a class="dropdown-item" href="/mypage/list">내가 쓴 글</a>
              </li>
              <li>
                <a class="dropdown-item" href="/mypage/change">정보 수정</a>
              </li>
            </ul>
          </li>

          <a class="navbar-brand" href="/login" style="padding: 0; margin: 0">
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
