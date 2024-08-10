import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTypesEtablissements } from "src/api/parametres/parametres";
import { formatDataToDropdownCodeName } from "src/utils/utils";

export default function useTypesEtablissements() {
  const page = 1;
  const pageSize = 30;
  const [responseData, setResponseData] = useState([])
  const {
    data,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["liste-type-etablissements"],
    queryFn: async () => await getTypesEtablissements(page, pageSize),
  });

  useEffect(()=>{
      const typeEtablissements = data?.results;
      const formatedData = formatDataToDropdownCodeName(
        typeEtablissements,
        "id",
        "type",
        true
      );
    setResponseData(formatedData);
  },[isFetching,isLoading])

  return {
    listTypeEtablissement: responseData || [],
    isFetchingTypeEtablissement: isFetching,
    isLoadingTypeEtablissemen: isLoading,
  };
}
