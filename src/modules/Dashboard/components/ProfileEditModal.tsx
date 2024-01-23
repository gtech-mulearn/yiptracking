import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "../Dashboard.module.css";
import { convertToSimpleDate } from "../../../utils/common";
import { BiHide, BiShow } from "react-icons/bi";
import toast from "react-hot-toast";

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
    const [isShowPassword, setIsShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
    });
    const [resetPassword, setResetPassword] = useState<boolean>(false);

    useEffect(() => {
        setData(currentData); // Update local state when currentData changes
    }, [currentData]);

    const formTemplate = [
        {
            name: "dob",
            label: "Date of birth",
            value: convertToSimpleDate(data.dob),
            type: "date",
        },
        { name: "mobile", label: "Mobile No.", value: data.mobile ?? "" },
        // { name: "resetPassword", label: "Reset Password", type: "checkbox" },
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
                if (
                    data.dob.length > 0 &&
                    data.gender.length > 0 &&
                    data.mobile.length > 0
                ) {
                    updateData(data);
                    handleModalClose();
                } else {
                    toast.error("Please fill all the fields");
                }
            }}
        >
            <div>
                <div className={styles.modalFormContainer}>
                    <form>
                        <label>
                            <h4>Gender:</h4>
                            <select
                                name="gender"
                                id=""
                                value={data.gender || "other"}
                                onChange={(e) =>
                                    setData({ ...data, gender: e.target.value })
                                }
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        {formTemplate.map((template) => (
                            <label>
                                <h4>{template.label}:</h4>
                                <input
                                    type={template.type ?? "text"}
                                    name={template.name}
                                    value={template.value as string}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                        <label>
                            <h4>Reset Password:</h4>
                            <div
                                className={styles.checkboxContainer}
                                title="Reset Password"
                            >
                                <input
                                    type="checkbox"
                                    name="resetPassword"
                                    onClick={() =>
                                        setResetPassword(!resetPassword)
                                    }
                                />
                            </div>
                        </label>

                        {resetPassword && (
                            <>
                                <label>
                                    <h4>Current Password:</h4>
                                    <input
                                        type={
                                            isShowPassword.currentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="currentPassword"
                                        value={data.currentPassword}
                                        onChange={handleChange}
                                    />
                                    <i
                                        onClick={() =>
                                            setIsShowPassword({
                                                ...isShowPassword,
                                                currentPassword:
                                                    !isShowPassword.currentPassword,
                                            })
                                        }
                                    >
                                        {isShowPassword.currentPassword ? (
                                            <BiHide />
                                        ) : (
                                            <BiShow />
                                        )}
                                    </i>
                                </label>
                                <label>
                                    <h4>New Password:</h4>
                                    <input
                                        type={
                                            isShowPassword.newPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="newPassword"
                                        value={data.newPassword}
                                        onChange={handleChange}
                                    />
                                    <i
                                        onClick={() =>
                                            setIsShowPassword({
                                                ...isShowPassword,
                                                newPassword:
                                                    !isShowPassword.newPassword,
                                            })
                                        }
                                    >
                                        {isShowPassword.newPassword ? (
                                            <BiHide />
                                        ) : (
                                            <BiShow />
                                        )}
                                    </i>
                                </label>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileEditModal;
