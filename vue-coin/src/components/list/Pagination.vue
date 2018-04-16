<template>
    <div class="Pagination">
        <button
            class="Pagination-button"
            @click="handlePaginationClick(1)"
            :disabled="page <= 1">
            ⇤
        </button>

        <button
            class="Pagination-button"
            @click="handlePaginationClick(page-1)"
            :disabled="page <= 1">
            &larr;
        </button>

        <span class="Pagination-info">
            page <b>{{page}}</b> of <b>{{totalPages}}</b>
        </span>

        <button
            class="Pagination-button"
            @click="handlePaginationClick(page+1)"
            :disabled="page >= totalPages">
            &rarr;
        </button>

        <button
            class="Pagination-button"
            @click="handlePaginationClick(totalPages)"
            :disabled="page >= totalPages">
            ⇥
        </button>
    </div>
</template>

<script>
export default {
    props: {
        page: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        handlePaginationClick: {
            type: Function,
            required: true,
        }
    }
}
</script>

<style>
.Pagination {
  margin: 50px auto;
  text-align: center;
}

.Pagination-button {
  text-align: center;
  border: none;
  border-radius: 16px;
  background-color: #4997e5;
  transition: background-color .2s;
  color: white;
  cursor: pointer;
  margin: 10px;
  width: 44px;
  height: 34px;
}

.Pagination-button:hover {
  background-color: #457cb2;
}

.Pagination-button:focus {
  outline: none;
}

.Pagination-button:disabled {
  background-color: #1f364d;
  cursor: not-allowed;
}

.Pagination-info {
  font-size: 12px;
}
</style>