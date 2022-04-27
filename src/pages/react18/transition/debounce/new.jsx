import React, { useEffect, useRef, useState } from 'react';
import Mock from 'mockjs'

const Random = Mock.Random

const DebounceDemo = () => {
    const [searchKey, setSeachKey] = useState('') // 搜索值
    const list = useRef(new Array(9000).fill(1).map((_, key) => ({ key, val: Random.word() }))) // 生成9000条随机字母组成的数据
    const [showList, setShowList] = useState([]) // 展示的列表

    useEffect(() => {
        setShowList(list.current) // 将生成的随机数据展示
    }, [])

    useEffect(() => {
        console.log('list渲染')
        update() // 如果搜索值改变，动态更新展示列表
    }, [searchKey])

    function update() {
        if (searchKey === '') return setShowList(list.current) // 如果没有搜索值，展示初始数据
        let id = 0;
        // 查找和搜索值匹配的语句，生成新数组
        const newList = list.current.reduce((total, { val: sentence }) => { // 遍历初始数据，将每一条数据和搜索值对比 
            if (sentence.indexOf(searchKey) !== -1) { // 当前语句中有搜索值的话
                const arr = sentence.split(searchKey)
                const render = (
                    <div>
                        <span>{arr[0]}</span>
                        <span style={{ color: 'pink' }}>{searchKey}</span> {/**将搜索值标为粉色 */}
                        <span>{arr[1]}</span>
                    </div>
                )
                total.push({ key: id++, val: render }) //将修改后的当前语句push进新数组中
                return total
            }
            return total // 不对新数组做修改
        }, [])
        setShowList(newList)
    }


    return (
        <div>
            <div>
                <span>请输入筛选条件：</span>
                <input onChange={(e) => setSeachKey(e.target.value)} type="text" />
                {
                    showList.map(item => <div key={item.key} >{item.val}</div>)
                }
            </div>
        </div>);
}


export default DebounceDemo;