// import { createElement } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import React, { useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2022, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    //* [js] : 배열에 요소 추가, 기존 배열 요소를 새 배열 나머지 부분에 함께 넣기
    // setExpenses([expense, ...expense]);

    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  //? HTML 코드로 작성.
  // return createElement(
  //   "div",
  //   {},
  //   createElement("h2", {}, "start!"),
  //   createElement(Expenses, { items: expenses })
  // );

  //? JSX코드로 작성.
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
