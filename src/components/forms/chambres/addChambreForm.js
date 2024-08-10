import FileUploaderComponent from "src/components/others/FileUploaderComponent";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { useQuery } from "@tanstack/react-query";
import { getEtablissements } from "src/api/etablissements/etablissements";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { Avatar } from "primereact/avatar";
import ImageGalleries from "src/components/others/ImagesGalleries";
import FormTitleItem from "src/components/others/FormTitleItem";
import { equipementsAppareilElectroniquesList, equipementsAutresList, equipementsMobilierList, equipementsSalleDeBainsList, equipementsSecuriteList, equipementsSupplementairesList } from "src/data/dataList";
import { MultiSelect } from "primereact/multiselect";



export default function AddChambreForm({
  setFormData,
  formData,
  listTypeChambre,
  isShowOnly=false
}) {

  const page = 1
  const pageSize = 30


 const [chambreImages, setChambreImages] = useState([]);
 const [modifListEtablissements, setModifListEtablissements] = useState(null);

  const { data: listEtablissements } = useQuery({
      queryKey: ["list-etablissements"],
      queryFn: async ({ pageParam }) => await getEtablissements(page,pageSize),
    });


  const customizedListEtablissement = (data)=>{
    try {
       if (!data || !!!data?.length) return [];
       return data?.map((etabli) => ({
         name: etabli?.titre,
         code: etabli?.id,
       }));

    } catch (error) {
      return []
    }
   }

  const handleFormData = (value,key)=>{
    setFormData(prev=>({...prev,[key]:value}))
    console.log("value ::",value)
  }


   const tab1HeaderTemplate = (options,icon,title) => {

     return (
       <div
         className="d-flex align-items-center gap-2 p-3"
         style={{ cursor: "pointer" }}
         onClick={options.onClick}
       >
         <Avatar
          //  image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
           shape="circle"
           icon={icon}
         />
         <span className="font-bold white-space-nowrap">{title}</span>
       </div>
     );
   };


  useEffect(() => {
    const newData = listEtablissements?.results || []
    const listEtabli = customizedListEtablissement(newData);
    setModifListEtablissements(listEtabli);
  }, [listEtablissements]);


  useEffect(()=>{
    console.log(formData)
    setChambreImages(formData?.images);
  },[formData])


  return (
    <TabView>
      <TabPanel
        header="Information sur la chambre"
        headerTemplate={(option) =>
          tab1HeaderTemplate(option, "pi pi-file", "Information sur la chambre")
        }
      >
        <div className="mt-3">
          <h4 className="fw-bolder h4 ">Information sur la chambre</h4>
        </div>
        <form className="">
          <div className="row mt-md-4 mt-4">
            <div className="col-md-12 mt-4">
              <FormTitleItem title="Etablissement affiliée">
                <Dropdown
                  value={formData?.etablissement_id}
                  id="EtablissementId"
                  disabled={isShowOnly}
                  onChange={(e) => handleFormData(e.value, "etablissement_id")}
                  options={modifListEtablissements}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner un établissement"
                  className="w-100"
                  size="lg"
                />
              </FormTitleItem>
            </div>
          </div>
          <div className="row mt-md-4 mt-4">
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Type de chambre">
                <Dropdown
                  value={formData?.type_id}
                  id="type"
                  disabled={isShowOnly}
                  onChange={(e) => handleFormData(e.value, "type_id")}
                  options={listTypeChambre}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner un type"
                  className="w-100"
                />
              </FormTitleItem>
            </div>
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Titre de la chambre">
                <InputText
                  id="titre"
                  className="w-100"
                  disabled={isShowOnly}
                  value={formData?.titre}
                  onChange={(e) => handleFormData(e.target.value, "titre")}
                />
              </FormTitleItem>
            </div>
          </div>
          <div className="row mt-md-4 mt-4">
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Nombre de personne">
                <InputNumber
                  id="nombreLits"
                  disabled={isShowOnly}
                  className="w-100"
                  value={formData?.nombre_personne}
                  onChange={(e) => handleFormData(e.value, "nombre_personne")}
                />
              </FormTitleItem>
            </div>
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Tarif par Nuit">
                <InputText
                  id="prixParNuit"
                  disabled={isShowOnly}
                  className="w-100"
                  value={formData?.prix_nuit}
                  onChange={(e) => handleFormData(e.target.value, "prix_nuit")}
                />
              </FormTitleItem>
            </div>
          </div>
          <div className="row mt-md-4 mt-4">
            <div className="col-md-12  mt-4">
              <FormTitleItem title="Description de l'établissement">
                <InputTextarea
                  rows={15}
                  // minLength={5}
                  id="description"
                  disabled={isShowOnly}
                  className="w-100"
                  value={formData?.description}
                  onChange={(e) =>
                    handleFormData(e.target.value, "description")
                  }
                />
              </FormTitleItem>
            </div>
          </div>
        </form>
      </TabPanel>
      <TabPanel
        header="Images"
        headerTemplate={(option) =>
          tab1HeaderTemplate(option, "pi pi-wifi", "Equipéments de la chambre")
        }
      >
        <div className="mt-3">
          <h4 className="fw-bolder h4 ">Equipements de la chambre</h4>
        </div>
        <div className="">
          <div className="row">
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Mobilier">
                <MultiSelect
                  value={formData?.equipements_mobilier}
                  id="equipements_mobilier"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "equipements_mobilier")
                  }
                  options={equipementsMobilierList}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner mobiler"
                  className="w-100"
                  filter
                  display="chip"
                />
              </FormTitleItem>
            </div>
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Appareil Electroniques">
                <MultiSelect
                  value={formData?.equipements_electronique}
                  id="equipements_electronique"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "equipements_electronique")
                  }
                  options={equipementsAppareilElectroniquesList}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner appareil electroniques"
                  className="w-100"
                  filter
                  display="chip"
                />
              </FormTitleItem>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Installations de salle de bains">
                <MultiSelect
                  value={formData?.equipements_salle_bains}
                  id="equipements_salle_bains"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "equipements_salle_bains")
                  }
                  options={equipementsSalleDeBainsList}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner equipements salle de bains"
                  className="w-100"
                  filter
                  display="chip"
                />
              </FormTitleItem>
            </div>
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Équipements supplémentaires">
                <MultiSelect
                  value={formData?.equipements_suplementaires}
                  id="equipements_suplementaires"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "equipements_suplementaires")
                  }
                  options={equipementsSupplementairesList}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner equipement supplementaires"
                  filter
                  className="w-100"
                  display="chip"
                />
              </FormTitleItem>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Sécurité et confort ">
                <MultiSelect
                  value={formData?.equipements_securite}
                  id="equipements_securite"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "equipements_securite")
                  }
                  options={equipementsSecuriteList}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner equipements sécurité"
                  className="w-100"
                  filter
                  display="chip"
                />
              </FormTitleItem>
            </div>
            <div className="col-md-6 mt-4">
              <FormTitleItem title="Autres équipements">
                <MultiSelect
                  value={formData?.equipements_autres}
                  id="equipements_autres"
                  disabled={isShowOnly}
                  onChange={(e) =>
                    handleFormData(e.value, "equipements_autres")
                  }
                  options={equipementsAutresList}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selectionner autres équipement"
                  className="w-100"
                  filter
                  display="chip"
                />
              </FormTitleItem>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel
        header="Images"
        headerTemplate={(option) =>
          tab1HeaderTemplate(option, "pi pi-image", "Images de la chambre")
        }
      >
        <div className="mt-3">
          <h4 className="fw-bolder h4 ">Images de la chambre</h4>
        </div>
        <div className="flex flex-column h-12rem">
          {isShowOnly ? (
            <ImageGalleries images={chambreImages} />
          ) : (
            <FileUploaderComponent resourceId={formData?.id} />
          )}
        </div>
      </TabPanel>
    </TabView>
  );
}
