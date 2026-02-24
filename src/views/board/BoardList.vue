<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 1. 서버에서 가져온 데이터를 담을 빈 바구니(배열)를 준비합니다.
const boardList = ref([])

// 2. 화면이 켜지자마자(onMounted) 실행되는 마법의 함수입니다.
onMounted(async () => {
  try {
    // 3. 포스트맨에서 했던 것처럼 백엔드에 GET 요청을 보냅니다.
    const response = await axios.get('http://localhost:8080/board/list')

    // 4. 응답받은 데이터를 바구니(boardList)에 쏙 담아줍니다!
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

    <table calss="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="boardList.length === 0">
          <td colspan="2">등록된 게시글이 없습니다.</td>
        </tr>

        <tr v-for="board in boardList" :key="board.idx">
          <td>{{ board.idx }}</td>
          <td>{{ board.title }}</td>
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
  border-collapse: collapse; /* 테두리를 한 줄로 깔끔하게 합쳐줍니다 */
}

/* 테이블 전체와 각 칸(th, td)에 1픽셀짜리 회색 실선(solid)을 그립니다 */
.board-table,
.board-table th,
.board-table td {
  border: 1px solid #cccccc;
  padding: 10px;
}

/* (보너스) 제목 칸의 배경색을 살짝 칠해줍니다 */
.board-table th {
  background-color: #f8f9fa;
}
</style>
