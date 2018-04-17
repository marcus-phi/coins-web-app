<template>
    <div class="Search">
        <span class="Search-icon"/>

        <input
            class="Search-input"
            type="text"
            placeholder="Currency name"
            v-model="searchQuery"
        />

        <div v-if="loading" class="Search-loading">
            <Loading
                :width="'12px'"
                :height="'12px'"/>
        </div>

        <div v-if="searchQuery" class="Search-result-container">
            <div v-if="searchResults.length > 0">
                <div v-for="result in searchResults"
                    :key="result.id"
                    class="Search-result"
                    @click="handleRedirect(result.id)"
                >
                    {{result.name}} ({{result.symbol}})
                </div>
            </div>
            <div v-else-if="!loading" class="Search-no-result">
                No results found.
            </div>
        </div>

    </div>
</template>

<script>
import Loading from './Loading.vue';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';

export default {
    components: {
        Loading
    },
    data: function() {
        return {
            searchResults: [],
            searchQuery: '',
            loading: false,
        }
    },
    methods: {
        handleRedirect: function(currencyId) {
            this.searchResults = [];
            this.searchQuery = '';

            this.$router.push(`/currency/${currencyId}`);
        }
    },
    watch: {
        searchQuery: function() {
            if (!this.searchQuery) return;

            this.loading = true;
            fetch(`${API_URL}/autocomplete?searchQuery=${this.searchQuery}`)
            .then(handleResponse)
            .then(result => {
                this.loading = false;
                this.searchResults = result;
            })
        }
    }
}
</script>

<style>
.Search {
  position: relative;
  width: 30%;
  height: 35px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 700px) {
  .Search {
    width: 100%;
  }
}

.Search-icon {
  z-index: 1;
  position: absolute;
  top: 9px;
  left: 28px;
  background-image: url('./search.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 18px;
  height: 18px;
}

.Search-input {
  box-sizing: border-box;
  background-color: #1f364d;
  border-radius: 4px;
  border: 0;
  padding-left: 35px;
  color: white;
  opacity: .8;
  transition: opacity .2s;
  width: 100%;
  height: 35px;
}

.Search-input:focus {
  outline: none;
  opacity: 1;
}

.Search ::placeholder {
  color: #9cb3c9;
  opacity: 1;
}

.Search-loading {
  position: absolute;
  top: 9px;
  right: 28px;
}

.Search-result-container {
  position: relative;
  width: 100%;
  max-height: 299px;
  overflow-y: auto;
  background-color: #0f273d;
  border: 1px solid #0c2033;
  border-radius: 4px;
  box-shadow: 0px 0px 40px 0px#1f364d;
  margin-top: 10px;
}

.Search-result {
  color: #9cb3c9;
  padding: 15px 0 15px 35px;
  border-bottom: 2px solid #0c2033;
  cursor: pointer;
}

.Search-result:hover {
  color: #fff;
}

.Search-no-result {
  color: #9cb3c9;
  padding: 15px 0 15px 35px;
  border-bottom: 1px solid #0f273d;
}
</style>