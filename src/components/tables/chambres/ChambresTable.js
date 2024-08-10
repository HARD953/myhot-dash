import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { FilterMatchMode } from "primereact/api";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import { main_app_path_files } from "src/api/instanceAxios";
import { formatDateString, formatMontant } from "src/utils/utils";
import { useNavigate } from "react-router-dom";
import { appUrl } from "src/appUrl";
import {
  calculateRatingNumberOnly,
  RatingComponentOnlyStars,
  RatingComponentStarAndValue,
  RatingComponentStarAndValueWithAvis,
} from "src/components/others/RatingComponent";
import { getEvaluationByChambreIdAndStatusSum } from "src/api/evaluations/evaluations";

const ChambresTable = ({
  deleteChambreConfirm,
  showUpdateDialogChambre,
  setSizeDataTable,
  data,
  isFetching,
  isLoading,
  chambreDataQuery,
  isPlaceholderData,
  pagePagination,
  setPagePagination,
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const getChambreDetails = (chambreId) => {
    navigate(`${appUrl.chambre.details}/${chambreId}`, { replace: true });
  };

  const getEvaluationsChambreById = async (id) => {
    return await getEvaluationByChambreIdAndStatusSum(id, true);
  };

  const tableFooter = () => {
    return (
      <div className="d-flex justify-content-between align-items-center mt-5">
        <Button
          onClick={() => setPagePagination((old) => Math.max(old - 1, 0))}
          type="button"
          icon="pi pi-arrow-left"
          label="Precédent"
          className="rounded p-button-outlined p-button-secondary"
          disabled={pagePagination === 1}
          loading={isFetching}
        />

        <div className="">
          <span>
            {chambreDataQuery?.pagination?.currentPage} sur{" "}
            {!!chambreDataQuery?.pagination?.totalPages
              ? chambreDataQuery?.pagination?.totalPages
              : 1}{" "}
            Pages
          </span>
        </div>

        <Button
          type="button"
          onClick={() => {
            if (!isPlaceholderData && !!chambreDataQuery?.pagination?.hasMore) {
              setPagePagination((old) => old + 1);
            }
          }}
          disabled={
            isPlaceholderData || !!!chambreDataQuery?.pagination?.hasMore
          }
          label="Suivant"
          className="rounded p-button-outlined p-button-secondary"
          iconPos="right"
          loading={isFetching}
          icon="pi pi-arrow-right"
        />
      </div>
    );
  };

  const actionsBody = (rowdata) => {
    return (
      <section className="d-flex justify-content-between align-items-center gap-2">
        <Button
          // icon="pi pi-eye"
          label="Consulter"
          onClick={() => getChambreDetails(rowdata?.id)}
          className="rounded px-3 py-2"
        />
        <Button
          // icon="pi pi-pencil"
          label="Editer"
          onClick={() => showUpdateDialogChambre(rowdata?.id)}
          className="rounded px-3 py-2 p-button-info"
        />
        <Button
          onClick={() => deleteChambreConfirm(rowdata?.id)}
          // icon="pi pi-trash"
          label="Supprimer"
          tooltipOptions={{ position: "left" }}
          className="rounded px-3 py-2 p-button-danger"
        />
      </section>
    );
  };

  const selectedRow = (data) => {
    getChambreDetails(data?.id);
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="rounded-pill"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Rechercher..."
          />
        </span>
      </div>
    );
  };

  const chambreImageBody = (rowdata) => {
    const firstImage = !!rowdata?.images?.length ? rowdata?.images[0]?.url : "";
    return (
      <div className="rounded shadow">
        <Image
          src={`${main_app_path_files}${firstImage}`}
          alt="Image"
          width="80"
          height="60"
          preview
          imageClassName="rounded"
        />
      </div>
    );
  };

  const bodyPrixUnitaire = (row) => {
    return `${formatMontant(row?.prix_nuit)}`;
  };

  const getNotesChambre = async (row) => {
    try {
      const evaluation = await getEvaluationByChambreIdAndStatusSum(
        row?.id,
        true
      );
      return evaluation;
    } catch (error) {
      console.error("Error fetching evaluation:", error);
      return {};
    }
  };

  const bodyTitle = (row) => {
    const [notes, setNotes] = useState({});

    useEffect(() => {
      const fetchNotes = async () => {
        const evaluation = await getNotesChambre(row);
        setNotes(evaluation);
      };
      fetchNotes();
    }, [row?.id]);

    return (
      <div className="d-flex flex-column justify-content-start">
        <p className="fw-bold my-0"> {row?.titre} </p>
        <div className="d-flex">
          <RatingComponentStarAndValueWithAvis rateData={notes} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setSizeDataTable(data?.length || 0);
  }, [data]);

  return (
    <DataTable
      value={data || []}
      className="rounded"
      loading={isFetching || isLoading}
      footer={tableFooter}
      header={renderHeader}
      filters={filters}
      selectionMode="single"
      selection={selectedRow}
      onSelectionChange={(e) => selectedRow(e.value)}
      stripedRows
      resizableColumns
      scrollable
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column header="N°" field="numero" />
      <Column
        header="Image"
        style={{ width: "80px" }}
        body={chambreImageBody}
      />
      <Column body={bodyTitle} header="Nom Chambre" />
      <Column field="type_chambre.type" header="Type Chambre" />
      <Column
        body={bodyPrixUnitaire}
        bodyClassName="text-center"
        header="Tarif par Nuit (F CFA)"
      />
      <Column
        field="nombre_lits"
        bodyClassName="text-center"
        header="Nombre de Lit"
      />
      <Column
        body={(rowdata) => formatDateString(rowdata?.updatedAt)}
        header="Dernière modification"
      />
      <Column header="Actions" body={actionsBody} />
    </DataTable>
  );
};

export default ChambresTable;
