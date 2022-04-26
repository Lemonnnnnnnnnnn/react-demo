import React, { useReducer } from 'react';

const UserReducer = () => {
  const colorList = ['black', 'pink', 'blue'];
  const animalList = ['cat', 'dog', 'mouse'];

  //#region initalState
  const initalState = {
    color: 'black',
    animal: 'cat',
  };
  //#endregion initalState

  //#region reducer
  const types = {
    COLOR: 'COLOR',
    ANIMAL: 'ANIMAL',
  };

  // 通过信号修改状态
  const reducer = (state, action) => {
    // state是当前reducer的状态，action是发出的信号
    switch (action.type) {
      case types.COLOR:
        return { ...state, color: action.value };
      case types.ANIMAL:
        return { ...state, animal: action.value };
    }
  };
  //#endregion reducer

  //#region useReducer
  const [state, dispatch] = useReducer(reducer, initalState);
  //#endregion useReducer

  //#region dispatch
  return (
    <div>
      <div>Choose a color and a pet</div>
      <select
        value={state.color}
        onChange={(e) => dispatch({ type: types.COLOR, value: e.target.value })}
      >
        {colorList.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <select
        value={state.animal}
        onChange={(e) =>
          dispatch({ type: types.ANIMAL, value: e.target.value })
        }
      >
        {animalList.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <div>
        You chose a {state.color} {state.animal}
      </div>
    </div>
  );
  //#endregion dispatch
};

export default UserReducer;
