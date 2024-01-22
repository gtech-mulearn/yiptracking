import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "../InternManagement.module.css";
import ReactSelect from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { getDistrictOptions } from "../services/InternManagementApis";

type Props = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    onSubmit: (data: AddNewUser) => void;
};

const AddUserModal = ({ isModalOpen, handleModalClose, onSubmit }: Props) => {
    const [data, setData] = useState<AddNewUser>({
        first_name: "",
        last_name: "",
        email: "",
        district_id: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [options, setOptions] = useState<{ label: string; value: string }[]>(
        []
    );

    const handleIsFormValid = () => {
        return (
            data.first_name.trim() !== "" &&
            data.last_name.trim() !== "" &&
            data.email.trim() !== "" &&
            data.district_id.trim() !== ""
        );
    };

    useEffect(() => {
        setIsFormValid(handleIsFormValid());
    }, [data]);

    useEffect(() => {
        setIsLoading(true);
        const formatOrgData = (data?: getDistrictResponse[]) => {
            if (!data) return null;
            return data.map((org) => ({ value: org.district_id, label: org.name }));
        };

        (async () => {
            setOptions(formatOrgData(await getDistrictOptions()) ?? []);
            setIsLoading(false);
        })();
    }, []);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={"Add a new Intern"}
                type={"success"}
                onDone={() => {
                    if (isFormValid) {
                        onSubmit(data);
                        handleModalClose();
                    } else {
                        toast.error(
                            "Form is not valid. Please fill in all fields."
                        );
                    }
                }}
            >
                <div>
                    <div className={styles.modalFormContainer}>
                        <form>
                            <label>
                                <h4>First Name</h4>
                                <input
                                    type="text"
                                    placeholder="First Name of the Intern"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            first_name: e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                <h4>Last Name</h4>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    placeholder="Last Name of the Intern"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            last_name: e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                <h4>Email</h4>
                                <input
                                    type="text"
                                    placeholder="Email of the Intern"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                <h4>District</h4>
                                <ReactSelect
                                    isLoading={isLoading}
                                    placeholder="District of the Intern"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            district_id: e ? e.value : "",
                                        })
                                    }
                                    options={options}
                                />
                            </label>
                        </form>
                    </div>
                </div>
            </Modal>
            <Toaster position="bottom-center" />
        </>
    );
};

export default AddUserModal;
