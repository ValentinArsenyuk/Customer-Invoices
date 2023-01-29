import React from 'react'

const title = {
    color: "DodgerBlue",
    textAlign: "center"
};

export default function Header() {
    return (
        <header>
            <div style={title}>
                <h1>Customer Invoices</h1>
            </div>
            <div className='presentation'></div>
        </header>
    )
}