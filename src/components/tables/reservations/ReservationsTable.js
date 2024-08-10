import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //Note: this is TanStack React Query V5
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { genererFactureReservation, getCompleteReservation, getConfirmReservation, getReservations } from "../../../api/reservations/reservations";
import { FilterMatchMode } from "primereact/api";
import { Chip } from "primereact/chip";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { formatMontant } from "src/utils/utils";
import { Dialog } from "primereact/dialog";
import GenererFactureForm from "src/components/forms/reservations/genererFactureForm";
import SuccesDialog from "src/components/dialogs/succesDialog";
import ErrorDialog from "src/components/dialogs/errorDialog";
import { domaine_path } from "src/api/instanceAxios";




  const statutReservation = {
    enCours: "en_cours",
    enAttente: "en_attente",
    annulee: "annulee",
    terminee: "terminee",
  };

  const initaleGenererFactureData = {
    ReservationId: null,
    montantRegler: 0
  };



const ReservationsTable = ({
  queryListKey,
  getReservationById,
  deleteReservationConfirm,
  showUpdateDialogReservation,
  setSizeDataTable,
  data,
  isFetching,
  isLoading,
  dataFromQuery,
  isPlaceholderData,
  setPage,
  page,
}) => {
  const overlayChambreRef = useRef(null);
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [idReservation, setIdReservation] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [visibleReglerFacture, setVisibleReglerFacture] = useState(false);
  const [genererFactureData, setGenererFactureData] = useState(
    initaleGenererFactureData
  );

  const [visibleDialogSuccess, setVisibleDialogSuccess] = useState(false);
  const [visibleDialogError, setVisibleDialogError] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
    const [visibleConfirmReservation, setVisibleConfirmReservation] =
      useState(false);

  const [reservationSelectedID, setReservationSelectedID] = useState(null);
  const [reservationCompleteDialog, setReservationCompleteDialog] =
    useState(false);
;


  const mutationTemrineeReservation = useMutation({
    mutationKey: ["reservation-complete"],
    mutationFn: async () => {
      return await getCompleteReservation(reservationSelectedID);
    },
    onSuccess: async () => {
      setReservationCompleteDialog(false)
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleDialoMsg("Reservation Terminée avec succès.");
      setVisibleDialogSuccess(true);
      setVisibleReglerFacture(false);
    },
    onError: async (err) => {
      setReservationCompleteDialog(false);
      setVisibleDialogError(true);
      setVisibleReglerFacture(false);
    },
  });


  const mutationConfirmReservation = useMutation({
    mutationKey: ["reservation-confirm"],
    mutationFn: async (id) => {
      return await getConfirmReservation(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Reservation Confirmée avec succès.");
      setVisibleDialogSuccess(true);
      setVisibleReglerFacture(false);
    },
    onError: async (err) => {
      setVisibleDialogError(true);
      setVisibleReglerFacture(false);
    },
  });





  const mutationGenererFacture = useMutation({
    mutationKey: ["generer-facture"],
    mutationFn: async ({ id, newData }) => {
      return await genererFactureReservation(id, newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Nouvelle Facture générée avec succès.");
      setVisibleDialogSuccess(true);
      setVisibleReglerFacture(false);
    },
    onError: async (err) => {
      setVisibleDialogError(true);
      setVisibleReglerFacture(false);
    },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const acceptConfirmReservation = (id) => {
    mutationConfirmReservation.mutate(id);
  };

  const footerConfirm = (option, color) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <Button
          onClick={option?.reject}
          autoFocus={true}
          label="Non"
          className="p-button-info p-button-outlined rounded"
        />
        <Button
          onClick={option?.accept}
          label="Oui"
          className={`p-button-${color} rounded`}
        />
      </div>
    );
  };

  const updateStatutReservationConfirm = (id) => {
    confirmDialog({
      message: `Êtes-vous sûr de vouloir Terminée cette Réservation ?`,
      header: "Démande de Confirmation ",
      headerClassName: `text-success`,
      draggable: false,
      maximized: true,
      icon: "pi pi-info-circle",
      footer: (option) => footerConfirm(option, "success"),
      defaultFocus: "reject",
      accept: () => acceptConfirmReservation(id),
    });
  };

  const genererNouvelleFacture = (data) => {
    console.log("data :", data);
    setReservation(data);
    setGenererFactureData((prev) => ({
      ...prev,
      ReservationId: data?.id,
    }));
    setIdReservation(data?.id);
    setVisibleReglerFacture(true);
  };

  const validateGnererFacture = () => {
    mutationGenererFacture.mutate({
      id: idReservation,
      newData: genererFactureData,
    });
  };

  const tableFooter = () => {
    return (
      <div className="d-flex justify-content-between align-items-center mt-5">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          type="button"
          icon="pi pi-arrow-left"
          label="Precédent"
          className="rounded p-button-outlined p-button-secondary"
          disabled={page === 1}
          loading={isFetching}
        />

        <div className="">
          <span>
            {dataFromQuery?.pagination?.currentPage} sur{" "}
            {dataFromQuery?.pagination?.totalPages} Pages
          </span>
        </div>

        <Button
          type="button"
          onClick={() => {
            if (!isPlaceholderData && !!dataFromQuery?.pagination?.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !!!dataFromQuery?.pagination?.hasMore}
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
          icon="pi pi-eye"
          tooltip="Voir"
          onClick={() => getReservationById(rowdata?.id)}
          className="rounded-pill  p-2 p-button-raised p-button-outlined"
        />
        <Button
          icon="pi pi-pencil"
          tooltip="Editer"
          onClick={() => showUpdateDialogReservation(rowdata?.id)}
          className="rounded-pill p-2 p-button-info p-button-raised p-button-outlined"
        />
        <Button
          onClick={() => deleteReservationConfirm(rowdata?.id)}
          icon="pi pi-trash"
          tooltip="Supprimer"
          tooltipOptions={{ position: "left" }}
          className="rounded-pill  p-2 p-button-danger p-button-raised p-button-outlined"
        />
      </section>
    );
  };
  const actionsValidateBody = (rowdata) => {
    console.log("reservation :::", rowdata);
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        {(rowdata?.is_waitting || rowdata?.is_cancelled) && (
          <Button
            icon="pi pi-check-circle"
            label="Valider"
            disabled={!(rowdata?.is_waitting || rowdata?.is_cancelled)}
            onClick={() => {
              updateStatutReservationConfirm(rowdata?.id);
            }}
            className="rounded-pill p-button-success p-button-outlined"
          />
        )}

        {rowdata?.is_waitting && (
          <Button
            icon="pi pi-ban"
            label="Annuler"
            disabled={!rowdata?.is_waitting}
            onClick={() => {}}
            className="rounded-pill p-button-danger p-button-outlined"
          />
        )}
        {rowdata?.is_confirmed && (
          <Button
            icon="pi pi-check-circle"
            label="Terminer"
            disabled={!rowdata?.is_confirmed}
            onClick={() => {
              setReservationSelectedID(rowdata?.id)
              setReservationCompleteDialog(true)
            }}
            className="rounded-pill p-button-info p-button-outlined"
          />
        )}
        {(rowdata?.is_confirmed || rowdata.is_completed) && (
          <Button
            icon="pi pi-file"
            label="Génerer une Facture"
            disabled={!(rowdata?.is_confirmed || rowdata.is_completed)}
            onClick={() => {}}
            className="rounded-pill p-button-primary"
          />
        )}
      </section>
    );
  };

  const selectedRow = (data) => {
    getReservationById(data?.id);
    // console.log('psori',data)
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

  const bodyDateFormat = (rowdata, key) => {
    return `${new Date(rowdata[key]).toLocaleDateString("fr-FR", {
      // weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
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

  const chambreBody = (rowdata) => {
    const chambreData = rowdata?.chambre;
    return (
      <div>
        <Button
          label={chambreData?.titre}
          className="p-button-text"
          onClick={(e) => overlayChambreRef.current.toggle(e)}
        />
        <OverlayPanel ref={overlayChambreRef}>
          <img src="https://picsum.photos/200" alt="Bamboo Watch"></img>
        </OverlayPanel>
      </div>
    );
  };

  const montantBody = (rowdata, key) => {
    return `${formatMontant(rowdata[key])}`;
  };

  const footerGenererFactureDialog = () => {
    return (
      <div className="d-flex justify-content-between algin-items-center">
        <Button
          label="Annuler"
          className="p-button-text"
          onClick={() => setVisibleReglerFacture(false)}
        />
        <Button
          label="Générer la Facture"
          icon="pi pi-file"
          loading={mutationGenererFacture?.isLoading}
          style={{ background: "var(--main-color-dash_2)" }}
          className="rounded-pill "
          onClick={() => validateGnererFacture()}
        />
      </div>
    );
  };

  const solderBody = (row) => {
    return (
      <span
        className={`fw-bolder ${
          !!row?.soldee ? "text-success" : "text-danger"
        }`}
      >
        {!!row?.soldee ? "OUI" : "NON"}
      </span>
    );
  };

  useEffect(() => {
    setSizeDataTable(data?.length || 0);
  }, [data]);

  return (
    <section className="shadow-lg mb-5">
      <ConfirmDialog />
      <DataTable
        value={data}
        className="rounded"
        loading={isFetching || isLoading}
        header={renderHeader}
        filters={filters}
        footer={tableFooter}
        selectionMode="single"
        selection={selectedRow}
        onSelectionChange={(e) => selectedRow(e.value)}
        stripedRows
        scrollable
        scrollHeight="400px"
        tableStyle={{ minWidth: "50rem" }}
        resizableColumns
      >
        <Column header="N°" field="numero" />
        <Column header="Client" body={clientBody} />
        <Column field="client.telephone" header="Téléphone" />
        <Column
          field="dateDebut"
          body={(row) => bodyDateFormat(row, "date_debut")}
          header="Date Debut"
        />
        <Column
          field="dateFin"
          body={(row) => bodyDateFormat(row, "date_fin")}
          header="Date Fin"
        />
        <Column body={chambreBody} header="Chambre" />
        <Column
          header="Montant Total"
          body={(rowdata) => montantBody(rowdata, "montant_total")}
        />
        <Column
          header="Payé"
          body={(rowdata) => montantBody(rowdata, "montant_regle")}
        />
        {/* <Column
          header="Restant"
          body={(rowdata) => montantBody(rowdata, "montantRestant")}
        /> */}
        <Column header="Soldé" body={(rowdata) => solderBody(rowdata)} />
        {/* <Column field="statut" body={disponibiliteBody} header="Statut" /> */}
        <Column header="Actions" body={actionsValidateBody} />
        {/* <Column
        style={{ maxWidth: "7rem" }}
        header=""
        body={actionsBody}
      /> */}
      </DataTable>

      <Dialog
        header="Formulaire Génération Facture"
        visible={visibleReglerFacture}
        footer={footerGenererFactureDialog}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        onHide={() => setVisibleReglerFacture(false)}
      >
        <div className="mx-auto">
          <GenererFactureForm
            formData={genererFactureData}
            setFormData={setGenererFactureData}
            reservation={reservation}
          />
        </div>
      </Dialog>

      <Dialog
        header="Démande de confirmation"
        headerClassName="text-success"
        visible={reservationCompleteDialog}
        footer={
          <div className="d-flex justify-content-between align-items-center">
            <Button
              onClick={() => {
                setReservationSelectedID(null);
                setReservationCompleteDialog(false);
              }}
              label="Non"
              className="p-button-info p-button-text rounded"
            />
            <Button
              onClick={() => mutationTemrineeReservation.mutate()}
              label="Oui"
              className={`p-button-success rounded`}
              loading={mutationTemrineeReservation?.isPending}
            />
          </div>
        }
        style={{ width: "25vw" }}
        breakpoints={{ "960px": "35vw", "641px": "90vw" }}
        onHide={() => setReservationCompleteDialog(false)}
      >
        <div className="d-flex align-items-center">
          <i className="pi pi-info-circle"></i>
          <p className="my-0 ms-2">
            {" "}
            Êtes-vous sûr de vouloir Terminer cette reservation ?{" "}
          </p>
        </div>
      </Dialog>

      <SuccesDialog
        visible={visibleDialogSuccess}
        setVisible={setVisibleDialogSuccess}
        returnUrl={`${domaine_path}/reservations`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleDialogError}
        setVisible={setVisibleDialogError}
        msg="Une erreur est survenue. Réessayez!!"
      />
    </section>
  );
};

export default ReservationsTable;
