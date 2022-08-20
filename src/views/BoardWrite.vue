<template>
  <h1 class="title">{{message}}</h1>
  <div>
    <h3>제목 : </h3>
    <WritingForm/>
  </div>
</template>

<script>
import WritingForm from '../components/WritingForm.vue'

export default {
  name: 'BoardWrite',
  components: {WritingForm},
  data(){
    return {message:"Writing"}
  }
};
</script>

<style scoped>
h2{
  display: inline-block;
  margin: 0px;
}
</style>