import "../styles/Model.css"
import PropTypes from 'prop-types';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>Sluit</button>
      </div>
    </div>
  );
};
// PropTypes toevoegen voor validatie
Modal.propTypes = {
  message: PropTypes.string.isRequired, // Zorg ervoor dat 'message' een string is
  onClose: PropTypes.func.isRequired,   // Zorg ervoor dat 'onClose' een functie is
};

export default Modal;


