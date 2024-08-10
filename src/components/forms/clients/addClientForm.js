import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";



export default function AddClientForm({
  setFormData,
  formData,
  isShowOnly=false
}) {
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];


  const handleFormData = (value,key)=>{
    setFormData(prev=>({...prev,[key]:value}))
  }

  return (
    <form className="">
      <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <InputText
              id="nom"
              className="w-100"
              disabled={isShowOnly}
              value={formData?.nom}
              onChange={(e) => handleFormData(e.target.value, "nom")}
            />
            <label htmlFor="nom">Nom</label>
          </FloatLabel>
        </div>
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <InputText
              id="prenom"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.prenom}
              onChange={(e) => handleFormData(e.target.value, "prenom")}
            />
            <label htmlFor="prenom">Prénom</label>
          </FloatLabel>
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <InputText
              id="email"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.email}
              onChange={(e) => handleFormData(e.target.value, "email")}
            />
            <label htmlFor="email">Adresse Electronique</label>
          </FloatLabel>
        </div>
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <InputText
              id="telephone"
              disabled={isShowOnly}
              className="w-100"
              value={formData?.telephone}
              onChange={(e) => handleFormData(e.target.value, "telephone")}
            />
            <label htmlFor="telephone">Numéro de téléphone</label>
          </FloatLabel>
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
            <Calendar
              id="dateNaissance"
              disabled={isShowOnly}
              className="w-100"
              value={new Date(formData?.date_naissance)}
              onChange={(e) => handleFormData(e.value, "date_naissance")}
            />
            <label htmlFor="dateNaissance">Date de naissance</label>
          </FloatLabel>
        </div>
        <div className="col-md-6 mt-4">
          <FloatLabel>
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
            <label htmlFor="pays">Pays de résidence</label>
          </FloatLabel>
        </div>
      </div>
      <div className="row mt-md-4 mt-4">
        <div className="col-md-6 mt-4">
          <FloatLabel>
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
            <label htmlFor="ville">Ville de résidence</label>
          </FloatLabel>
        </div>
        <div className="col-md-6  mt-4">
          <FloatLabel>
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
            <label htmlFor="commune">Commune de résidence</label>
          </FloatLabel>
        </div>
      </div>
    </form>
  );
}
