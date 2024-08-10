import React from 'react'
import DefaultLayout from './layout/DefaultLayout'
import { domaine_path } from './api/instanceAxios'
import ProtectedRoute from './service/protectedRoute'
import { appUrl } from './appUrl';



const SignupDash = React.lazy(() => import("./views/connexionNoContected/signupDash"));
const Connexion = React.lazy(() => import("./views/connexion/Connexion"));
const StartComponent = React.lazy(() => import("./views/start/StartComponent"));


const Accueil = React.lazy(() => import('./views/accueil/Accueil'))

//Chambres
const Chambres = React.lazy(() => import("./views/chambres/Chambres"));
const CreateChambre = React.lazy(() =>
  import("./views/chambres/CreateChambre")
);
const ChambresDetails = React.lazy(() =>
  import("./views/chambres/DetailsChambre")
);
//Clients
const Clients = React.lazy(() => import('./views/clients/Clients'))

//Reservations
const Reservations = React.lazy(() => import('./views/reservations/Reservations'))

//Chambres
const Gerants = React.lazy(() => import('./views/gerants/Gerants'))

const Comptes = React.lazy(() => import("./views/comptes/Comptes"));
//Reservations
const Evaluations = React.lazy(() => import('./views/evaluations/Evaluations'))

//Permissions
const Permissions = React.lazy(() => import('./views/permissions/Permissions'))

//Etablissements
const Etablissements = React.lazy(() =>
  import("./views/etablissements/Etablissements")
);
const CreateEtablissement = React.lazy(() =>
  import("./views/etablissements/create/CreateEtablissement")
);

//Factures
const Factures = React.lazy(() => import("./views/factures/Factures"));

//Parametres
const ParametresPage = React.lazy(() =>
  import("./views/parametres/Parametres")
);

export const appRouter = [
  {
    path: `${domaine_path}`,
    element: <DefaultLayout />,
    // errorElement: <ErrorPage />,
    children: [
      // {
      //   path: `${appUrl.accueil.home}`,
      //   element: (
      //     <ProtectedRoute>
      //       <Accueil />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: `${appUrl.chambre.list}`,
        element: (
          <ProtectedRoute>
            <Chambres />
          </ProtectedRoute>
        ),
      },
      {
        path: `${appUrl.chambre.create}`,
        element: (
          <ProtectedRoute>
            <CreateChambre />
          </ProtectedRoute>
        ),
      },
      {
        path: `${appUrl.chambre.details}/:id`,
        element: (
          <ProtectedRoute>
            <ChambresDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: `${domaine_path}/clients`,
        element: (
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        ),
      },
      {
        path: `${domaine_path}/reservations`,
        element: (
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        ),
      },
      {
        path: `${domaine_path}/gerants`,
        element: (
          <ProtectedRoute>
            <Gerants />
          </ProtectedRoute>
        ),
      },
      {
        path: `${appUrl.compte.list}`,
        element: (
          <ProtectedRoute>
            <Comptes />
          </ProtectedRoute>
        ),
      },
      {
        path: `${appUrl.evaluation.list}`,
        element: (
          <ProtectedRoute>
            <Evaluations />
          </ProtectedRoute>
        ),
      },
      {
        path: `${appUrl.etablissement.list}`,
        element: (
          <ProtectedRoute>
            <Etablissements />
          </ProtectedRoute>
        ),
      },
      {
        path: `${appUrl.etablissement.create}`,
        element: (
          <ProtectedRoute>
            <CreateEtablissement />
          </ProtectedRoute>
        ),
      },
      {
        path: `${domaine_path}/factures`,
        element: (
          <ProtectedRoute>
            <Factures />
          </ProtectedRoute>
        ),
      },
      {
        path: `${domaine_path}/permissions`,
        element: (
          <ProtectedRoute>
            <Permissions />
          </ProtectedRoute>
        ),
      },
      {
        path: `${domaine_path}/parametres`,
        element: (
          <ProtectedRoute>
            <ParametresPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Connexion />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupDash />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/start",
    element: <StartComponent />,
    // errorElement: <ErrorPage />,
  },
];

