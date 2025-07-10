const FormRow = ({
  type,
  name,
  placeholder,
  defaultValue,
  onChange,
  className,
  dis,
  ro,
}) => {
  if (dis) {
    dis = "disabled";
  } else {
    dis = "";
  }
  if (ro) {
    ro = "readOnly";
  } else {
    ro = "";
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
        readOnly={ro}
        required
      />
    </div>
  );
};
export default FormRow;
