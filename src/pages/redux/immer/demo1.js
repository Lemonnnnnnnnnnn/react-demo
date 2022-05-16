const list = [
    { id: 1, done: true },
    { id: 2, done: false },
]

const initList = list

list[1].done = true

console.log(initList === list); // true