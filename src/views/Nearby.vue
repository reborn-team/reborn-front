<template>
  <div id="nearby">
    <h1 class="title">{{ message }}</h1>
    <div class="map">
      <MapAPI />
      <table id="content">
        <tr>
          <div v-for="i in 4" :key={i} >
            <input type="text" class="form-control" />
          </div>
        </tr>
      </table>
    </div>
    <hr />
    <div id="rely">
      <div id="reply-header">
        <h6 class="id">ID</h6>
        <p class="time">Time</p>
      </div>
      <div id="reply-body">
        <p>Content</p>
      </div>
    </div>
  </div>
</template>

<script>
import MapAPI from "@/components/MapAPI.vue";
import "../css/views/Nearby.css";

export default {
  name: "TheNearby",
  components: { MapAPI },
  data() {
    return { message: "Nearby" };
  },
};
</script>
