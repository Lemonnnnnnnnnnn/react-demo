import React, { useRef, useCallback } from 'react';

const CustomComponentRef = () => {
    const btnClassRef = useRef(null)

    const handleClick = useCallback(() => {
        console.log(btnClassRef.current);
    }, [])

    return (
        <div>
            <ButtonClass ref={(node) => btnClassRef.current = node} />
            <button onClick={handleClick}>get all ref</button>
        </div>
    );
}

class ButtonClass extends React.Component {
    render() {
        return (
            <button>Class Component</button>
        )
    }
}


export default CustomComponentRef;