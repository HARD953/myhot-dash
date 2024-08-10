import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des utilisateurs
export const getPermissions = async()=>{
    try {
        const response = await instanceAxios.get(
          `permissions`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation de la liste des permissions en fonction de la disponibilité
export const getPermissionsDisponibilite = async(disponibilite)=>{
    try {
        const response = await instanceAxios.get(
          `permissions/disponibilite/${disponibilite}`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation d'un utilisateur
export const getPermission = async(id)=>{
    try {
        const response = await instanceAxios.get(`permissions/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addPermission = async(body)=>{
    try {
        const response = await instanceAxios.post("permissions",body)
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updatePermission = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`permissions/${id}`,body)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deletePermission = async(id)=>{
    try {
        const response = await instanceAxios.delete(`permissions/${id}/`, configHeadersFormDataToken())
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des permissions occupées
export const getPermissionsOccupees = async()=>{
    try {
        const response = await instanceAxios.get(
          `permissions/occupee/list`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des permissions libres
export const getPermissionsLibres = async()=>{
    try {
        const response = await instanceAxios.get(
          `permissions/non-occupees/list`);
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des permissions libres
export const getPermissionsLibresPeriode = async (dateDebut,dateFin) => {
  try {
    const debut = new Date(dateDebut).toISOString().slice(0, 10);
    const fin = new Date(dateFin).toISOString().slice(0, 10);
    const response = await instanceAxios.get(
      `permissions/non-occupees/periode/?dateDebut=${debut}&dateFin=${fin}`
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

//Permission ajouter des images
export const permissionAddImages = async (id,body) => {
  try {
    const response = await instanceAxios.post(`permissions/${id}/images`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
