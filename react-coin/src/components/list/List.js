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

        // API Doc: https://udilia.com/docs/cryptocurrencies/v1
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then(data => {
            const { currencies, totalPages } = data;

            this.setState({
                currencies,
                totalPages,
                loading: false
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