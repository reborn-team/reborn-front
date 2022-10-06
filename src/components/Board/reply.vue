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
          <p id="replyContent" >{{i.content}}</p>
          <div id="replyId" hidden>{{i.id}}</div>
        </div>

        <div class="review-members-btn" v-if="i.author">
          <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="getComment(i)">수정하기</button>
          <button class="btn btn-secondary btn-sm" @click="deleteReply(i)">삭제</button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <textarea class="form-control reply-input" v-model="state.editComment" ref="editComment"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" @click="modifyReply" v-if="!author">수정하기</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">취소</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { onMounted, reactive, ref } from '@vue/runtime-core';
import "@/css/components/Board/Reply.css"
import axios from 'axios';
import router from '@/router/router';

export default {
  name: "TheReply",
  props: ["articleId"],
  setup(props){

    const state = reactive({
      editComment : ""
    })

    const reply = ref()
    const replyId = ref();
    const replyContent = ref();
    const editComment = ref();
    const author = ref();
    const token = sessionStorage.getItem("TOKEN")


    onMounted(()=>{
      getReply()
    })

    const getReply = async() => {
      const url = `/api/v1/articles/${props.articleId}/comments`
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      await axios.get(url,{headers}).then((res)=>{
        reply.value = res.data
        console.log(reply.value)
      })
    }


    const getComment = (i) =>{ 
      replyId.value = i.id
      replyContent.value = i.content
      state.editComment = i.content
      author.value = i.author
      console.log(replyId.value)
      console.log(replyContent.value)
      console.log(author.value)
    }



    const modifyReply = async() => {
      if (state.editComment === "") {
        alert("내용을 입력해 주세요");
        editComment.value.focus();
        return false;
      } 

      const url = `/api/v1/articles/comments/${replyId.value}`
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      const body = {
        content : state.editComment
      }
      await axios.patch(url,body,{headers}).then((res)=>{
        if(res.status === 204){
          alert("댓글이 수정 되었습니다")
          router.go()
        }
      })
    }

    const deleteReply = (i) => {
      const url = `/api/v1/articles/comments/${i.id}`
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      axios.delete(url, {headers}).then((res)=>{
        console.log(res.status)
        if(res.status == 204){
          alert("글이 삭제 되었습니다")
          router.go()
        }
      })
    };

    return{
      state,
      reply,
      replyId,
      replyContent,
      editComment,
      author,
      getReply,
      getComment,
      modifyReply,
      deleteReply
    }
  }
};
</script>
