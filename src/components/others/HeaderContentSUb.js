
// import bg_img from "src/assets/images/svg/layered-waves-haikei (1).svg"

import "src/assets/css/headerContentSub.css"
// import { Image } from "primereact/image";

function HeaderContentSub({title,subTitle}) {
    return (
        <div className='my-1 header-content-sub'>
        {/* <Image className="img-fluid" src={bg_img} alt='bg' /> */}

          <h2 className="fw-bolder h2">{title} </h2>
          <p className='mb-0' > {subTitle} </p>
        </div>
     );
}

export default HeaderContentSub;
