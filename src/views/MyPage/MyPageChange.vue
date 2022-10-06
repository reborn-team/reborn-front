<template lang="ko"> 
  <MyPageNav />
  <div id="myPageChange">
    <div id="change-box">
      <div class="row mb-3">
        <label for="email" class="form-label">ID</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="email"
          v-model="state.email"
          disabled
        />
      </div>

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

      <div class="row mb-3">
        <label for="nickname" class="form-label">Nickname</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="nickname"
          v-model="state.nickname"
          placeholder="닉네임을 입력하세요"
          minlength="1"
        />
      </div>

      <div class="row mb-3">
        <label for="phone" class="form-label">Mobile</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="phone"
          placeholder="ex) 010-1111-1111"
          v-model="state.phone"
          minlength="1"
        />
      </div>

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
            minlength="1"
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
            @click="deleteIdHandler"
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
          <h5 class="modal-title" id="exampleModalLabel">비밀번호 변경</h5>
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
              minlength="1"
              maxlength="20"
            />
          </div>
          <div>
            <label for="" class="form-label">새 비밀번호 확인</label>
            <input
              type="password"
              class="form-control form-control-sm"
              ref="passwordCheck"
              v-model="state.passwordCheck"
              minlength="1"
              maxlength="20"
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
import "@/css/views/MyPage/MyPageChange.css";
import { VueDaumPostcode } from "vue-daum-postcode";
import { reactive, ref } from "@vue/reactivity";
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';

export default {
  name: "TheRegist",
  components: { VueDaumPostcode, MyPageNav },
  setup() {
    const state = reactive({
      email: "",
      rawPassword: "",
      changePassword: "",
      passwordCheck: "",
      nickname: "",
      phone: "",
      zipcode: "",
      roadName: "",
      detailAddress: "",
      token: sessionStorage.getItem("TOKEN"),
    });

    const data = ref("");
    const email = ref("");
    const rawPassword = ref("");
    const changePassword = ref("");
    const passwordCheck = ref("");
    const nickname = ref("");
    const phone = ref("");
    let zipcode = ref("");
    let roadName = ref("");
    const detailAddress = ref("");
    let postOpen = ref(false);

    onMounted(()=>{
      getData();
    })

    const getData = async() =>{
      const url = "/api/v1/members/me";
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      await axios.get(url, { headers }).then((res)=>{
        if(res.status==200){
          data.value = res.data

          state.email = data.value.email
          state.nickname = data.value.nickname
          state.phone = data.value.phone
          state.zipcode = data.value.zipcode
          state.roadName = data.value.roadName
          state.detailAddress = data.value.detailAddress
        }
      })
    }

    const phone_pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;

    const changeHandler = async () => {
      if (state.nickname === "") {
        alert("닉네임을 입력해 주세요");
        nickname.value.focus();
        return;
      } else if (state.phone === "") {
        alert("전화번호를 입력해 주세요");
        phone.value.focus();
        return;
      } else if(!phone_pattern.test(state.phone)){
        alert("전화번호 형식에 맞춰주세요");
        phone.value.focus();
        return false;
      }

      const url = "/api/v1/members/me";
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      const body = {
        nickname: state.nickname,
        phone: state.phone,
        zipcode: state.zipcode,
        roadName: state.roadName,
        detailAddress: state.detailAddress
      };
      console.log(body);
      await axios.patch(url, body, { headers }).then((res)=>{
        if(res.status==204){
          alert("회원정보가 수정 되었습니다.")
        }
      })
    };

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
        if(res.status==204){
          alert("비밀번호가 변경 되었습니다.")
        }
      })
    };

    const address_search = async () => {
      postOpen.value = !postOpen.value;
    };

    const oncomplete = (data) => {
      var addr = ""; 
      var extraAddr = ""; 

      if (data.userSelectedType === "R") {addr = data.roadAddress;} 
      else {addr = data.jibunAddress;}

      if (data.userSelectedType === "R") {
        if (data.bname !== "") {extraAddr += data.bname;}
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;}
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";}
        roadName.value.value = addr + " " + extraAddr;
      } else {roadName.value.value = addr;}

      zipcode.value.value = data.zonecode;
      detailAddress.value.focus();

      state.zipcode = data.zonecode;
      state.roadName = addr;

      postOpen.value = false;
    };

    const deleteIdHandler = () => {
      const url = "/api/v1/members/me"
      const headers = {
        "Content-Type": "application/json",
        Authorization: state.token,
      }
      axios.delete(url, {headers}).then((res)=>{
        if(res.status==204){
          alert("회원 탈퇴가 완료 되었습니다.")
        }
      })

    }

    return {
      state,
      email,
      rawPassword,
      changePassword,
      passwordCheck,
      nickname,
      phone,
      zipcode,
      roadName,
      detailAddress,
      address_search,
      oncomplete,
      postOpen,
      changeHandler,
      changePasswordHandler,
      getData,
      deleteIdHandler,
      data
    };
  },
};
</script>
