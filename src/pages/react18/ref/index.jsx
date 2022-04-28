import React,{useRef , createRef} from 'react';

function App (){
    const inputRef = useRef(null)
    const buttonRef = createRef(null)

    setTimeout(()=>{ // 直接打印的话还没有给element 挂载上ref对象
        console.log(inputRef);
        console.log(buttonRef);
    },200)

    function handleBtnClick (){
        inputRef.current.focus()
    }


    return (
        <>
        <input type="text" ref={inputRef} />
        <button ref={buttonRef}>button</button>
        
        <button onClick={handleBtnClick}>focus input</button>
        </>
    )
}


export default App