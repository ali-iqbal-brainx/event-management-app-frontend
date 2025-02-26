import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner">
            <div className="lds-dual-ring" />
        </div>
    );
}

export default Spinner;