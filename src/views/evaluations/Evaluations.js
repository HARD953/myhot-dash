import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";

import HeaderContentSub from "src/components/others/HeaderContentSUb";
import TabMenuComponent from "src/components/others/TabMenuComponent";

import EvaluationsTable from "src/components/tables/evaluations/EvaluationsTable";

import "src/assets/css/chambres.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getEvaluations,
  getEvaluationsAccepted,
  getEvaluationsRefused,
} from "src/api/evaluations/evaluations";

const Observations = () => {
  const pageForEvaluations = 1;
  const pageSizeForEvaluations = 10;
  const queryListKey = "evaluations";
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemSelected, setItemSelected] = useState(0);
  const [evaluations, setEvaluations] = useState([]);
  const [pagePagination, setPagePagination] = useState(1);

  const itemsTitle = [
    { label: "En attentes", icon: "pi pi-fw pi-calendar", title: "" },
    {
      label: "Approuvées ",
      icon: "pi pi-fw pi-calendar-plus",
      title: "Approuvées",
    },
    {
      label: "Réjétées",
      icon: "pi pi-fw pi-calendar-minus",
      title: "Réjétées",
    },
  ];

  const {
    data: evaluationsData,
    isFetching: isFetchingEvaluationsData,
    isLoading: isLoadingEvaluationsData,
    isPlaceholderData,
  } = useQuery({
    queryKey: [queryListKey, activeIndex],
    queryFn: async () => {
      switch (activeIndex) {
        case 0:
          return await getEvaluations(
            pageForEvaluations,
            pageSizeForEvaluations
          );

        case 1:
          return await getEvaluationsAccepted(
            pageForEvaluations,
            pageSizeForEvaluations
          );

        case 2:
          return await getEvaluationsRefused(
            pageForEvaluations,
            pageSizeForEvaluations
          );

        default:
          return await getEvaluations(
            pageForEvaluations,
            pageSizeForEvaluations
          );
      }
    },
    placeholderData: keepPreviousData,
  });

  /*Fonctions */
  const customizeQueryData = (data) => {
    try {
      const rate =
        pageForEvaluations * pageSizeForEvaluations - pageSizeForEvaluations;
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
    const intemSelectedContent = itemsTitle[activeIndex];
    setItemSelected(intemSelectedContent?.title);
  }, [activeIndex]);

  useEffect(() => {
    const dataResults = evaluationsData?.results || [];
    const dataReceive = customizeQueryData(dataResults);
    setEvaluations(dataReceive);
  }, [evaluationsData]);

  /* Fin Gestionnaire d'evenements */

  return (
    <>
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Evaluations"
            subTitle="Tous savoir sur les avis des clients"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center chambres-header-container px-md-4 px-1">
        <TabMenuComponent
          items={itemsTitle}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        {/* <div className=" mt-md-0 mt-3">
          <div className="d-flex justify-content align-items-center gap-5">
            <Button
              rounded
              className="rounded-pill"
              icon="pi pi-trash"
              label="Supprimer"
              severity="danger"
            />
          </div>
        </div> */}
      </div>
      <div className="px-md-4 px-2 mt-5">
        <h3 className="fw-bold mb-3">
          {" "}
          Liste des évaluations {itemSelected}{" "}
        </h3>
        <EvaluationsTable
          data={evaluations}
          setPagePagination={setPagePagination}
          pagePagination={pagePagination}
          evaluationDataQuery={evaluationsData}
          isPlaceholderData={isPlaceholderData}
          isLoading={isLoadingEvaluationsData}
          isFetching={isFetchingEvaluationsData}
          activeIndex={activeIndex}
        />
      </div>
    </>
  );
};

export default Observations;
