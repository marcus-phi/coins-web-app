import React, { useState, useEffect } from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config'
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

const List = () => {
    const [state, setState] = useState({
        loading: false,
        currencies: [],
        error: null,
        totalPages: 0,
    });
    const [page, setPage] = useState(1);
    const { loading, currencies, error, totalPages } = state;

    useEffect(() => fetchCurrencies(),  [page]);

    const fetchCurrencies = () => {
        setState({ loading: true, error: null });

        fetch(`${API_URL}/coins/list?include_platform=false`)
        .then(handleResponse)
        .then((data) => {
            let totalPages = Math.ceil(data.length / 20);

            return fetch(
                `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&page=${page}&per_page=20&sparkline=false&price_change_percentage=24h`
            )
                .then(handleResponse)
                .then((currencies) => {
                    setState({
                        currencies,
                        totalPages,
                        loading: false
                    });
                });
        })
        .catch(error => {
            setState({
                error: error.errorMessage,
                loading: false
            });
        });
    }

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
                handlePaginationClick={(page) => setPage(page)}/>
        </div>
        
    );
}

export default List;