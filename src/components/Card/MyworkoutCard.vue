<template lang="ko">
  <div class="row row-cols-3">
    <div class="col" v-for="i,  in page" :key="i">
      <div id="checkboxCard" @click="link(i.workoutId)">
        <img
          :src="viewUrl(i.uploadFileName)"
          class="card-img-top"
          alt="Workout Image"
          v-if="i.uploadFileName != 'empty'"
          onerror="this.src='https://place-hold.it/300x300/666/fff/000.gif'"
        />
        <img src="@/assets/img/noImage.gif" alt="No Image" v-else />
        <div class="card-body">
          <h5 class="card-title">{{ i.workoutName }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import "@/css/components/Card/CheckboxCard.css";

export default {
  name: "TheCard",
  props: ["page", "category"],
  setup(props) {
    const link = (i) => {
      router.replace(`/workout/me/${i}?category=${props.category}`);
    };
    const viewUrl = (i) => {
      return "/api/v1/files/images?filename=" + i;
    };

    return { link, viewUrl };
  },
};
</script>
