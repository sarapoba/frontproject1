<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' //  1. 페이지 이동을 위한 라우터를 불러옵니다.

const boardList = ref([])
const router = useRouter() //  2. 라우터 사용 준비 완료!

//  3. 버튼을 누르면 해당 번호(idx)를 들고 상세 페이지로 이동하는 함수입니다.
const goToRead = (idx) => {
  // 아까 설정하신 라우터 주소 형식에 맞춰서 쏙 넣어줍니다.
  router.push(`/boardread/${idx}`)
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/board/list')
    boardList.value = response.data
    console.log('데이터 통신 성공!', boardList.value)
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생:', error)
  }
})
</script>

<template>
  <div class="board-container">
    <h2>게시글 목록</h2>

    <table class="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>상세보기</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="boardList.length === 0">
          <td colspan="3">등록된 게시글이 없습니다.</td>
        </tr>

        <tr v-for="board in boardList" :key="board.idx">
          <td>{{ board.idx }}</td>
          <td>{{ board.title }}</td>
          <td>
            <button @click="goToRead(board.idx)" class="btn-read">조회</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.board-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.board-table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.board-table,
.board-table th,
.board-table td {
  border: 1px solid #cccccc;
  padding: 10px;
}

.board-table th {
  background-color: #f8f9fa;
}

/* 💎 6. Facet 플랫폼에 어울리는 깔끔한 검은색 버튼 스타일을 추가했습니다 */
.btn-read {
  padding: 6px 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;
}
.btn-read:hover {
  background-color: #555; /* 마우스 올리면 살짝 밝아집니다 */
}
</style>
