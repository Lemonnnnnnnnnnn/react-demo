//#region transform
function isProxy(value) { // 判断对象是否被代理过，想要详细判断可以用Symbol.toStringTag
    return value.copy
}

function getRes(proxy) { // 将被代理的对象还原成普通对象
    if (Array.isArray(proxy)) {
        const res = proxy.reduce((total, current) => {
            if (isProxy(current)) {
                total.push(getRes(current.copy)) // 递归处理
            } else {
                total.push(current)
            }
            return total
        }, [])

        return res
    }
    return proxy
}
//#endregion transform

//#region createProxy
function shallowCopy(target) { // 浅拷贝数组和对象
    if (Array.isArray(target)) {
        return [].concat(target)
    }
    return Object.assign({}, target)
}


function prepareCopy(state) {// 生成copy对象
    state.copy = shallowCopy(state.base)
}


function createProxy(base, parent) {
    const state = {
        modifyed: false,
        copy: null,
        base,
        parent
    }

    const handler = {
        get(state, prop) { // 嵌套结构需要get进行处理
            const source = state.base  // 获取未被代理的源数据

            const value = source[prop] // 获取源数据的值
            if (source[prop]) { // 访问原有属性
                prepareCopy(state) // 生成copy对象 
                // 1.将子属性转换为代理对象，注意修改的是copy对象而不是源对象base，源对象base要用来还原的（如果没有修改）
                // 2.返回创造的子Proxy
                return state.copy[prop] = createProxy(value, state)  
            }
            return state[prop] // 访问代理属性，如modifyed

        },
        set(state, prop, value) {
            if (!state.modifyed) { 
                prepareCopy(state)
                state.copy[prop] = value // 修改复制品
                state.modifyed = true
                if (state.parent) {
                    state.parent.modifyed = true
                }
            }
        }
    }

    const proxy = new Proxy(state, handler)

    return proxy
}

//#endregion createProxy

//#region run
function produce(baseState, fn) {
    const proxy = createProxy(baseState) 
    fn(proxy) // 用代理对象执行用户传入的函数

    if (proxy.modifyed) return getRes(proxy.copy) // 代理对象需要还原
    return proxy.base
}

const sample = [
    { id: 1, done: true },
    { id: 2, done: false },
]


const res = produce(sample, (draft) => {
    draft[1].done = true 
})

const res2 = produce(sample, (draft) => {

})

console.log(res) // [ { id: 1, done: true }, { id: 2, done: true } ]
console.log(res2 === sample) // true
//#endregion run