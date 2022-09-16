<template>
  <div id="workoutList">
    <h1 class="title">{{ message }}</h1>
    <div id="workoutListNav">
      <button class="btn btn-danger" type="button" @click="changeCategory('BACK')">등</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('CHEST')">가슴</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('LOWER_BODY')">하체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('CORE')">코어</button>
      <button class="btn btn-danger" id="add" @click="addWorkoukList">
        추가
      </button>
    </div>
    <hr />
    <div id="WorkoutCard">
      <WorkoutCard :page ="page"/>
    </div>    <div id="WorkoutCard">
      <WorkoutCard />
    </div>   
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import "../css/views/WorkoutList.css";
import axios from "axios";
import {  ref } from "@vue/reactivity";
import router from '@/router/router';



export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  data() {
    return { message: "Workout List" };
  },
  setup() {
    const page = ref([]);
    const id = 20;

    let category = "";
    const changeCategory = async (i) =>{
      category = i;
      console.log(category)
      const url = `/api/v1/workout?id=${id}&category=${category}`;
      axios.get(url).then(res=>{
        if (res.status === 200) {
        page.value = res.data.page
        console.log(res.data)
        }
      });
   
      
    }
    
    const madeBox = async () => {
      const url = `/api/v1/workout?id=${id}&category=${category}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        page.value = response.data.page
        console.log(response.data)
        
      } 
    };
    const addWorkoukList = () => {
      router.push("/workout/create")
    }

// (function() {
//             const article = document.querySelector('template');
            
//             const template = function(n) {
//                 const docFrag = document.createDocumentFragment();
//                 const div = document.createElement('div');
//                 const p = document.createElement('p');
//                 p.textContent = n+' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem mollitia accusamus sequi ipsa, rerum nam laboriosam';
                
//                 div.appendChild(p)
//                 div.classList.add('block');

//                 docFrag.appendChild(div);
//                 article.appendChild(docFrag);
//             };

//             //스크롤 바닥 감지
//             window.onscroll = function() {
//                 //window height + window scrollY 값이 document height보다 클 경우
//                 if((window.innerHeight + window.scrollY) >= document.body.offsetHeight+150) {
//                   console.log((window.innerHeight + window.scrollY));
//                   console.log(document.body.offsetHeight)
//                     madeBox()
//                     template(1)
//                 }
//             };
//         })();
    
    madeBox()
    return{page,addWorkoukList,changeCategory
      }

  }
};
 
    





 
</script>

<style scoped>
.WoBtn {
  text-align: left;
  border-color: none;
  background-color: none;
}
.btn-primary {
  background-color: white;
  border-color: red;
  color: black;
  --bs-btn-hover-bg: red;
  --bs-btn-hover-border-color: none;
  margin: 0px 20px 0 30px;
}
</style>
