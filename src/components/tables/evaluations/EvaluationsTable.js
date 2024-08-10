import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import { useNavigate } from "react-router-dom";

import { formatDateString } from "src/utils/utils";
import { Avatar } from "primereact/avatar";
import { RatingComponentOnlyStars } from "src/components/others/RatingComponent";
import DetailsEvalutionsDialog from "src/components/dialogs/detailsEvalutionsDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import {
  evaluationChangeStatusApprouve,
  getEvaluationById,
} from "src/api/evaluations/evaluations";

const EvaluationsTable = ({
  data,
  isFetching,
  isLoading,
  evaluationDataQuery,
  isPlaceholderData,
  pagePagination,
  setPagePagination,
  activeIndex,
}) => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visibleDetailsDialog, setVisibleDetailsDialog] = useState(false);
  const [idEvaluation, setIdEvaluation] = useState(null);
  const [evaluationData, setEvaluationData] = useState({});
  const [visibleApprouve, setVisibleApprouve] = useState(false);
  const [visibleRefuse, setVisibleRefuse] = useState(false);

  const mutationChangeStatusEvaluation = useMutation({
    mutationKey: ["evaluation-approuve-refuse"],
    mutationFn: async (status) => {
      return await evaluationChangeStatusApprouve(idEvaluation, status);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["evaluations"]);
      setVisibleDetailsDialog(false);
      setIdEvaluation(null);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
    },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const handleVisibleDetailsDialog = (id) => {
    setIdEvaluation(id);
    setVisibleDetailsDialog(true);
  };

  const handleVisibleApprouve = (id) => {
    setIdEvaluation(id);
    setVisibleApprouve(true);
  };

  const handleVisibleRefuse = (id) => {
    setIdEvaluation(id);
    setVisibleRefuse(true);
  };

  const handleApprouveConfirm = () => {
    mutationChangeStatusEvaluation.mutate(true);
    setVisibleApprouve(false);
  };

  const handleRefuseConfirm = () => {
    mutationChangeStatusEvaluation.mutate(false);
    setVisibleRefuse(false);
  };
  const tableFooter = () => {
    return (
      <div className="d-flex justify-content-between align-items-center mt-5">
        <Button
          onClick={() => setPagePagination((old) => Math.max(old - 1, 0))}
          type="button"
          icon="pi pi-arrow-left"
          label="Precédent"
          className="rounded p-button-outlined p-button-secondary"
          disabled={pagePagination === 1}
          loading={isFetching}
        />

        <div className="">
          <span>
            {evaluationDataQuery?.pagination?.currentPage} sur{" "}
            {!!evaluationDataQuery?.pagination?.totalPages
              ? evaluationDataQuery?.pagination?.totalPages
              : 1}{" "}
            Pages
          </span>
        </div>

        <Button
          type="button"
          onClick={() => {
            if (
              !isPlaceholderData &&
              !!evaluationDataQuery?.pagination?.hasMore
            ) {
              setPagePagination((old) => old + 1);
            }
          }}
          disabled={
            isPlaceholderData || !!!evaluationDataQuery?.pagination?.hasMore
          }
          label="Suivant"
          className="rounded p-button-outlined p-button-secondary"
          iconPos="right"
          loading={isFetching}
          icon="pi pi-arrow-right"
        />
      </div>
    );
  };

  const actionsBody = (rowdata) => {
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        <Button
          label="Details"
          onClick={() => handleVisibleDetailsDialog(rowdata?.id)}
          className="rounded py-2 px-4  p-button-info p-button-raised p-button-outlined"
        />

        <Button
          label="Approuver"
          disabled={activeIndex == 1}
          onClick={() => handleVisibleApprouve(rowdata?.id)}
          className="rounded  p-button-success py-2 px-4"
          loading={mutationChangeStatusEvaluation?.isPending}
        />

        <Button
          label="Réjeter"
          disabled={activeIndex == 2}
          onClick={() => handleVisibleRefuse(rowdata?.id)}
          className="rounded  p-button-danger py-2 px-4"
        />
      </section>
    );
  };

  const clientBody = (rowData) => {
    const clientData = rowData?.client;
    return (
      <div className="d-flex justify-content-start gap-2 align-items-center ">
        <Avatar
          icon="pi pi-user"
          size="large"
          style={{
            backgroundColor: "var(--main-color-dash_2)",
            color: "#ffffff",
          }}
          shape="circle"
        />
        <p className="py-0 my-0 fw-bolder">
          {clientData.prenom} {clientData.nom}
        </p>
      </div>
    );
  };

  const evaluationFieldBody = (rowdata) => {
    return <RatingComponentOnlyStars rateData={rowdata} />;
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="rounded-pill"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Rechercher..."
          />
        </span>
      </div>
    );
  };

  const getEvaluationData = async (idEvaluation) => {
    if (idEvaluation) {
      const response = await getEvaluationById(idEvaluation);
      console.log("response ::", response);
      setEvaluationData(response);
    }
  };

  useEffect(() => {
    getEvaluationData(idEvaluation);
  }, [idEvaluation]);

  return (
    <>
      <DataTable
        value={data || []}
        className="rounded"
        loading={isFetching || isLoading}
        footer={tableFooter}
        header={renderHeader}
        filters={filters}
        selectionMode="single"
        stripedRows
        resizableColumns
        scrollable
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column header="N°" field="numero" />
        <Column field="chambre.titre" header="Nom Chambre" />
        <Column field="chambre.type_chambre.type" header="Type Chambre" />
        <Column body={evaluationFieldBody} header="Evaluation" />
        <Column field="commentaire" header="Commentaire" />
        <Column header="Client" body={clientBody} />
        <Column
          body={(rowdata) => formatDateString(rowdata?.createdAt)}
          header="Effectué le"
        />
        <Column header="Actions" body={actionsBody} />
      </DataTable>

      <DetailsEvalutionsDialog
        visible={visibleDetailsDialog}
        setVisible={setVisibleDetailsDialog}
        evaluationData={evaluationData}
        handleApprouveConfirm={handleVisibleApprouve}
        handleRefuseConfirm={handleVisibleRefuse}
      />

      <Dialog
        header="Confirmation"
        visible={visibleApprouve}
        style={{ width: "25vw" }}
        onHide={() => {
          if (!visibleApprouve) return;
          setVisibleApprouve(false);
        }}
        footer={
          <div className="d-flex justify-content-between">
            <Button
              onClick={() => setVisibleApprouve(false)}
              label="Non"
              className="p-button-text p-button-danger"
            />
            <Button
              onClick={() => handleApprouveConfirm()}
              label="Oui"
              className="p-button-success rounded"
            />
          </div>
        }
      >
        <p className="m-0 fs-5">
          Voulez-vous vraiment <span className="fw-boldr">Approuvé </span>
          l'évaluation de la chambre{" "}
          <span className="fw-bold"> {evaluationData?.chambre?.titre} </span>
          effectuée par le client{" "}
          <span className="fw-bold">
            {evaluationData?.client?.nom} {evaluationData?.client?.prenom}
          </span>
        </p>
      </Dialog>
      <Dialog
        header="Confirmation"
        visible={visibleRefuse}
        style={{ width: "25vw" }}
        onHide={() => {
          if (!visibleRefuse) return;
          setVisibleRefuse(false);
        }}
        footer={
          <div className="d-flex justify-content-between">
            <Button
              onClick={() => setVisibleRefuse(false)}
              label="Non"
              className="p-button-text p-button-danger"
            />
            <Button
              onClick={() => handleRefuseConfirm()}
              label="Oui"
              className="p-button-success rounded"
            />
          </div>
        }
      >
        <p className="m-0 fs-5">
          Voulez-vous vraiment <span className="fw-boldr">Réfusé </span>
          l'évaluation de la chambre{" "}
          <span className="fw-bold"> {evaluationData?.chambre?.titre} </span>
          effectuée par le client{" "}
          <span className="fw-bold">
            {evaluationData?.client?.nom} {evaluationData?.client?.prenom}
          </span>
        </p>
      </Dialog>
    </>
  );
};

export default EvaluationsTable;
