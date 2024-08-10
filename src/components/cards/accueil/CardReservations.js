
import { CBadge, CProgress } from '@coreui/react';
import 'src/assets/css/cardReservations.css'
import DaughnutReservation from 'src/components/charts/DoughnutReservation';


function ProgressValues({color,value,label}) {
    return (
        <div className=''>
        <div className='d-flex justify-content-start align-items-center'>
            <CBadge
                className='p-2'
                shape="rounded-circle"
                color={color}
            >  </CBadge>
            <span className='fw-bold ms-2' > {label} </span>
        </div>
        <p className='fw-bolder text-center' > {value} </p>
    </div>
     );
}

function CardReservations({ valeur, title, statistiquesData }) {
  return (
    <div className="card-reservations bg-white rounded shadow px-md-4 px-2 py-md-5 py-2">
      <div className="card-reservation-header">
        <div className="daughnutReservation">
          <DaughnutReservation />
        </div>
        <div className="text-center py-3">
          <h3 className="fw-bolder">{statistiquesData?.total_reservations}</h3>
          <p className="fw-bolder"> {title} </p>
        </div>
      </div>
      <div className="card-reservation-body">
        <CProgress
          height={20}
          value={statistiquesData?.reservations_en_attente}
          color="warning"
          className="my-3"
        />
        <CProgress
          height={20}
          color="danger"
          className="my-3"
          value={statistiquesData?.reservations_annulees}
        />
        <CProgress
          height={20}
          color="success"
          className="my-3"
          value={statistiquesData?.reservations_en_cours}
        />
        <CProgress
          height={20}
          color="info"
          className="my-3"
          value={statistiquesData?.reservations_terminees}
        />
      </div>
      <div className="card-reservations-footer d-flex justify-content-between align-items-center">
        <ProgressValues
          value={statistiquesData?.reservations_en_attente}
          label="En attentes"
          color="warning"
        />
        <ProgressValues
          value={statistiquesData?.reservations_annulees}
          label="Annulées"
          color="danger"
        />
        <ProgressValues
          value={statistiquesData?.reservations_en_cours}
          label="Validées"
          color="success"
        />
        <ProgressValues
          value={statistiquesData?.reservations_terminees}
          label="Terminées"
          color="info"
        />
      </div>
    </div>
  );
}

export default CardReservations;
