import React from 'react';

export default ({ tip }) => (
    <div style={{
        border: "2px #ddd solid", 
        background: '#afa',
        position: "fixed",
        bottom: 10,
        width: 550,
        padding: 10,
        fontSize: 24,
        lineHeight: 1.5
    }}>
        {tip}
    </div>
)