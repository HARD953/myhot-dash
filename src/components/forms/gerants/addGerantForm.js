import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import FormTitleItem from "src/components/others/FormTitleItem";
import { MultiSelect } from "primereact/multiselect";
import { getEtablissements } from "src/api/etablissements/etablissements";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { formatDataToDropdownCodeName } from "src/utils/utils";

export default function AddGerantForm({
  setFormData,
  formData,
  isShowOnly = false,
  isSignup=false,
}) {
  const queryListKey = "list-etablissements";
  const pageForEtablissement = 1;
  const pageSizeForEtablissement = 30;
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const [etablissementsData, setEtablissementsData] = useState([]);

  const {
    data: dataListEtabli,
    isFetching: isFetchingEtabli,
    isLoading: isLoadingEtabli,
    isPlaceholderData,
  } = useQuery({
    queryKey: [queryListKey],
    queryFn: async () =>
      await getEtablissements(pageForEtablissement, pageSizeForEtablissement),
    placeholderData: keepPreviousData,
  });

  const getDataId = (data) => {
    return !!data?.length ? data?.map((item) => item?.id) : [];
  };
  const handleFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const dataResults = dataListEtabli?.results || [];
    const dataReceive = formatDataToDropdownCodeName(
      dataResults,
      "id",
      "titre",
      true
    );
    setEtablissementsData(dataReceive);
  }, [dataListEtabli]);

  return (
    <form className="pb-5">
      <h4 className="h4 fw-bolder">Informations personnelles</h4>
      <div className="px-4">
        <div className="row mt-md-2 mt-2">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Nom ">
              <InputText
                id="nom"
                className="w-100"
                disabled={isShowOnly}
                value={formData?.nom}
                onChange={(e) => handleFormData(e.target.value, "nom")}
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Prénom">
              <InputText
                id="prenom"
                disabled={isShowOnly}
                className="w-100"
                value={formData?.prenom}
                onChange={(e) => handleFormData(e.target.value, "prenom")}
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-4 mt-4">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Adresse Electronique">
              <InputText
                id="email"
                disabled={isShowOnly}
                className="w-100"
                value={formData?.email}
                onChange={(e) => handleFormData(e.target.value, "email")}
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Numéro de téléphone">
              <InputText
                id="telephone"
                disabled={isShowOnly}
                className="w-100"
                value={formData?.telephone}
                onChange={(e) => handleFormData(e.target.value, "telephone")}
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-4 mt-4">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Date de naissance">
              <Calendar
                id="date_naissance"
                disabled={isShowOnly}
                className="w-100"
                value={new Date(formData?.date_naissance)}
                onChange={(e) => handleFormData(e.value, "date_naissance")}
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Pays de résidence">
              <Dropdown
                value={formData?.pays}
                id="pays"
                disabled={isShowOnly}
                onChange={(e) => handleFormData(e.value, "pays")}
                options={cities}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner un pays"
                className="w-100"
              />
            </FormTitleItem>
          </div>
        </div>
        <div className="row mt-md-4 mt-4">
          <div className="col-md-6 mt-4">
            <FormTitleItem title="Ville de résidence">
              <Dropdown
                value={formData?.ville}
                onChange={(e) => handleFormData(e.value, "ville")}
                options={cities}
                disabled={isShowOnly}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner un pays"
                className="w-100"
              />
            </FormTitleItem>
          </div>
          <div className="col-md-6  mt-4">
            <FormTitleItem title="Commune de résidence">
              <Dropdown
                value={formData?.commune}
                onChange={(e) => handleFormData(e.value, "commune")}
                options={cities}
                disabled={isShowOnly}
                optionLabel="name"
                optionValue="code"
                placeholder="Selectionner un pays"
                className="w-100"
              />
            </FormTitleItem>
          </div>
        </div>
      </div>
      {!isSignup && (
        <>
          <h4 className="h4 fw-bolder mt-5">Informations Etablissements </h4>
          <div className="row px-4">
            <div className="col12 mt-4">
              <FormTitleItem title="Etablissements responsable">
                <MultiSelect
                  value={getDataId(formData?.etablissements_geres)}
                  id="etablissements_geres"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "etablissements_geres")
                  }
                  options={etablissementsData || []}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner equipements salle de bains"
                  className="w-100"
                  filter
                  display="chip"
                />
              </FormTitleItem>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
