<template>
    <div>
        <div v-if="loading" class="loading-container"><Loading/></div>
        <div v-else-if="error" class="error">{{error}}</div>
        <Table v-else :currencies="currencies"/>
    </div>
    
</template>

<script>
import Loading from '../common/Loading.vue';
import Table from './Table.vue';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';

export default {
    components: {
        Loading,
        Table,
    },
    data: function() {
        return {
            loading: false,
            currencies: [],
            error: null,
        }
    },

    mounted: function() {
        this.loading = true;

        fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
        .then(handleResponse)
        .then(data => {
            this.loading = false;
            this.currencies = data.currencies;
        })
        .catch(error => {
            this.loading = false;
            this.error = error.errorMessage;
        });
    }
}
</script>