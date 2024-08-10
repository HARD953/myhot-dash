import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'

import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { Divider } from 'primereact/divider'
import { changeSidebar } from 'src/redux/features/sidebar/sidebarShowSlice'
import { Image } from 'primereact/image'



import logo_myhot from "src/assets/images/Myhot/noBG/3_nobg.png"

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebar?.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebar?.sidebarShow)


  return (
    <CSidebar
      className='px-2 bg-white'
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(changeSidebar(visible ))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex bg-white" to="/">
        {/* <h3 className='fw-bolder text-dark'>Myhot </h3> */}
        <Image className="img-fluid" src={logo_myhot} alt='MYHOT' />
      </CSidebarBrand>
      <div className='bg-white text-dark'>
        <p className='mt-2 mb-4' >Administrer vos établissements</p>
        <Divider />
      </div>
      <CSidebarNav className="bg-white">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
