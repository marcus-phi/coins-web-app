import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse, renderChangePercent, displayLocaleNumber, usePrevious } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';

const Detail = () => {
    const [state, setState] = useState({
        currency: {},
        loading: false,
        error: null,
    });
    const { loading, error, currency } = state;
    const params = useParams();
    const currencyId = params.id;
    const prevCurrencyId = usePrevious(currencyId);

    const fetchCurrency = (currencyId) => {
        setState({ loading: true, error: null });

        fetch(`${API_URL}/coins/${currencyId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then(handleResponse)
        .then(currency => {
            setState({
                loading: false,
                currency,
            })
        })
        .catch(error => {
            setState({
                loading: false,
                error: error.errorMessage,
            })
        });
    }

    useEffect(() => {
        if(prevCurrencyId !== currencyId)
            fetchCurrency(currencyId);
    }, [prevCurrencyId, currencyId]);


    if (loading) {
        return <div className="loading-container"><Loading/></div>
    }

    if (error) {
        return <div className="error">{error}</div>
    }

    if (currency.name === undefined) {
        return <div></div>
    }

    return (
        <div className="Detail">
            <h1 className="Detail-heading">
                {currency.name} ({currency.symbol})
            </h1>

            <div className="Detail-container">
                <div className="Detail-item">
                    Price <span className="Detail-value">$ {displayLocaleNumber(currency.market_data.current_price.usd)}</span>
                </div>
                <div className="Detail-item">
                    Rank <span className="Detail-value">{currency.market_data.market_cap_rank}</span>
                </div>
                <div className="Detail-item">
                    24H Change <span className="Detail-value">{renderChangePercent(currency.market_data.price_change_percentage_24h)}</span>
                </div>
                <div className="Detail-item">
                    <span className="Detail-title">Market cap</span>
                    <span className="Detail-dollar">$</span>
                    {displayLocaleNumber(currency.market_data.market_cap.usd)}
                </div>
                <div className="Detail-item">
                    <span className="Detail-title">Volume</span>
                    <span className="Detail-dollar">$</span>
                    {displayLocaleNumber(currency.market_data.total_volume.usd)}
                </div>
                <div className="Detail-item">
                    <span className="Detail-title">Total supply</span>
                    {displayLocaleNumber(currency.market_data.total_supply)}
                </div>
            </div>
        </div>
    );

}

export default Detail;