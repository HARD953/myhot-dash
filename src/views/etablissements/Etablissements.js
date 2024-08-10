import React, { useEffect, useRef, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { domaine_path } from "src/api/instanceAxios";
import { formatDataToDropdownCodeName } from "src/utils/utils";
import {
  addEtablissement,
  deleteEtablissement,
  getEtablissement,
  getEtablissements,
  getEtablissementsByType,
  updateEtablissement,
} from "src/api/etablissements/etablissements";
import HeaderContentSub from "src/components/others/HeaderContentSUb";
import EtablissementsTable from "src/components/tables/etablissements/EtablissementsTable";
import SuccesDialog from "src/components/dialogs/succesDialog";
import ErrorDialog from "src/components/dialogs/errorDialog";
import AddEtablissementForm from "src/components/forms/etablissements/addEtablissementForm";
import CreateTemplateDialog from "src/components/dialogs/createTemplateDialog";
import { getTypesEtablissements } from "src/api/parametres/parametres";
import TabMenuComponent from "src/components/others/TabMenuComponent";

import "src/assets/css/chambres.css";
import { appUrl } from "src/appUrl";

const Etablissements = () => {
  const queryListKey = "list-etablissements";
  const navigate = useNavigate();
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [itemSelected, setItemSelected] = useState(0);

  // const itemsTitle = [
  //     {label: 'Toutes', icon: 'pi pi-fw pi-calendar',title: ""},
  //     {label: 'En Cours ', icon: 'pi pi-fw pi-calendar-plus', title:"En Cours"},
  //     {label: 'En Attentes', icon: 'pi pi-fw pi-calendar-minus', title: "En Attentes"},
  //     {label: 'Annulées', icon: 'pi pi-fw pi-calendar-times', title: "En Annulées"},
  // ];

  const initialFormData = {
    titre: "",
    description: "",
    latitude: "",
    longitude: "",
    telephone: "",
    email: "",
    pays: "",
    ville: "",
    commune: "",
    type_id: "",
  };

  const page = 1;
  const pageSize = 30;
  const pageForEtablissement = 1;
  const pageSizeForEtablissement = 30;
  const queryClient = useQueryClient();
  const toast = useRef(null);

  const [formData, setFormData] = useState(initialFormData);

  const [sizeDataTable, setSizeDataTable] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ItemsTitleEtablissement, setItemsTitleEtablissement] = useState([]);
  const [itemSelected, setItemSelected] = useState(0);

  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [isShowOnly, setIsShowOnly] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);

  const [listTypeEtablissement, setListTypeEtablissement] = useState([]);
  const [etablissementsData, setEtablissementsData] = useState([]);
  const [pagePagination, setPagePagination] = useState(1);


  const {
    data: dataListEtabli,
    isFetching: isFetchingEtabli,
    isLoading: isLoadingEtabli,
    isPlaceholderData,
  } = useQuery({
    queryKey: [queryListKey, activeIndex, listTypeEtablissement],
    queryFn: async () => {
      if (!!ItemsTitleEtablissement?.[activeIndex]?.id) {
        return await getEtablissementsByType(
          pageForEtablissement,
          pageSizeForEtablissement,
          ItemsTitleEtablissement?.[activeIndex]?.id
        );
      } else {
        return await getEtablissements(
          pageForEtablissement,
          pageSizeForEtablissement
        );
      }
    },
    placeholderData: keepPreviousData,
  });

  const {
    data: dataListTypeEtablissement,
    isFetching: isFetchingTypeEtablissemen,
    isLoading: isLoadingTypeEtablissemen,
  } = useQuery({
    queryKey: ["liste-type-etablissements"],
    queryFn: async () => await getTypesEtablissements(page, pageSize),
  });

  const mutationAdd = useMutation({
    mutationKey: ["add-etablissement"],
    mutationFn: async (newData) => {
      return await addEtablissement(newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setVisibleCreateDialog(false);
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
    mutationKey: ["delete-etablissement"],
    mutationFn: async (id) => {
      return await deleteEtablissement(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      // setVisibleDialoMsg("Suppression effectuée avec suces.");
      // setVisibleAdd(true);
      toast.current.show({
        severity: "info",
        summary: "Confirmée",
        detail: "Suppression effectuée avec succès.",
        life: 3000,
      });
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-etablissement"],
    mutationFn: async (id) => {
      console.log("boddy :::", formData);
      return await updateEtablissement(id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);

      setVisibleCreateDialog(false);
      setFormData(initialFormData);
      setVisibleDialoMsg("Modification effectuée avec suces.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const updateEtablissementFn = () => {
    mutationUpdate.mutate(updatedId);
  };

  /*Fonctions */
  const accept = (id) => {
    mutationDelete.mutate(id);
  };

  const deleteEtablissementConfirm = (id) => {
    confirmDialog({
      message:
        "Êtes-vous sûr de vouloir supprimer les données de cet Etablissement ?",
      header: "Confirmation Suppression",
      draggable: false,
      maximized: false,
      acceptClassName: "p-button-danger",
      rejectClassName: "float-start p-button-text",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      icon: "pi pi-info-circle",
      // footer: footerConfirm,
      defaultFocus: "reject",
      accept: () => accept(id),
      // reject,
    });
  };

  const getEtablissementById = async (id) => {
    try {
      const response = await getEtablissement(id);
      setFormData(response);
      setVisibleCreateDialog(true);
      setIsShowOnly(true);
      console.log("response :", response);
    } catch (error) {
      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  };

  const ajouterEtablissement = () => {
    // setFormData(initialFormData);
    // setVisibleCreateDialog(true);
    // setIsShowOnly(false);
    navigate(`${appUrl.etablissement.create}`);
  };

  const showUpdateDialogEtablissement = async (id) => {
    try {
      const response = await getEtablissement(id);
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
      const rate = page * pageSize - pageSize;
      return (data || [])?.map((support, index) => ({
        ...support,
        numero: index + 1 + rate,
      }));
    } catch (error) {
      return [];
    }
  };

  const formatDataListTypeEtablissementForItemTitle = (data) => {
    try {
      if (!data || !data?.length) return [];

      return data?.map((item) => ({
        title: item?.type,
        label: item?.type,
        id: item?.id,
      }));
    } catch (error) {
      return [];
    }
  };

  /*Fin Fonctions */

  /* Gestionnaire d'evenements */

  useEffect(() => {
    const typeEtablissements = dataListTypeEtablissement?.results;
    const formatedData = formatDataToDropdownCodeName(
      typeEtablissements,
      "id",
      "type",
      true
    );
    setListTypeEtablissement(formatedData);
  }, [dataListTypeEtablissement]);

  useEffect(() => {
    const dataResults = dataListEtabli?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setEtablissementsData(dataReceive);
  }, [dataListEtabli]);

  useEffect(() => {
    const dataNotFormated = dataListTypeEtablissement?.results || [];
    const formatedData =
      formatDataListTypeEtablissementForItemTitle(dataNotFormated);
    setItemsTitleEtablissement(formatedData);
    console.log("formatedData ::", formatedData);
  }, [dataListTypeEtablissement]);

  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Liste des Etablissements"
            subTitle="Gérer vos établissements"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center chambres-header-container px-md-4 px-1">
        <TabMenuComponent
          items={ItemsTitleEtablissement}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
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
              onClick={() => ajouterEtablissement()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        {/* <h3 className='fw-bold mb-3' > Liste des Etablissements </h3> */}

        <EtablissementsTable
          data={etablissementsData}
          setPagePagination={setPagePagination}
          pagePagination={pagePagination}
          etablissementDataQuery={dataListEtabli}
          isPlaceholderData={isPlaceholderData}
          isFetching={isFetchingEtabli}
          isLoading={isLoadingEtabli}
          getEtablissementById={getEtablissementById}
          deleteEtablissementConfirm={deleteEtablissementConfirm}
          showUpdateDialogEtablissement={showUpdateDialogEtablissement}
          setSizeDataTable={setSizeDataTable}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Etablissement"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updateEtablissementFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
      >
        <AddEtablissementForm
          listTypeEtablissement={listTypeEtablissement}
          formData={formData}
          setFormData={setFormData}
        />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Etablissement"
            : "Formulaire Création Etablissement"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveEntry}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
      >
        <AddEtablissementForm
          isShowOnly={isShowOnly}
          formData={formData}
          setFormData={setFormData}
          listTypeEtablissement={listTypeEtablissement}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/etablissements`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/etablissements`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg="Une erreur est survenue. Réessayez!!"
      />
    </>
  );
};

export default Etablissements;
