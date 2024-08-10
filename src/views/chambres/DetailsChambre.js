import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { TabPanel, TabView } from "primereact/tabview";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  chambreGetReservationsStatusInfo,
  getChambre,
  updateChambre,
} from "src/api/chambres/chambres";
import { getTypesChambres } from "src/api/parametres/parametres";
import CreateTemplateDialog from "src/components/dialogs/createTemplateDialog";
import SuccesDialog from "src/components/dialogs/succesDialog";
import AddChambreForm from "src/components/forms/chambres/addChambreForm";
import CardIconTitleText from "src/components/others/cardIconTitleText";
import ImageGalleries from "src/components/others/ImagesGalleries";
import ReservationsChambreTable from "src/components/tables/reservations/reservationChambreTable";
import {
  calculateRating,
  formatDataToDropdownCodeName,
  formatMontant,
  imageAdapter,
} from "src/utils/utils";
import { appUrl } from "src/appUrl";

import "src/assets/css/detailsChambre.css";
import { Button } from "primereact/button";
import {getEvaluationByChambreIdAndStatusSum } from "src/api/evaluations/evaluations";
import CommentaireClientChambreMain from "src/components/others/commentaireClientChambre";
import DetailsEvaluationsNotes from "src/components/others/detailsEvaluationsNotes";
import { calculateRatingNumberOnly, RatingComponentOnlyStars, RatingComponentStarAndValue, RatingComponentStarAndValueWithAvis } from "src/components/others/RatingComponent";
import EquipementListItem from "src/components/others/equipementListItem";

