import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des utilisateurs
export const getFactures = async()=>{
    try {
        const response = await instanceAxios.get(
          `factures`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation d'un utilisateur
export const getFacture = async(id)=>{
    try {
        const response = await instanceAxios.get(`factures/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addFacture = async(body)=>{
    try {
        const response = await instanceAxios.post("factures",body)
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updateFacture = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`factures/${id}`,body)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteFacture = async(id)=>{
    try {
        const response = await instanceAxios.delete(`factures/${id}/`, configHeadersFormDataToken())
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// modifier le statut d'une facture
export const updateSatutFacture = async(id,payload)=>{
    try {
        const response = await instanceAxios.put(`factures/change-statut/${id}/`, payload)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}
