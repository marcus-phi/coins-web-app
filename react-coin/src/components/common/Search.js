import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [currencies, setCurrencies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const searchResults = !searchQuery ? [] : currencies.filter(c => c.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

    const handleRedirect = (currencyId) => {
        setSearchQuery('');
        navigate(`/currency/${currencyId}`);
    }

    const renderSearchResults = () => {
        if (!searchQuery) {
            return '';
        }

        if (searchResults.length > 0) {
            return (
                <div className="Search-result-container">
                {searchResults.map(result => (
                    <div
                        key={result.id}
                        className="Search-result"
                        onClick={() => handleRedirect(result.id)}
                    >
                        {result.name} ({result.symbol})
                    </div>
                ))}
                </div>
            );
        }
        
        return (
            <div className="Search-result-container">
                <div className="Search-no-result">
                    No results found.
                </div>
            </div>
        );
    }

    useEffect(() => {
        fetch(`${API_URL}/coins/list?include_platform=false`)
            .then(handleResponse)
            .then(currencies => {
                setCurrencies(currencies);
            });
    }, []);

    return (
        <div className="Search">
            <span className="Search-icon"/>

            <input
                className="Search-input"
                type="text"
                placeholder="Currency name"
                onChange={(evt) => setSearchQuery(evt.target.value)}
                value={searchQuery}
            />

            {renderSearchResults()}
        </div>
    );
}

export default Search;