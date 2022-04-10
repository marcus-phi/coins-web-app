import React from 'react';
import PropTypes from 'prop-types';
import { renderChangePercent, displayLocaleNumber } from '../../helpers';
import './Table.css';
import { useNavigate } from 'react-router-dom';

const Table = (props) => {
    const { currencies } = props;
    const navigate = useNavigate();

    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                {currencies.map(currency => (
                    <tr
                        key={currency.id}
                        onClick={() => navigate(`/currency/${currency.id}`)}>
                        <td>
                            {currency.name}
                        </td>
                        <td>
                            <span className="Table-dollar">$</span>
                            {displayLocaleNumber(currency.current_price)}
                        </td>
                        <td>
                            <span className="Table-dollar">$</span>
                            {displayLocaleNumber(currency.market_cap)}
                        </td>
                        <td>
                            {renderChangePercent(currency.price_change_percentage_24h)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    currencies: PropTypes.array.isRequired,
}

export default Table;