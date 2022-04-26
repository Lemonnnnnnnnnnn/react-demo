import React, { useReducer } from 'react';
import useSWRImmutable from 'swr/immutable'

const fetcher = async (url, init = {}) => {
  console.log('执行fetcher')
  return fetch(url, init).then(res => res.json())
}

//#region page
const Oauth = () => {
  const [ignored, forceUpdate] = useReducer(num => num + 1, 0);

  function getToken() {
    // 手动获取的有效token
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA1OGQ1NDI4N2EzYjU2OWRkOWY5YmE5YzZiYzZlNWYxMzI4ZmFlZThhOWZiNjJkYTQ0OTI0ZjIxYTMzYWIyYWM2YjVkNjk3OWViNzIzYTY1In0.eyJhdWQiOiI4MTQ3IiwianRpIjoiMDU4ZDU0Mjg3YTNiNTY5ZGQ5ZjliYTljNmJjNmU1ZjEzMjhmYWVlOGE5ZmI2MmRhNDQ5MjRmMjFhMzNhYjJhYzZiNWQ2OTc5ZWI3MjNhNjUiLCJpYXQiOjE2NTA5NDE4OTUsIm5iZiI6MTY1MDk0MTg5NSwiZXhwIjoxNjgyNDc3ODk1LCJzdWIiOiI1ODM5NjkzIiwic2NvcGVzIjpbXX0.D9G8OIKKm9NV-RS4_ZwWbt_RLekBuQ8_H3CoXxdO6pMVrpr2jc6pdtHJhNjLvjAlpppdVOwodhCNYbQVudeiwODf1-754wjk7-dEwgqIqRN4i2G8ikrLIJPpfI8ypGVKgAuuu8h66xJO16R5x2raK9azNfHjuVLfmDEJV_bY14VdEpiPymnd9JGcMiwPEuZXbhp-fhm_HqtvF6b25q0E4ZBp8zGDDJfM67FfvwQD-WYKYZRENQfXQIAvQHFwyrq7ZPEuIgBchMiIxHdOJ9_19bvfjyuJYY2mP1HivXk56nC19iDVN2aojUMw9o0gvaucdzXD5qI7khmAinue0yB9zTpqqe2q6VhrOGtba-mymZSQh5McZ5UQmqEVwBpL8MyNQNffjD72nm4F4EtRgIjyJC5i3k8NdRubvHO7GP9Z5vE2q5bKDKIRe-nIw9GVl_AoyX9krPLtDcrPvSws3VvZjNLna3Mob1YP0TRNI7DAfkE34qPdzZq5Aa5A0CyCILB1KPalDB89-ehWB99thJecyVujykggPXDylsyBuFzmSTvTHIC9xPthUlqwrpq6tOkvVqUusAfBjKhbkV_na2zqiddKH47aukgSrtgEBgD_JqahB-uKCCtshZYDeRzlL6n3E9YHC_FwTTy5yO5XwQHg9eESDShp4CzHpx7S6-4cp04'
    localStorage.setItem('accessToken', accessToken)// 本地存储
    forceUpdate(); // 强制刷新
  }

  return (
    <div>
      <button onClick={getToken}>模拟获取token</button>
      <Data />
    </div>
  );
};
//#endregion page


const getOauth = () => (
  <a href="https://anilist.co/api/v2/oauth/authorize?client_id=8147&response_type=token">
    Login with AniList
  </a>
)

//#region data
const Data = () => {
  // GraphQL 搜索语言
  var query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
      Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        id
        title {
          romaji
          english
          native
        }
      }
    }
    `;

  // 用于query中的id参数
  var variables = {
    id: 15125,
  };

  // 请求头
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('accessToken')
  }


  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
      headers,
    };

  // 发出请求，获取数据
  const { data } = useSWRImmutable([url, options], fetcher)   
  // const { data } = useSWRImmutable(url, () => fetcher(url, options))

  if (!data) return <div>loading...</div>
  if (data.errors) return <div>{data.errors[0].message}</div>
  return <div>{data.data.Media.title.english}</div>
}

//#endregion data

export default Oauth;
