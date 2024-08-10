import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import HeaderContentSub from 'src/components/others/HeaderContentSUb'
import TabMenuComponent from 'src/components/others/TabMenuComponent'

import SuccesDialog from "src/components/dialogs/succesDialog";
import ErrorDialog from "src/components/dialogs/errorDialog";
import { addChambre, deleteChambre, getChambre, getChambres, getChambresDisponibilite, updateChambre } from 'src/api/chambres/chambres'
import ChambresTable from 'src/components/tables/chambres/ChambresTable'
import CreateTemplateDialog from 'src/components/dialogs/createTemplateDialog'
import AddChambreForm from 'src/components/forms/chambres/addChambreForm'
import { domaine_path } from 'src/api/instanceAxios'


import 'src/assets/css/chambres.css'
import { formatDataToDropdownCodeName } from 'src/utils/utils';
import { getTypesChambres } from 'src/api/parametres/parametres';
import { useNavigate } from 'react-router-dom';
import { appUrl } from 'src/appUrl';





const Chambres = () => {
  const navigate = useNavigate()
  const itemsTitle = [
    { label: "Toutes chambres ", icon: "pi pi-fw pi-home", title: "" },
    {
      label: "Libres",
      icon: "pi pi-fw pi-calendar",
      title: "Libres",
      value: "non_occupee",
    },
    {
      label: "Occupées",
      icon: "pi pi-fw pi-calendar-times",
      title: "Occupées",
      value: "occupee",
    },
  ];


  const queryListKey = "list-chambres";
  const initialFormData = {
    titre: "",
    description: "",
    prix_nuit: 0,
    nombre_lits: 1,
    nombre_personne: 1,
    type_id: "",
    etablissement_id: "",
    equipements_mobilier: [],
    equipements_electronique: [],
    equipements_salle_bains: [],
    equipements_suplementaires: [],
    equipements_securite: [],
    equipements_autres: [],
  };

  const page = 1;
  const pageSize = 30;
  const pageForChambre = 1;
  const pageSizeForChambre= 10;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemSelected, setItemSelected] = useState(0);

  const [sizeDataTable, setSizeDataTable] = useState(0);
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [isShowOnly, setIsShowOnly] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);

  const [listTypeChambre, setListTypeChambre] = useState([]);
  const [chambresList, setChambresList] = useState([]);
  const [pagePagination, setPagePagination] = useState(1);
;


   const {
     data: chambresData,
     isFetching: isFetchingChambresData,
     isLoading: isLoadingChambresData,
     isPlaceholderData,
   } = useQuery({
     queryKey: [queryListKey],
     queryFn: async () => await getChambres(pageForChambre, pageSizeForChambre),
     placeholderData: keepPreviousData,
   });



  const {
    data: dataListTypeChambre,
    isFetching: isFetchingTypeChambre,
    isLoading: isLoadingTypeChambre,
  } = useQuery({
    queryKey: ["liste-type-chambre"],
    queryFn: async () => await getTypesChambres(page, pageSize),
  });


  const mutationAdd = useMutation({
    mutationKey: ["add-chambre"],
    mutationFn: async (newData) => {
      return await addChambre(newData);
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
    mutationKey: ["delete-chambre"],
    mutationFn: async (id) => {
      return await deleteChambre(id);
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
    mutationKey: ["update-chambre"],
    mutationFn: async (id) => {
      console.log("boddy :::", formData);
      return await updateChambre(id, formData);
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

  const updateChambreFn = () => {
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

  const deleteChambreConfirm = (id) => {
    confirmDialog({
      message:
        "Êtes-vous sûr de vouloir supprimer les données de cet Chambre ?",
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

  // const getChambreById = async (id) => {
  //   try {
  //     const response = await getChambre(id);
  //     setFormData(response);
  //     setFormData(response);
  //     setVisibleCreateDialog(true);
  //     setIsShowOnly(true);
  //   } catch (error) {
  //     setVisibleCreateDialog(false);
  //     setIsShowOnly(false);
  //   }
  // };

  const ajouterChambre = () => {
    // setFormData(initialFormData);
    // setVisibleCreateDialog(true);
    // setIsShowOnly(false);
    navigate(`${appUrl.chambre.create}`,{replace: true});
  };

  const showUpdateDialogChambre = async (id) => {
    try {
      const response = await getChambre(id);
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

  /* Gestionnaire d'evenements */
  useEffect(()=>{
    const intemSelectedContent = itemsTitle[activeIndex]
    setItemSelected(intemSelectedContent?.title)
  },[activeIndex])


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

  useEffect(() => {
    const dataResults = chambresData?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setChambresList(dataReceive);
  }, [chambresData]);


  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Chambres"
            subTitle="Administrer vos chambres"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center chambres-header-container px-md-4 px-1">
        {/* <TabMenuComponent
          items={itemsTitle}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        /> */}
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
              onClick={() => ajouterChambre()}
            />
          </div>
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">
          {" "}
          Liste des chambres  (
          {chambresData?.results?.length || 0}){" "}
        </h3>
        <ChambresTable
          data={chambresList}
          setPagePagination={setPagePagination}
          pagePagination={pagePagination}
          chambreDataQuery={chambresData}
          isPlaceholderData={isPlaceholderData}
          isLoading={isLoadingChambresData}
          isFetching={isFetchingChambresData}
          deleteChambreConfirm={deleteChambreConfirm}
          showUpdateDialogChambre={showUpdateDialogChambre}
          setSizeDataTable={setSizeDataTable}
        />
      </div>

      <CreateTemplateDialog
        title="Formulaire Modification Chambre"
        visible={visibleUpdateDialog}
        setVisible={setVisibleUpdateDialog}
        saveFn={updateChambreFn}
        updated={true}
        isLoading={mutationUpdate?.isPending}
      >
        <AddChambreForm
          listTypeChambre={listTypeChambre}
          formData={formData}
          setFormData={setFormData}
        />
      </CreateTemplateDialog>

      <CreateTemplateDialog
        title={
          isShowOnly
            ? "Visualisation des informations Chambre"
            : "Formulaire Création Chambre"
        }
        visible={visibleCreateDialog}
        setVisible={setVisibleCreateDialog}
        saveFn={saveEntry}
        updated={false}
        isShowOnly={isShowOnly}
        isLoading={mutationAdd?.isPending}
      >
        <AddChambreForm
          isShowOnly={isShowOnly}
          listTypeChambre={listTypeChambre}
          formData={formData}
          setFormData={setFormData}
        />
      </CreateTemplateDialog>

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${domaine_path}/chambres`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${domaine_path}/chambres`}
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

export default Chambres
