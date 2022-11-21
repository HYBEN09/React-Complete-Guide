import Card from "../UI/Card/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

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

  //*---------------------------------------------------------------------------------

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />

      <ExpensesChart expenses={filteredExpenses} />

      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
