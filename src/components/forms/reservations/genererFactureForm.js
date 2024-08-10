import React, { useEffect, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { formatDateString, formatMontant } from "src/utils/utils";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";



export default function GenererFactureForm({ setFormData, formData, reservation }) {

  const [resteAPayer, setResteAPayer] = useState(reservation?.montantRestant);

  const handleFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const reste =
      parseInt(reservation?.montantRestant) - parseInt(formData?.montantRegler||0);
    setResteAPayer(reste);
    console.log("montenant ", formData);
  }, [formData?.montantRegler]);


  return (
    <>
      <div className="border-top border-primary ">
        <h5 className="fw-bolder h5">Details reservations</h5>
        <div className="d-flex justify-content-between align-items-center">
          <Chip
            label={`Début : ${formatDateString(formData?.dateDebut)}`}
            icon="pi pi-calendar"
          />
          <Chip
            label={`Fin : ${formatDateString(formData?.dateFin)}`}
            icon="pi pi-calendar"
          />
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <div className="d-flex justify-cntent-start align-items-center gap-3">
            <Avatar
              icon="pi pi-home"
              // size="large"
              style={{
                backgroundColor: "var(--main-color-dash_2)",
                color: "#ffffff",
              }}
              shape="circle"
            />
            <div className="">
              <p className="py-0 my-0 fst-italic fs-6">Chambre</p>
              <p className="py-0 my-0 fw-bolder fs-5">
                {" "}
                {reservation?.Chambre?.titre}{" "}
              </p>
            </div>
          </div>
          <div className="d-flex justify-cntent-start align-items-center gap-3">
            <Avatar
              icon="pi pi-user"
              // size="large"
              style={{
                backgroundColor: " var(--main-color-dash_2)",
                color: "#ffffff",
              }}
              shape="circle"
            />
            <div className="">
              <p className="py-0 my-0 fst-italic fs-6">Client</p>
              <p className="py-0 my-0 fw-bolder fs-5">
                {reservation?.Client?.prenom} {reservation?.Client?.nom}
              </p>
            </div>
          </div>
        </div>

        <div className=""></div>
      </div>
      <form className="row my-3">
        <div className="col mt-4 mx-auto">
          <FloatLabel>
            <InputText
              keyfilter="int"
              className="w-100 rounded-pill"
              value={formData?.montantRegler}
              onChange={(e) => handleFormData(e.target.value, "montantRegler")}
              placeholder="0"
            />

            <label for="montantRegler">Montant à facturer</label>
          </FloatLabel>
        </div>
        <div className="d-flex justify-cntent-start align-items-center gap-2 mt-3 text-danger fw-bolder">
          <p> Reste : </p>
          <p> {formatMontant(resteAPayer)} F FCA </p>
        </div>
      </form>
    </>
  );
}
