import React, { useCallback } from 'react';

function App() {
    const InputRef = useCallback((node) => {
        console.log(node)
        node.focus()
    }, [])

    return (
        <>
            <input type="text" ref={InputRef} />
        </>
    )
}


export default App