<template>
  <div id="join">
    <h1 class="title">{{ message }}</h1>
    <hr />

    <!-- 아이디 -->
    <div id="join-box">
      <div class="row mb-3">
        <label for="user_id" class="form-label">ID</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="user_id"
          v-model="userForm.id"
          placeholder="이메일 형식으로 입력하세요"
        />
      </div>

      <!-- 비밀번호 -->
      <div class="row mb-3">
        <label for="user_password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control form-control-sm"
          id="user_password"
          v-model="userForm.password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <!-- 비밀번호 확인 -->
      <div class="row mb-3">
        <label for="re_password" class="form-label">RePassword</label>
        <input
          type="password"
          class="form-control form-control-sm"
          id="re_password"
          v-model="userForm.rePassword"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <!-- 이름 -->
      <div class="row mb-3">
        <label for="user_name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="user_name"
          v-model="userForm.name"
          placeholder="이름을 입력해주세요"
        />
      </div>

      <!-- 전화번호 -->
      <div class="row mb-3">
        <label for="user_phone" class="form-label">Mobile</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="user_phone"
          placeholder="ex) 010-1111-1111"
          v-model="phoneNum"
        />
      </div>

      <!-- 주소 -->
      <div id="address">
        <div class="row mb-1">
          <label for="user_address" class="form-label">Address</label>
          <div class="col-sm-5">
            <input
              type="text"
              class="form-control form-control-sm"
              id="postcode"
              v-model="userForm.postcode"
              disabled
            />
          </div>
          <div class="col-auto">
            <button @click="address_search" class="btn btn-danger btn-sm">
              주소 검색
            </button>
          </div>
          <div class="post-box" v-if="postOpen">
            <VueDaumPostcode @complete="oncomplete" />
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <input
          type="text"
          class="form-control form-control-sm"
          id="address"
          v-model="userForm.address"
          placeholder="'주소 검색' 버튼을 클릭하세요"
          disabled
        />
      </div>

      <div class="row mb-3">
        <input
          type="text"
          class="form-control form-control-sm"
          id="detail_address"
          v-model="userForm.detailAddress"
          placeholder="상세주소를 입력하세요"
        />
      </div>

      <div id="joinBtn">
        <div class="join2-button">
          <a href="/login">
            <button class="btn btn-danger btn-sm" @click="joinConfirm">
              완료
            </button>
          </a>
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
import "../css/views/join.css";

export default {
  name: "TheRegist",
  components: { VueDaumPostcode },
  data() {
    return {
      message: "Regist",
      postOpen: false,
      phoneNum: "",
      userForm: {
        id: "",
        password: "",
        rePassword: "",
        name: "",
        postcode: "",
        address: "",
        detailAddress: "",
      },
    };
  },
  watch: {
    phoneNum() {
      this.phoneNum = this.phoneNum.replace(/[^0-9]/g, "");
      if (this.phoneNum.length < 4) {
        return;
      } else if (this.phoneNum.length < 8) {
        this.phoneNum =
          this.phoneNum.substr(0, 3) + "-" + this.phoneNum.substr(3);
      } else if (this.phoneNum.length < 12) {
        this.phoneNum =
          this.phoneNum.substr(0, 3) +
          "-" +
          this.phoneNum.substr(3, 4) +
          "-" +
          this.phoneNum.substr(7);
      }
    },
  },
  methods: {
    address_search(e) {
      e.preventDefault();
      this.postOpen = !this.postOpen;
    },

    oncomplete(data) {
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

        if (data.bname !== "" ) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }

        document.getElementById("address").value = addr + " " + extraAddr;
      } else {
        document.getElementById("address").value = addr;
      }

      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("detail_address").focus();
      this.userForm.postcode = data.zonecode;
      this.userForm.address = data.addr;

      this.postOpen = false;
    },

    async joinConfirm(e) {
      
      e.preventDefault();
      let id = this.userForm.id;
      let name = this.userForm.name;
      let password = this.userForm.password;
      let re_password = this.userForm.rePassword;
      let phone = this.phoneNum;

       if (id === "") {
        alert("Check Email");
        id.value.focus();
        return false;
      } else if (password === "") {
        alert("Check Password");
        password.value.focus();
        return false;
      } else if (re_password === "") {
        alert("Check RePassword");
        re_password.value.focus();
        return false;
      } else if (password != re_password) {
        alert("Check Password and RePassword");
        password.value.value = "";
        re_password.value.value = "";
        password.value.focus();
        return false;
      } else if (name === "") {
        alert("Check Name");
        name.value.focus();
        return false;
      } else if (phone === "") {
        alert("Check PhoneNum");
        phone.value.focus();
        return false;
      } 
    },
  },
};
</script>
