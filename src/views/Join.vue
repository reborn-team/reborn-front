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
          placeholder="이메일 형식으로 입력해 주세요"
          />
          <button type="button" class="btn btn-danger btn-sm" @click="emailCheckHandler">✔</button>
      </div>

      <!-- 비밀번호 -->
      <div class="row mb-3">
        <label for="user_password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control form-control-sm"
          ref="password"
          v-model="state.password"
          placeholder="비밀번호를 입력해 주세요"
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
          placeholder="비밀번호를 입력해 주세요"
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
          placeholder="이름을 입력해 주세요"
        />
      </div>

      <!-- 전화번호 -->
      <div class="row mb-3">
        <label for="phone" class="form-label">Mobile</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="phone"
          placeholder="ex) 010-1111-1111"
          v-model="state.phone"
        />
      </div>

      <!-- 주소 -->
      <div id="address">
        <div class="row mb-1 search">
          <label for="address" class="form-label">Address</label>
          <input
            type="text"
            class="form-control form-control-sm zipcode"
            ref="zipcode"
            v-model="state.zipcode"
            disabled
          />
          <button @click="address_search" class="btn btn-danger btn-sm">
            주소 검색
          </button>
        </div>
      </div>

      <div id="addressInput">
        <div class="row mb-1">
          <input
            type="text"
            class="form-control form-control-sm"
            ref="roadName"
            v-model="state.roadName"
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
            placeholder="상세주소를 입력해 주세요"
          />
        </div>
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
import router from "@/router/router";
import axios from "axios";
import "../css/views/join.css";

export default {
  name: "TheRegist",
  components: { VueDaumPostcode },
  setup() {
    const state = reactive({
      email: "",
      emailCheck: "",
      password: "",
      repassword: "",
      name: "",
      phone: "",
      zipcode: "",
      roadName: "",
      detailAddress: "",
    });
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const name = ref("");
    const phone = ref("");
    let zipcode = ref("");
    let roadName = ref("");
    const detailAddress = ref("");
    let postOpen = ref(false);

    const joinHandler = async () => {
      if (state.email === "") {
        alert("아이디를 입력해 주세요");
        email.value.focus();
        return false;
      } else if (state.password === "") {
        alert("비밀번호를 입력해 주세요");
        password.value.focus();
        return false;
      } else if (state.repassword === "") {
        alert("비밀번호를 확인해 주세요");
        repassword.value.focus();
        return;
      } else if (state.password !== state.repassword) {
        alert("비밀번호가 일치하지 않습니다");
        password.value.focus();
        return false;
      } else if (state.name === "") {
        alert("이름을 입력해 주세요");
        name.value.focus();
        return;
      } else if (state.phone === "") {
        alert("전화번호를 입력해 주세요");
        phone.value.focus();
        return;
      } else if (state.detailAddress === "") {
        alert("상세주소를 입력해 주세요");
        detailAddress.value.focus();
        return;
      }

      const url = "/api/v1/join";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        email: state.email,
        password: state.password,
        name: state.name,
        phone: state.phone,
        zipcode: state.zipcode,
        roadName: state.roadName,
        detailAddress: state.detailAddress,
      };
      await axios.post(url, body, { headers }).then(function (res) {
        if (res.status === 201) {
          alert("회원가입이 되었습니다.");
          router.push("/login");  
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      });
    };

    const emailCheckHandler = async () => {
      const url = "/api/v1/email-check?email=";
      const email = state.email;
      const response = await axios.get(url + email);
      if (response.status === 200) {
        response.data == true ? alert("사용 불가") : alert("사용 가능");
      } else {
        state.emailCheck = "중복 확인";
      }
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
        roadName.value.value = addr + " " + extraAddr;
      } else {
        roadName.value.value = addr;
      }

      zipcode.value.value = data.zonecode;
      detailAddress.value.focus();

      state.zipcode = data.zonecode;
      state.roadName = addr;

      postOpen.value = false;
    };

    // const phon
    
    return {
      state,
      email,
      password,
      repassword,
      name,
      phone,
      zipcode,
      roadName,
      detailAddress,
      joinHandler,
      address_search,
      oncomplete,
      emailCheckHandler,
      message: "Join",
      postOpen,
    };
  },
};
</script>
