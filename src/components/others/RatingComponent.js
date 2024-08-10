import React, { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { calculateRating } from "src/utils/utils";

export const calculateRatingNumberOnly = (rateData) => {
  const ratingValue = calculateRating({
    note_proprete: rateData?.note_proprete || 1,
    note_service_clien: rateData?.note_service_clien || 1,
    note_confort: rateData?.note_confort || 1,
    note_localisation: rateData?.note_localisation || 1,
    note_valeur_argent: rateData?.note_valeur_argent || 1,
    note_securite: rateData?.note_securite || 1,
  });
  return ratingValue;
};

export function RatingComponentMain({ rateData, setRateValue, children }) {
  useEffect(() => {
    const ratingValue = calculateRatingNumberOnly(rateData);
    setRateValue(ratingValue);
  }, [rateData]);
  return (
    <div className="d-flex justify-content-center align-items-center">
      {children}
    </div>
  );
}

//Evaluation avec les etoiles uniquement
export function RatingComponentOnlyStars({ rateData }) {
  const [rateValue, setRateValue] = useState(1);

  return (
    <RatingComponentMain setRateValue={setRateValue} rateData={rateData}>
      <Rating
        value={Math.round(rateValue)}
        readOnly
        style={{
          color: " var(--main-color-dash_2)",
          display: "flex",
          gap: "3px",
        }}
        cancel={false}
        unstyled
      />
    </RatingComponentMain>
  );
}

// Evaluations etoiles et valeur
export function RatingComponentStarAndValue({ rateData }) {
  const [rateValue, setRateValue] = useState(1);

  return (
    <RatingComponentMain setRateValue={setRateValue} rateData={rateData}>
      <div className="d-flex justify-content-start gap-2">
        <RatingComponentOnlyStars rateData={rateData} />
        <p className="my-0 fs-6 ">{rateValue}</p>
      </div>
    </RatingComponentMain>
  );
}

// Evaluations etoiles et valeur
export function RatingComponentStarAndValueWithAvis({ rateData }) {

  return (
    <div className="d-flex align-items-center">
      <RatingComponentStarAndValue rateData={rateData} />
      <p className="my-0 ms-2"> | 1 avis</p>
    </div>
  );
}
