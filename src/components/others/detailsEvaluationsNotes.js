import EvaluationNoteText from "./EvaluationNoteText";


export default function DetailsEvaluationsNotes({ evaluation }) {
  return (
    <div className="d-flex justify-content-around flex-wrap">
      <EvaluationNoteText
        title="Confort"
        subTitle="Appréciation liée au confort de la chambre"
        note={evaluation?.note_confort}
      />
      <EvaluationNoteText
        title="Proprété"
        subTitle="Appréciation liée à l'hygiène de la chambre"
        note={evaluation?.note_proprete}
      />
      {/* <EvaluationNoteText
        title="équipement"
        subTitle="L'etat des équipement de la chambre"
        note={evaluation?.note_equipements}
      /> */}
      <EvaluationNoteText
        title="Service client"
        subTitle="Appréciaction du service client"
        note={evaluation?.note_service_client}
      />
      <EvaluationNoteText
        title="Emplacement"
        subTitle="Accessibilité de la chambre"
        note={evaluation?.note_localisation}
      />
      <EvaluationNoteText
        title="Montant"
        subTitle="Le montant le chambre "
        note={evaluation?.note_valeur_argent}
      />
      <EvaluationNoteText
        title="Sécurité"
        subTitle="Note liéé à la sécurité de la chambre"
        note={evaluation?.note_securite}
      />
    </div>
  );
}
