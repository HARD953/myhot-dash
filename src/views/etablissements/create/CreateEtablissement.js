

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useState } from "react";
import { addEtablissement } from "src/api/etablissements/etablissements";
import { appUrl } from "src/appUrl";
import "src/assets/css/createEtablissement.scss"
import ErrorDialog from "src/components/dialogs/errorDialog";
import SuccesDialog from "src/components/dialogs/succesDialog";
import AddEtablissementForm from "src/components/forms/etablissements/addEtablissementForm";
import useTypesEtablissements from "src/hooks/useTypesEtablissements";




const initialFormData = {
  titre: "",
  description: "",
  latitude: "",
  longitude: "",
  telephone: "",
  email: "",
  pays_id: "",
  ville_id: "",
  commune: "",
  type_id: "",
};


export default function CreateEtablissement(){
  const queryListKey = "etablissement"
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState(
    "Etablissement crée avec succès"
  );
  const [visibleError, setVisibleError] = useState(false);


  const mutationAdd = useMutation({
    mutationKey: ["add-etablissement"],
    mutationFn: async (newData) => {
      return await addEtablissement(newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryListKey]);
      setFormData(initialFormData);
      setVisibleDialoMsg("Etablissement crée avec succès.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err);
      setVisibleError(true);
    },
  });

  const handleSubmit =()=>{
    mutationAdd.mutate(formData)
  }


  return (
    <>
      <section className="create_etablissement container shadow pb-5 px-4 pt-3 bg-white">
        <section className="create_etablissement__header ">
          <h2 className="create_etablissement__header__title h2">
            Formulaire d'enregistrement d'un etablissement
          </h2>
          <p className="ms-1 text-danger fst-italic fs-6 fw-bold">
            Tous les champs sont obligatoires sauf mention Optionnel
          </p>
        </section>
        <Divider />
        <section className="create_etablissement__body">
          <AddEtablissementForm
            isShowOnly={false}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <Button
                label="Retourner à la liste "
                className="p-button-danger rounded-pill"
              />
              <Button
                loading={mutationAdd.isPending}
                label="Enregistrer"
                className="rounded-pill button-save-form"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </section>
      </section>

      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${appUrl.etablissement.list}`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg="Une erreur est survenue. Réessayez !"
      />
    </>
  );
}
