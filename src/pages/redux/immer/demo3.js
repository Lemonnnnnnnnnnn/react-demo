const { produce } = require('immer')

const list = [
    { id: 1, done: true },
    { id: 2, done: false },
]

const newList = produce(list, (draft) => {})

const newList2 = produce(list, (draft) => {
    draft[1].done = true
})

console.log(newList == list); // true
console.log(newList2 == list); // false