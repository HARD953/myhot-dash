import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPays, getVilles } from "src/api/data/dataListApi";
import { formatDataToDropdownCodeName } from "src/utils/utils";

export default function useDataList() {

  const [pays, setPays] = useState([]);
  const [villes, setVlles] = useState([]);

  const { data: dataPays, isFetching: isFetchingPays} = useQuery({
    queryKey: ["liste-pays"],
    queryFn: async () => await getPays(),
  });

  const { data: dataVilles, isFetching: isFetchingVilles } = useQuery({
    queryKey: ["liste-villes"],
    queryFn: async () => await getVilles(),
  });

  useEffect(() => {
    const _pays = dataPays;
    const _villes = dataVilles;

    const formatedDataPays = formatDataToDropdownCodeName(
      _pays,
      "id",
      "titre",
      true
    );

    const formatedDataVille = formatDataToDropdownCodeName(
      _villes,
      "id",
      "titre",
      true
    );

    setPays(formatedDataPays);
    setVlles(formatedDataVille);
  }, [isFetchingPays, isFetchingVilles]);

  return {
    paysList: pays || [],
    villesList: villes || [],
  };
}
