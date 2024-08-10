

import CIcon from '@coreui/icons-react';
import 'src/assets/css/CardAccueil.css'

function CardAccueil({icon,valeur,label}) {
    return ( 
        <div className='card-accueil px-4 py-4 rounded myhot_zindex_2'>
            <div className='card-accueil-icons'>
                <CIcon icon={icon} customClassName="nav-icon" size="xl" style={{'--ci-primary-color': 'white'}} />
            </div>
            <div className='card-accueil-texts'>
                <h3 className='fw-bolder h3'> {valeur} </h3>
                <p className='fw-bold' > {label} </p>
            </div>
        </div>
     );
}

export default CardAccueil;