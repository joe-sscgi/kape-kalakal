import { useNavigation } from "react-router-dom";
const SubmitBtn = ({ formBtn, className, buttonText }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!buttonText) {
    buttonText = "submit";
  }

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn || className || "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting" : buttonText}
    </button>
  );
};
export default SubmitBtn;
