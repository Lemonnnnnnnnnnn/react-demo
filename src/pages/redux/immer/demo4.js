//#region createProxy
function createProxy(base) {
    const state = {
        modifyed: false,
        copy: null,
        base,
    }

    const handler = {
        get(state, prop) {
            return state[prop]
        },
        set(state, prop, value) {
            if (!state.modifyed) {
                state.copy = Object.assign({}, state.base)  // 浅拷贝
                state.copy[prop] = value // 修改复制品
                state.modifyed = true
            }
        }
    }

    const proxy = new Proxy(state, handler)

    return proxy
}
//#endregion createProxy

//#region produce
function produce(baseState, fn) {
    const proxy = createProxy(baseState)
    fn(proxy)

    if(proxy.modifyed) return proxy.copy
    return proxy.base
}

const sample = {
    foo: 'foo'
}

const res = produce(sample, (draft) => {
    draft.foo = 'bar' // 进入proxy.set函数
})

const res2 = produce(sample, (draft) => {
})

console.log(res); // {foo : 'bar'}
console.log(res2 === sample); // true
//#endregion produce
