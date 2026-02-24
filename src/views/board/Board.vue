<script setup>
import { ref } from 'vue'
import api from '@/api/axiosinterceptor'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. 데이터 상태 정의 (BoardDto.Reg와 구조를 맞춤)
const board = ref({
  title: '',
  contents: '',
})

// 2. 등록 함수
const submitPost = async () => {
  if (!board.value.title || !board.value.contents) {
    alert('제목과 내용을 모두 입력해주세요!')
    return
  }

  try {
    const response = await api.post('/board/register', board.value)
    alert('게시글이 성공적으로 등록되었습니다.')
    router.push('/boardlist')
  } catch (error) {
    console.error('등록 실패:', error)
    alert('서버와 통신 중 에러가 발생했습니다.')
  }
}

// 3. 폼 초기화
const resetForm = () => {
  if (confirm('작성 중인 내용을 취소하시겠습니까?')) {
    board.value.title = ''
    board.value.contents = ''
  }
}

// 💎 4. 목록으로 돌아가는 함수 추가
const goToList = () => {
  router.push('/boardlist')
}
</script>

<template>
  <div class="write-container">
    <h2>게시글 작성</h2>
    <div class="form-group">
      <label>제목</label>
      <input v-model="board.title" placeholder="제목을 입력하세요" class="input-field" />
    </div>

    <div class="form-group">
      <label>내용</label>
      <textarea
        v-model="board.contents"
        placeholder="내용을 입력하세요"
        class="textarea-field"
      ></textarea>
    </div>

    <div class="button-group">
      <button @click="goToList" class="btn-list">목록으로</button>
      <button @click="submitPost" class="btn-submit">등록하기</button>
      <button @click="resetForm" class="btn-reset">취소</button>
    </div>
  </div>
</template>

<style scoped>
.write-container {
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
/* 버튼 그룹 정렬 유지 */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
/* 💎 목록 이동 버튼 스타일 추가 (차분한 회색) */
.btn-list {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* 목록 버튼은 다른 버튼들과 살짝 거리를 두기 위해 우측 마진을 줍니다 */
  margin-right: auto;
}
.btn-list:hover {
  background-color: #5a6268;
}
.btn-submit {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
