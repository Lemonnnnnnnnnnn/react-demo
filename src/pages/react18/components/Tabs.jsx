import React from 'react'

const tabs = [
    'photos',
    'comments'
]

export default ({onTabSelect}) => (
    <div style={{ display: 'flex' }}>
        {
            tabs.map(item => <button key={item} onClick={() => onTabSelect(item)}>{item}</button>)
        }
    </div>
)