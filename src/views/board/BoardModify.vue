<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

// 1. 수정할 데이터를 담을 상자 (처음엔 비어있습니다)
const board = ref({
  title: '',
  contents: '',
})

// 주소창에서 글 번호를 가져옵니다.
const idx = route.params.idx

// 2. 화면이 켜지자마자 기존 글 내용을 백엔드에서 불러옵니다. (Read 역할)
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/board/read/${idx}`)
    // 불러온 제목과 내용을 입력칸(board)에 쏙 집어넣어 줍니다.
    board.value.title = response.data.title
    board.value.contents = response.data.contents
  } catch (error) {
    console.error('기존 데이터를 불러오지 못했습니다.', error)
    alert('데이터를 불러오는데 실패했습니다.')
    router.push(`/boardread/${idx}`) // 에러 나면 다시 상세 페이지로 쫓아냅니다.
  }
})

// 3. 수정한 내용을 백엔드로 보내서 덮어씁니다. (Update 역할)
const updatePost = async () => {
  if (!board.value.title || !board.value.contents) {
    alert('제목과 내용을 모두 입력해주세요!')
    return
  }

  try {
    // 💎 주의: 덮어쓰기니까 POST가 아니라 PUT을 사용합니다!
    await axios.put(`http://localhost:8080/board/update/${idx}`, board.value)
    alert('게시글이 성공적으로 수정되었습니다.')

    // 수정이 끝나면, 수정한 글을 바로 확인할 수 있게 상세 페이지로 이동시킵니다.
    router.push(`/boardread/${idx}`)
  } catch (error) {
    console.error('수정 실패:', error)
    alert('서버와 통신 중 에러가 발생했습니다.')
  }
}

// 4. 취소 버튼을 누르면 다시 원래 보던 상세 페이지로 돌아갑니다.
const cancelModify = () => {
  if (confirm('수정을 취소하시겠습니까? 수정한 내용은 저장되지 않습니다.')) {
    router.push(`/boardread/${idx}`)
  }
}
</script>

<template>
  <div class="modify-container">
    <h2>게시글 수정</h2>

    <div class="form-group">
      <label>제목</label>
      <input v-model="board.title" class="input-field" />
    </div>

    <div class="form-group">
      <label>내용</label>
      <textarea v-model="board.contents" class="textarea-field"></textarea>
    </div>

    <div class="button-group">
      <button @click="updatePost" class="btn-submit">수정 완료</button>
      <button @click="cancelModify" class="btn-reset">취소</button>
    </div>
  </div>
</template>

<style scoped>
/* 작성 페이지와 비슷한 깔끔한 폼 디자인입니다 */
.modify-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.textarea-field {
  height: 200px;
  resize: none;
}
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.btn-submit {
  padding: 10px 20px;
  background-color: #333; /* Facet 스타일에 맞춘 검은색 계열 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-submit:hover {
  background-color: #555;
}
.btn-reset {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
