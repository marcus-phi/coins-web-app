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
            currencies: []
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
            this.searchResults = this.currencies.filter(c => c.name.toLowerCase().startsWith(this.searchQuery.toLowerCase()));
            this.loading = false;
        }
    },
    mounted: function() {
        fetch(`${API_URL}/coins/list?include_platform=false`)
            .then(handleResponse)
            .then(currencies => {
                this.currencies = currencies;
            });
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
  background-color: #1F4D1F;
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
  color: #9CC99C;
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
  background-color: #0F3D0F;
  border: 1px solid #0C330C;
  border-radius: 4px;
  box-shadow: 0px 0px 40px 0px#1F4D1F;
  margin-top: 10px;
}

.Search-result {
  color: #9CC99C;
  padding: 15px 0 15px 35px;
  border-bottom: 2px solid #0C330C;
  cursor: pointer;
}

.Search-result:hover {
  color: #fff;
}

.Search-no-result {
  color: #9CC99C;
  padding: 15px 0 15px 35px;
  border-bottom: 1px solid #0F3D0F;
}
</style>