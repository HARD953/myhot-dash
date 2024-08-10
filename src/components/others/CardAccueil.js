
import CIcon from '@coreui/icons-react';

import 'src/assets/css/CardAccueil.css'

function CardAccueil({label,valeur,icon}) {
    return ( 
        <div className="card-accueil rounded py-3 px-4">
            <div className='card-accueil-icons'>
                <CIcon icon={icon} customClassName="nav-icon" size="xl" style={{'--ci-primary-color': "white"}} />
            </div>
            <div className='card-accueil-texts'>
                <h3 className='h3 fw-bolder'> {valeur} </h3>
                <p> {label} </p>
            </div>
        </div>
     );
}

export default CardAccueil;