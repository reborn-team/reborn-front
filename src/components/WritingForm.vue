<template>
  <div class="quill">
    <quill-editor :options="options"></quill-editor>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "../css/components/WritingForm.css"

export default {
  components: {
    QuillEditor,
  },
  setup() {
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
            [{ list: "ordered" }, { list: "bullet" }],
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

