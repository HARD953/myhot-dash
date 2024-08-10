import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";


// recuperation de la liste des utilisateurs
export const getChambres = async(page,pageSize)=>{
    try {
        const response = await instanceAxios.get(
          `chambres/?page=${page}&pageSize=${pageSize}`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation de la liste des chambres disponible en fonction de criteres
export const getChambresDisponibles = async (debut, fin, typeChambre) => {
  try {
    const type = !!typeChambre ? typeChambre : ""
    const response = await instanceAxios.get(
      `chambres/reservations/disponibles/?date_debut=${debut}&date_fin=${fin}&type_chambre=${type}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};



// recuperation d'un utilisateur
export const getChambre = async(id)=>{
    try {
        const response = await instanceAxios.get(`chambres/${id}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addChambre = async(body)=>{
    try {
        const response = await instanceAxios.post("chambres",body, configHeadersToken())
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updateChambre = async(id,body)=>{
    try {
        const response = await instanceAxios.put(
          `chambres/${id}`,
          body,
          configHeadersToken()
        );
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteChambre = async(id)=>{
    try {
        const response = await instanceAxios.delete(
          `chambres/${id}/`,
          configHeadersToken()
        );
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des chambres occupées
export const getChambresOccupees = async()=>{
    try {
        const response = await instanceAxios.get(
          `chambres/occupee/list`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des chambres libres
export const getChambresLibres = async()=>{
    try {
        const response = await instanceAxios.get(
          `chambres/non-occupees/list`);
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des chambres libres
export const getChambresLibresPeriode = async (dateDebut,dateFin) => {
  try {
    const debut = new Date(dateDebut).toISOString().slice(0, 10);
    const fin = new Date(dateFin).toISOString().slice(0, 10);
    const response = await instanceAxios.get(
      `chambres/non-occupees/periode/?dateDebut=${debut}&dateFin=${fin}`
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

//Chambre ajouter des images
export const chambreAddImages = async (id,body) => {
  try {
    const response = await instanceAxios.post(`chambres/${id}/images`, body,configHeadersFormDataToken()
    );
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

//Chambre ajouter des images
export const chambreGetReservationsStatusInfo = async (id) => {
  try {
    const response = await instanceAxios.get(`chambres/${id}/reservations_count_by_status`, configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

//Chambre reservations en cours
export const chambreGetReservationEnCours = async (id, page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `chambres/${id}/reservations_en_cours`,
      {
        ...configHeadersToken(),
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};


//Chambre reservations en attentes
export const chambreGetReservationEnAttentes = async (id, page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `chambres/${id}/reservations_en_attente`,
      {
        ...configHeadersToken(),
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};


//Chambre reservations en terminées
export const chambreGetReservationTerminees = async (id, page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `chambres/${id}/reservations_terminees`,
      {
        ...configHeadersToken(),
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};


//Chambre reservations annulées
export const chambreGetReservationAnnulees = async (id, page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `chambres/${id}/reservations_annulees`,
      {
        ...configHeadersToken(),
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
