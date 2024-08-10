import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query"; //Note: this is TanStack React Query V5
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";

import { formatDateString, formatMontant } from "src/utils/utils";
import { getFactures } from "src/api/factures/factures";


const FacturesTable = ({
  queryListKey,
  getFactureById,
  deleteFactureConfirm,
  data,
  isLoading
}) => {
  const overlayChambreRef = useRef(null);

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

  const actionsBody = (rowdata) => {
    console.log("data action :", rowdata);
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        <Button
          icon="pi pi-print"
          // tooltip="Imprimer"
          label="Imprimer"
          onClick={() => showUpdateDialogFacture(rowdata?.id)}
          className="rounded-pill p-2 p-button-info p-button-raised"
        />
        <Button
          icon="pi pi-eye"
          tooltip="Voir"
          label="Consulter"
          onClick={() => getFactureById(rowdata?.id)}
          className="rounded-pill  p-2 p-button-raised p-button-outlined"
        />
        <Button
          onClick={() => deleteFactureConfirm(rowdata?.id)}
          icon="pi pi-trash"
          label="Supprimer"
          tooltipOptions={{ position: "left" }}
          className="rounded-pill  p-2 p-button-danger p-button-raised p-button-outlined"
        />
      </section>
    );
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
    return `${formatDateString(rowdata[key])}`;
  };

  const clientBody = (rowData) => {
    const clientData = rowData?.reservation?.client;
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
    const chambreData = rowdata?.reservation?.chambre;
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

  const montantBody = (rowdata) => {
    return `${formatMontant(rowdata?.montant)} F`;
  };

  return (
    <>
      <ConfirmDialog />
      <DataTable
        value={data || []}
        className="rounded"
        loading={isLoading}
        header={renderHeader}
        filters={filters}
        paginator
        stripedRows
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "200px" }}
        style={{ minWidth: "200px" }}
        scrollable
        scrollHeight="flex"
        rowGroupMode="rowspan"
        resizableColumns
        // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        // currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column header="N°" body={(data, props) => props?.rowIndex + 1} />
        <Column
          header="Client"
          body={clientBody}
        />
        <Column body={chambreBody} header="Chambre" />
        <Column header="Montant" body={montantBody} />
        <Column
          field="modePaiement"
          // body={(row) => bodyDateFormat(row, "dateDebut")}
          header="Mode Paiement"
        />
        <Column
          body={(row) => bodyDateFormat(row, "updatedAt")}
          header="Date géneration"
        />
        <Column frozen header="Actions" body={actionsBody} />
      </DataTable>
    </>
  );
};

export default FacturesTable;
