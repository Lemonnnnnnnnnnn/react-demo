import React from 'react'

// Umi 里约定目录下有 _layout.tsx 时会生成嵌套路由，以 _layout.tsx 为该目录的 layout。layout 文件需要返回一个 React 组件，并通过 props.children 渲染子组件。
// 优先于layouts/index
export default function Layout(props) {
    return (
        <div style={{width : 500}}>
            {props.children}
        </div>)
}