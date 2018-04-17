<template>
    <div>
        <div v-if="loading" class="loading-container"><Loading/></div>
        <div v-else-if="error" class="error">{{error}}</div>
        <div v-else class="Detail">
            <h1 class="Detail-heading">{{currency.name}} ({{currency.symbol}})</h1>

            <div class="Detail-container">
                <div class="Detail-item">
                    Price <span class="Detail-value">$ {{currency.price}}</span>
                </div>
                <div class="Detail-item">
                    Rank <span class="Detail-value">{{currency.rank}}</span>
                </div>
                <div class="Detail-item">
                    24H Change <span class="Detail-value"><PercentChange :percent="currency.percentChange24h"/></span>
                </div>
                <div class="Detail-item">
                    <span class="Detail-title">Market cap</span>
                    <span class="Detail-dollar">$</span>{{currency.marketCap}}
                </div>
                <div class="Detail-item">
                    <span class="Detail-title">24H Volume</span>
                    <span class="Detail-dollar">$</span>{{currency.volume24h}}
                </div>
                <div class="Detail-item">
                    <span class="Detail-title">Total supply</span>{{currency.totalSupply}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '../common/Loading.vue';
import PercentChange from '../common/PercentChange.vue';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';

export default {
    components: {
        Loading,
        PercentChange,
    },
    data: function() {
        return {
            currency: {},
            loading: false,
            error: null,
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    methods: {
        fetchCurrency: function(currencyId) {
            this.loading = true;
            this.error = null;

            fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then(currency => {
                this.loading = false;
                this.currency = currency;
            })
            .catch(error => {
                this.loading = false,
                this.error = error.errorMessage;
            })
        }
    },
    watch: {
        id: function() {
            this.fetchCurrency(this.id);
        }
    },
    mounted: function() {
        this.fetchCurrency(this.id);
    }
}
</script>

<style>
.Detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 0 60px;
}

.Detail-heading {
  font-size: 24px;
  font-weight: 300;
}

.Detail-container {
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
  padding: 40px 40px 0;
  border-radius: 4px;
  box-shadow: 0px 0px 40px 0px#1F4D1F;
}

.Detail-item {
  margin-bottom: 50px;
}

.Detail-value {
  border-radius: 20px;
  background-color: #1F4D1F;
  font-size: 14px;
  padding: 8px 12px;
  margin-left: 10px;
}

.Detail-title {
  display: block;
  color: #9CC99C;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
}

.Detail-dollar {
  color: #9CC99C;
  margin-right: 6px;
}
</style>