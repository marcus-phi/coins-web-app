import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
    const { page, totalPages, handlePaginationClick } = props;

    return (
        <div className="Pagination">
            <button
                className="Pagination-button"
                onClick={() => handlePaginationClick(1)}
                disabled={page <= 1}>
                ⇤
            </button>

            <button
                className="Pagination-button"
                onClick={() => handlePaginationClick(page-1)}
                disabled={page <= 1}>
                &larr;
            </button>

            <span className="Pagination-info">
                page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <button
                className="Pagination-button"
                onClick={() => handlePaginationClick(page+1)}
                disabled={page >= totalPages}>
                &rarr;
            </button>

            <button
                className="Pagination-button"
                onClick={() => handlePaginationClick(totalPages)}
                disabled={page >= totalPages}>
                ⇥
            </button>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired,
}

export default Pagination;

