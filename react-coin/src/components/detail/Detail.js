import React from 'react';
import { API_URL } from '../../config';
import { handleResponse, renderChangePercent, displayLocaleNumber } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';

class Detail extends React.Component {

    constructor() {
        super();

        this.state = {
            currency: {},
            loading: false,
            error: null,
        };
    }

    componentDidMount() {
        const currencyId = this.props.match.params.id;
        this.fetchCurrency(currencyId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const newCurrencyId = nextProps.match.params.id;
            this.fetchCurrency(newCurrencyId);
        }
    }

    fetchCurrency(currencyId) {
        this.setState({ loading: true, error: null });

        fetch(`${API_URL}/coins/${currencyId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then(handleResponse)
        .then(currency => {
            this.setState({
                loading: false,
                currency,
            })
        })
        .catch(error => {
            this.setState({
                loading: false,
                error: error.errorMessage,
            })
        });
    }

    render() {
        const { loading, error, currency } = this.state;

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
}

export default Detail;