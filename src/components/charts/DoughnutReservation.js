import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

function DaughnutReservation() {
    return ( 
        <CChart
            style={{
                height:"10rem",
                width:"10rem",
                margin:'auto'
            }}
            type="doughnut"
            data={{
                labels: ['VueJs'],
                datasets: [
                {
                    backgroundColor: ['#48BEF0'],
                    data: [880],
                },
                ],
            }}
            options={{
                plugins: {
                legend: {
                    display:false,
                    labels: {
                    color: getStyle('--cui-body-color'),
                    }
                }
                },
            }}
        />
     );
}

export default DaughnutReservation;