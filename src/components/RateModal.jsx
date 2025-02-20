import { Button } from "@mui/material";
import React from "react";
import { ClientContext } from "../contexts/ClientProvider";

const RateModal = ({ setModal, productId }) => {
  const { updateRate } = React.useContext(ClientContext);
  const [rate, setRate] = React.useState(0);
  const [active, setActive] = React.useState(null);
  const indexArray = [1, 2, 3, 4, 5];
  // React.useEffect(() => {
  //   updateRate(rate, productId);
  // }, [rate]);
  return (
    <div className="my-modal-container">
      <div className="my-modal">
        <div className="modal-header">
          <p>Оценить</p>
          <button onClick={() => setModal(null)}>&#10006; </button>
        </div>
        <div className="modal-body">
          {indexArray.map((item) => (
            <div
              className={`rate-btn ${active === item ? "rate-btn-active" : ""}`}
              onClick={() => {
                setRate(item);
                setActive(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <div className="modal-button">
            <Button
              onClick={() => {
                updateRate(rate, productId); setModal(null);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateModal;
