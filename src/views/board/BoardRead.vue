<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' // 주소와 이동을 관리하는 도구
import axios from 'axios'

const route = useRoute() // 현재 주소창 정보 (번호를 빼올 때 씁니다)
const router = useRouter() // 다른 페이지로 이동할 때 씁니다

const board = ref(null) // 서버에서 가져온 데이터를 담을 빈 상자

onMounted(async () => {
  try {
    // 1. 주소창에서 글 번호(idx)를 쏙 빼옵니다. (예: /board/read/1 -> 1)
    const idx = route.params.idx

    // 2. 그 번호로 백엔드에 상세 데이터를 요청합니다.
    const response = await axios.get(`http://localhost:8080/board/read/${idx}`)

    // 3. 받아온 데이터를 상자에 담아 화면에 뿌려줍니다.
    board.value = response.data
  } catch (error) {
    console.error('게시글을 불러오지 못했습니다.', error)
    alert('게시글을 불러오는데 실패했습니다.')
    goToList() // 에러 나면 목록으로 강제 추방!
  }
})

// 목록 페이지로 돌아가는 함수
const goToList = () => {
  router.push('/boardlist')
}
</script>

<template>
  <div class="read-container">
    <div v-if="board" class="board-card">
      <div class="board-header">
        <span class="board-idx">No. {{ board.idx }}</span>
        <h2 class="board-title">{{ board.title }}</h2>
      </div>

      <div class="board-contents">
        {{ board.contents }}
      </div>

      <div class="button-group">
        <button @click="goToList" class="btn-list">목록으로</button>
      </div>
    </div>

    <div v-else class="loading">로딩 중입니다.</div>
  </div>
</template>

<style scoped>
.read-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}
.board-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.board-header {
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.board-idx {
  color: #888;
  font-size: 0.9em;
}
.board-title {
  margin: 10px 0 0 0;
  font-size: 1.5em;
  color: #222;
}
.board-contents {
  min-height: 200px;
  line-height: 1.6;
  color: #444;
  white-space: pre-wrap; /* 줄바꿈을 그대로 유지해줍니다 */
}
.button-group {
  margin-top: 30px;
  text-align: center;
}
.btn-list {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-list:hover {
  background-color: #555;
}
.loading {
  text-align: center;
  margin-top: 50px;
  color: #666;
}
</style>
