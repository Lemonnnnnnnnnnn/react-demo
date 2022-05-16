
const list = [
    { id: 1, done: true },
    { id: 2, done: false },
]

// const newList = produce(list, (draft) => { })

// const newList2 = produce(list, (draft) => {
//     draft[1].done = true
// })



function produce(baseState, fn) {
    // let scope = 
    const proxy = createProxy(baseState)
    const result = fn(proxy)

    return result
}

// 初始化scope
// set 修改 scope
function createProxy(base) {
    const proxy = new Proxy(base,{
        get(){

        },
        set(){

        }
    })
    return proxy
}

function processResult(result, scope) {

}