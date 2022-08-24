<template>
  <div class="all">
  <form action="">
  <div class="join-box">
    
  <h3>회원가입</h3>
  <hr>

   <div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ID</label>
  <div class="col-sm-10">
  <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="내용을 입력해주세요">
  </div>
  </div>

   <div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Password</label>
  <div class="col-sm-10">
  <input type="password" class="form-control form-control-sm" id="colFormLabelSm" placeholder="내용을 입력해주세요">
  </div>
  </div>

  <div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Re</label>
  <div class="col-sm-10">
  <input type="password" class="form-control form-control-sm" id="colFormLabelSm" placeholder="내용을 입력해주세요">
  </div>
  </div>

  <div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
  <div class="col-sm-10">
  <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="내용을 입력해주세요">
  </div>
  </div>
  
  <div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Mobile</label>
  <div class="col-sm-10">
  <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="내용을 입력해주세요">
  </div>
  </div>

  <div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Address</label>
  <div class="col-sm-10">
  <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="내용을 입력해주세요">
  </div>
  </div>

  <div class="button-group2">
  <div class="join2-button">
  <button type="button" class="btn btn-danger btn-sm">확인</button>
  </div>

  <div class="cancle-button">
  <button type="button" class="btn btn-danger btn-sm">취소</button>
  </div>
  </div>
  
  </div>
  </form>
 </div>
</template>

<script>
export default {
  name: "TheRegist",
  data(){
    return {message:"Regist"};
  }

}
</script>

<style>
.all{
  text-align: center
}
.join-box{
  height: 1000px;
	width: 400px;
  display: inline-block;
  text-align: left;
}
h2{
  text-align: left;
}
.button-group2{
  text-align: right;
}
.join2-button{
  display: inline-block;
  padding-right: 20px;
}
.cancle-button{
  display: inline-block;
}
</style>