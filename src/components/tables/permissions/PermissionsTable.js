import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { FilterMatchMode } from "primereact/api";

const PermissionsTable = ({
  getPermissionById,
  deletePermissionConfirm,
  showUpdateDialogPermission,
  setSizeDataTable,
  data,
  isFetching,
  isLoading,
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

  const actionsBody = (rowdata) => {
    console.log("data action :", rowdata);
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        <Button
          icon="pi pi-eye"
          tooltip="Voir"
          onClick={() => getPermissionById(rowdata?.id)}
          className="rounded-pill  p-2 p-button-raised p-button-outlined"
        />
        <Button
          icon="pi pi-pencil"
          tooltip="Editer"
          onClick={() => showUpdateDialogPermission(rowdata?.id)}
          className="rounded-pill p-2 p-button-info p-button-raised p-button-outlined"
        />
        <Button
          onClick={() => deletePermissionConfirm(rowdata?.id)}
          icon="pi pi-trash"
          tooltip="Supprimer"
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


  useEffect(() => {
    setSizeDataTable(data?.length || 0);
  }, [data]);

  return (
    <DataTable
      value={data}
      className="rounded"
      loading={isFetching || isLoading}
      header={renderHeader}
      filters={filters}
      paginator
      stripedRows
      rows={5}
      resizableColumns
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: "50rem" }}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} de  {last} sur {totalRecords}"
    >
      <Column header="N°" body={(data, props) => props?.rowIndex + 1} />
      <Column field="titre" header="Titre" />
      <Column field="description" header="Description" />
      <Column field="createdAt" header="Enrégistré" />
      <Column
        style={{ maxWidth: "7rem" }}
        header="Actions"
        body={actionsBody}
      />
    </DataTable>
  );
};

export default PermissionsTable;
