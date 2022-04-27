import React, { useTransition, useState } from 'react'
import Glimmer from '../components/Glimmer';

function Transition() {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);

    function handleClick() {
        startTransition(() => { // 
            setCount(c => c + 1);
        })
    }
    return (
        <div>
            {isPending && <Glimmer />}
            <button onClick={handleClick}>{count}</button>
        </div>
    );
}

export default Transition;