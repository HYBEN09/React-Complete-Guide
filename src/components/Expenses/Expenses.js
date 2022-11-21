import Card from "../UI/Card/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import { useState } from "react";

function Expenses(props) {
  //select 기본값 2020으로 설정
  const [filteredYear, setFilteredYear] = useState("2020");

  //*---------------------------------------------------------------------------------

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  //년도 에 맞는 아이템 찿아내기
  //? getFullYear() 메서드는 주어진 날짜의 현지 시간 기준 연도를 반환합니다.
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  //item이 없을때 content 표시
  let expensesContent = <p> No expenses Found </p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  }

  //*---------------------------------------------------------------------------------

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />

      {/* 동적으로 아이템 추가 */}

      {/*filteredExpenses.length === 0
        ? expensesEmptyContent
        : filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
        ))*/}

      {expensesContent}
    </Card>
  );
}

export default Expenses;
