import { atom, useRecoilState, RecoilRoot, useRecoilValue, useRecoilSnapshot } from "recoil";
import React, { Component } from 'react';
import { useEffect } from "react";

function DebugObserver() {
    const snapshot = useRecoilSnapshot() // 获取全局状态
    useEffect(() => {
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) { // node : atom实体
            console.log(node.key, snapshot.getLoadable(node)); 
        }
    }, [snapshot])
}

const fontSizeState = atom({
    key: "fontSizeState", // 必须是string
    default: 14,
});

function FontButton() {
    const [fontSize, setFontSize] = useRecoilState(fontSizeState); // 获取atom状态和修改方法
    return (
        <button
            onClick={() => setFontSize((size) => size + 1)}
            style={{ fontSize }}
        >
            Click to Enlarge
        </button>
    );
}

function Text() {
    const fontSize = useRecoilValue(fontSizeState); // 如果我们不用修改atom状态，可以用useRecoilValue来替代useRecoilState
    return <p style={{ fontSize }}>This text will increase in size too.</p>;
}



function MyApp() {
    return (
        <RecoilRoot>
            <DebugObserver />
            <Text />
            <FontButton />
        </RecoilRoot>
    );
}

export default MyApp