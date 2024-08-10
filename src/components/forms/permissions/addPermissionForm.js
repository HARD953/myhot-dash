import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";

export default function AddPermissionForm({
  setFormData,
  formData,
  isShowOnly=false
}) {

  const handleFormData = (value,key)=>{
    setFormData(prev=>({...prev,[key]:value}))
    console.log("value ::",value)
  }


  return (
    <form className="">
      <div className="row mt-md-4 mt-4">
        <div className="col-md-12 mt-4">
          <FloatLabel>
            <InputText
              id="titre"
              className="w-100"
              disabled={isShowOnly}
              value={formData?.titre}
              onChange={(e) => handleFormData(e.target.value, "titre")}
            />
            <label for="EtablissementId">Titre Permission</label>
          </FloatLabel>
        </div>
      </div>

      <div className="row mt-md-4 mt-4">
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
            <label for="description">Description Permission</label>
          </FloatLabel>
        </div>
      </div>
    </form>
  );
}
