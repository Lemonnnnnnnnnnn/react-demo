const list = [
    { id: 1, done: true },
    { id: 2, done: false },
]

const initList = [].concat(list) 

console.log(initList === list); // false，虽然并没有改变

list[1].done = true

console.log(initList === list); // false

