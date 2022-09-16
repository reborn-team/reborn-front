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
          disabled
        />
      </div>

      <!-- 비밀번호 -->
      <div class="row mb-3">
        <label for="user_password" class="form-label">Password</label>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#changePassword"
        >
          비밀번호 변경
        </button>
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
          <button
            class="btn btn-secondary btn-sm delete"
            @click="deletehandler"
          >
            회원 탈퇴
          </button>
        </div>
        <div class="change-button">
          <button class="btn btn-danger btn-sm" @click="changeHandler">
            완료
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <div
    class="modal fade"
    id="changePassword"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="modalBody">
          <div>
            <label for="" class="form-label">현재 비밀번호</label>
            <input
              type="password"
              class="form-control form-control-sm"
              ref="rawPassword"
              v-model="state.rawPassword"
            />
          </div>
          <div>
            <label for="" class="form-label">새 비밀번호</label>
            <input
              type="password"
              class="form-control form-control-sm"
              ref="changePassword"
              v-model="state.changePassword"
            />
          </div>
          <div>
            <label for="" class="form-label">새 비밀번호 확인</label>
            <input
              type="password"
              class="form-control form-control-sm"
              ref="passwordCheck"
              v-model="state.passwordCheck"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            취소
          </button>
          <button type="button" class="btn btn-danger" @click="changePasswordHandler">변경하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyPageNav from "@/components/MyPageNav.vue";
import { VueDaumPostcode } from "vue-daum-postcode";
import { reactive, ref } from "@vue/reactivity";
import "../css/views/MyPageChange.css";
import axios from 'axios';

export default {
  name: "TheRegist",
  components: { VueDaumPostcode, MyPageNav },
  setup() {
    const state = reactive({
      email: "",
      rawPassword: "",
      changePassword: "",
      passwordCheck: "",
      name: "",
      phoneNum: "",
      zipcode: "",
      roadName: "",
      detailAddress: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const email = ref("");
    const rawPassword = ref("");
    const changePassword = ref("");
    const passwordCheck = ref("");
    const name = ref("");
    const phoneNum = ref("");
    let zipcode = ref("");
    let roadName = ref("");
    const detailAddress = ref("");
    let postOpen = ref(false);

    // 전화번호 정규식
    const phone_pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;

    // 주소창 열기
    const address_search = async () => {
      postOpen.value = !postOpen.value;
    };

    // 주소 API
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

    // 유효성 검사
    const changeHandler = async () => {
      if (state.name === "") {
        alert("이름을 입력해 주세요");
        name.value.focus();
        return;
      } else if (state.phoneNum === "") {
        alert("전화번호를 입력해 주세요");
        phoneNum.value.focus();
        return;
      } else if( !phone_pattern.test(state.phone)){
        alert("전화번호 형식에 맞춰주세요");
        email.value.focus();
        return false;
      }
    };

    //비밀번호 변경
    const changePasswordHandler = async () => {

      if (state.rawPassword === "") {
        alert("현재 비밀번호를 입력해 주세요");
        rawPassword.value.focus();
        return false;
      } else if (state.changePassword === "") {
        alert("새 비밀번호를 입력해 주세요");
        changePassword.value.focus();
        return;
      } else if (state.passwordCheck === "") {
        alert("새 비밀번호를 확인해 주세요");
        passwordCheck.value.focus();
        return;
      } else if (state.changePassword !== state.passwordCheck) {
        alert("새 비밀번호가 일치하지 않습니다");
        passwordCheck.value.value = "";
        passwordCheck.value.focus();

        return false;
      }

      const url = "/api/v1/change-password";
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      const body = {
        rawPassword: state.rawPassword,
        changePassword: state.changePassword,
      };
      console.log(body);
      await axios.patch(url, body, { headers }).then((res)=>{
        if(res.status==200){
          alert("비밀번호가 변경 되었습니다.")
        }
      })
    };

    return {
      state,
      email,
      rawPassword,
      changePassword,
      passwordCheck,
      name,
      phoneNum,
      zipcode,
      roadName,
      detailAddress,
      address_search,
      oncomplete,
      postOpen,
      changeHandler,
      changePasswordHandler,
    };
  },
};
</script>
