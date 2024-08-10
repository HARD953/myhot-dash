import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'


const Connexion = React.lazy(() => import('./views/connexion/Connexion'))


import './scss/style.scss'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { appRouter } from './routes'
import MyHotDashProviders from './providers'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


const router = createBrowserRouter(appRouter);

class App extends Component {
  render() {
    return (
      <MyHotDashProviders>
        <Suspense fallback={loading}>
          <RouterProvider router={router} />
        </Suspense>
      </MyHotDashProviders>
    )
  }
}

export default App
