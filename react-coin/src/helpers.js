import React, { useEffect, useRef } from 'react';

/*
    Fetch error helper
    @param {object} response
*/

export const handleResponse = response => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}

/*
    Render change percent
    @param {number} percent
*/
export const renderChangePercent = percent => {
    if (percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
        return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
        return <span>{percent}</span>
    }
}

export const displayLocaleNumber = value => {
    return value == null ? "" : value.toLocaleString('en');
}

export const usePrevious = value => {
    const ref = useRef();
    useEffect(() => { ref.prevValue = value });
    return ref.prevValue;
}