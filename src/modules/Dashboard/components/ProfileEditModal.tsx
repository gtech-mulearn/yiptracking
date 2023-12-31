import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "../Dashboard.module.css";
import { convertToSimpleDate } from "../../../utils/common";

type Props = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    updateData: (data: ProfileEditData) => void;
    currentData: ProfileEditData;
};

const ProfileEditModal = ({
    isModalOpen,
    handleModalClose,
    updateData,
    currentData,
}: Props) => {
    const [data, setData] = useState<ProfileEditData>(currentData);
    const formTemplate = [
        { name: "gender", label: "Gender", value: data.gender ?? "" },
        {
            name: "dob",
            label: "Date of birth",
            value: convertToSimpleDate(data.dob),
            type: "date",
        },
        { name: "mobile", label: "Mobile No.", value: data.mobile ?? "" },
    ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={"Edit Profile"}
            type={"success"}
            onDone={() => {
                updateData(data);
                handleModalClose();
            }}
        >
            <div>
                <div className={styles.modalFormContainer}>
                    <form>
                        {formTemplate.map((template) => (
                            <label>
                                <h4>{template.label}:</h4>
                                <input
                                    type={template.type ?? "text"}
                                    name={template.name}
                                    value={template.value}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileEditModal;
