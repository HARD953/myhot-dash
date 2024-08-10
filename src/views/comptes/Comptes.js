import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

import HeaderContentSub from 'src/components/others/HeaderContentSUb'
import ComptesTable from 'src/components/tables/comptes/ComptesTable'
import CreateTemplateDialog from 'src/components/dialogs/createTemplateDialog'
import AddCompteForm from 'src/components/forms/comptes/addCompteForm'

import 'src/assets/css/chambres.css'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import SuccesDialog from 'src/components/dialogs/succesDialog'
import ErrorDialog from 'src/components/dialogs/errorDialog'
import { addCompte, deleteCompte, getCompte, getComptes, getListUserByType, updateCompte } from 'src/api/comptes/comptes'
import { domaine_path } from 'src/api/instanceAxios'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import CreateCompteDialog from 'src/components/dialogs/createCompteDialog'
import { addUtilisateur } from 'src/api/users/users'
import { getPermissions } from 'src/api/permissions/permissions'
import { getPersonneClients, getPersonneGerants } from 'src/api/personnes/personnes'
import ConfirmDialogApp from 'src/components/dialogs/ConfirmDialogApp'



const Comptes = () => {
  const queryListKey = "list-comptes"
  const pageForUser = 1
  const pageSizeForUser = 10
  const initialFormData = {
    personne_id: "",
    password: "",
    is_admin: false,
    is_gerant: false,
    is_client: false
  };


  const stepperCreateCompteRef = useRef(null);

  const queryClient = useQueryClient()


  const [formData, setFormData] = useState(initialFormData);
  const [typeCompte, setTypeCompte] = useState(null);

  const [visibleConfirmDeleteDialog, setVisibleConfirmDeleteDialog] =
    useState(false);
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [errorDialoMsg, setErrorDialoMsg] = useState("");
  const [isShowOnly, setIsShowOnly] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);
  const [deleteDataID, setDeleteDataID] = useState(null);

  const [page, setPage] = useState(1);
  const [usersList, setUserList] = useState([]);




   const {
     data: usersData,
     isFetching: isFetchingUsersData,
     isLoading: isLoadingUsersData,
     isPlaceholderData,
   } = useQuery({
     queryKey: [queryListKey],
     queryFn: async () => await getComptes(pageForUser, pageSizeForUser),
     placeholderData: keepPreviousData,
   });


  const { data: listUserByType, isLoading: isLoadingListUserByType } = useQuery(
    {
      queryKey: ["list-user",typeCompte],
      queryFn: async () => {

          switch(typeCompte){
            case "gerant" : return await getPersonneGerants(1, 100);
            case "client" : return await getPersonneClients(1, 100);
            default : return null
          }
      },
    }
  );

  const { data: listPermissions, isLoading: isLoadingPermissions } = useQuery({
    queryKey: ["list-permissions"],
    queryFn: async () => {
      return await getPermissions();
    },
  });

  const mutationAdd = useMutation({
    mutationKey: ["add-compte-dash"],
    mutationFn: async () => await addUtilisateur(formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleCreateDialog(false)
      setFormData(initialFormData)
      setTypeCompte(null)
      setVisibleDialoMsg("Ajout Compte effectué avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorDialoMsg(err.message);
      setVisibleError(true);
    },
  });





  const mutationDelete = useMutation({
    mutationKey: ["delete-compte"],
    mutationFn: async(id) => {
      return await deleteCompte(id);
    },
    onSuccess: async () => {

       await queryClient.invalidateQueries([queryListKey]);

      setVisibleConfirmDeleteDialog(false);
      setVisibleDialoMsg("Compte Supprimé avec succès.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorDialoMsg(err.message);
      setVisibleError(true);
    },
  });


  const mutationUpdate = useMutation({
    mutationKey: ["update-compte"],
    mutationFn: async (id) => {
      console.log("boddy :::", formData);
      return await updateCompte(id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorDialoMsg(err.message);
      setVisibleError(true);
    },
  });



  const saveCompteData = () => {
    mutationAdd.mutate();
  };

  const updateCompteFn = ()=>{
    mutationUpdate.mutate(updatedId);
  }

  /*Fonctions */
    const acceptConfirmDeleteDialogFunction = (id) => {
      mutationDelete.mutate(id);
    };

    const deleteCompteConfirm = (id) => {
      setDeleteDataID(id);
      setVisibleConfirmDeleteDialog(true);
      };

  const getCompteById = async(id)=>{
    try {
      const response = await getCompte(id);
      setFormData(response);
      setVisibleCreateDialog(true)
      setIsShowOnly(true)
      console.log("response :", response);
    } catch (error) {

      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  }

  const ajouterCompte = () => {
    setFormData(initialFormData)
    setVisibleCreateDialog(true);
    setIsShowOnly(false);
  };

  const showUpdateDialogCompte = async(id) => {
     try {
      const response = await getCompte(id);
      setFormData(response);
      setUpdatedId(response?.id)
      setVisibleUpdateDialog(true)
      setIsShowOnly(false);
    } catch (error) {

      setVisibleUpdateDialog(false);
      setIsShowOnly(false);
    }
  };


  const customizeQueryData = (data) => {
    try {
      const rate = pageForUser * pageSizeForUser - pageSizeForUser;
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
    const dataResults = usersData?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setUserList(dataReceive);
  }, [usersData]);

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
              onClick={() => ajouterCompte()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">
          {" "}
          Liste des Comptes ({usersData?.pagination?.totalItems})
        </h3>
        <ComptesTable
          data={usersList}
          setPage={setPage}
          page={page}
          dataFromQuery={usersData}
          isPlaceholderData={isPlaceholderData}
          isLoading={isLoadingUsersData}
          isFetching={isFetchingUsersData}
          queryListKey={queryListKey}
          getCompteById={getCompteById}
          deleteCompteConfirm={deleteCompteConfirm}
          showUpdateDialogCompte={showUpdateDialogCompte}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Compte"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updateCompteFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
        dialogStyle={{ width: "40vw" }}
      >
        <AddCompteForm
          typeCompte={typeCompte}
          setTypeCompte={setTypeCompte}
          formData={formData}
          updated={true}
          setFormData={setFormData}
          listUserByType={listUserByType}
          listPermissions={listPermissions}
        />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Compte"
            : "Formulaire Création Compte"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveCompteData}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
        dialogStyle={{ width: "40vw" }}
      >
        <AddCompteForm
          isShowOnly={isShowOnly}
          typeCompte={typeCompte}
          setTypeCompte={setTypeCompte}
          formData={formData}
          setFormData={setFormData}
          listUserByType={listUserByType}
          listPermissions={listPermissions}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/comptes`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/comptes`}
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

export default Comptes
