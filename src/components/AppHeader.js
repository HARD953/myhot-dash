import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import img_header from 'src/assets/brand/header_picture.jpg'
import { changeSidebar } from 'src/redux/features/sidebar/sidebarShowSlice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar?.sidebarShow)

  return (
    <CHeader position="sticky" className="shadow" style={{background:'#FFF'}} >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(changeSidebar(!sidebarShow))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={img_header} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
