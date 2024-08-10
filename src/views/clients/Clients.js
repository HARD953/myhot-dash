import React, { useEffect, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "primereact/button";
import ErrorDialog from "src/components/dialogs/errorDialog";
import { ConfirmDialog } from "primereact/confirmdialog";

import { domaine_path } from "src/api/instanceAxios";
import {
  addPersonne,
  deletePersonne,
  getPersonne,
  getPersonneClients,
  updatePersonne,
} from "src/api/personnes/personnes";
import HeaderContentSub from "src/components/others/HeaderContentSUb";
import ClientsTable from "src/components/tables/clients/ClientsTable";
import CreateTemplateDialog from "src/components/dialogs/createTemplateDialog";
import AddClientForm from "src/components/forms/clients/addClientForm";
import SuccesDialog from "src/components/dialogs/succesDialog";
import ConfirmDialogApp from "src/components/dialogs/ConfirmDialogApp";

import "src/assets/css/chambres.css";

const Clients = () => {
  const queryListKey = "list-clients";
  const pageForClient = 1;
  const pageSizeForClient = 10;
  const initialFormData = {
    nom: "",
    prenom: "",
    date_naissance: "",
    telephone: "",
    email: "",
    pays: "",
    ville: "",
    commune: "",
    type: "client",
  };

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
  const [visibleConfirmDeleteDialog, setVisibleConfirmDeleteDialog] =
    useState(false);
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
  const [page, setPage] = useState(1);
  const [clientsList, setClientsList] = useState([]);

  const {
    data: clientsData,
    isFetching: isFetchingClientsData,
    isLoading: isLoadingClientsData,
    isPlaceholderData,
  } = useQuery({
    queryKey: [queryListKey],
    queryFn: async () =>
      await getPersonneClients(pageForClient, pageSizeForClient),
    placeholderData: keepPreviousData,
  });

  const mutationAdd = useMutation({
    mutationKey: ["add-client"],
    mutationFn: async (newData) => {
      return await addPersonne(newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleCreateDialog(false);
      setFormData(initialFormData);
      setVisibleDialoMsg("Client ajouté avec succès.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorDialoMsg(err.message);
      setVisibleError(true);
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: async (id) => {
      return await deletePersonne(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleConfirmDeleteDialog(false);
      setVisibleDialoMsg("Client supprimé avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      setVisibleError(true);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-client"],
    mutationFn: async (id) => {
      return await updatePersonne(id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleUpdateDialog(false);
      setFormData(initialFormData);
      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      setVisibleError(true);
    },
  });

  const updateClientFn = () => {
    mutationUpdate.mutate(updatedId);
  };

  /*Fonctions */
  const acceptConfirmDeleteDialogFunction = (id) => {
    mutationDelete.mutate(id);
  };

  const deleteClientConfirm = (id) => {
    setDeleteDataID(id);
    setVisibleConfirmDeleteDialog(true);
  };

  const getClientById = async (id) => {
    try {
      const response = await getPersonne(id);
      setFormData(response);
      setVisibleCreateDialog(true);
      setIsShowOnly(true);
    } catch (error) {
      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  };
  const ajouterClient = () => {
    setFormData(initialFormData);
    setVisibleCreateDialog(true);
    setIsShowOnly(false);
  };

  const showUpdateDialogClient = async (id) => {
    try {
      const response = await getPersonne(id);
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

  const customizeQueryData = (data) => {
    try {
      const rate = pageForClient * pageSizeForClient - pageSizeForClient;
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
    const dataResults = clientsData?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setClientsList(dataReceive);
  }, [clientsData]);

  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Clients"
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
              onClick={() => ajouterClient()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">
          {" "}
          Liste des Clients ({clientsData?.pagination?.totalItems}){" "}
        </h3>
        <ClientsTable
          data={clientsList}
          setPage={setPage}
          page={page}
          dataFromQuery={clientsData}
          isPlaceholderData={isPlaceholderData}
          isLoading={isLoadingClientsData}
          isFetching={isFetchingClientsData}
          queryListKey={queryListKey}
          getClientById={getClientById}
          deleteClientConfirm={deleteClientConfirm}
          showUpdateDialogClient={showUpdateDialogClient}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Client"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updateClientFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
      >
        <AddClientForm formData={formData} setFormData={setFormData} />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Client"
            : "Formulaire Création Client"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveEntry}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
      >
        <AddClientForm
          isShowOnly={isShowOnly}
          formData={formData}
          setFormData={setFormData}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/clients`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/clients`}
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
        message="Êtes-vous sûr de vouloir supprimer les données de ce Client ?"
        header="Confirmation Suppression"
        acceptFunction={acceptConfirmDeleteDialogFunction}
        dataID={deleteDataID}
      />
    </>
  );
};

export default Clients;
