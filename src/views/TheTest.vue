<template>
  <div class="infinite">
    <Card />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  components: { Card },

  setup() {
    // function infiniteScroll() {
    //   const fullContent = document.querySelector(window.innerHeight);
    //   console.log(fullContent)
    // }
    // infiniteScroll();
  },
};
</script>

<style>
</style>