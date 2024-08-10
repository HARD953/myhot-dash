export default function EquipementListItem({ title, data }) {
  return (
    <div
      style={{
        width: "18rem",
        margin: "1rem",
      }}
    >
      <h5 className="h5 fw-bold"> {title} </h5>
      <ul className="ul">
        {!data?.length ? (
          <li className="li">Aucune donnée</li>
        ) : (
          data?.map((item, index) => (
            <li key={index} className="li">
              {item}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
