<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const board = ref(null)

onMounted(async () => {
  try {
    const idx = route.params.idx
    const response = await axios.get(`http://localhost:8080/board/read/${idx}`)
    board.value = response.data
  } catch (error) {
    console.error('게시글을 불러오지 못했습니다.', error)
    alert('게시글을 불러오는데 실패했습니다.')
    goToList()
  }
})

// 목록 페이지로 돌아가는 함수
const goToList = () => {
  router.push('/boardlist')
}

// 💎 수정 페이지로 이동하는 함수 추가
const goToModify = () => {
  // 현재 보고 있는 글의 번호를 달고 수정 페이지로 넘어갑니다.
  // (나중에 router/index.js에 이 주소를 추가해 줘야 합니다!)
  const idx = route.params.idx
  router.push(`/boardmodify/${idx}`)
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
        <button @click="goToModify" class="btn-modify">수정하기</button>
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
  white-space: pre-wrap;
}

/* 💎 버튼 그룹 스타일 수정: 버튼들을 양쪽으로 예쁘게 찢어놓거나 간격을 줍니다 */
.button-group {
  margin-top: 30px;
  display: flex;
  gap: 10px;
  justify-content: center; /* 버튼들을 가운데로 모으고 사이 간격을 줍니다 */
}

.btn-list {
  padding: 10px 20px;
  background-color: #6c757d; /* 목록 버튼은 차분한 회색으로 통일 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-list:hover {
  background-color: #5a6268;
}

/* 💎 새로운 수정 버튼 스타일 추가 */
.btn-modify {
  padding: 10px 20px;
  background-color: #333; /* 수정 버튼은 Facet 메인 컬러(검은색) 느낌으로 강조 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-modify:hover {
  background-color: #555;
}

.loading {
  text-align: center;
  margin-top: 50px;
  color: #666;
}
</style>
