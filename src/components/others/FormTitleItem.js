export default function FormTitleItem({ title, children, isOptionnel =false}) {
  return (
    <div className="">
      <label className="fw-bolder mb-2 fs-5"> {title} </label>
      {!!isOptionnel && (
        <label className="fst-italic mb-2 ms-1 fs-5"> (Optionnel) </label>
      )}
      {children}
    </div>
  );
}
