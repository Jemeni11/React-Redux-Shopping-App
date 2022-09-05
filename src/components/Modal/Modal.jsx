import "./modal.css";
import Close from "../../assets/icon-close.svg";

const Modal = ({ setIsOpen, closeButtonFunction }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Success!</h5>
          </div>
          <button className="closeBtn" onClick={closeButtonFunction}>
            <img style={{ marginBottom: "-3px" }} src={Close} alt="close" />
          </button>
          <div className="modalContent">Your order has been processed!</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={closeButtonFunction}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
