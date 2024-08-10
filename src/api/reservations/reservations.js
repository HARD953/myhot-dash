import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";


/// Fonction générique pour mettre à jour le statut d'une réservation
const updateReservationStatus = async (id, status) => {
  try {
    const response = await instanceAxios.patch(
      `reservations/${id}/${status}`,
      {},
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Une erreur s\'est produite');
  }
};

// recuperation de la liste des reservations par statut
const getReservationsByStatus = async (status, page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `reservations/etablissements/${status}`,
      { ...configHeadersToken(),
        params: {
          page: page,
          pageSize: pageSize,
        },
      },
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "An error occurred while fetching reservations"
    );
  }
};





// recuperation de la liste des utilisateurs
export const getReservations = async (page, pageSize, status) => {
  try {
    const response = await instanceAxios.get(
      `reservations`,{
        params:{
          page: page,
          pageSize: pageSize,

        }
      },
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};



export const getReservationsIsWaiting = async (page, pageSize) => {
  return getReservationsByStatus("waitting", page, pageSize);
};

export const getReservationsIsConfirmed = async (page, pageSize) => {
  return getReservationsByStatus("confirmed", page, pageSize);
};

export const getReservationsIsCancelled = async (page, pageSize) => {
  return getReservationsByStatus("cancelled", page, pageSize);
};

export const getReservationsIsCompleted = async (page, pageSize) => {
  return getReservationsByStatus("completed", page, pageSize);
};




// Confirmer une réservation
export const getConfirmReservation = async (id) => {
  return updateReservationStatus(id, 'confirm');
};

// Annuler une réservation
export const getCancelReservation = async (id) => {
  return updateReservationStatus(id, 'cancel');
};

// Terminer une réservation
export const getCompleteReservation = async (id) => {
  return updateReservationStatus(id, 'complete');
};



// recuperation d'un utilisateur
export const getReservation = async(id)=>{
    try {
        const response = await instanceAxios.get(`reservations/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addReservation = async(body)=>{
    try {
        const response = await instanceAxios.post(
          `chambres/${body?.chambreId}/reservations`,
          body,
          configHeadersToken()
        );
        return response
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}


// mettre a jour un utilisateurs
export const updateReservation = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`reservations/${id}`,body)
        return response
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteReservation = async(id)=>{
    try {
        const response = await instanceAxios.delete(`reservations/${id}/`, configHeadersFormDataToken())
        return response
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}

// modifier le statut d'une reservation
export const updateSatutReservation = async(id,payload)=>{
    try {
        const response = await instanceAxios.put(`reservations/change-statut/${id}/`, payload)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// generer facture reservation
export const genererFactureReservation = async(id,payload)=>{
    try {
        const response = await instanceAxios.post(`reservations/${id}/factures/generer`, payload)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}
