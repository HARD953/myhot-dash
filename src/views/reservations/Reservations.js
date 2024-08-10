import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import HeaderContentSub from "src/components/others/HeaderContentSUb";
import TabMenuComponent from "src/components/others/TabMenuComponent";

// import 'src/assets/css/reservations.css'

import ReservationsTable from "src/components/tables/reservations/ReservationsTable";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReservation,
  deleteReservation,
  getReservation,
  getReservationsIsCancelled,
  getReservationsIsCompleted,
  getReservationsIsConfirmed,
  getReservationsIsWaiting,
  updateReservation,
  updateSatutReservation,
} from "src/api/reservations/reservations";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import CreateTemplateDialog from "src/components/dialogs/createTemplateDialog";
import AddReservationForm from "src/components/forms/reservations/addReservationForm";
import SuccesDialog from "src/components/dialogs/succesDialog";
import ErrorDialog from "src/components/dialogs/errorDialog";
import { domaine_path } from "src/api/instanceAxios";
import {
  getChambresDisponibles,
} from "src/api/chambres/chambres";
import { getTypesChambres } from "src/api/parametres/parametres";
import { formatDataToDropdownCodeName, formatDateToYearMonthDay } from "src/utils/utils";
import { getPersonneClients } from "src/api/personnes/personnes";




