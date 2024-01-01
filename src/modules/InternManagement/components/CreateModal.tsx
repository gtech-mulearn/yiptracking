import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "../InternManagement.module.css";
import ReactSelect from "react-select";
import { getOrg } from "../services/InternManagementApis";
import toast, { Toaster } from "react-hot-toast";

type Props = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    onSubmit: (data: CreateUser) => void;
    email?: string;
};

const CreateModal = ({
    isModalOpen,
    handleModalClose,
    onSubmit,
    email,
}: Props) => {
    const [data, setData] = useState<CreateUser>({ email: email ?? "" });
    const [options, setOptions] = useState<{
        [key: string]: { label: string; value: string }[];
    }>({
        school: [],
        college: [],
        lti: [],
    });
    const formTemplate = [
        {
            name: "email",
            label: "Email",
            type: "text",
            value: data ? data.email ?? "" : "",
            onChange: (e: { target: { value: any; }; }) =>
                setData((data) => ({ ...data, email: e.target.value })),
        },
        {
            name: "school",
            label: "School",
            type: "select",
            value: data ? data.school ?? "" : "",
            options: options.school,
            isMulti: true,
            onChange: (options: SelectOption[]) =>
                setData((data) => ({ ...data, school: options })),
        },
        {
            name: "college",
            label: "College",
            type: "select",
            value: data ? data.college ?? "" : "",
            options: options.college,
            isMulti: true,
            onChange: (options: SelectOption[]) =>
                setData((data) => ({ ...data, college: options })),
        },
        {
            name: "iti",
            label: "Industrial Training Institute",
            type: "select",
            value: data ? data.iti ?? [] : [],
            options: options.iti,
            isMulti: true,
            onChange: (options: SelectOption[]) =>
                setData((data) => ({ ...data, college: options })),
        },
    ];

    useEffect(() => {
        const formatOrgData = (data?: any[]) => {
            if (!data) return null;
            return data.map((org) => ({ value: org.org_id, label: org.name }));
        };

        (async () => {
            setOptions({
                school: formatOrgData(await getOrg("School")) ?? [],
                college: formatOrgData(await getOrg("College")) ?? [],
                lti: formatOrgData(await getOrg("iti")) ?? [],
            });
        })();
    }, []);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={"Add Intern"}
                type={"success"}
                onDone={() => {
                    if (!data.email) {
                        toast.error("Email is required");
                        return;
                    }
                    if (data) onSubmit(data);
                    handleModalClose();
                }}
            >
                <div>
                    <div className={styles.modalFormContainer}>
                        <form>
                            {formTemplate.map((template) => {
                                const { type, ...props } = template;

                                if (type === "text") {
                                    // Ensure that value is a string for text input
                                    return (
                                        <label>
                                            <h4>{template.label}:</h4>
                                            <input {...(props as any)} />
                                        </label>
                                    );
                                } else if (type === "select") {
                                    // Ensure correct typing for ReactSelect component
                                    return (
                                        <label>
                                            <h4>{template.label}:</h4>
                                            <ReactSelect
                                                {...(props as any)}
                                            />
                                        </label>
                                    );
                                }
                            })}
                        </form>
                    </div>
                </div>
            </Modal>
            <Toaster position="bottom-center" />
        </>
    );
};

export default CreateModal;
