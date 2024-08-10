import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "src/assets/css/formAddNewItems.scss"


export default function CreateTemplateDialog({
  saveFn,
  visible,
  setVisible,
  title,
  children,
  isLoading,
  updated = false,
  isShowOnly = false,
  dialogStyle = null,
  dialogBreakpoints = null,
}) {
  const headerElement = (
    <div className="formulaire-creation-header">
      <i className="pi pi-file"></i>
      <span className="font-bold white-space-nowrap">{title}</span>
    </div>
  );

  const footerContent = (
    <div className="formulaire-creation-footer">
      <Button
        label="Fermer"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        autoFocus
        className="rounded-pill p-button-text p-button-danger"
      />
      <Button
        label={`Enregistrer ${updated ? "les modifications" : ""}`}
        icon="pi pi-save"
        onClick={() => saveFn()}
        loading={isLoading}
        disabled={isShowOnly}
        autoFocus
        className="rounded-pill button-save-form"
      />
    </div>
  );

  return (
    <>
      <Dialog
        visible={visible}
        modal
        className="formulaire-creation-dialog-container"
        header={headerElement}
        footer={footerContent}
        style={!!dialogStyle ? dialogStyle : { width: "50vw" }}
        breakpoints={
          !!dialogBreakpoints
            ? dialogBreakpoints
            : { "960px": "75vw", "641px": "100vw" }
        }
        onHide={() => setVisible(false)}
      >
        <section className="">{children}</section>
      </Dialog>
    </>
  );
}
