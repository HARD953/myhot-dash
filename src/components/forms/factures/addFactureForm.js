import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { useQuery } from "@tanstack/react-query";
import { getEtablissements } from "src/api/etablissements/etablissements";



export default function AddFactureForm({
  setFormData,
  formData,
  dataListChambresLibre,
  dataListClients,
  isShowOnly = false,
}) {
  const cities = [
    { name: "Côte d'ivoire", code: "Côte d'ivoire" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const typeFactures = [
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

  const customizedListClients = (dataClients) => {
    return (dataClients || []).map((item) => ({
      name: `${item?.prenom} ${item?.nom}`,
      code: item?.id,
    }));
  };


  const handleFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    console.log("value ::", value);
  };

  useEffect(() => {
    const listChambresLibres = customizedListChambres(dataListChambresLibre);
    const listClients = customizedListClients(dataListClients);
    setModifListChambresLibress(listChambresLibres);
    setModifListClients(listClients);
  }, [listEtablissements]);

  return (
    <form className="">
      <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
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
            <label htmlFor="periode">Selectionner la Période de facture</label>
          </FloatLabel>
        </div>
        <div className="col-md-6 mt-4 mt-4">
          <FloatLabel>
            <InputText
              id="nombrePersonne"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.nombrePersonne}
              onChange={(e) => handleFormData(e.value, "nombrePersonne")}
            />
            <label htmlFor="nombrePersonne">Nombre de Personnes</label>
          </FloatLabel>
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <Dropdown
              value={formData?.ChambreId}
              id="ChambreId"
              disabled={isShowOnly}
              onChange={(e) => handleFormData(e.value, "ChambreId")}
              options={modifListChambresLibres}
              optionLabel="name"
              optionValue="code"
              placeholder="Selectionner une chambre"
              className="w-100"
            />
            <label htmlFor="ChambreId">Chambres Disponibles</label>
          </FloatLabel>
        </div>
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <Dropdown
              value={formData?.ClientId}
              id="ClientId"
              disabled={isShowOnly}
              onChange={(e) => handleFormData(e.value, "ClientId")}
              options={modifListClients}
              optionLabel="name"
              optionValue="code"
              placeholder="Selectionner une chambre"
              className="w-100"
            />
            <label htmlFor="ClientId">Client</label>
          </FloatLabel>
        </div>
      </div>
      {/* <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <InputNumber
              id="nombreLits"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.nombreLits}
              onChange={(e) => handleFormData(e.value, "nombreLits")}
            />
            <label htmlFor="nombreLits">Nombre de Lit</label>
          </FloatLabel>
        </div>
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <InputText
              id="prixParNuit"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.prixParNuit}
              onChange={(e) => handleFormData(e.target.value, "prixParNuit")}
            />
            <label htmlFor="prixParNuit">Tarif par Nuit</label>
          </FloatLabel>
        </div>
      </div> */}
      {/* <div className="row mt-md-4 mt-4">
        <div className="col-md-12  mt-4">
          <FloatLabel>
            <InputTextarea
              rows={5}
              id="description"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.description}
              onChange={(e) => handleFormData(e.target.value, "description")}
            />
            <label htmlFor="description">Description de l'établissement</label>
          </FloatLabel>
        </div>
      </div> */}
    </form>
  );
}