export default function DetailsChambre() {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const idChambre = params?.id;

  const [visibleGalleria, setVisibleGalleria] = useState(false);
  const [chambreInfos, setChambreInfos] = useState({});
  const [formData, setFormData] = useState({});
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [listTypeChambre, setListTypeChambre] = useState([]);

  const { data: dataChambreDetails, isLoading: isLoadingChambreDetails } =
    useQuery({
      queryKey: ["chambre-details", idChambre],
      queryFn: async () => await getChambre(idChambre),
    });

  const {
    data: dataChambreDetailsStats,
    isLoading: isLoadingChambreDetailsStats,
  } = useQuery({
    queryKey: ["chambre-details-stats", idChambre],
    queryFn: async () => await chambreGetReservationsStatusInfo(idChambre),
  });

  const {
    data: noteGlobaleChambre,
  } = useQuery({
    queryKey: ["chambre-details-evaluations-sum", idChambre],
    queryFn: async () => await getEvaluationByChambreIdAndStatusSum(idChambre,true),
  });


  const {
    data: dataListTypeChambre,
    isFetching: isFetchingTypeChambre,
    isLoading: isLoadingTypeChambre,
  } = useQuery({
    queryKey: ["liste-type-chambre-stats"],
    queryFn: async () => await getTypesChambres(1, 10),
  });

  const showUpdateDialogChambre = async () => {
    try {
      const response = await getChambre(idChambre);
      setFormData(response);
      setVisibleUpdateDialog(true);
    } catch (error) {
      setVisibleUpdateDialog(false);
    }
  };

  const mutationUpdate = useMutation({
    mutationKey: ["update-chambre", idChambre],
    mutationFn: async () => {
      return await updateChambre(idChambre, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "chambre-details-stats",
        "chambre-details",
      ]);
      setVisibleUpdateDialog(false);
      setFormData({});
      setVisibleDialoMsg("Modification effectuée avec suces.");
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleError(true);
    },
  });

  const updateChambreFn = () => {
    mutationUpdate.mutate();
  };

  const goBackToList = () => {
    navigate(`${appUrl.chambre.list}`, { replace: true });
  };

  useEffect(() => {
    const chambreData = dataChambreDetails || {};
    setChambreInfos(chambreData);
  }, [dataChambreDetails]);

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

  return (
    <section className="details_chambre container bg-white pt-3">
      <div className="row details_chambre__header mb-5">
        <div className="col-md-4">
          <div className="details_chambre__header_img_container rounded">
            <Image
              src={imageAdapter(chambreInfos?.images?.[0]?.url)}
              imageStyle={{
                maxWidth: "100%",
                maxHeight: "400px",
                height: "390px",
                borderRadius: "0.2rem",
              }}
              onClick={() => setVisibleGalleria(true)}
            />
          </div>
        </div>
        <div className="col-md-8 details_chambre__title_container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="h1 fw-bold text-capitalize">
                {chambreInfos?.titre}
              </h1>

              <h5 className="h5 my-0text-normal text-capitalize">
                {chambreInfos?.type_chambre?.type}
              </h5>
              <div className="d-flex align-items-end">
                <RatingComponentStarAndValueWithAvis
                  rateData={noteGlobaleChambre}
                />
                {/* <h5 className="h5 my-0 ms-3 text-normal text-capitalize">
                  {chambreInfos?.type_chambre?.type}
                </h5> */}
                <h5 className="h5 my-0 ms-3 text-normal text-capitalize">
                  <i className="pi pi-user me-2"></i>
                  {formatMontant(chambreInfos?.nombre_personne)} personnes
                </h5>
                <h5 className="h5 my-0 ms-3 text-normal text-capitalize">
                  <i className="pi pi-tags me-2"></i>
                  {formatMontant(chambreInfos?.nombre_lits)} Lits
                </h5>
              </div>
              <div className="bottom_bar_styled"></div>
            </div>
            <div className="col-md-4 text-end p-2">
              <h1 className="h1 fw-bold text-capitalize text-dark me-2">
                {formatMontant(chambreInfos?.prix_nuit)} F
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="mt-3">
              <p className="text-dark fs-6">{chambreInfos?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="h3 fw-bold  text-capitalize">équipements </h3>
        <div className="mt-4 d-flex flex-wrap  justify-content-start">
          <EquipementListItem
            title="Mobilier"
            data={chambreInfos?.equipements_mobilier}
          />
          <EquipementListItem
            title="Electroniques"
            data={chambreInfos?.equipements_electronique}
          />
          <EquipementListItem
            title="Salle de bains"
            data={chambreInfos?.equipements_salle_bains}
          />
          <EquipementListItem
            title="Supplementaires"
            data={chambreInfos?.equipements_suplementaires}
          />
          <EquipementListItem
            title="Sécurité"
            data={chambreInfos?.equipements_securite}
          />
          <EquipementListItem
            title="Autres"
            data={chambreInfos?.equipements_autres}
          />
        </div>
      </div>

      <Divider />
      {/* <section className="mt-4">
        <div className="d-flex gap-3">
          <CardIconTitleText
            number={dataChambreDetailsStats?.en_cours}
            title="En Cours"
            subTitle="Nombre des reservations qui sont toujours en cours"
          />
          <CardIconTitleText
            number={dataChambreDetailsStats?.en_attente}
            title="En attentes"
            subTitle="Nombre des reservations qui sont en attentes de validations"
          />
          <CardIconTitleText
            number={dataChambreDetailsStats?.terminees}
            title="Terminées"
            subTitle="Nombre des reservations qui ont été terminées"
          />
          <CardIconTitleText
            number={dataChambreDetailsStats?.annulees}
            title="Annulées"
            subTitle="Nombre des reservations qui ont été annulées"
          />
        </div>
      </section> */}
      <section className="mt-5">
        <h3 className="h3 fw-bold  text-capitalize">Details reservations </h3>
        <div className="mt-4">
          <div className="flex w-full flex-col">
            <TabView aria-label="Options">
              <TabPanel key="en_cours" header="Réservations en Cours">
                <h4 className="h4  mt-4 text-dark ms-2">
                  Liste réservations en cours
                </h4>
                <ReservationsChambreTable
                  chambreId={idChambre}
                  activeIndex={0}
                />
              </TabPanel>
              <TabPanel key="en_attentes" header="Réservations en Atttentes">
                <h4 className="h4  mt-4 text-dark ms-2">
                  Liste réservations en attentes
                </h4>
                <ReservationsChambreTable
                  chambreId={idChambre}
                  activeIndex={1}
                />
              </TabPanel>
              <TabPanel key="terminees" header="Réservations Terminées">
                <h4 className="h4  mt-4 text-dark ms-2">
                  Liste réservations terminées
                </h4>
                <ReservationsChambreTable
                  chambreId={idChambre}
                  activeIndex={2}
                />
              </TabPanel>
              <TabPanel key="annulees" header="Réservations Annulées">
                <h4 className="h4  mt-4 text-dark ms-2">
                  Liste réservations annulées
                </h4>
                <ReservationsChambreTable
                  chambreId={idChambre}
                  activeIndex={3}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      <div className="mt-5">
        <h3 className="h3 mb-3 fw-bold text-capitalize">
          Commentaires sur la chambre{" "}
        </h3>

        {/* <DetailsEvaluationsNotes evaluation={evaluationData} /> */}

        <TabView aria-label="Commentaires">
          <TabPanel
            key="commentaire_approuvées"
            header="Commentaires approuvées"
            className=""
          >
            <CommentaireClientChambreMain
              chambreId={idChambre}
              approuve={true}
            />
          </TabPanel>
          <TabPanel key="commentaire_refusées" header="Commentaires réfusées">
            <CommentaireClientChambreMain
              chambreId={idChambre}
              approuve={false}
            />
          </TabPanel>
        </TabView>
      </div>
      <section className="mt-5">
        <div className="d-flex justify-content-between">
          <Button
            label="Retouner sur la liste"
            className="rounded p-button-secondary p-button-outlined"
            onClick={goBackToList}
          />
          <div className="d-flex justify-content-between gap-5">
            <Button
              label="Modifier des informations de la chambre"
              className="rounded p-button-primay p-button-outlined"
              onClick={showUpdateDialogChambre}
            />
            <Button
              label="Supprimer la chambre"
              className="rounded p-button-danger"
              onClick={showUpdateDialogChambre}
            />
          </div>
        </div>
      </section>
      <Dialog
        header="Images De la chambre"
        visible={visibleGalleria}
        style={{ width: "50vw" }}
        position="center"
        onHide={() => {
          if (!visibleGalleria) return;
          setVisibleGalleria(false);
        }}
      >
        <ImageGalleries images={chambreInfos?.images || []} />
      </Dialog>

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

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${appUrl.chambre.details}/${idChambre}`}
        msg={vsibleDialoMsg ?? "Informations Modifiée avec succes."}
      />
    </section>
  );
}
