import { useEffect, useRef, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //Note: this is TanStack React Query V5
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { FilterMatchMode } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { formatMontant } from "src/utils/utils";
import { getReservationsIsCancelled, getReservationsIsCompleted, getReservationsIsConfirmed, getReservationsIsWaiting } from "src/api/reservations/reservations";
import { chambreGetReservationAnnulees, chambreGetReservationEnAttentes, chambreGetReservationEnCours, chambreGetReservationTerminees } from "src/api/chambres/chambres";




const ReservationsChambreTable = ({chambreId, activeIndex=0}) => {
  const pageSize= 10;
  const queryListKey= "reservations"
  const overlayChambreRef = useRef(null);
  const queryClient = useQueryClient();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const {
    data: dataFromQuery,
    isFetching,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: [queryListKey, activeIndex],
    queryFn: async () => {
      switch (activeIndex) {
        case 0:
          return await chambreGetReservationEnCours(chambreId,page, pageSize);
        case 1:
          return await chambreGetReservationEnAttentes(
            chambreId,
            page,
            pageSize
          );
        case 2:
          return await chambreGetReservationTerminees(
            chambreId,
            page,
            pageSize
          );
        case 3:
          return await chambreGetReservationAnnulees(chambreId, page, pageSize);
        default:
          break;
      }
    },
    placeholderData: keepPreviousData,
  });

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

  const actionsValidateBody = (rowdata) => {
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        <Button
          icon="pi pi-eye"
          tooltip="Voir"
          onClick={() => getReservationById(rowdata?.id)}
          className="rounded-pill  p-2 p-button-raised p-button-outlined"
        />
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
          {clientData?.prenom} {clientData?.nom}
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

 const customizeQueryData = (data) => {
   try {
     const rate = page * pageSize - pageSize;
     return (data || [])?.map((support, index) => ({
       ...support,
       numero: index + 1 + rate,
     }));
   } catch (error) {
     return [];
   }
 };



  useEffect(() => {
    const dataResults = dataFromQuery?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setData(dataReceive);
  }, [dataFromQuery]);




  return (
    <section className="shadow-lg mb-5">
      <ConfirmDialog />
      <DataTable
        value={data}
        className="rounded"
        loading={isFetching}
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
        <Column header="Soldé" body={(rowdata) => solderBody(rowdata)} />
        <Column header="Actions" body={actionsValidateBody} />
      </DataTable>
    </section>
  );
};

export default ReservationsChambreTable;
