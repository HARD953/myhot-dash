import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { useQuery } from "@tanstack/react-query";
import { getEtablissements } from "src/api/etablissements/etablissements";



export default function AddReservationForm({
  setFormData,
  formData,
  dataListClients,
  listTypeChambre,
  typeChambre,
  setTypeChambre,
  isLoadingTypeChambre,
  chambresDisponibleData,
  isLoadingChambresDisponibleData,
  isLoadingClientsData,
  isShowOnly = false,
}) {
  const cities = [
    { name: "Côte d'ivoire", code: "Côte d'ivoire" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const typeReservations = [
    { name: "Résidence Meublée", code: "résidence meublée" },
    { name: "Hôtel", code: "hôtel" },
  ];

  const [modifListClients, setModifListClients] = useState(null);
  const [modifListChambresLibres, setModifListChambresLibress] = useState(null);

  const { data: listEtablissements } = useQuery({
    queryKey: ["list-etablissements"],
    queryFn: async ({ pageParam }) => await getEtablissements(),
  });

  const customizedListChambres = (dataChambres) => {
    return (dataChambres || []).map((item) => ({
      name: item?.titre,
      code: item?.id,
    }));
  };

  const customizedListClients = (data) => {
    if(!data || !data?.length){
      return []
    }

    return data?.map((item) => ({
      name: `${item?.prenom} ${item?.nom}`,
      code: item?.id,
    }));
  };

  const handleFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    console.log("value ::", value);
  };

  useEffect(() => {
    const listChambresLibres = customizedListChambres(chambresDisponibleData);
    setModifListChambresLibress(listChambresLibres);
  }, [chambresDisponibleData]);

  useEffect(() => {
    const _dataClient = dataListClients?.results || []
    const listClients = customizedListClients(_dataClient);
    setModifListClients(listClients);
  }, [dataListClients]);


  return (
    <form className="">
      <div className="row mt-md-4 mt-4">
        <div className="col-md-12">
          <label className="fw-bold" htmlFor="typeChambre">
            Type de Chambre
          </label>
          {/* <FloatLabel> */}
          <Dropdown
            value={typeChambre}
            filter
            id="typeChambre"
            disabled={isShowOnly}
            onChange={(e) => setTypeChambre(e.value)}
            options={listTypeChambre}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionner type"
            className="w-100"
            loading={isLoadingTypeChambre}
          />
          {/* </FloatLabel> */}
        </div>
      </div>{" "}
      <div className="row mt-md-4 mt-4">
        <div className="col-md-12 mt-4">
          <label className="fw-bold" htmlFor="periode">
            Selectionner la Période de reservation
          </label>
          {/* <FloatLabel> */}
          <Calendar
            id="periode"
            value={formData?.periode}
            className="w-100"
            readOnlyInput
            hideOnRangeSelection
            selectionMode="range"
            onChange={(e) => handleFormData(e.value, "periode")}
            numberOfMonths={2}
          />
          {/* </FloatLabel> */}
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-12 mt-4 mt-4">
          <label className="fw-bold" htmlFor="nombrePersonne">
            Nombre de Personnes
          </label>
          {/* <FloatLabel> */}
          <InputText
            id="nombrePersonne"
            disabled={isShowOnly}
            className="w-100"
            value={formData?.nombrePersonne}
            onChange={(e) => handleFormData(e.value, "nombrePersonne")}
          />
          {/* </FloatLabel> */}
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-12 mt-4">
          <label className="fw-bold" htmlFor="ChambreId">
            Chambres Disponibles
          </label>
          {/* <FloatLabel> */}
          <Dropdown
            value={formData?.chambreId}
            id="ChambreId"
            filter
            disabled={isShowOnly}
            onChange={(e) => handleFormData(e.value, "chambreId")}
            options={modifListChambresLibres}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionner une chambre"
            className="w-100"
            loading={isLoadingChambresDisponibleData}
          />
          {/* </FloatLabel> */}
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-12 mt-4">
          <label className="fw-bold" htmlFor="personneId">
            Client
          </label>
          {/* <FloatLabel> */}
          <Dropdown
            value={formData?.personneId}
            filter
            id="personneId"
            disabled={isShowOnly}
            onChange={(e) => handleFormData(e.value, "personneId")}
            options={modifListClients}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionner un client"
            className="w-100"
            loading={isLoadingClientsData}
          />
          {/* <label for="ClientId">Client</label> */}
          {/* </FloatLabel> */}
        </div>
      </div>
    </form>
  );
}
