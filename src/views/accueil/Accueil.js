import React, { useState } from 'react'
import CardAccueil from 'src/components/cards/accueil/CardAccueil'
import HeaderContentSub from 'src/components/others/HeaderContentSUb'
import { cilHome, cilPeople, cilNewspaper, cilAddressBook } from '@coreui/icons'

import 'src/assets/css/accueil.css'
import CardReservations from 'src/components/cards/accueil/CardReservations'
import LineReservation from 'src/components/charts/LineReservation'
import LineRecettes from 'src/components/charts/LineRecettes'
import { Calendar } from 'primereact/calendar'
import { getStatistiquesEvolutionsRecettesMois, getStatistiquesEvolutionsReservationsMois, getStatistiquesGenerales } from 'src/api/statistiques/statistiques'
import { useQuery } from '@tanstack/react-query'
import BarReservations from 'src/components/charts/BarReservations'

const Accueil = () => {
  const today = new Date()
  const [startDate,setStartDate] = useState(today)
  const [endDate,setEndDate] = useState(today)

  const {
      data: statistiquesData,
      isFetching: isFetchingStatistiquesGenerale,
      isLoading: isLoadingStatistiquesGenerale,
    } = useQuery({
      queryKey: ["statistiques-generales"],
      queryFn: async ({ pageParam }) => await getStatistiquesGenerales(),
  });


  const {
    data: statistiquesEvolutionReservationMois,
    isFetching: isFetchingStatEvolutionReservationMois,
    isLoading: isLoadingStatEvolutionReservationMois,
  } = useQuery({
    queryKey: ["statistiques-evolution-reservations-mois"],
    queryFn: async ({ pageParam }) =>
      await getStatistiquesEvolutionsReservationsMois(),
  });


 const {
    data: statistiquesEvolutionRecettesMois,
    isFetching: isFetchingStatEvolutionRecettesMois,
    isLoading: isLoadingStatEvolutionRecettesMois,
  } = useQuery({
    queryKey: ["statistiques-evolution-recettes-mois"],
    queryFn: async ({ pageParam }) =>
      await getStatistiquesEvolutionsRecettesMois(),
  });



    console.log(
      "statistiquesEvolutionRecettesMois ::",
      statistiquesEvolutionRecettesMois
    );

  return (
    <>
      <div className="container-fluid header-content-page row">
        <div className="col-md-5">
          <HeaderContentSub
            title="Accueil"
            subTitle="Avoir les details sur les activités de vos établissements"
          />
        </div>
        <div className="col-md-7 mt-md-0 mt-3">
          <div className="d-flex justify-content-end g-2">
            <div className="mx-1">
              <h6
                className="fw-bolder myhot_zindex_2 text-white h6"
                htmlFor="endDate"
              >
                {" "}
                Période Début{" "}
              </h6>
              <Calendar
                inputClassName="rounded-pill"
                value={startDate}
                onChange={(e) => setStartDate(e.value)}
              />
            </div>
            <div className="mx-1">
              <h6
                className="fw-bolder myhot_zindex_2 text-white h6"
                htmlFor="endDate"
              >
                {" "}
                Période Fin{" "}
              </h6>
              <Calendar
                inputClassName="rounded-pill"
                value={endDate}
                onChange={(e) => setEndDate(e.value)}
                id="endDate"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="accueil-body">
        <div className="accueil-body-card-accueil-container">
          <CardAccueil
            icon={cilNewspaper}
            valeur={statistiquesData?.total_etablissements}
            label="Totals Etablissements"
          />
          <CardAccueil
            icon={cilHome}
            valeur={statistiquesData?.total_chambres}
            label="Totals Chambres "
          />
          <CardAccueil
            icon={cilAddressBook}
            valeur={statistiquesData?.total_clients}
            label="Totals Clients"
          />
          <CardAccueil
            icon={cilPeople}
            valeur={statistiquesData?.total_gerants}
            label="Totals Gérants"
          />
        </div>
        <div className="accueil-cards-reservations-container mt-5 row">
          <div className="col-md-4 px-md-4 ">
            <CardReservations
              statistiquesData={statistiquesData}
              title="Réservations"
              valeur={998}
            />
          </div>
          <div className="col-md-8 bg-white">
            <BarReservations data={statistiquesEvolutionReservationMois} />
          </div>
        </div>
        <div className="mt-md-5 mt-3 px-md-4">
          <h3 className="h3 fw-bolder h3">
            Evolution des recettes des chambres
          </h3>
          <div className="bg-white">
            <LineRecettes
              data={statistiquesEvolutionRecettesMois}
              dataReservations={statistiquesEvolutionReservationMois}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Accueil
