<template>
  <h1 class="title">{{ message }}</h1>
  <div class="map">
    <MapAPI />
    <table class="content">
      <tr>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" />
        </div>
      </tr>
      <tr>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" />
        </div>
      </tr>
      <tr>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" />
        </div>
      </tr>
    </table>
  </div><hr />
  <div class="rely">
    <div class="reply-header">
      <h6 class="id">
        ID
      </h6>
      <p class="time">
        Time
      </p>
    </div>
    <div class="reply-body">
      <p>
        Content
      </p>
    </div>
  </div>
</template>

<script>
import MapAPI from "@/components/MapAPI.vue";
export default {
  name: "TheNearby",
  components: { MapAPI },
  data() {
    return { message: "Nearby" };
  },
};
</script>

<style scoped>
.map {
  display: inline-block;
  margin: 10px auto;
}
.content{
  margin: 10px auto;
}
.rely{
  width: 800px;
  height: 120px;
  background-color: antiquewhite;
  margin: 5px auto;
  text-align: left;
  padding: 10px;
}

</style>
