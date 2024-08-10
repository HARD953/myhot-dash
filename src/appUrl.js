import { domaine_path } from "./api/instanceAxios";

export const appUrl = {
  //Url Accueil
  accueil: {
    home: `${domaine_path}/accueil`,
  },

  //Url Comptes
  compte: {
    list: `${domaine_path}/comptes`,
  },

  //Url Etablissement
  etablissement: {
    list: `${domaine_path}/etablissements`,
    create: `${domaine_path}/etablissements/create`,
  },

  //Url Chambre
  chambre: {
    list: `${domaine_path}/chambres`,
    create: `${domaine_path}/chambres/create`,
    details: `${domaine_path}/chambres/details`,
  },

  //Url Chambre
  evaluation: {
    list: `${domaine_path}/evaluations`,
  },
};
