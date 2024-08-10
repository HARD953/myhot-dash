import { instanceAxios, configHeadersToken } from "../instanceAxios";

// recuperation de la liste des evaluations
export const getEvaluations = async (page, pageSize) => {
  try {
    const response = await instanceAxios.get(`evaluations/`, {
      ...configHeadersToken(),
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation liste evaluations accepteés
export const getEvaluationsAccepted = async (page, pageSize) => {
  try {
    const response = await instanceAxios.get(`evaluations/status/accepted`, {
      ...configHeadersToken(),
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


// recuperation liste evaluations rejetées
export const getEvaluationsRefused = async (page, pageSize) => {
  try {
    const response = await instanceAxios.get(`evaluations/status/refused`, {
      ...configHeadersToken(),
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation evaluation d'une chambre
export const getEvaluationByChambreIdAndStatus = async (id, approuve = null) => {
  try {
    const response = await instanceAxios.get(`evaluations/chambre/${id}`, {
      ...configHeadersToken(),
      params: {
        approuve: approuve,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


// recuperation evaluation toutes les valeures des notes d'une chambre
export const getEvaluationByChambreIdAndStatusSum = async (id, approuve = null) => {
  try {
    const response = await instanceAxios.get(
      `evaluations/chambre/${id}/all_evaluations`,
      {
        ...configHeadersToken(),
        params: {
          approuve: approuve,
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation evaluation par ID
export const getEvaluationById = async (id) => {
  try {
    const response = await instanceAxios.get(`evaluations/${id}`, {
      ...configHeadersToken()
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation evaluation par ID
export const evaluationChangeStatusApprouve = async (id,status) => {
  try {
    const response = await instanceAxios.patch(`evaluations/${id}/approuve`,{approuve: status}, {
      ...configHeadersToken()
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};
