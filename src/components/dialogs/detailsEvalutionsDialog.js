import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "src/assets/css/formAddNewItems.scss";
import EvaluationNoteText, {
  EvaluationNoteComponent,
} from "../others/EvaluationNoteText";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEvaluationById } from "src/api/evaluations/evaluations";
import { calculateRatingNumberOnly } from "../others/RatingComponent";
import { Link } from "react-router-dom";
import { appUrl } from "src/appUrl";
import { Divider } from "primereact/divider";
import { Chip } from "primereact/chip";
import DetailsEvaluationsNotes from "../others/detailsEvaluationsNotes";
import { CommentaireClientChambre } from "../others/commentaireClientChambre";

export default function DetailsEvalutionsDialog({
  visible,
  setVisible,
  evaluationData,
  modify = true,
  handleRefuseConfirm = () => {},
  handleApprouveConfirm = () => {},
}) {
  const headerElement = (
    <section className="d-flex  align-items-center justify-content-start gap-5">
      <div className="formulaire-creation-header">
        <i className="pi pi-file"></i>
        <span className="font-bold white-space-nowrap">Details Evaluation</span>
      </div>
      {evaluationData?.approuve !== null && (
        <div className="text-end">
          {evaluationData?.approuve && (
            <Chip
              label="Approuvée"
              style={{ color: "white", backgroundColor: "green" }}
            />
          )}
          {!evaluationData?.approuve && (
            <Chip
              label="Réjétée"
              style={{ color: "white", backgroundColor: "red" }}
            />
          )}
        </div>
      )}
    </section>
  );


  return (
    <>
      <Dialog
        visible={visible}
        modal
        className="formulaire-creation-dialog-container"
        header={headerElement}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
      >
        <section className="">
          {modify && (
            <div className="">
              <h5 className="h5 fw-bold ">Note Chamrbre</h5>

              <div className="row mt-3">
                <div className="col-6 text-center">
                  <EvaluationNoteComponent
                    note={calculateRatingNumberOnly(evaluationData)}
                  />
                  <p className="fw-bold">Note d'evaluation globale</p>
                </div>
                <div className="col-6 text-end">
                  <div className="">
                    <h6 className="h6 fw-bold">Chambre</h6>
                    <p> {evaluationData?.chambre?.titre} </p>
                  </div>
                  <div className="">
                    <h6 className="h6 fw-bold">Type de chambre</h6>
                    <p> {evaluationData?.chambre?.type_chambre?.type} </p>
                  </div>
                </div>
              </div>

              <div className="text-end">
                <Link
                  to={`${appUrl.chambre.details}/${evaluationData?.chambre_id}`}
                >
                  voir plus de détails sur la chambre ?
                </Link>
              </div>
            </div>
          )}

          <div className="mt-5">
            <h5 className="h5 fw-bold ">Détails Note d'evaluation</h5>
            <DetailsEvaluationsNotes evaluation={evaluationData} />
          </div>
          <div className="mt-5">
            <h5 className="h5 fw-bold ">Commentaire</h5>
            {/* <p className="fs-6 mx-5 mt-3"> {evaluationData?.commentaire}</p> */}
            <CommentaireClientChambre showMore={false} evaluation={evaluationData} />
          </div>

          {modify && (
            <>
              <Divider />
              <div className=" mt-5 mb-4 d-flex justify-content-between">
                <Button
                  label="Réjeter"
                  disabled={!evaluationData?.approuve}
                  onClick={() => handleRefuseConfirm(evaluationData?.id)}
                  className="rounded  p-button-danger py-2 px-4"
                />
                <Button
                  label="Approuver"
                  disabled={evaluationData?.approuve}
                  onClick={() => handleApprouveConfirm(evaluationData?.id)}
                  className="rounded  p-button-success py-2 px-4"
                />
              </div>
            </>
          )}
        </section>
      </Dialog>
    </>
  );
}
