<template>
  <div class="quill">
    <quill-editor :options="options"></quill-editor>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      options: {
        debug: "info",
        modules: {
          syntax: true,
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            ["blockquote"],
            [{ list: "ordered" },{ list: "bullet" },],
            ["image", "video"],
            ["clean"],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      },
    };
  },
};
</script>

<style>
.quill {
  width: 60vw;
  height: 35rem;
  margin: 10px auto;
}
</style>