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
        modules: {
          syntax: false,
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["image", "video"],
            ["clean"],
          ],
        },
        placeholder: "내용을 입력하세요",
        theme: "bubble",
      },
    };
  },
};
</script>

