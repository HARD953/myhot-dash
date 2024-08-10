import { Avatar } from "primereact/avatar";
import "src/assets/css/commentaireClientChambre.css";
import { RatingComponentOnlyStars } from "./RatingComponent";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { getEvaluationByChambreIdAndStatus, getEvaluationByChambreIdAndStatusSum } from "src/api/evaluations/evaluations";
import { formatDateString } from "src/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Message } from "primereact/message";
import DetailsEvalutionsDialog from "../dialogs/detailsEvalutionsDialog";
import DetailsEvaluationsNotes from "./detailsEvaluationsNotes";

export function CommentaireClientChambre({ evaluation, showMore = true }) {
  const [visibleDetailsDialog, setVisibleDetailsDialog] = useState(false);
  return (
    <section className="commentaire_client_chambre">
      <div className="d-flex justify-content-start algin-items-center gap-2">
        <Avatar
          icon="pi pi-user"
          size="large"
          style={{
            backgroundColor: "var(--main-color-dash_2)",
            color: "#ffffff",
          }}
          shape="circle"
        />
        <div className="">
          <h6 className="fw-bold my-0 text-capitalize">
            {evaluation?.client?.nom} {evaluation?.client?.prenom}
          </h6>
          <RatingComponentOnlyStars rateData={evaluation} />
        </div>
      </div>
      <div className="mt-2">
        <p className="fs-6">{evaluation?.commentaire}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center me-1 fst-italic">
        <p className="fs-6 m-0">
          fait le {formatDateString(evaluation?.createdAt)}
        </p>
        {showMore && (
          <Button
            label="Voir details"
            className="p-button-text p-button-primary p-0 "
            onClick={() => setVisibleDetailsDialog(true)}
          />
        )}
      </div>

      <DetailsEvalutionsDialog
        visible={visibleDetailsDialog}
        setVisible={setVisibleDetailsDialog}
        evaluationData={evaluation}
        modify={false}
      />
    </section>
  );
}

export default function CommentaireClientChambreMain({ chambreId, approuve }) {
  const {
    data: dataChambreEvaluations,
    isLoading: isLoadingChambreEvaluations,
  } = useQuery({
    queryKey: ["chambre-details-evaluations", chambreId],
    queryFn: async () =>
      await getEvaluationByChambreIdAndStatus(chambreId, approuve),
  });

  const {
    data: dataChambreDetailsEvaluationsNotesSum,
    isLoading: isLoadingChambreDetailsEvaluationsNotesSum,
  } = useQuery({
    queryKey: ["chambre-details-evaluations-sum", chambreId],
    queryFn: async () =>
      await getEvaluationByChambreIdAndStatusSum(chambreId, approuve),
  });

  console.log(
    "dataChambreDetailsEvaluationsNotesSum ::",
    dataChambreDetailsEvaluationsNotesSum
  );

  return (
    <div className="">
      <div className="mt-5">
      <DetailsEvaluationsNotes evaluation={dataChambreDetailsEvaluationsNotesSum}/>
      </div>
      <div className="my-5 d-flex flex-wrap">
        {!!dataChambreEvaluations?.results?.length ? (
          dataChambreEvaluations?.results?.map((evaluation, index) => {
            return (
              <CommentaireClientChambre key={index} evaluation={evaluation} />
            );
          })
        ) : (
          <div className="mx-auto my-5">
            <Message text="Aucune donnée" />
          </div>
        )}
      </div>
    </div>
  );
}
