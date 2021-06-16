import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config'
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true, error: null });

        const { page } = this.state;

        fetch(`${API_URL}/coins/list?include_platform=false`)
        .then(handleResponse)
        .then((data) => {
            let totalPages = Math.ceil(data.length / 20);

            return fetch(
                `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&page=${page}&per_page=20&sparkline=false&price_change_percentage=24h`
            )
                .then(handleResponse)
                .then((currencies) => {
                    this.setState({
                        currencies,
                        totalPages,
                        loading: false
                    });
                });
        })
        .catch(error => {
            this.setState({
                error: error.errorMessage,
                loading: false
            });
        });
    }

    handlePaginationClick(page) {
        this.setState({ page }, () => {
            // call fetchCurrencies function inside setState's callback
            this.fetchCurrencies();
        });
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading/></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table
                    currencies={currencies}
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}/>
            </div>
            
        );
    }
}

export default List;