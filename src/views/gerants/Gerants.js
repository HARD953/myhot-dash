import React, { useEffect, useState } from 'react'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import ErrorDialog from 'src/components/dialogs/errorDialog'
import { ConfirmDialog } from 'primereact/confirmdialog'

import { domaine_path } from 'src/api/instanceAxios'
import { addPersonne, deletePersonne, getPersonne, getPersonneGerants, updatePersonne } from 'src/api/personnes/personnes'
import HeaderContentSub from 'src/components/others/HeaderContentSUb'
import GerantsTable from 'src/components/tables/gerants/GerantsTable'
import CreateTemplateDialog from 'src/components/dialogs/createTemplateDialog'
import AddGerantForm from 'src/components/forms/gerants/addGerantForm'
import SuccesDialog from 'src/components/dialogs/succesDialog'
import ConfirmDialogApp from 'src/components/dialogs/ConfirmDialogApp'

import 'src/assets/css/chambres.css'


const Gerants = () => {
  const queryListKey = "list-gerants"
  const pageForGerant = 1;
  const pageSizeForGerant = 10;
  const initialFormData = {
    nom: "",
    prenom: "",
    date_naissance: "",
    telephone: "",
    email: "",
    pays: "",
    ville: "",
    commune: "",
    type: "gérant",
    etablissements_geres: [],
  };


  const queryClient = useQueryClient()


  const [formData, setFormData] = useState(initialFormData);
;
  const [visibleConfirmDeleteDialog, setVisibleConfirmDeleteDialog] = useState(false);
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [errorDialoMsg, setErrorDialoMsg] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [isShowOnly, setIsShowOnly] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);
  const [deleteDataID, setDeleteDataID] = useState(null);
  ;

  const [page, setPage] = useState(1);
  const [gerantsList, setGerantsList] = useState([]);



   const {
     data: gerantsData,
     isFetching: isFetchingGerantsData,
     isLoading: isLoadingGerantsData,
     isPlaceholderData,
   } = useQuery({
     queryKey: [queryListKey],
     queryFn: async () =>
       await getPersonneGerants(pageForGerant, pageSizeForGerant),
     placeholderData: keepPreviousData,
   });



  const mutationAdd = useMutation({
    mutationKey: ["add-gerant"],
    mutationFn: async(newData) => {
      return await addPersonne(newData);
    },
    onSuccess: async() => {
       await queryClient.invalidateQueries([queryListKey]);
      setVisibleCreateDialog(false);
      setFormData(initialFormData)
      setVisibleDialoMsg("Gérant ajouté avec succès.");
      setVisibleAdd(true);
    },
    onError: async(err) => {
      setErrorDialoMsg(err.message)
      setVisibleError(true);
    },
  });



  const mutationDelete = useMutation({
    mutationKey: ["delete-gerant"],
    mutationFn: async(id) => {
      return await deletePersonne(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleConfirmDeleteDialog(false)
      setVisibleDialoMsg("Gérant supprimé avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      setVisibleError(true);
    },
  });


  const mutationUpdate = useMutation({
    mutationKey: ["update-gerant"],
    mutationFn: async (id) => {
      return await updatePersonne(id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleUpdateDialog(false)
      setFormData(initialFormData)
      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      setVisibleError(true);
    },
  });



  const updateGerantFn = ()=>{
    mutationUpdate.mutate(updatedId);
  }

  /*Fonctions */
    const acceptConfirmDeleteDialogFunction = (id) => { mutationDelete.mutate(id) };


    const deleteGerantConfirm = (id) => {
        setDeleteDataID(id)
        setVisibleConfirmDeleteDialog(true)
      };

  const getGerantById = async(id)=>{
    try {
      const response = await getPersonne(id);
      setFormData(response);
      setVisibleCreateDialog(true)
      setIsShowOnly(true)
    } catch (error) {

      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  }
  const ajouterGerant = () => {
    setFormData(initialFormData)
    setVisibleCreateDialog(true);
    setIsShowOnly(false);
  };

  const showUpdateDialogGerant = async(id) => {
     try {
      const response = await getPersonne(id);
      setFormData(response);
      setUpdatedId(response?.id)
      setVisibleUpdateDialog(true)
      setIsShowOnly(false);
    } catch (error) {

      setVisibleUpdateDialog(false);
      setIsShowOnly(false);
    }
  };

  const saveEntry = ()=>{
    mutationAdd.mutate(formData);
  }




  const customizeQueryData = (data) => {
    try {
      const rate = pageForGerant * pageSizeForGerant - pageSizeForGerant;
      return (data || [])?.map((support, index) => ({
        ...support,
        numero: index + 1 + rate,
      }));
    } catch (error) {
      return [];
    }
  };

  /*Fin Fonctions */

  /* Gestionnaire d'evenements */

  useEffect(() => {
    const dataResults = gerantsData?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setGerantsList(dataReceive);
  }, [gerantsData]);



  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Gérants"
            subTitle="Avoir le controle sur l’activité de vos gérants"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center chambres-header-container px-md-4 px-1">
        <div className=" mt-md-0 mt-3">
          <div className="d-flex justify-content align-items-center gap-5">
            <Button
              rounded
              className="rounded p-button-outlined"
              icon="pi pi-trash"
              label="Supprimer"
              severity="danger"
            />
            <Button
              rounded
              className="rounded"
              icon="pi pi-plus"
              label="Ajouter"
              severity="info"
              onClick={() => ajouterGerant()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">
          {" "}
          Liste des Gerants ({gerantsData?.pagination?.totalItems}){" "}
        </h3>
        <GerantsTable
          data={gerantsList}
          setPage={setPage}
          page={page}
          dataFromQuery={gerantsData}
          isPlaceholderData={isPlaceholderData}
          isLoading={isLoadingGerantsData}
          isFetching={isFetchingGerantsData}
          queryListKey={queryListKey}
          getGerantById={getGerantById}
          deleteGerantConfirm={deleteGerantConfirm}
          showUpdateDialogGerant={showUpdateDialogGerant}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Gérant"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updateGerantFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
      >
        <AddGerantForm formData={formData} setFormData={setFormData} />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Gérant"
            : "Formulaire Création Gérant"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveEntry}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
      >
        <AddGerantForm
          isShowOnly={isShowOnly}
          formData={formData}
          setFormData={setFormData}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/gerants`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/gerants`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg={errorDialoMsg}
      />

      <ConfirmDialogApp
        visible={visibleConfirmDeleteDialog}
        setVisible={setVisibleConfirmDeleteDialog}
        message="Êtes-vous sûr de vouloir supprimer les données de ce Gérant ?"
        header="Confirmation Suppression"
        acceptFunction={acceptConfirmDeleteDialogFunction}
        dataID={deleteDataID}
      />
    </>
  );
}

export default Gerants
