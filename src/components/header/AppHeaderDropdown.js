import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import img_header from 'src/assets/brand/header_picture.jpg'
import { Avatar } from 'primereact/avatar'
import { Chip } from 'primereact/chip'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from 'src/api/users/users'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {

  const navigate = useNavigate()
  const queryClient = useQueryClient();


  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await logoutUser();
    },
    onSuccess: async () => {

      queryClient.clear();
      localStorage.clear();
      navigate("/")

    },
    onError: async (err) => {
      console.error(err);
      console.log("error :", err.message);
    },
  });



   const content = (
     <div className='d-flex justify-content-between align-items-center gap-2'>
       {" "}
       <Avatar
         icon="pi pi-user"
         size="large"
         style={{
           backgroundColor: "var(--main-color-dash_2)",
           color: "#ffffff",
         }}
         shape="circle"
       />
       <span className=" me-3">Myhot Administrator</span>
     </div>
   );

    const accept = () => {
     logoutMutation.mutate()
    };

    const footerLogout = (event)=>{
      return (
        <div className="d-flex justify-content-between algin-items-center">
          <Button
            label="Non"
            className="p-button-primary p-button-text py-2 px-3"
            onClick={event.reject}
          />
          <Button
            label="Oui"
            className="p-button-danger p-button-text py-2 px-3"
            onClick={()=>accept()}
          />
        </div>
      );
    }

 const confirmLogout = () => {
   confirmDialog({
     message: "Êtes-vous sûr de vouloir vous déconnectez ?",
     header: "Demande de confirmation",
     headerClassName:"text-danger",
     icon: "pi pi-exclamation-triangle",
     footer:footerLogout,
     position:"top"
   });
 };


  return (
    <>
      <ConfirmDialog />
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <Chip className="px-0 ms-0" template={content} />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Mon profil
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Changer mon Mot de passe
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={()=> confirmLogout()}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Deconnexion
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  );
}

export default AppHeaderDropdown
