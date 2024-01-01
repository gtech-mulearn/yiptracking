import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "../InternManagement.module.css";
import ReactSelect from "react-select";
import { getOrg } from "../services/InternManagementApis";

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
            onChange: (e) =>
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
            name: "lti",
            label: "Industrial Training Institute",
            type: "select",
            value: data ? data.lti ?? [] : [],
            options: options.lti,
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
                lti: formatOrgData(await getOrg("lti")) ?? [],
            });
        })();
    }, []);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={"Add Intern"}
            type={"success"}
            onDone={() => {
                if (!(data.college && data.email && data.lti && data.lti))
                    console.log("All inputs are required");
                if (data) onSubmit(data);
                handleModalClose();
            }}
        >
            <div>
                <div className={styles.modalFormContainer}>
                    <form>
                        {formTemplate.map((template) => {
                            const { type, ...props } = template;
                            return (
                                <label>
                                    <h4>{template.label}:</h4>
                                    {type === "text" && <input {...props} />}
                                    {type === "select" && (
                                        <ReactSelect {...props} />
                                    )}
                                </label>
                            );
                        })}
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default CreateModal;
