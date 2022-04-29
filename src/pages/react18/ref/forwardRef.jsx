import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';


const CustomComponentRef = () => {
    const btnFCRef = useRef(null)

    const handleClick = useCallback(() => {
        console.log(btnFCRef.current);
    }, [])

    return (
        <div>
            <ButtonFC ref={(node) => btnFCRef.current = node} />
            <button onClick={handleClick}>get all ref</button>
        </div>
    );
}


const ButtonFC = forwardRef((props, ref) => {
    return (
        <button ref={ref}>Function Component</button>
    )
})

export default CustomComponentRef;