const FormRow = ({
  type,
  name,
  placeholder,
  defaultValue,
  onChange,
  className,
  dis,
}) => {
  if (dis) {
    dis = "disabled";
  } else {
    dis = "";
  }
  return (
    <div className="form-group">
      <input
        type={type}
        id={name}
        name={name}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        disabled={dis}
        required
      />
    </div>
  );
};
export default FormRow;
