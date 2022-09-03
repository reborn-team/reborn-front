<template>
  <div id="join">
    <h1 class="title">{{ message }}</h1>
    <hr />

    <!-- 아이디 -->
    <div id="join-box">
      <div class="row mb-3">
        <label for="email" class="form-label">ID</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="email"
          v-model="state.email"
          placeholder="이메일 형식으로 입력하세요"
        />
      </div>

      <!-- 비밀번호 -->
      <div class="row mb-3">
        <label for="user_password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control form-control-sm"
          ref="password"
          v-model="state.password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <!-- 비밀번호 확인 -->
      <div class="row mb-3">
        <label for="repassword" class="form-label">RePassword</label>
        <input
          type="password"
          class="form-control form-control-sm"
          ref="repassword"
          v-model="state.repassword"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <!-- 이름 -->
      <div class="row mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="name"
          v-model="state.name"
          placeholder="이름을 입력해주세요"
        />
      </div>

      <!-- 전화번호 -->
      <div class="row mb-3">
        <label for="phoneNum" class="form-label">Mobile</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="phoneNum"
          placeholder="ex) 010-1111-1111"
          v-model="state.phoneNum"
        />
      </div>

      <!-- 주소 -->
      <div id="address">
        <div class="row mb-1 search">
          <label for="address" class="form-label">Address</label>
          <div class="col-sm-5">
            <input
              type="text"
              class="form-control form-control-sm"
              ref="postcode"
              v-model="state.postcode"
              disabled
            />
          </div>
          <div class="col-auto">
            <button @click="address_search" class="btn btn-danger btn-sm">
              주소 검색
            </button>
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <input
          type="text"
          class="form-control form-control-sm"
          ref="address"
          v-model="state.address"
          placeholder="'주소 검색' 버튼을 클릭하세요"
          disabled
        />
      </div>

      <div class="row mb-1">
        <input
          type="text"
          class="form-control form-control-sm"
          ref="detailAddress"
          v-model="state.detailAddress"
          placeholder="상세주소를 입력하세요"
        />
      </div>
      <div class="post-box" v-if="postOpen">
        <VueDaumPostcode @complete="oncomplete" />
      </div>

      <div id="joinBtn">
        <div class="join2-button">
          <button class="btn btn-danger btn-sm" @click="joinHandler">
            완료
          </button>
        </div>
        <div class="cancle-button">
          <a href="/login">
            <button type="button" class="btn btn-danger btn-sm">취소</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode";
import { reactive, ref } from "@vue/reactivity";
import router from '@/router/router';
import axios from "axios";
import "../css/views/join.css";

export default {
  name: "TheRegist",
  components: { VueDaumPostcode },
  setup() {
    const state = reactive({
      email: "",
      password: "",
      repassword: "",
      name: "",
      phoneNum: "",
      postcode: "",
      address: "",
      detailAddress: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const name = ref("");
    const phoneNum = ref("");
    let postcode = ref("");
    let address = ref("");
    const detailAddress = ref("");
    let postOpen = ref(false);

    const joinHandler = async () => {
      if (state.email === "") {
        alert("Check Email");
        email.value.focus();
        return false;
      } else if (state.password === "") {
        alert("Check Password");
        password.value.focus();
        return false;
      } else if (state.repassword === "") {
        alert("Check RePassword");
        repassword.value.focus();
        return;
      } else if (state.password !== state.repassword) {
        alert("Check Password and RePassword");
        password.value.focus();
        return false;
      } else if (state.name === "") {
        alert("Check Name");
        name.value.focus();
        return;
      } else if (state.phoneNum === "") {
        alert("Check PhoneNum");
        phoneNum.value.focus();
        return;
      } else if (state.detailAddress === "") {
        alert("Check detailAddress");
        detailAddress.value.focus();
        return;
      }

      const url = "/api/vi/join";
      const headers = {
        "Content-Type": "application/json", 
      };
      const body = {
        email: state.email,
        password: state.password,
        name: state.name,
        phoneNum: state.phoneNum,
        postcode: state.postcode,
        address: state.address,
        detailAddress: state.detailAddress,
      };
      await axios.post(url, body, { headers }).then(function (res) {
        if (res.status === 200) {
          sessionStorage.setItem("TOKEN", res.headers.authorization);
          alert("회원가입이 되었습니다.");
          router.push({name:"Join"});
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      });
    };

    const address_search = async () => {
      postOpen.value = !postOpen.value;
    };

    const oncomplete = (data) => {
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "") {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        address.value.value = addr + " " + extraAddr;
      } else {
        address.value.value = addr;
      }

      postcode.value.value = data.zonecode;
      detailAddress.value.focus();

      state.postcode = data.zonecode;
      state.address = addr;

      postOpen.value = false;
    };

    // watch(
    //   () => state.phoneNum,
    //   function(phoneNum) {
    //     phoneNum=phoneNum.replace(/[^0-9]/g, "");
    //     if(phoneNum.length<4) {
    //       return;
    //     } else if(phoneNum.length<8) {
    //       phoneNum=
    //         phoneNum.substr(0, 3)+"-"+phoneNum.substr(3);
    //     } else if(phoneNum.length<12) {
    //       phoneNum=
    //         phoneNum.substr(0, 3)+
    //         "-"+
    //         phoneNum.substr(3, 4)+
    //         "-"+
    //         phoneNum.substr(7);
    //     }
    //   },
    // )

    return {
      state,
      email,
      password,
      repassword,
      name,
      phoneNum,
      postcode,
      address,
      detailAddress,
      joinHandler,
      address_search,
      oncomplete,
      message: "Join",
      postOpen,
    };
  },
};
</script>
