import { Divider } from "primereact/divider";
import React from "react";

import "src/assets/css/cardIconTitleText.css";
import { formatMontant } from "src/utils/utils";

export default function CardIconTitleText({ number, title, subTitle }) {
  return (
    <div className="card_icon_title_text">
      <div className="card_icon_title_text__numbre_container text-center">
        <p className="fw-bolder m-0 fs-5">{formatMontant(12923 || 0)}</p>
      </div>
      <div className="text-start ">
        <p className="fs-5 fw-bold my-0">Total réservations {title}</p>
        {/* <div className="px-3">
          <p className="fs-6 text-dark"> {subTitle} </p>
        </div> */}
      </div>
    </div>
  );
}
