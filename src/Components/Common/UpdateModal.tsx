import { Modal, ModalBody, Spinner, Button } from "reactstrap";

const UpdateModal = ({ show, onUpdateClick, onCloseClick, statusVal, loader }: any) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} backdrop='static' keyboard={ false }>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
        <i className="ri-database-line display-5 text-danger"></i>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Confirm to update this status?</h4>
            <p className="text-muted mx-4 mb-0">
              Are you sure you want to {statusVal ? statusVal : ""} this user information?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-primary"
            id="update-record"
            disabled={loader && true}
            onClick={onUpdateClick}
          >
            {loader && <Spinner size="sm" className='me-2'> Loading... </Spinner>}
            Update
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UpdateModal;