<template>
  <div id="boardReply">
    <h6 class="reply">댓글</h6>
    <div class="reviewsWrap p-4" v-for="i in reply" :key="i">
      <div class="reviews-members">
        <div class="reviews-members-header">
          <h6 class="mb-0">{{i.memberNickname}}</h6>
          <p class="text-gray mb-3">{{i.regDate}}</p>
        </div>
        <div class="reviews-members-body">
          <p>{{i.content}}</p>
        </div>

        <div class="review-members-btn">
          <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#changeComment" >
            수정
          </button>
          <button class="btn btn-secondary btn-sm">삭제</button>
        </div>

        <div class="modal fade" id="changeComment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">댓글 수정</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <textarea class="form-control reply-input" v-model="content"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-warning btn-sm">변경</button>
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from '@vue/runtime-core';
import "../../css/components/Board/Reply.css"
import axios from 'axios';

export default {
  name: "TheReply",
  props: ["articleId", "state"],
  setup(props){

    const reply = ref()
    const content = ref()

    onMounted(()=>{
      getReply()
    })

    const getReply = async() => {
      const url = `/api/v1/articles/${props.articleId}/comments`
      console.log(url)
      await axios.get(url).then((res)=>{
        reply.value = res.data
        content.value = reply.value
        console.log(reply.value.id)
      })
    }

    return{
      reply,
      content,
      getReply
    }
  }
};
</script>
