import { useState } from "react";

let mounted = false

const App = () => {
    function _setName() {
        if (!mounted) {
            const [name, setName] = useState('liming')
            mounted = true
            return setName // 抛出setName方法让按钮可以调用
        }
        return () => { }
    }

    const setName = _setName()

    const [age, setAge] = useState(18) 
    console.log(age);

    return (
        <div>
            <button onClick={() => setName('zhangsan')}>change name</button>
        </div>);
}

export default App;