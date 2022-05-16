import React, { useState } from 'react';
import produce from 'immer'

const App = () => {
    const [list, setList] = useState([{
        id: 1,
        done: false
    }])
    console.log(111);

    const onComplete = (id) => {
        const newList = list
        // newList.find(item => item.id === id).done = true
        setList(newList)
    }

    return (
        <div>
            {
                list.map(item => <div>
                    完成状态：{String(item.done)}
                    <button onClick={() => onComplete(item.id)}>complete</button>
                </div>)
            }
        </div>);
}

export default App;