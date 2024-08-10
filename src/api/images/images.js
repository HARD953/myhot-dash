import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des utilisateurs
export const getImages = async()=>{
    try {
        const response = await instanceAxios.get(
          `images`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}



// recuperation d'un utilisateur
export const getImage = async(id)=>{
    try {
        const response = await instanceAxios.get(`images/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addImage = async(body)=>{
    try {
        const response = await instanceAxios.post("images/upload",body,{headers: {
            'Content-Type': 'multipart/form-data'
        }})
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updateImage = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`images/${id}`,body)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteImage = async(id)=>{
    try {
        const response = await instanceAxios.delete(`images/${id}/`, configHeadersFormDataToken())
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des images occupées
export const getImagesOccupees = async()=>{
    try {
        const response = await instanceAxios.get(
          `images/occupee/list`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des images libres
export const getImagesLibres = async()=>{
    try {
        const response = await instanceAxios.get(
          `images/non-occupees/list`);
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation de la liste des images libres
export const getImagesLibresPeriode = async (dateDebut,dateFin) => {
  try {
    const debut = new Date(dateDebut).toISOString().slice(0, 10);
    const fin = new Date(dateFin).toISOString().slice(0, 10);
    const response = await instanceAxios.get(
      `images/non-occupees/periode/?dateDebut=${debut}&dateFin=${fin}`
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};
