<template>
    <div class="Table-container">
        <table class="Table">
            <thead class="Table-head">
                <tr>
                    <th>Cryptocurrency</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>24H Change</th>
                </tr>
            </thead>
            <tbody class="Table-body">
                <tr v-for="currency in currencies"
                    :key="currency.id"
                    @click="goToCurrency(currency.id)"
                >
                    <td>
                        <span class="Table-rank">{{currency.rank}}</span>{{currency.name}}
                    </td>
                    <td>
                        <span class="Table-dollar">$</span>{{currency.price}}
                    </td>
                    <td>
                        <span class="Table-dollar">$</span>{{currency.marketCap}}
                    </td>
                    <td>
                        <PercentChange :percent="currency.percentChange24h"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import PercentChange from '../common/PercentChange.vue';

export default {
    components: {
        PercentChange,
    },
    props: {
        currencies: {
            type: Array,
            required: true,
        }
    },
    methods: {
        goToCurrency: function(currencyId) {
            this.$router.push(`currency/${currencyId}`);
        }
    }
}
</script>

<style>
.Table-container {
  overflow-x: auto; /* Needed for table to be responsive */
}

.Table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.Table-head {
  background-color: #0c2033;
}

.Table-head tr th {
  padding: 10px 20px;
  color: #9cb3c9;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
}

.Table-body {
  text-align: left;
  background-color: #0f273d;
}

.Table-body tr td {
  padding: 24px 20px;
  border-bottom: 2px solid #0c2033;
  color: #fff;
  cursor: pointer;
}

.Table-rank {
  color: #9cb3c9;
  margin-right: 18px;
  font-size: 12px;
}

.Table-dollar {
  color: #9cb3c9;
  margin-right: 6px;
}

</style>