const Reservations = () => {
  const itemsTitle = [
    {
      value: "waitting",
      icon: "pi pi-fw pi-calendar-minus",
      label: "En Attentes",
      title: "En Attentes",
    },
    {
      value: "confirmed",
      icon: "pi pi-fw pi-calendar-plus",
      label: "En Cours",
      title: "En Cours",
    },
    {
      value: "completed",
      icon: "pi pi-fw pi-calendar-times",
      label: "Terminées",
      title: "Terminées",
    },
    {
      value: "cancelled",
      icon: "pi pi-fw pi-calendar-times",
      label: "En Annulées",
      title: "En Annulées",
    },
    // { label: "Toutes", icon: "pi pi-fw pi-calendar", title: "", value: "" },
  ];

  const pageForReservation= 1;
  const pageSizeForReservation = 10;
  const queryListKey = "list-reservations";
  const initialFormData = {
    dateDebut: null,
    dateFin: null,
    nombrePersonne: 1,
    chambreId: null,
    personneId: null,
  };


  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemSelected, setItemSelected] = useState(0);

  const [sizeDataTable, setSizeDataTable] = useState(0);
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [errorMesg, setErrorMesg] = useState("");
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [isShowOnly, setIsShowOnly] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);


  const [typeChambre, setTypeChambre] = useState(null);
  const [listTypeChambre, setListTypeChambre] = useState([]);
  const [page, setPage] = useState(1);
  const [reservationsList, setReservationsList] = useState([]);

  const {
    data: reservationsData,
    isFetching: isFetchingReservationsData,
    isLoading: isLoadingReservationsData,
    isPlaceholderData,
  } = useQuery({
    queryKey: [queryListKey, activeIndex],
    queryFn: async () => {
      switch (itemsTitle[activeIndex].value) {
        case "waitting":
          return await getReservationsIsWaiting(
            pageForReservation,
            pageSizeForReservation
          );
        case "confirmed":
          return await getReservationsIsConfirmed(
            pageForReservation,
            pageSizeForReservation
          );
        case "cancelled":
          return await getReservationsIsCancelled(
            pageForReservation,
            pageSizeForReservation
          );
        case "completed":
          return await getReservationsIsCompleted(
            pageForReservation,
            pageSizeForReservation
          );
        default:
          break;
      }
    },
    placeholderData: keepPreviousData,
  });




  const {
    data: dataListTypeChambre,
    isFetching: isFetchingTypeChambre,
    isLoading: isLoadingTypeChambre,
  } = useQuery({
    queryKey: ["liste-type-chambre"],
    queryFn: async () => await getTypesChambres(1, 50),
  });


  const {
    data: chambresDisponibleData,
    isFetching: isFetchingchambresDisponibleData,
    isLoading: isLoadingChambresDisponibleData,
  } = useQuery({
    queryKey: [queryListKey, formData.dateDebut, formData.dateFin, typeChambre],
    queryFn: async () =>
      await getChambresDisponibles(
        formatDateToYearMonthDay(formData?.dateDebut),
        formatDateToYearMonthDay(formData?.dateFin),
        typeChambre
      ),
  });


    const {
      data: clientsData,
      isFetching: isFetchingClientsData,
      isLoading: isLoadingClientsData,
      isPlaceholderData: isPlaceholderDataClient,
    } = useQuery({
      queryKey: ["list-client-reservations"],
      queryFn: async () =>
        await getPersonneClients(1, 100),
      placeholderData: keepPreviousData,
    });


  const mutationAdd = useMutation({
    mutationKey: ["add-reservation"],
    mutationFn: async (newData) => {
      return await addReservation(newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Ajout effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorMesg(err.message);
      setVisibleError(true);
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["delete-reservation"],
    mutationFn: async (id) => {
      return await deleteReservation(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Suppression effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorMesg(err.message);
      setVisibleError(true);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-reservation"],
    mutationFn: async (id) => {
      console.log("boddy :::", formData);
      return await updateReservation(id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorMesg(err.message);
      setVisibleError(true);
    },
  });

  const mutationUpdateStatutReservation = useMutation({
    mutationKey: ["update-reservation-statut"],
    mutationFn: async ({ id, newData }) => {
      return await updateSatutReservation(id, newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const updateReservationFn = () => {
    mutationUpdate.mutate(updatedId);
  };

  /*Fonctions */
  const accept = (id) => {
    mutationDelete.mutate(id);
  };

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

  const deleteReservationConfirm = (id) => {
    confirmDialog({
      message:
        "Êtes-vous sûr de vouloir supprimer les données de cet Reservation ?",
      header: "Confirmation Suppression",
      draggable: false,
      maximized: true,
      icon: "pi pi-info-circle",
      footer: footerConfirm,
      defaultFocus: "reject",
      accept: () => accept(id),
    });
  };

  const getReservationById = async (id) => {
    try {
      const response = await getReservation(id);
      setFormData(response);
      setVisibleCreateDialog(true);
      setIsShowOnly(true);
      console.log("response :", response);
    } catch (error) {
      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  };

  const ajouterReservation = () => {
    setFormData(initialFormData);
    setVisibleCreateDialog(true);
    setIsShowOnly(false);
  };

  const showUpdateDialogReservation = async (id) => {
    try {
      const response = await getReservation(id);
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
    mutationAdd.mutate({
      ...formData,
      dateDebut: !!formData?.periode
        ? formatDateToYearMonthDay(formData?.periode[0])
        : null,
      dateFin: !!formData?.periode
        ? formatDateToYearMonthDay(formData?.periode[1])
        : null,
    });
  };

   const customizeQueryData = (data) => {
     try {
       const rate =
         pageForReservation * pageSizeForReservation - pageSizeForReservation;
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
    const dataResults = reservationsData?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setReservationsList(dataReceive);
  }, [reservationsData]);


  useEffect(() => {
    const intemSelectedContent = itemsTitle[activeIndex];
    setItemSelected(intemSelectedContent?.title);
  }, [activeIndex]);



  useEffect(() => {
      const typeChambres = dataListTypeChambre?.results;
      const formatedData = formatDataToDropdownCodeName(
        typeChambres,
        "id",
        "type",
        true
      );
      setListTypeChambre(formatedData);
  }, [dataListTypeChambre]);

  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Reservations"
            subTitle="Contrôler Toutes Réservations"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center reservations-header-container px-md-4 px-1">
        <TabMenuComponent
          items={itemsTitle}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
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
              label="Ajouter une reservation"
              severity="info"
              onClick={() => ajouterReservation()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">
          {" "}
          Liste des Reservations {itemSelected} (
          {reservationsData?.pagination?.totalItems || 0})
        </h3>
        <ReservationsTable
          data={reservationsList}
          setPage={setPage}
          page={page}
          dataFromQuery={reservationsData}
          isPlaceholderData={isPlaceholderData}
          isFetching={isFetchingReservationsData}
          isLoading={isLoadingReservationsData}
          mutationUpdateStatutReservation={mutationUpdateStatutReservation}
          queryListKey={queryListKey}
          getReservationById={getReservationById}
          deleteReservationConfirm={deleteReservationConfirm}
          showUpdateDialogReservation={showUpdateDialogReservation}
          setSizeDataTable={setSizeDataTable}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Reservation"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updateReservationFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
        dialogStyle={{ width: "40vw" }}
      >
        <AddReservationForm
          listTypeChambre={listTypeChambre}
          dataListClients={clientsData}
          isShowOnly={isShowOnly}
          typeChambre={typeChambre}
          setTypeChambre={setTypeChambre}
          formData={formData}
          setFormData={setFormData}
          isLoadingTypeChambre={isLoadingTypeChambre || isFetchingTypeChambre}
          chambresDisponibleData={chambresDisponibleData}
          isLoadingChambresDisponibleData={
            isLoadingChambresDisponibleData || isFetchingchambresDisponibleData
          }
        />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Reservation"
            : "Formulaire Création Reservation"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveEntry}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
        dialogStyle={{ width: "40vw" }}
      >
        <AddReservationForm
          listTypeChambre={listTypeChambre}
          dataListClients={clientsData}
          isShowOnly={isShowOnly}
          typeChambre={typeChambre}
          setTypeChambre={setTypeChambre}
          formData={formData}
          setFormData={setFormData}
          isLoadingTypeChambre={isLoadingTypeChambre || isFetchingTypeChambre}
          chambresDisponibleData={chambresDisponibleData}
          isLoadingChambresDisponibleData={
            isLoadingChambresDisponibleData || isFetchingchambresDisponibleData
          }
          isLoadingClientsData={isLoadingClientsData || isFetchingClientsData}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/reservations`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/reservations`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg={!!errorMesg ? errorMesg : "Une erreur est survenue. Réessayez!!"}
      />
    </>
  );
};

export default Reservations;
