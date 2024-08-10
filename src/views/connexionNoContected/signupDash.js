import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { SignupUser } from "src/api/users/users";
import ErrorDialog from "src/components/dialogs/errorDialog";
import SuccesDialog from "src/components/dialogs/succesDialog";
import AddGerantForm from "src/components/forms/gerants/addGerantForm";

  const initialFormData = {
    nom: "",
    prenom: "",
    date_naissance: "",
    telephone: "",
    email: "",
    pays: "",
    ville: "",
    commune: "",
    type: "gérant",
    etablissements_geres: [],
  };


export default function SignupDash(){

  const [formData, setFormData] = useState(initialFormData);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");
  const [errorDialoMsg, setErrorDialoMsg] = useState("");
  const [visibleError, setVisibleError] = useState(false);

  const mutationAdd = useMutation({
    mutationKey: ["signup-user"],
    mutationFn: async (newData) => {
      return await SignupUser(newData);
    },
  });



  const onSubmit = async()=>{
    try {

      const response = await SignupUser(formData);
      console.log("reussite ::",response)
      setFormData(initialFormData);
      setVisibleDialoMsg("Gérant ajouté avec succès.");
      setVisibleAdd(true);
    } catch (error) {
      console.log("error::", error.message);
      setErrorDialoMsg(error.message);
      setVisibleError(true);
    }
  }


  // useEffect(() => {
  //   if (mutationAdd.isError) {
  //     setErrorDialoMsg(err.message);
  //     setVisibleError(true);
  //   }
  //   if (mutationAdd.isSuccess) {
  //     setFormData(initialFormData);
  //     setVisibleDialoMsg("Gérant ajouté avec succès.");
  //     setVisibleAdd(true);
  //   }
  // }, [mutationAdd?.error]);


  return (
    <>
      <section>
        <div className="p-5">
          <div className="">
            <AddGerantForm
              isSignup={true}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="text-end">
            <Button onClick={onSubmit} label="Enregister" className="rounded" />
          </div>
        </div>
      </section>
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`/`}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg={errorDialoMsg}
      />
    </>
  );
}
