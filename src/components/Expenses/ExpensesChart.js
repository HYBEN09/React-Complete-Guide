import React from "react";
import Chart from "../Chart/Chart";

const ExpensesChart = (props) => {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  //? 해당 비용의 달을 가져와서 비용금액에 따라 적절한 dataPoints값을 업데이트
  for (const expenses of props.expenses) {
    //비용쓴 해당 월을 반환
    const expenseMonth = expenses.date.getMonth();

    //dataPoint의 index가 0부터 시작하기 때문에 11에서 끝난다.
    //그리고 선택된 dataPoint에 대해 값을 업데이트
    chartDataPoints[expenseMonth].value += expenses.amount;
  }

  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
