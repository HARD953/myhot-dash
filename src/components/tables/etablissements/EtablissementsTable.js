import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; //Note: this is TanStack React Query V5
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { getEtablissements } from "../../../api/etablissements/etablissements";
import { FilterMatchMode } from "primereact/api";
import { formatDateString } from "src/utils/utils";

const EtablissementsTable = ({
  getEtablissementById,
  deleteEtablissementConfirm,
  showUpdateDialogEtablissement,
  setSizeDataTable,
  data,
  isFetching,
  isLoading,
  etablissementDataQuery,
  isPlaceholderData,
  pagePagination,
  setPagePagination,
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
            {etablissementDataQuery?.pagination?.currentPage} sur{" "}
            {etablissementDataQuery?.pagination?.totalPages} Pages
          </span>
        </div>

        <Button
          type="button"
          onClick={() => {
            if (
              !isPlaceholderData &&
              !!etablissementDataQuery?.pagination?.hasMore
            ) {
              setPagePagination((old) => old + 1);
            }
          }}
          disabled={
            isPlaceholderData || !!!etablissementDataQuery?.pagination?.hasMore
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
    console.log("data action :", rowdata);
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        <Button
          label="Consulter"
          onClick={() => getEtablissementById(rowdata?.id)}
          className="rounded  py-2 px-4 "
        />
        <Button
          label="Editer"
          onClick={() => showUpdateDialogEtablissement(rowdata?.id)}
          className="rounded py-2 px-4  p-button-info"
        />
        <Button
          onClick={() => deleteEtablissementConfirm(rowdata?.id)}
          label="Supprimer"
          tooltipOptions={{ position: "left" }}
          className="rounded py-2 px-4 p-button-danger"
        />
      </section>
    );
  };

  const selectedRow = (data) => {
    getEtablissementById(data?.id);
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

  useEffect(() => {
    setSizeDataTable(data?.length || 0);
  }, [data]);

  return (
    <DataTable
      value={data}
      footer={tableFooter}
      className="rounded"
      loading={isFetching || isLoading}
      header={renderHeader}
      filters={filters}
      selectionMode="single"
      selection={selectedRow}
      onSelectionChange={(e) => selectedRow(e.value)}
      stripedRows
      resizableColumns
      scrollable
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column header="N°" field="numero" />
      <Column field="type_etablissement.type" header="Type" />
      <Column field="titre" header="Nom établissement" />
      <Column field="email" header="Email" />
      <Column field="telephone" header="Téléphone" />
      <Column field="pays.titre" header="Pays" />
      <Column field="ville.titre" header="Ville" />
      {/* <Column field="commune" header="Crée par" /> */}
      <Column
        body={(rowdata) => formatDateString(rowdata?.updatedAt)}
        header="Dernière modification"
      />
      {/* <Column
        body={(rowdata) => formatDateString(rowdata?.createdAt)}
        header=" le"
      /> */}

      <Column
        // style={{ maxWidth: "7rem" }}
        header="Actions"
        body={actionsBody}
      />
    </DataTable>
  );
};

export default EtablissementsTable;
