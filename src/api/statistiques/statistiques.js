import {
  instanceAxios,
  configHeadersFormDataToken,
  configHeadersToken,
} from "../instanceAxios";

// recuperation statistiques generales
export const getStatistiquesGenerales = async () => {
  try {
    const response = await instanceAxios.get(
      `statistiques/statistiques-generales`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


// recuperation evolutions Reservation par mois
export const getStatistiquesEvolutionsReservationsMois = async () => {
  try {
    const response = await instanceAxios.get(
      `statistiques/evolution-reservations-mois`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation statistiques evoltuions receetes par mois
export const getStatistiquesEvolutionsRecettesMois = async () => {
  try {
    const response = await instanceAxios.get(
      `statistiques/evolution-recettes-mois`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};
