import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  //dataPoint객체를 숫자로 변환 -> 숫자는 dataPoint.value에 저장
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);

  //배열의 모든 요소를 가져와서 max메서드에 독립적인 인자로 추가 (12개의 인자를 받음)
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
