
import React from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
// import { useNavigate } from "react-router-dom";

export default function ErrorDialog({visible, setVisible,msg=""}) {
//    const navigate = useNavigate()


   const onClose = ()=>{
    // navigate(returnUrl)
    setVisible(false)
   }

    const footer =  ()=>{
        return(
            <div className="">
                 <Button
                    onClick={()=>onClose() }
                    label="Fermer"
                    className="rounded p-button-danger p-button-outlined"
                 />

            </div>
        )
    }

    return (
            <Dialog
                footer={footer}
                header={"Erreur Survenue"}
                visible={visible}
                style={{ width: '25vw' }}
                onHide={() => onClose()}>
                    <section className="text-center px-4" >
                        <p className="text-dark mb-0 fs-5 ">
                          { !!msg ? msg : "Une erreur est survenue. Réessayez !"}
                        </p>
                    </section>

            </Dialog>

    )
}
