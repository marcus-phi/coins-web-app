<template>
    <div>
        <div v-if="loading" class="loading-container"><Loading/></div>
        <div v-else-if="error" class="error">{{error}}</div>
        <div v-else class="Detail">
            <h1 class="Detail-heading">{{currency.name}} ({{currency.symbol}})</h1>

            <div class="Detail-container">
                <div class="Detail-item">
                    Price <span class="Detail-value">$ {{displayNumber(currency.market_data.current_price.usd)}}</span>
                </div>
                <div class="Detail-item">
                    Rank <span class="Detail-value">{{currency.market_data.market_cap_rank}}</span>
                </div>
                <div class="Detail-item">
                    24H Change <span class="Detail-value"><PercentChange :percent="currency.market_data.price_change_percentage_24h"/></span>
                </div>
                <div class="Detail-item">
                    <span class="Detail-title">Market cap</span>
                    <span class="Detail-dollar">$</span>{{displayNumber(currency.market_data.market_cap.usd) }}
                </div>
                <div class="Detail-item">
                    <span class="Detail-title">Volume</span>
                    <span class="Detail-dollar">$</span>{{displayNumber(currency.market_data.total_volume.usd)}}
                </div>
                <div class="Detail-item">
                    <span class="Detail-title">Total supply</span>{{displayNumber(currency.market_data.total_supply)}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '../common/Loading.vue';
import PercentChange from '../common/PercentChange.vue';
import { API_URL } from '../../config';
import { handleResponse, displayLocaleNumber } from '../../helpers';

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

            fetch(`${API_URL}/coins/${currencyId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
            .then(handleResponse)
            .then(currency => {
                this.loading = false;
                this.currency = currency;
            })
            .catch(error => {
                this.loading = false,
                this.error = error.errorMessage;
            })
        },
        displayNumber: function(value) {
            return displayLocaleNumber(value);
        }
    },
    watch: {
        id: function() {
            this.fetchCurrency(this.id);
        }
    },
    beforeMount: function() {
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