import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

function LineRecettes({ data ,dataReservations}) {
  const [chartData, setChartData] = useState(data);
  const [chartDataReserv, setChartDataReserv] = useState(data);

  useEffect(() => {
    setChartData(data);
    setChartDataReserv(dataReservations);
  }, [data, dataReservations]);

  return (
    <CChart
      type="line"
      data={{
        labels: [
          "janvier",
          "février",
          "mars",
          "avril",
          "mai",
          "juin",
          "juillet",
          "août",
          "septembre",
          "octobre",
          "novembre",
          "décembre",
        ],
        datasets: [
          // {
          //   label: "Réservations",
          //   backgroundColor: "#f87979",
          //   borderColor: "#f87979",
          //   pointBackgroundColor: "#c53131",
          //   pointBorderColor: "#fff",
          //   data: chartDataReserv?.valeurs,
          // },
          {
            label: "Montants",
            backgroundColor: "var(--main-color-dash_2)",
            borderColor: "var(--main-color-dash_2)",
            pointBackgroundColor: "var(--main-color-dash_2)",
            pointBorderColor: "#fff",
            data: chartData?.valeurs,
          },
        ],
      }}
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

export default LineRecettes;
