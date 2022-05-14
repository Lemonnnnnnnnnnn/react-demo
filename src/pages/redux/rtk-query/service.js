import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.waifu.im/'
    }),
    endpoints: (builder) => ({ // endpoints自动生成hooks（action），用于View层调用
        getAnimeInfo: builder.query({ 
            query: (id) => ({
                url: '/info',
                params: { images: id }
            })
        })
    })
})

// 自动生成hooks的名称为`use(Endpoint_name)Query`
export const { useGetAnimeInfoQuery } = animeApi
