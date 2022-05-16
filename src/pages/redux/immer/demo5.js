const obj = {
    foo : 'foo'
}

const proxy = new Proxy(obj,{})

proxy.foo = 'bar'
console.log(proxy);

console.log(obj === proxy);