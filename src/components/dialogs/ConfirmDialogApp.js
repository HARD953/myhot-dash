import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function ConfirmDialogApp({
  visible,
  setVisible,
  acceptFunction = () => {},
  message = "",
  header = "",
  dataID=0,
}) {
  const footerConfirm = () => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <Button
          onClick={() => setVisible(false)}
          autoFocus={true}
          label="Non"
          className="p-button-info p-button-outlined rounded"
        />
        <Button
          onClick={() => acceptFunction(dataID)}
          label="Oui"
          className="p-button-danger rounded"
        />
      </div>
    );
  };

  return (
    <Dialog
      header={header}
      footer={footerConfirm}
      visible={visible}
      style={{ width: "auto" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={() => setVisible(false)}
    >
      <p className="m-0">{message}</p>
    </Dialog>
  );
}
