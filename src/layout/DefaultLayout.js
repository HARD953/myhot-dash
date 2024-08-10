import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import { CContainer } from '@coreui/react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1">
        <CContainer className='p-0' fluid>
            <Outlet/>
        </CContainer>
          {/* <AppContent /> */}
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
