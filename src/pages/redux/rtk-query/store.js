import { configureStore } from "@reduxjs/toolkit";
import { animeApi } from "./service";

const store = configureStore({
    reducer : {
        [animeApi.reducerPath] : animeApi.reducer
    }
})

export default store