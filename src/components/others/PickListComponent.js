import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";




export default function PickListComponent({sourceList}) {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);


  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const itemTemplate = (item) => {
    return (
      <div className="d-flex flex-wrap p-2 align-items-center gap-3">
        {/* <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
          alt={item.name}
        /> */}
        <div className="">
          <i className="pi pi-user fs-4 rounded-pill"></i>
        </div>
        <div className="flex-1 flex flex-column gap-2">
          <span className="fw-bold">
            {item?.prenom} {item?.nom}
          </span>
        </div>
      </div>
    );
  };



  useEffect(() => {
    setSource(sourceList||[]);
    console.log(sourceList);
  }, [sourceList]);



  return (
    <div className="card">
      <PickList
        dataKey="id"
        source={source}
        target={target}
        onChange={onChange}
        itemTemplate={itemTemplate}
        filter
        filterBy="nom"
        breakpoint="1280px"
        sourceHeader="Liste Gérants"
        targetHeader="Gérants attribués"
        showSourceControls={false}
        showTargetControls={false}
        sourceStyle={{ height: "24rem" }}
        targetStyle={{ height: "24rem" }}
        sourceFilterPlaceholder="Rechercher par Nom"
        targetFilterPlaceholder="Rechercher par Nom"
      />
    </div>
  );
}
