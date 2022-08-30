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
          v-model="id"
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
          v-model="password"
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
          v-model="rePassword"
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
          v-model="name"
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
          placeholder="'주소 검색' 버튼을 클릭하세요"
          disabled
        />
      </div>

      <div class="row mb-3">
        <input
          type="text"
          class="form-control form-control-sm"
          id="detail_address"
          placeholder="상세주소를 입력하세요"
          v-model="detailAddress"
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
      id: "",
      password: "",
      rePassword: "",
      email: "",
      name: "",
      postcode: "",
      address: "",
      detailAddress: "",
      phoneNum: "",
      postOpen: false,
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
    async address_search(e) {
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
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
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
      this.userForm.address = addr;
      this.postOpen = false;
    },
    async joinConfirm(e) {
      e.preventDefault();
      //공백
      const pattern_blank = /[\s]/g;
      //한글만
      const patten_kor = /^[가-힣]+$/;
      //완전한글포함
      const patten_complete_kor = /[가-힣]/;
      //ID
      const patten_id = /^[a-z0-9]{5,15}$/;
      // //숫자포함
      // const patten_include_num = /[0-9]/;
      // //영어포함
      // const patten_include_eng = /[a-zA-Z]/;
      // //특수문자
      // const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
      // //email
      // const pattern_email =
      //   /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

      // let validate_result = true

      let id = this.userForm.id;
      let name = this.userForm.name;
      let password = this.userForm.password;
      let re_password = this.userForm.rePassword;
      let phone = this.phoneNum;

      if (id == "" || !password || !re_password || !name || !phone) {
        alert("모든 값을 입력해 주세요");
        return;
      }
      //아이디 소문자, 숫자만 사용
      console.log(!patten_id);
      if (!patten_id.test(id)) {
        alert("아이디를 확인해 주세요");
        return;
        // 중복확인
      }
      if (!this.idConfirm) {
        console.log(this.idConfirm);
        alert("아이디 중복확인을 해주세요");
        return;
      }
      //이름 체크. 한글만
      console.log(!patten_kor.test(name));
      if (!patten_kor.test(name)) {
        alert("이름을 확인해 주세요");
        return;
      }
      //비밀번호 체크
      if (
        pattern_blank.test(password) ||
        patten_complete_kor.test(password) ||
        password.length < 8 ||
        password.length > 20
      ) {
        alert("비밀번호는 공백없이 8~20자 내외로 입력해주세요");
        return;
      }
      //비밀번호 재확인 비교
      if (password != re_password) {
        alert("동일한 비밀번호를 입력해주세요");
        return;
      }

      console.log(this.userForm.profileFile);
      let userData = new FormData();
      for (const key in this.userForm) {
        userData.append(key, this.userForm[key]);
      }
      userData.delete("rePassword");
      userData.append("phone", this.phoneNum);
      console.log(userData.phone);
      try {
        console.log(userData);
        let res = await this.$axios.post("/api/signup/register", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        this.$router.push("/signup/complete");
      } catch (e) {
        console.log(e);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    },
  },
};
</script>
