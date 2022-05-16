import { configureStore } from '@reduxjs/toolkit'
import {  nanoid } from '@reduxjs/toolkit'
import listReducer from './reducer'

const preloadedState = {
    listReducer : [
        {
            id : nanoid(),
            title : 'local title',
            content : 'local content'
        }
    ]
}

const store = configureStore({
    reducer: {
        listReducer
    },
    preloadedState
})

const unsubscribe = store.subscribe((listener)=>{
    console.log(store.getState())
})

export default store
