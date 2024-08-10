import React, { useState, useEffect } from 'react';
import {keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';


import ParametrageAddDialog from 'src/components/dialogs/parametrageAddDialog';
import ParametrageUpdateDialog from 'src/components/dialogs/parametrageUpdateDialog';
import SuccesDialog from 'src/components/dialogs/succesDialog';
import ErrorDialog from 'src/components/dialogs/errorDialog';
import { domaine_path } from 'src/api/instanceAxios';



export default function ParametrageDatable({
  tableCols,
  queryFunction,
  addFunction,
  updateFunction,
  deleteFunction,
  querysKeysLabel,
  marqueFieldsState,
  dropdownList = [],
  dropdownFields=[],
}) {
  const pageSize = 10
  const queryClient = useQueryClient();

  const [page, setPage] = React.useState(1);

  const getQueryKey = [`parametre-${querysKeysLabel}`, page];
 const {
   data: dataQuery,
   isFetching: isFetchingQuery,
   isPlaceholderData,
 } = useQuery({
   queryKey: getQueryKey,
   queryFn: () => queryFunction(page, pageSize),
   placeholderData: keepPreviousData,
 });


  const [parametreData, setParametreData] = useState([]);
  const [updatedID, setUpdatedID] = useState("");

  const [fieldsData, setFieldsData] = useState(marqueFieldsState);
  const [fieldsDataUpdate, setFieldsDataUpdate] = useState(marqueFieldsState);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visibleAddForm, setVisibleAddForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [visibleSuccessDelete, setVisibleSuccessDelete] = useState(false);
  const [visibleSuccessUpdate, setVisibleSuccessUpdate] = useState(false);
  const [visibleSuccessAdd, setVisibleSuccessAdd] = useState(false);
  const [visibleSuccessError, setVisibleSuccessError] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });


  const addMutation = useMutation({
    mutationFn: async (body) => await addFunction(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey,
      });
      setVisibleAddForm(false);
      setVisibleSuccessAdd(true);
      setFieldsData(marqueFieldsState);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (param) => await updateFunction(param?.id, param?.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey,
      });
      setVisibleUpdateForm(false);
      setVisibleSuccessUpdate(true);
      setFieldsData(marqueFieldsState);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await deleteFunction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey,
      });
      setVisibleSuccessDelete(true);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const handleUpdateRowData = (rowdata) => {
    const _marqueFieldsState = Object?.keys(fieldsDataUpdate);

    _marqueFieldsState.forEach(
      (element) => (fieldsDataUpdate[element] = rowdata[element])
    );
    setUpdatedID(rowdata?.id);
    setVisibleUpdateForm(true);
  };

  const handleDelete = (event, rowdata) => {
    confirmDeleted(event, rowdata?.id);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const confirmDeleted = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      className: "fw-bolder py-3 text-danger",
      headerClassName: "text-danger",
      message: "Confirmer la suppression ?",
      header: "Confirmation Suppression",
      icon: "pi pi-info-circle",
      position: "top",
      footer: (footerEvent) => footer(footerEvent, id),
    });
  };

  // const arrondirAuSupMultiple = () => {
  //   const nombrePage = ~~(dataQuery?.count / pageSize);
  //   const reste = dataQuery?.count % pageSize;

  //   return reste === 0 ? nombrePage : nombrePage+1;
  // };


  const tableFooter = ()=>{
    return (
      <div className="d-flex justify-content-between align-items-center mt-5">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          type="button"
          icon="pi pi-arrow-left"
          label="Precédent"
          className="rounded p-button-outlined p-button-secondary"
          disabled={page === 1}
          loading={isFetchingQuery}
        />

        <div className="">
          <span>
            {dataQuery?.pagination?.currentPage} sur {dataQuery?.pagination?.totalPages} Pages
          </span>
        </div>

        <Button
          type="button"
          onClick={() => {
            if (!isPlaceholderData && !!dataQuery?.pagination?.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !!!dataQuery?.pagination?.hasMore}
          label="Suivant"
          className="rounded p-button-outlined p-button-secondary"
          iconPos="right"
          loading={isFetchingQuery}
          icon="pi pi-arrow-right"
        />
      </div>
    );
  }


  const actionsBody = (rowdata) => {
    return (
      <div className="d-flex justify-content-between align-items-center gap-4">
        <Button
          label="Modifier"
          className="mr-2 p-button-primary rounded p-button-outlined p-button-raised"
          onClick={() => handleUpdateRowData(rowdata)}
        />
        <Button
          label="Supprimer"
          className="mr-2 rounded p-button-raised p-button-danger"
          onClick={(event) => handleDelete(event, rowdata)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between aling-items-center">
        <div className="">
          <Button
            label={`Ajouter ${querysKeysLabel}`}
            className="mr-2 p-button-primary rounded    p-button-raised"
            onClick={() => setVisibleAddForm(true)}
          />
        </div>
        <div className="flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              className="rounded-pill"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Rechercher ..."
            />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const footer = (event, id) => {
    const { reject } = event;
    return (
      <div className="d-flex  py-3 px-3 justify-content-between align-items-center">
        <Button
          onClick={reject}
          className="px-4 rounded p-button-outlined"
          label="Non"
        />
        <Button
          loading={deleteMutation?.isPending}
          onClick={() => deleteMutation?.mutate(id)}
          className="px-4 p-button-danger  p-button-outlined ms-4 rounded"
          label="Oui"
        />
      </div>
    );
  };

  const customizeQueryData = (data)=>{
    try {
      const rate = page * pageSize - pageSize;
      return (data || [])?.map((support, index) => ({
        ...support,
        numero: index + 1 + rate,
      }));

    } catch (error) {
      return []
    }
  }


  useEffect(() => {
    const dataResults = dataQuery?.results || []
    const dataReceive = customizeQueryData(dataResults);
    setParametreData(dataReceive);

  }, [dataQuery]);

  return (
    <>
      <div className="mt-4">
        {/* <h4 className="fw-bolder h4"> Liste {querysKeysLabel} </h4> */}
        <h4 className="fw-bolder h4">
          {querysKeysLabel}s ({dataQuery?.pagination?.totalItems || 0})
        </h4>
      </div>
      <ConfirmPopup />
      <div className="mt-2 ">
        <DataTable
          scrollable
          className='p-4'
          rows={10}
          footer={tableFooter}
          loading={isFetchingQuery}
          filters={filters}
          filterDisplay="row"
          height="400px"
          globalFilterFields={Object?.keys(marqueFieldsState) ?? [""]}
          header={header}
          emptyMessage="Aucune donnée trouvée."
          value={parametreData}
          size="small"
          sortOrder={1}
          resizableColumns
          showGridlines
          stripedRows
        >
          <Column
            header="N°"
            headerStyle={{ width: "3rem" }}
            field="numero"
          ></Column>
          {tableCols?.map((col, i) => (
            <Column
              key={i}
              body={col?.body}
              field={col?.field}
              header={col?.header}
            ></Column>
          ))}
          <Column
            header="    "
            headerStyle={{ width: "3rem" }}
            body={actionsBody}
          ></Column>
        </DataTable>
        <ParametrageAddDialog
          tableCols={tableCols}
          visible={visibleAddForm}
          dropdownFields={dropdownFields}
          dropdownList={dropdownList}
          setVisible={setVisibleAddForm}
          addFunction={addMutation}
          fieldsData={fieldsData}
          setFieldsData={setFieldsData}
        />
        <ParametrageUpdateDialog
          updatedID={updatedID}
          tableCols={tableCols}
          dropdownFields={dropdownFields}
          dropdownList={dropdownList}
          visible={visibleUpdateForm}
          setVisible={setVisibleUpdateForm}
          updateFunction={updateMutation}
          fieldsData={fieldsDataUpdate}
          setFieldsData={setFieldsDataUpdate}
        />

        <SuccesDialog
          visible={visibleSuccessUpdate}
          setVisible={setVisibleSuccessUpdate}
          returnUrl={`${domaine_path}/parametres`}
          msg="Informations Modifiée avec succes."
        />
        <SuccesDialog
          visible={visibleSuccessAdd}
          setVisible={setVisibleSuccessAdd}
          returnUrl={`${domaine_path}/parametres`}
          msg="Enregistremet effectuée avec succes."
        />
        <SuccesDialog
          visible={visibleSuccessDelete}
          setVisible={setVisibleSuccessDelete}
          returnUrl={`${domaine_path}/parametres`}
          msg="Enregistremet supprimé avec succes."
        />
        <ErrorDialog
          visible={visibleSuccessError}
          setVisible={setVisibleSuccessError}
          msg="Une erreur est survenue. Réessayez!!"
        />
      </div>
    </>
  );
}
