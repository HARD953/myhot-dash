import { useEffect, useRef, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { MultiSelect } from "primereact/multiselect";

export default function AddCompteForm({
  setFormData,
  formData,
  listUserByType,
  typeCompte,
  setTypeCompte,
  isShowOnly = false,
  updated= false,
}) {
  const typeCompteList = [
    { name: "Gérant", code: "gerant" },
    { name: "Client", code: "client" },
  ];

  const typePermission = [
    { name: "Admin", code: "is_admin" },
    { name: "Gérant", code: "is_gerant" },
    { name: "Client", code: "is_client" },
  ];

  const [userList, setUserList] = useState([]);
  const [permissions, setPermissions] = useState([]);



  const handleFormData = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormDataMultiselect = (values) => {
    setFormData((prev) => {
      const is_admin = !!values?.length ? values?.includes("is_admin") : false;
      const is_gerant = !!values?.length
        ? values?.includes("is_gerant")
        : false;
      const is_client = !!values?.length
        ? values?.includes("is_client")
        : false;

      return {
        ...prev,
        is_client,
        is_admin,
        is_gerant,
      };
    });
  };

  const customizedListUsrByType = (list) => {
    if (!!list?.length) {
      return list.map((item) => ({
        code: item?.id,
        name: `${item?.prenom} ${item?.prenom} - ${item?.email}`,
      }));
    } else {
      return [];
    }
  };



  useEffect(() => {
    const listCustomized = customizedListUsrByType(listUserByType?.results);
    console.log("listUserByType ;;;", listUserByType);
    setUserList(listCustomized);
  }, [listUserByType]);

  useEffect(() => {
    let permissions = [];
    const personne = !!formData?.personne ? formData?.personne : {};
    if (formData?.is_gerant) permissions.push("is_gerant");
    if (formData?.is_admin) permissions.push("is_admin");
    if (formData?.is_client) permissions.push("is_client");

    if (!!Object.keys(personne).length) {
      console.log("teyeye ", !!Object.keys(personne).length);
      if (personne?.is_gerant) setTypeCompte(typeCompteList[0]?.code);
      if (personne?.is_client) setTypeCompte(typeCompteList[1]?.code);

    }

    setPermissions(permissions);
  }, [formData]);



  console.log(' test ',typeCompte)

  return (
    <form className="">
      <div className="row mt-md-4 mb-4">
        <div className="col-md-12 mb-4">
          <FloatLabel>
            <Dropdown
              value={typeCompte}
              id="typeCompte"
              disabled={isShowOnly}
              clearIcon
              onChange={(e) => setTypeCompte(e.value)}
              options={typeCompteList}
              optionLabel="name"
              optionValue="code"
              placeholder="Selectionner un type"
              className="w-100"
            />
            <label htmlFor="typeCompte">Type de compte</label>
          </FloatLabel>
        </div>
      </div>
      <div className="row mt-md-4">
        <div className="col-md-12">
          <FloatLabel>
            <Dropdown
              value={formData?.personne_id}
              id="user_compte"
              disabled={isShowOnly}
              onChange={(e) => handleFormData(e.value, "personne_id")}
              options={userList}
              optionLabel="name"
              optionValue="code"
              placeholder="Selectionner un utilisateur"
              className="w-100"
            />
            <label htmlFor="user">Utilisateur</label>
          </FloatLabel>
        </div>
      </div>

      <div className="row mt-md-4">
        <h5 className="h5 fw-bold">Permissions </h5>
        <div className="col-md-12">
          {/* <FloatLabel> */}
          <MultiSelect
            value={permissions}
            disabled={isShowOnly}
            onChange={(e) => handleFormDataMultiselect(e.value)}
            options={typePermission}
            optionLabel="name"
            optionValue="code"
            display="chip"
            placeholder="Selectionnez permissions"
            maxSelectedLabels={3}
            className="w-100"
          />
          {/* <label htmlFor="user">Permissions Compte</label> */}
          {/* </FloatLabel> */}
        </div>
      </div>
      {!isShowOnly && (
        <div className="row mt-md-4 py-3">
          <div className="col-md-12">
            <FloatLabel>
              <Password
                inputId="password"
                className="w-100"
                inputClassName="w-100"
                value={formData?.password}
                onChange={(e) => handleFormData(e.target.value, "password")}
              />
              <label htmlFor="password">Mot de passe</label>
            </FloatLabel>
          </div>
        </div>
      )}

    </form>
  );
}
