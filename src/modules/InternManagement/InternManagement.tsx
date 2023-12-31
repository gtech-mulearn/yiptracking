import { useEffect, useState } from "react";
import styles from "./InternManagement.module.css";
import toast from "react-hot-toast";
import { getInterns } from "./services/InternManagementApis";

const InternManagement = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState<InternsDataResponse>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState<any>(null);

    const handleFetchDetails = async () => {
        try {
            const response: any = await getInterns();
            if (response) {
                setData(response);
            }
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [refresh]);
    return (
        <div className={styles.container}>
            <div>
                <h1>Intern Management</h1>
            </div>
        </div>
    );
};

export default InternManagement;
