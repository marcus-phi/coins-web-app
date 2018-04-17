<template>
    <div>
        <div v-if="loading" class="loading-container"><Loading/></div>
        <div v-else-if="error" class="error">{{error}}</div>

        <div v-else>
            <Table :currencies="currencies"/>

            <Pagination
                :page="page"
                :totalPages="totalPages"
                :handlePaginationClick="handlePaginationClick"
            />
        </div>
    </div>
    
</template>

<script>
import Loading from '../common/Loading.vue';
import Table from './Table.vue';
import Pagination from './Pagination.vue';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';

export default {
    components: {
        Loading,
        Table,
        Pagination,
    },
    data: function() {
        return {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        }
    },

    methods: {
        fetchCurrencies: function() {
            this.loading = true;
            this.error = null;

            fetch(`${API_URL}/cryptocurrencies?page=${this.page}&perPage=20`)
            .then(handleResponse)
            .then(data => {
                this.loading = false;
                this.currencies = data.currencies;
                this.totalPages = data.totalPages;
            })
            .catch(error => {
                this.loading = false;
                this.error = error.errorMessage;
            });
        },
        handlePaginationClick: function(page) {
            this.page = page;
        }
    },

    watch: {
        page: function() {
            this.fetchCurrencies();
        }
    },

    mounted: function() {
        this.fetchCurrencies();
    }
}
</script>