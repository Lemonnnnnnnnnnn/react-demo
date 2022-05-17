const { produce } = require('immer')

const list = [
    { id: 1, done: true },
    { id: 2, done: false },
]

const newList = produce(list, (draft) => {
    const res = []
    draft = res
})

console.log(newList); // [{id : 1 , done :true} ,{id : 2 , done :false}]


