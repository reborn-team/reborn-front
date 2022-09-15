<template>
  <div id="fileUpload">
    <div class="form-group centerz" >
      <input type="file" @change="selectFile" ref="fileRef" class="form-control" multiple />
    </div>
  </div>
</template>

<script>
import "../css/components/FileUpload.css"
import axios from "axios";

export default {
  setup() {
    const selectFile = (event) => {
      const formData = new FormData();
      for (const file of event.target.files) {
        formData.append("file", file);
      }
      axios .post("/api/v1/upload", formData, { 
        headers: { "Content-Type": "multipart/form-data" },
      }).then(() => {

      }).catch((error) => {
        alert(error.message);
      });
    };

    return {
      files: [],
      selectFile,
    };
  },
};
</script>

