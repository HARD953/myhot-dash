import { useEffect, useMemo, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import PickListComponent from "src/components/others/PickListComponent";
import { useQuery } from "@tanstack/react-query";
import { getGerants } from "src/api/gerants/gerants";
import FormTitleItem from "src/components/others/FormTitleItem";
import MapsComponent from "src/components/maps/MapsComponent";
import useTypesEtablissements from "src/hooks/useTypesEtablissements";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import useDataList from "src/hooks/useDataList";



const center = {
  lat: 51.505,
  lng: -0.09,
};

export default function AddEtablissementForm({
  setFormData,
  formData,
  isShowOnly=false
}) {
  const cities = [
    { name: "Côte d'ivoire", code: "Côte d'ivoire" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const { listTypeEtablissement } = useTypesEtablissements();
  const { paysList, villesList } = useDataList();

  const [position, setPosition] = useState(center);
  const [loadingMap, setLoadingMap] = useState(false);

  const handleFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleMarker = (position) => {
    handleFormData(position?.lat, "latitude");
    handleFormData(position?.lng, "longitude");
    setPosition(position);
  };

  const getClientLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentPosition = { lat: latitude, lng: longitude };

        handleMarker(currentPosition);
      });
    } else {
      console.log("Geolocalisation non disponible");
    }
  };

  return (
    <>
      <form className="">
        <div className="row mt-md-4 mt-4">
          <div className="col-md-12 mt-4">
            <FormTitleItem title="Type d'établissement">
              <Dropdown
                value={formData?.type_id}
                id="type_id"
                disabled={isShowOnly}
                onChange={(e) => handleFormData(e.value, "type_id")}
                options={listTypeEtablissement || []}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner un type"
                className="w-100"
                filter
                showClear
                required
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-2 mt-2">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Titre">
              <InputText
                id="titre"
                required
                className="w-100"
                disabled={isShowOnly}
                value={formData?.titre}
                onChange={(e) => handleFormData(e.target.value, "titre")}
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Adresse electronique">
              <InputText
                id="email"
                required
                disabled={isShowOnly}
                className="w-100"
                value={formData?.email}
                onChange={(e) => handleFormData(e.target.value, "email")}
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-2 mt-2">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Téléphone">
              <InputText
                id="telephone"
                required
                disabled={isShowOnly}
                className="w-100"
                value={formData?.telephone}
                onChange={(e) => handleFormData(e.target.value, "telephone")}
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Pays">
              <Dropdown
                value={formData?.pays_id}
                required
                id="pays"
                disabled={isShowOnly}
                onChange={(e) => handleFormData(e.value, "pays_id")}
                options={paysList}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner un pays"
                className="w-100"
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-2 mt-2">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Ville">
              <Dropdown
                required
                value={formData?.ville_id}
                onChange={(e) => handleFormData(e.value, "ville_id")}
                options={villesList}
                disabled={isShowOnly}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner une ville"
                className="w-100"
                id="ville"
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6  mt-4">
            <FormTitleItem title="Commune" isOptionnel>
              <Dropdown
                value={formData?.commune}
                required
                onChange={(e) => handleFormData(e.value, "commune")}
                options={cities}
                disabled={isShowOnly}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner un pays"
                className="w-100"
                id="commune"
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-2 mt-2">
          <div className="col-md-12  mt-4">
            <FormTitleItem title="Description">
              <InputTextarea
                rows={5}
                required
                id="description"
                disabled={isShowOnly}
                className="w-100"
                value={formData?.description}
                onChange={(e) => handleFormData(e.target.value, "description")}
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-2 mt-2">
          <div className="col-md-12  mt-4 ">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <label className="fw-bolder mb-2 fs-5">
                    Emplacement de votre etablissement
                  </label>
                </div>
                <Button
                  label="Ma position actuelle"
                  icon="pi pi-map-marker"
                  className="p-button-outlined rounded"
                  onClick={() => getClientLocation()}
                  loading={loadingMap}
                />
              </div>
              <div className="row mb-4 mx-3">
                <div className="col-md-6 ">
                  <FormTitleItem title="Latitude">
                    <InputText
                      id="latitude"
                      required
                      className="w-100"
                      disabled={isShowOnly}
                      value={formData?.latitude}
                      onChange={(e) =>
                        handleFormData(e.target.value, "latitude")
                      }
                    />
                  </FormTitleItem>
                </div>
                <div className="col-md-6">
                  <FormTitleItem title="Longitude">
                    <InputText
                      id="longitude"
                      required
                      disabled={isShowOnly}
                      className="w-100"
                      value={formData?.longitude}
                      onChange={(e) =>
                        handleFormData(e.target.value, "longitude")
                      }
                    />
                  </FormTitleItem>
                </div>
              </div>
              <div className="mx-4 d-flex justify-content-between align-items-center mb-1 text-info">
                <div className="d-flex align-items-center text-info">
                  <i className="pi pi-info-circle"></i>
                  <p className="mb-0 fst-italic">
                    Vous pouvez selectionner un emplacement directement sur la
                    carte en deplaçant le{" "}
                    <span className="fw-bolder">
                      Marker <i className="pi pi-map-marker"></i>{" "}
                    </span>
                  </p>
                </div>
                {loadingMap && (
                  <div>
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  </div>
                )}
              </div>

              <div className="mx-4">
                <MapsComponent
                  center={center}
                  position={position}
                  setPosition={handleMarker}
                  loading={loadingMap}
                  setLoading={setLoadingMap}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
