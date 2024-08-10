import { Rating } from "primereact/rating";
import "src/assets/css/evaluationNoteText.css";




export function EvaluationNoteComponent({note}) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="evaluation_note_text__note">
        <p> {note} </p>
      </div>
      <Rating
        value={Math.round(note)}
        readOnly
        style={{
          color: " var(--main-color-dash_2)",
          display: "flex",
          gap: "3px",
        }}
        cancel={false}
        unstyled
      />
    </div>
  );
}



export default function EvaluationNoteText({ title, subTitle, note }) {
  return (
    <div className="evaluation_note_text shadow bg-white p-4 m-2 rounded">
      <div className="evaluation_note_text__text">
        <h4 className="h4 fw-bolder mt-3"> {title} </h4>
        <p> {subTitle} </p>
      </div>
      <EvaluationNoteComponent note={note}/>
    </div>
  );
}
