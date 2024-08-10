import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "src/assets/css/createCompte.scss";
import { Avatar } from "primereact/avatar";

export default function CreateCompteDialog({
  visible,
  setVisible,
  title,
  children,
}) {




  const headerElement = (
    <div className="formulaire-creation-compte-header">
      <Avatar
        className="avatar-compte"
        icon="pi pi-user"
        size="large"
        shape="circle"
      />
      <span className="ps-3 ">{title}</span>
    </div>
  );


  return (
    <>
      <Dialog
        visible={visible}
        modal
        className="formulaire-creation-compte-dialog-container"
        header={headerElement}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "40vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
      >
        <section className="">{children}</section>
      </Dialog>
    </>
  );
}
