import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';


const CustomComponentRef = () => {
    const btnFCRef = useRef(null)

    const handleClick = useCallback(() => {
        console.log(btnFCRef.current);
        btnFCRef.current.privateMethod()
    }, [])

    return (
        <div>
            <ButtonFC ref={(node) => btnFCRef.current = node} />
            <button onClick={handleClick}>get all ref</button>
        </div>
    );
}


const ButtonFC = forwardRef((props, ref) => {
    const privateMethod = () => {
        console.log('privateMethod')
    }

    useImperativeHandle(ref, () => ({
        privateMethod
    }))

    return (
        <div >Function Component </div>
    )
})

export default CustomComponentRef;