import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import HeaderContentSub from 'src/components/others/HeaderContentSUb'
import TabMenuComponent from 'src/components/others/TabMenuComponent'

import SuccesDialog from "src/components/dialogs/succesDialog";
import ErrorDialog from "src/components/dialogs/errorDialog";
import { addPermission, deletePermission, getPermission, getPermissions, getPermissionsDisponibilite, updatePermission } from 'src/api/permissions/permissions'
import PermissionsTable from 'src/components/tables/permissions/PermissionsTable'
import CreateTemplateDialog from 'src/components/dialogs/createTemplateDialog'
import AddPermissionForm from 'src/components/forms/permissions/addPermissionForm'
import { domaine_path } from 'src/api/instanceAxios'


// import 'src/assets/css/permissions.css'





const Permissions = () => {


  const queryListKey = "list-permissions";
  const initialFormData = {
    titre: "",
    description: "",
  };

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);


  const [sizeDataTable, setSizeDataTable] = useState(0);
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [isShowOnly, setIsShowOnly] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);



   const {
     data: permissionsData,
     isFetching: isFetchingPermissionsData,
     isLoading: isLoadingPermissionsData,
   } = useQuery({
     queryKey: [queryListKey],
     queryFn: async () =>await getPermissions()
    });



  const mutationAdd = useMutation({
    mutationKey: ["add-permission"],
    mutationFn: async (newData) => {
      return await addPermission(newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleCreateDialog(false)
      setFormData(initialFormData);
      setVisibleDialoMsg("Ajout effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["delete-permission"],
    mutationFn: async (id) => {
      return await deletePermission(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Suppression effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-permission"],
    mutationFn: async (id) => {
      console.log("boddy :::", formData);
      return await updatePermission(id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleUpdateDialog(false);
      setFormData(initialFormData)

      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const updatePermissionFn = () => {
    mutationUpdate.mutate(updatedId);
  };

  /*Fonctions */
  const accept = (id) => {
    mutationDelete.mutate(id);
  };

  const reject = () => {};

  const footerConfirm = (option) => {
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
          className="p-button-danger rounded"
        />
      </div>
    );
  };

  const deletePermissionConfirm = (id) => {
    confirmDialog({
      message:
        "Êtes-vous sûr de vouloir supprimer les données de cette Permission ?",
      header: "Confirmation Suppression",
      draggable: false,
      maximized: true,
      icon: "pi pi-info-circle",
      footer: footerConfirm,
      defaultFocus: "reject",
      accept: () => accept(id),
      reject,
    });
  };

  const getPermissionById = async (id) => {
    try {
      const response = await getPermission(id);
      setFormData(response);
      setVisibleCreateDialog(true);
      setIsShowOnly(true);
    } catch (error) {
      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  };

  const ajouterPermission = () => {
    setFormData(initialFormData);
    setVisibleCreateDialog(true);
    setIsShowOnly(false);
  };

  const showUpdateDialogPermission = async (id) => {
    try {
      const response = await getPermission(id);
      setFormData(response);
      setUpdatedId(response?.id);
      setVisibleUpdateDialog(true);
      setIsShowOnly(false);
    } catch (error) {
      setVisibleUpdateDialog(false);
      setIsShowOnly(false);
    }
  };

  const saveEntry = () => {
    mutationAdd.mutate(formData);
  };


  /* Gestionnaire d'evenements */



  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Permissions"
            subTitle="Administrer vos permissions"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center permissions-header-container px-md-4 px-1">
        <div className=" mt-md-0 mt-3">
          <div className="d-flex justify-content align-items-center gap-5">
            <Button
              rounded
              className="rounded-pill"
              icon="pi pi-trash"
              label="Supprimer"
              severity="danger"
            />
            <Button
              rounded
              className="rounded-pill"
              icon="pi pi-plus"
              label="Ajouter"
              severity="info"
              onClick={() => ajouterPermission()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">Liste des permissions</h3>
        <PermissionsTable
          data={permissionsData}
          isLoading={isLoadingPermissionsData}
          isFetching={isFetchingPermissionsData}
          queryListKey={queryListKey}
          getPermissionById={getPermissionById}
          deletePermissionConfirm={deletePermissionConfirm}
          showUpdateDialogPermission={showUpdateDialogPermission}
          setSizeDataTable={setSizeDataTable}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Permission"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updatePermissionFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
        dialogStyle={{ width: "45vw" }}
        dialogBreakpoints={{ "960px": "45vw", "641px": "100vw" }}
      >
        <AddPermissionForm formData={formData} setFormData={setFormData} />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Permission"
            : "Formulaire Création Permission"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveEntry}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
        dialogStyle={{ width: "45vw" }}
        dialogBreakpoints={{ "960px": "45vw", "641px": "100vw" }}
      >
        <AddPermissionForm
          isShowOnly={isShowOnly}
          formData={formData}
          setFormData={setFormData}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/permissions`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/permissions`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg="Une erreur est survenue. Réessayez!!"
      />
    </>
  );
}

export default Permissions
