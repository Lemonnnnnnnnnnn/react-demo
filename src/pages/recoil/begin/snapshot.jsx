import { RecoilRoot, useRecoilSnapshot, useGotoRecoilSnapshot, atom, useRecoilValue, useRecoilState } from "recoil";
import React, { Component } from 'react';
import { useEffect, useState } from "react";

function TimeTravelObserver() {
    const [snapshots, setSnapshots] = useState([]); // 快照库

    const snapshot = useRecoilSnapshot();

    useEffect(() => {

        if (snapshots.every(s => s.getID() !== snapshot.getID())) { // 回溯操作会产生两个相同id的快照，避免重复添加
            setSnapshots([...snapshots, snapshot]); // 将新的快照添加到快照库中
        }
    }, [snapshot]);

    // useGotoRecoilSnapshot 返回一个回调函数，回调函数结构为(snapshot)=>void
    // 回调函数会让整个state还原到提供的snapshot处
    const gotoSnapshot = useGotoRecoilSnapshot();


    return (
        <ol>
            {snapshots.map((snapshot, i) => (
                <li key={i}>
                    Snapshot {i}
                    <button onClick={() => gotoSnapshot(snapshot)}>
                        Restore
                    </button>
                </li>
            ))}
        </ol>
    );
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


function App() {
    return (
        <RecoilRoot>
            <TimeTravelObserver />
            <Text />
            <FontButton />
        </RecoilRoot>
    )
}

export default App