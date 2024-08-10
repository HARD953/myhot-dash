
import { useState } from "react";
import {
  useQuery,
} from '@tanstack/react-query'; //Note: this is TanStack React Query V5
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { getComptes } from "../../../api/comptes/comptes";
import { FilterMatchMode } from "primereact/api";
import { Chip } from "primereact/chip";
import { formatDateString } from "src/utils/utils";




const ComptesTable = ({
  queryListKey,
  getCompteById,
  deleteCompteConfirm,
  showUpdateDialogCompte,
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
            disabled={
              isPlaceholderData || !!!dataFromQuery?.pagination?.hasMore
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
          label="Consulter"
          onClick={() => getCompteById(rowdata?.id)}
          className="rounded px-3 "
        />
        <Button
          label="Editer"
          onClick={() => showUpdateDialogCompte(rowdata?.id)}
          className="rounded px-3 p-button-info "
        />
        <Button
          onClick={() => deleteCompteConfirm(rowdata?.id)}
          label="Supprimer"
          className="rounded p-button-danger "
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

  const statutActiveBody = (row) => {
    return (
      <>
        {row?.active ? (
          <Chip className="bg-success text-white" label="Oui" />
        ) : (
          <Chip className="bg-danger text-white" label="Non" />
        )}
      </>
    );
  };

  const typeCompteBody = (row) => {
    let permissions = [];
    if (row?.is_client) permissions.push("Client");
    if (row?.is_gerant) permissions.push("Gérant");

    return (
      <>
        {
          !!permissions.length ?(
             <ul>
          {permissions?.map((item, index) => (
            <li key={index}> {item} </li>
          ))}
        </ul>
          ):
          (
            <p className="m-0"> Aucun </p>
          )
        }

      </>
    );
  };

  return (
    <DataTable
      value={data}
      className="rounded"
      loading={isFetching || isLoading}
      header={renderHeader}
      footer={tableFooter}
      filters={filters}
      stripedRows
      resizableColumns
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column header="N°" field="numero" />
      <Column field="email" header="Email" />
      <Column field="personne.nom" header="Nom" />
      <Column field="personne.prenom" header="Prénom" />
      <Column body={typeCompteBody} header="Type compte" />
      <Column body={statutActiveBody} header="Activé" />
      <Column
        body={(rowdata) => formatDateString(rowdata?.updatedAt)}
        header="Modifié le"
      />
      {/* <Column
        body={(rowdata) => formatDateString(rowdata?.createdAt)}
        header="Enregistré le"
      /> */}
      <Column header="Actions" body={actionsBody} />
    </DataTable>
  );
};


export default ComptesTable;


