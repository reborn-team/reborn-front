<template>
  <div id="navbar">
    <nav class="navbar navbar-expand">
      <div class="container-fluid">

        <button onclick="location.href='/' ">
          <img src="./assets/img/header/ReBORN.png" alt="" width="60" height="50" href="../src/views/Main.vue" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button onclick="location.href='/program'">프로그램</button>
            </li>

            <li class="nav-item dropdown">
              <button class="nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false">루틴관리</button>
              <ul class="dropdown-menu">
                <li><button onclick="location.href='/workout'">운동 리스트</button></li>
                <li><button onclick="location.href='/workout/me'">나의 리스트</button></li>
              </ul>
            </li>

            <li class="nav-item"> <button onclick="location.href='/board?page=1'">운동일지</button> </li>
            <li class="nav-item"> <button onclick="location.href='/gym'">헬스장</button></li> </ul>

          <li class="nav-item dropdown" style="list-style: none; margin: 5px 4px 0 0">
            <button 
              class="nav-link"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-if="token!=null">
              <img src="./assets/img/header/person.svg" alt="" width="30" height="25"/>
            </button>
            <ul class="dropdown-menu">
              <li><button onclick="location.href='/mypage/goal'" >달성도</button></li>
              <li><button onclick="location.href='/mypage/list?page=1'">내가 쓴 글</button></li>
              <li><button onclick="location.href='/mypage/change'">정보 수정</button></li>
            </ul>
          </li>

          <button @click="login" v-if="token==null">
            <img src="./assets/img/header/login.svg" alt="login" width="30" height="20" />
          </button>
          <button @click="logout" v-if="token!=null">
            <img src="./assets/img/header/logout.svg" alt="logout" width="30" height="20" />
          </button>
        </div>
      </div>
    </nav>
  </div>
  <hr />

  <router-view />
  
</template>

<script>
import { reactive } from '@vue/reactivity';
import "./css/views/App.css";
import router from './router/router';

export default {
  name: "App",
  components: {},
  setup(){
    const state = reactive({
      title: "",
      content: "",
    })
    const token = sessionStorage.getItem("TOKEN")

    const login = () => {
      router.push("/login")
    }

    const logout = () =>{
      sessionStorage.clear()
      router.go()
    }

    return { 
      state,
      token,
      login,
      logout
     }
  }

};
</script>
