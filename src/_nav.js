import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHouse,
  cilHome,
  cilSettings,
  cilCommentBubble,
  cilAddressBook,
  cilFile,
  cilFolderOpen,
  cilGlobeAlt,
  cilNewspaper,
  cilPeople,
  cilSpeedometer,
  cilChartLine,
  cilLockLocked,
} from '@coreui/icons'

import {CNavItem, CNavTitle } from '@coreui/react'
import { domaine_path } from './api/instanceAxios'
import { appUrl } from './appUrl'

const iconColor = "var(--main-color-dash_2)"

const _nav = [
  // {
  //   component: CNavItem,
  //   name: "Accueil",
  //   to: `${appUrl.accueil.home}`,
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" size="xl" />,
  // },
  {
    component: CNavItem,
    name: "Comptes",
    to: `${appUrl.compte.list}`,
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Gérants",
    to: `${domaine_path}/gerants`,
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Clients",
    to: `${domaine_path}/clients`,
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Etablissements",
    to: `${appUrl.etablissement.list}`,
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Chambres",
    to: `${appUrl.chambre.list}`,
    icon: <CIcon icon={cilHome} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Reservations",
    to: `${domaine_path}/reservations`,
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Factures",
    to: `${domaine_path}/factures`,
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" size="xl" />,
  },
  {
    component: CNavItem,
    name: "Evaluations",
    to: `${appUrl.evaluation.list}`,
    icon: (
      <CIcon icon={cilCommentBubble} customClassName="nav-icon" size="xl" />
    ),
  },
  // {
  //   component: CNavItem,
  //   name: "Rapports",
  //   to: `${domaine_path}/rapports`,
  //   icon: <CIcon icon={cilFile} customClassName="nav-icon" size="xl" />,
  // },
  // {
  //   component: CNavItem,
  //   name: "Statistiques",
  //   to: `${domaine_path}/statistiques`,
  //   icon: <CIcon icon={cilChartLine} customClassName="nav-icon" size="xl" />,
  // },
  // {
  //   component: CNavItem,
  //   name: "Permissions",
  //   to: `${domaine_path}/permissions`,
  //   icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" size="xl" />,
  // },

  {
    component: CNavTitle,
    name: "Configurations",
  },
  {
    component: CNavItem,
    name: "Paramètres",
    to: `${domaine_path}/parametres`,
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" size="xl" />,
  },
  // {
  //   component: CNavItem,
  //   name: "Dashboard",
  //   to: `${domaine_path}/config-dashboard`,
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" size="xl" />,
  // },
  // {
  //   component: CNavItem,
  //   name: "Site Myhot",
  //   to: `${domaine_path}/config-myhot`,
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" size="xl" />,
  // },

  {
    component: CNavTitle,
    name: "Autres",
  },
  {
    component: CNavItem,
    name: "Site Myhot",
    href: "https://myhot.ci/",
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" size="xl" />,
  },
];

export default _nav
