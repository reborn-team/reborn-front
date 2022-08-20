<template>
  <div class="quill">
    <quill-editor theme="snow"></quill-editor>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: { QuillEditor },
}
</script>

<style>
.quill{
  width: 60vw;
  height: 35rem;
  margin: 10px auto;
}
</style>