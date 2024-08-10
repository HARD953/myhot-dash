import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import { useEffect, useState } from "react";

export default function BarReservations({data}){
  const [chartData,setChartData] = useState(data)


  useEffect(()=>{
    setChartData(data)
  },[data])


  return (
    <CChart
      type="bar"
      data={{
        labels: chartData?.mois,
        datasets: [
          {
            label: "Réservations",
            backgroundColor: "#f87979",
            data: chartData?.valeurs,
          },
        ],
      }}
      labels="months"
      options={{
        plugins: {
          legend: {
            labels: {
              color: getStyle("--cui-body-color"),
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: getStyle("--cui-border-color-translucent"),
            },
            ticks: {
              color: getStyle("--cui-body-color"),
            },
          },
          y: {
            grid: {
              color: getStyle("--cui-border-color-translucent"),
            },
            ticks: {
              color: getStyle("--cui-body-color"),
            },
          },
        },
      }}
    />
  );
}
