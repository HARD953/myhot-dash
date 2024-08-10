import {  instanceAxios, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des Personnes
export const getPersonnes = async()=>{
    try {
        const response = await instanceAxios.get(
          `personnes`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation une Personne
export const getPersonne = async(id)=>{
    try {
        const response = await instanceAxios.get(`personnes/${id}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter une Personne
export const addPersonne = async(body)=>{
    try {
        const response = await instanceAxios.post(
          "personnes",
          body,
          configHeadersToken()
        );
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour une Personne
export const updatePersonne = async(id,body)=>{
    try {
        const response = await instanceAxios.put(
          `personnes/${id}`,
          body,
          configHeadersToken()
        );
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer une Personne
export const deletePersonne = async(id)=>{
    try {
        const response = await instanceAxios.delete(`personnes/${id}/`, configHeadersToken())
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}


//  Recuperer Personne qui sont des Gerants
export const getPersonneGerants = async(page,pageSize)=>{
    try {
        const response = await instanceAxios.get(
          `personnes/utilisateurs/gerants/?page=${page}&pageSize=${pageSize}`,
          configHeadersToken()
        );
        return response?.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

//  Recuperer Personne qui sont des Clients
export const getPersonneClients = async(page,pageSize)=>{
    try {
        const response = await instanceAxios.get(
          `personnes/utilisateurs/clients/?page=${page}&pageSize=${pageSize}`,
          configHeadersToken()
        );
        return response?.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}
