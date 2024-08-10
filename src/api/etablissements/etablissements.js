import {  instanceAxios, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des etablissement
export const getEtablissements = async(page,pageSize)=>{
    try {
        const response = await instanceAxios.get(
          `etablissements/?page=${page}&pageSize=${pageSize}`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}
// recuperation de la liste des etablissement
export const getEtablissementsByType = async(page,pageSize,typeId)=>{
  console.log("typeId ::",typeId)
    try {
        const response = await instanceAxios.get(
          `etablissements/type/${typeId}/`,
          {...configHeadersToken(),
            params:{
              page,
              pageSize,
            }
          }
        );
        return response?.data || []
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}

// recuperation d'un etablissement
export const getEtablissement = async(id)=>{
    try {
        const response = await instanceAxios.get(`etablissements/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}


// ajouter un etablissement
export const addEtablissement = async(body)=>{
    try {
        const response = await instanceAxios.post("etablissements",body,configHeadersToken())
        return response?.data
    } catch (error) {
    throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un etablissement
export const updateEtablissement = async(id,body)=>{
    try {
        const response = await instanceAxios.put(
          `etablissements/${id}`,
          body,
          configHeadersToken()
        );
        return response
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteEtablissement = async(id)=>{
    try {
        const response = await instanceAxios.delete(
          `etablissements/${id}/`,
          configHeadersToken()
        );
        return response
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
}
