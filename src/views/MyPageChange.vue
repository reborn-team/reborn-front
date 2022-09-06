<template>
  <MyPageNav />
  <div id="change">
    <!-- 아이디 -->
    <div id="change-box">
      <div class="row mb-3">
        <label for="email" class="form-label">ID</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="email"
          @keyup="emailCheckHandler"
          v-model="state.email"
          placeholder="이메일 형식으로 입력하세요"
          disabled
        />
        <label for="">
          {{ state.emailCheck }}
        </label>
      </div>

      <!-- 비밀번호 -->
      <div class="row mb-3">
        <label for="user_password" class="form-label">Password</label>
        <button type="button" class="btn btn-danger btn-sm">비밀번호 변경</button>
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
          disabled
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
            placeholder="상세주소를 입력하세요"
          />
        </div>
      </div>

      <div class="post-box" v-if="postOpen">
        <VueDaumPostcode @complete="oncomplete" />
      </div>

      
      <div id="changeBtn">
        <div class="change-button">
          <button class="btn btn-warning btn-sm delete" @click="deletehandler">
            회원 탈퇴
          </button>
        </div>
        <div class="cancle-button">
          <a href="#">
            <button type="button" class="btn btn-danger btn-sm">취소</button>
          </a>
        </div>
        <div class="change-button">
          <button class="btn btn-danger btn-sm" @click="changeHandler">
            완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyPageNav from "@/components/MyPageNav.vue";
import { VueDaumPostcode } from "vue-daum-postcode";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import "../css/views/MyPageChange.css";

export default {
  name: "TheRegist",
  components: { VueDaumPostcode, MyPageNav },
  setup() {
    const state = reactive({
      email: "",
      emailCheck: "",
      password: "",
      repassword: "",
      name: "",
      phoneNum: "",
      zipcode: "",
      roadName: "",
      detailAddress: "",
    });
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const name = ref("");
    const phoneNum = ref("");
    let zipcode = ref("");
    let roadName = ref("");
    const detailAddress = ref("");
    let postOpen = ref(false);

    const emailCheckHandler = async () => {
      const url = "/api/v1/email-check?email=";
      const email = state.email;
      const response = await axios.get(url + email);
      if (response.status === 200) {
        state.emailCheck = response.data == true ? "사용 불가" : "사용 가능";
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

    return {
      state,
      email,
      password,
      repassword,
      name,
      phoneNum,
      zipcode,
      roadName,
      detailAddress,
      address_search,
      oncomplete,
      emailCheckHandler,
      postOpen,
    };
  },
};
</script>


