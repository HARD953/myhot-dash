import { configHeadersToken, instanceAxios } from "../instanceAxios";

//TypesEtablissement
export const getTypesEtablissements = async (page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `type_etablissements/?page=${page}&pageSize=${pageSize}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


export const addTypesEtablissement = async (body) => {
  try {
    const response = await instanceAxios.post(
      "type_etablissements/",
      body,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


export const updateTypesEtablissement = async (id, body) => {
  try {
    console.log("body :::", body);
    const response = await instanceAxios.put(
      `type_etablissements/${id}/`,
      body,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteTypesEtablissement = async (id) => {
  try {
    const response = await instanceAxios.delete(
      `type_etablissements/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};




//TypesChambre
export const getTypesChambres = async (page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `type_chambres/?page=${page}&pageSize=${pageSize}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


export const addTypesChambre = async (body) => {
  try {
    const response = await instanceAxios.post(
      "type_chambres/",
      body,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


export const updateTypesChambre = async (id, body) => {
  try {
    console.log("body :::", body);
    const response = await instanceAxios.put(
      `type_chambres/${id}/`,
      body,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteTypesChambre = async (id) => {
  try {
    const response = await instanceAxios.delete(
      `type_chambres/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};



//Equipements Chambre
export const getEquipementsChambres = async (page, pageSize) => {
  try {
    const response = await instanceAxios.get(
      `equipements/?page=${page}&pageSize=${pageSize}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


export const addEquipementsChambre = async (body) => {
  try {
    const response = await instanceAxios.post(
      "equipements/",
      body,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};


export const updateEquipementsChambre = async (id, body) => {
  try {
    console.log("body :::", body);
    const response = await instanceAxios.put(
      `equipements/${id}/`,
      body,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteEquipementsChambre = async (id) => {
  try {
    const response = await instanceAxios.delete(
      `equipements/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

