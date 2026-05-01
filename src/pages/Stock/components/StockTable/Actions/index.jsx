import PropTypes from "prop-types";

export default function Actions({ icon, isTrash, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center flex-col"
    >
      <span
        aria-label={text}
        className={`cursor-pointer text-text-muted transition-all duration-200 ease-in-out hover:scale-110 ${isTrash ? "text-danger" : ""}`}
      >
        {icon}
      </span>
    </div>
  );
}

Actions.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isTrash: PropTypes.bool,
};
