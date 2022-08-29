<template>
  <div id="join">
    <h1 class="title">{{ message }}</h1>
    <hr />

    <div id="join-box">
      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >ID</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="이메일 형식으로 입력하세요"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >Password</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >Re</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >Name</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="이름을 입력해주세요"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
          >Mobile</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="연락처 입력해주세요"
          />
        </div>
      </div>

      <div class="row mb-1">
        <div id="address">
          <label
            for="colFormLabelSm"
            class="col-sm-2 col-form-label col-form-label-sm"
            >Address</label
          >
          <div class="col-sm-5 addrssform">
            <input
              type="text"
              class="form-control form-control-sm"
              id="colFormLabelSm"
              placeholder="우편번호"
            />
          </div>
          <div >
            <button type="button" class="btn btn-danger btn-sm">
              주소 검색
            </button>
          </div>
        </div>
      </div>

      <div class="row mb-1">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
        ></label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="부산진구 ---"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="colFormLabelSm"
          class="col-sm-2 col-form-label col-form-label-sm"
        ></label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="상세주소를 입력하세요"
          />
        </div>
      </div>

      <div id="joinBtn">
        <div class="join2-button">
          <a href="/login">
            <button type="button" class="btn btn-danger btn-sm">완료</button>
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
import "../css/views/join.css";

export default {
  name: "TheRegist",
  data() {
    return { message: "Regist" };
  },
};
</script>
