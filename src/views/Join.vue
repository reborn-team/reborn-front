<template lang="ko">
  <div id="join">
    <h1 class="title">{{ message }}</h1>
    <hr />

    <div id="join-box">
      <div class="row mb-3">
        <label for="email" class="form-label">ID</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="email"
          v-model="state.email"
          placeholder="이메일 형식으로 입력해 주세요"
          @change="changeEmailFlag"
        />
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="emailCheckHandler">
          ✔
        </button>
      </div>

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

      <div class="row mb-3">
        <label for="nickname" class="form-label">NickName</label>
        <input
          type="text"
          class="form-control form-control-sm"
          ref="nickname"
          v-model="state.nickname"
          placeholder="닉네임을 입력해 주세요"
          @change="changeNicknameFlag"
        />
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="nickNameCheckHandler">
          ✔
        </button>
      </div>

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
import "../css/views/Join.css";

export default {
  name: "TheRegist",
  components: { VueDaumPostcode },
  setup() {
    const state = reactive({
      email: "",
      emailCheck: "",
      password: "",
      repassword: "",
      nickname: "",
      phone: "",
      zipcode: "",
      roadName: "",
      detailAddress: "",
    });
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const nickname = ref("");
    const phone = ref("");
    let zipcode = ref("");
    let roadName = ref("");
    const detailAddress = ref("");
    let postOpen = ref(false);
    let emailFlag = false;
    let nickNameFlag = false;

    const email_pattern = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    const phone_pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;

    const changeEmailFlag = () => {
      emailFlag = false;
    };
    const changeNicknameFlag = () => {
      nickNameFlag = false;
    };

    const joinHandler = async () => {
      if (state.email === "") {
        alert("아이디를 입력해 주세요");
        email.value.focus();
        return false;
      } else if (!email_pattern.test(state.email)) {
        alert("이메일 형식에 맞춰주세요");
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
        repassword.value.focus();
        repassword.value.value = "";
        return false;
      } else if (state.nickname === "") {
        alert("닉네임을 입력해 주세요");
        nickname.value.focus();
        return;
      } else if (state.phone === "") {
        alert("전화번호를 입력해 주세요");
        phone.value.focus();
        return;
      } else if (!phone_pattern.test(state.phone)) {
        alert("전화번호 형식에 맞춰주세요");
        email.value.focus();
        return false;
      } else if (!emailFlag) {
        alert("아이디 중복 확인을 해주세요");
        return;
      } else if (!nickNameFlag) {
        alert("닉네임 중복 확인을 해주세요");
        return;
      }

      const url = "/api/v1/members ";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        email: state.email,
        password: state.password,
        nickname: state.nickname,
        phone: state.phone,
        zipcode: state.zipcode,
        roadName: state.roadName,
        detailAddress: state.detailAddress,
      };
      await axios
        .post(url, body, { headers })
        .then(function (res) {
          if (res.status === 201) {
            alert("회원가입이 되었습니다.");
            router.replace("/login");
          }
        })
        .catch(() => {
          alert("회원가입에 실패했습니다");
        });
    };

    const emailCheckHandler = async () => {
      const url = "/api/v1/email-check?email=";
      const email = state.email;
      const response = await axios.get(url + email);
      if (response.status === 200) {
        if (response.data.exist == true) {
          alert("중복된 이메일입니다");
        } else {
          alert("등록 가능한 이메일입니다");
          emailFlag = true;
        }
      }
    };

    const nickNameCheckHandler = async () => {
      const url = "/api/v1/nickname-check?nickname=";
      const nickname = state.nickname;
      const response = await axios.get(url + nickname);
      if (response.status === 200) {
        if (response.data.exist == true) {
          alert("중복된 닉네임입니다");
        } else {
          alert("등록 가능한 닉네임입니다");
          nickNameFlag = true;
        }
      }
    };

    const address_search = async () => {
      postOpen.value = !postOpen.value;
    };

    const oncomplete = (data) => {
      var addr = "";
      var extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
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
      nickname,
      phone,
      zipcode,
      roadName,
      detailAddress,
      emailFlag,
      nickNameFlag,
      joinHandler,
      address_search,
      oncomplete,
      emailCheckHandler,
      nickNameCheckHandler,
      changeEmailFlag,
      changeNicknameFlag,
      message: "회원가입",
      postOpen,
    };
  },
};
</script>
