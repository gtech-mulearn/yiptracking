import Modal from "../../../components/Modal/Modal";
import styles from "../InternManagement.module.css";

type confirmType = "none" | "delete" | "unassign";

type Props = {
    type: confirmType;
    user: InternData | undefined;
    isModalOpen: boolean;
    handleModalClose: () => void;
    onSubmit: (data: confirmType) => void;
};

const ConfirmModal = (props: Props) => {
    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                onClose={props.handleModalClose}
                title={
                    props.type === "delete"
                        ? "Delete User"
                        : "Un-assign Organisations"
                }
                type={"error"}
                onDone={() => {
                    props.onSubmit(props.type);
                    props.handleModalClose();
                }}
            >
                <div className={styles.confirmModalContainer}>
                    <p>
                        Are you sure you want to{" "}
                        {props.type === "delete"
                            ? "delete"
                            : "un-assign all organizations from"}{" "}
                        {props.user?.first_name} {props.user?.last_name} ?
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ConfirmModal;
