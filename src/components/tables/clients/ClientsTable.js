import { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { formatDateString } from "src/utils/utils";

const ClientsTable = ({
  getClientById,
  deleteClientConfirm,
  showUpdateDialogClient,
  data,
  isFetching,
  isLoading,
  dataFromQuery,
  isPlaceholderData,
  setPage,
  page,
}) => {
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
          label="Consulter"
          onClick={() => getClientById(rowdata?.id)}
          className="rounded px-3"
        />
        <Button
          label="Editer"
          onClick={() => showUpdateDialogClient(rowdata?.id)}
          className="rounded px-3 p-button-info"
        />
        <Button
          onClick={() => deleteClientConfirm(rowdata?.id)}
          label="Supprimer"
          className="rounded px-3 p-button-danger"
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

  return (
    <DataTable
      value={data || []}
      className="rounded"
      loading={isFetching || isLoading}
      footer={tableFooter}
      header={renderHeader}
      filters={filters}
      stripedRows
      scrollable
      resizableColumns
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column header="N°" field="numero" />
      <Column field="nom" header="Nom" />
      <Column field="prenom" header="Prénom" />
      <Column field="email" header="Email" />
      <Column field="telephone" header="Téléphone" />
      <Column field="ville" header="Ville" />
      <Column field="commune" header="Commune" />
      <Column field="commune" header="Crée par" />
      <Column
        body={(rowdata) => formatDateString(rowdata?.updatedAt)}
        header="Modifié le"
      />
      <Column
        body={(rowdata) => formatDateString(rowdata?.createdAt)}
        header="Enregistré le"
      />
      <Column header="Actions" body={actionsBody} />
    </DataTable>
  );
};

export default ClientsTable;
