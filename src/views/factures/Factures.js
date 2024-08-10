import React, { useEffect, useState } from 'react'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {  deleteFacture, getFacture, getFactures } from 'src/api/factures/factures'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'


import HeaderContentSub from 'src/components/others/HeaderContentSUb'
import FacturesTable from 'src/components/tables/factures/FacturesTable'


const Factures = () => {
  const itemsTitle = [
      {label: 'Toutes', icon: 'pi pi-fw pi-calendar',title: ""},
      {label: 'En Cours ', icon: 'pi pi-fw pi-calendar-plus', title:"En Cours"},
      {label: 'Terminées', icon: 'pi pi-fw pi-calendar-minus', title: "Terminées"},
    ];


  const queryListKey = "list-factures";
  const queryClient = useQueryClient();







    const {
      data: facturesData,
      isFetching: isFetchingFacturesData,
      isLoading: isLoadingFacturesData,
      isPlaceholderData,
    } = useQuery({
      queryKey: [queryListKey],
      queryFn: async () => await getFactures(),
      placeholderData: keepPreviousData,
    });



  const mutationDelete = useMutation({
    mutationKey: ["delete-facture"],
    mutationFn: async (id) => {
      return await deleteFacture(id);
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





  const deleteFactureConfirm = (id) => {
    confirmDialog({
      message:
        "Êtes-vous sûr de vouloir supprimer les données de cet Facture ?",
      header: "Confirmation Suppression",
      draggable: false,
      maximized: true,
      icon: "pi pi-info-circle",
      footer: footerConfirm,
      defaultFocus: "reject",
      accept: () => accept(id),
    });
  };

  const getFactureById = async (id) => {
    try {
      const response = await getFacture(id);
      setFormData(response);
      setVisibleCreateDialog(true);
      setIsShowOnly(true);
      console.log("response :", response);
    } catch (error) {
      setVisibleCreateDialog(false);
      setIsShowOnly(false);
    }
  };




  /*Fin Fonctions */


  /* Gestionnaire d'evenements */



  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <ConfirmDialog />
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Factures"
            subTitle="Garder un oeil sur les Factures de Réservations"
          />
        </div>
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">Liste des Factures</h3>
        <FacturesTable
          queryListKey={queryListKey}
          data={facturesData}
          isLoading={isLoadingFacturesData || isFetchingFacturesData}
          getFactureById={getFactureById}
          deleteFactureConfirm={deleteFactureConfirm}
        />
      </div>
    </>
  );
}

export default Factures;
