import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addChambre } from "src/api/chambres/chambres";
import { getTypesChambres } from "src/api/parametres/parametres";
import { appUrl } from "src/appUrl";
import "src/assets/css/createChambre.css";
import ErrorDialog from "src/components/dialogs/errorDialog";
import SuccesDialog from "src/components/dialogs/succesDialog";
import AddChambreForm from "src/components/forms/chambres/addChambreForm";
import { formatDataToDropdownCodeName } from "src/utils/utils";

const initialFormData = {
  titre: "",
  description: "",
  prix_nuit: 0,
  nombre_lits: 1,
  nombre_personne: 1,
  type_id: "",
  etablissement_id: "",
  equipements_mobilier: [],
  equipements_electronique: [],
  equipements_salle_bains: [],
  equipements_suplementaires: [],
  equipements_securite: [],
  equipements_autres: [],
};

export default function CreateChambre() {
  const queryListKey = "list-chambres";
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData);
  const [listTypeChambre, setListTypeChambre] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [vsibleDialoMsgError, setVisibleDialoMsgError] = useState("");

  const {
    data: dataListTypeChambre,
    isFetching: isFetchingTypeChambre,
    isLoading: isLoadingTypeChambre,
  } = useQuery({
    queryKey: ["liste-type-chambre"],
    queryFn: async () => await getTypesChambres(1, 20),
  });

  const mutationAdd = useMutation({
    mutationKey: ["add-chambre"],
    mutationFn: async (newData) => {
      return await addChambre(newData);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([queryListKey]);
      setFormData(initialFormData);
      console.log("data create ::", data);
      setVisibleDialoMsg("Chambre créée avec success.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
      setVisibleDialoMsgError(err?.message);
      setVisibleError(true);
    },
  });

  const saveEntry = () => {
    mutationAdd.mutate(formData);
  };

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
    <>
      <section className="create_chambre container py-5">
        <div className="mb-4">
          <h2 className="h2 text-color-myhot-primary fw-bold">
            Formulaire d'enregistrement d'une chambre
          </h2>
        </div>
        <AddChambreForm
          listTypeChambre={listTypeChambre}
          formData={formData}
          setFormData={setFormData}
        />
        <div className=" mt-5 d-flex justify-content-between">
          <Button
            className="p-button-outlined rounded"
            label="Retourner à la liste"
            onClick={() => navigate(`${appUrl.chambre.list}`)}
          />
          <Button
            className="p-button-outlined rounded button-save-form  "
            label="Enregistrer"
            onClick={() => saveEntry()}
            loading={mutationAdd?.isPending}
          />
        </div>
      </section>

      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${appUrl.chambre.list}`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg={vsibleDialoMsgError}
      />
    </>
  );
}
