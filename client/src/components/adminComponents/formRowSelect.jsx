const FormRowSelect = ({ name, list, defaultValue = "", onChange, dis }) => {
  if (dis) {
    dis = "disabled";
  } else {
    dis = "";
  }

  return (
    <div className="form-row">
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={dis}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
