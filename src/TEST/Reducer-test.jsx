import React, { useReducer, useState } from "react";

const ReducerTest = () => {
  const [number, setNumber] = useState(1);

  //? 구체적인 처리는 countReducer함수가 독점적으로 처리
  const countReducer = (oldCount, action) => {
    if (action.type === "UP") {
      return oldCount + action.number;
    } else if (action.type === "RESET") {
      return 0;
    } else if (action.type === "DOWN") {
      return oldCount - action.number;
    }
  };

  const [count, countDispatch] = useReducer(countReducer, 0);

  //? state를 직접 사용하는 것이 아니라 주문만 (액션)값만 준다.

  function down() {
    // 어떻게 값을 바꿀까? 의뢰 -> action
    countDispatch({ type: "DOWN", number: number });
  }

  function reset() {
    countDispatch({ type: "RESET", number: number });
  }

  function up() {
    countDispatch({ type: "UP", number: number });
  }

  function changeNumber(e) {
    setNumber(Number(e.target.value));
  }

  return (
    <div>
      <input type="button" value="-" onClick={down} />
      <input type="button" value="reset" onClick={reset} />
      <input type="button" value="+" onClick={up} />
      <input type="text" value={number} onChange={changeNumber} />
      <span>{count}</span>
    </div>
  );
};

export default ReducerTest;
