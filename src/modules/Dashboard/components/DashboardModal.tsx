import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "../Dashboard.module.css";
import { convertToSimpleDate } from "../../../utils/common";
import { Switch } from "@radix-ui/themes";

type Props = {
    isModalOpen: boolean;
    org: OrgData;
    handleModalClose: () => void;
    updateData: (data: OrgStatusData) => void;
};

const DashboardModal = ({
    isModalOpen,
    org,
    handleModalClose,
    updateData,
}: Props) => {
    const [data, setData] = useState<OrgStatusData>({
        org_id: org.org_id,
        visited: org.visited,
        whatsapp: org.whatsapp || "",
        pta: org.pta || "",
        alumni: org.alumni || "",
        visited_at: convertToSimpleDate(org.visited_at as string) || "",
        participants: org.participants || 0,
        association: org.association || "",
        orientation: org.orientation || false,
        is_scheduled: org.is_scheduled || false,
        orientation_date: convertToSimpleDate(org.orientation_date as string),
        scheduled_date: convertToSimpleDate(org.scheduled_date as string),
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={org.title}
            type={"success"}
            onDone={() => {
                updateData(data);
                handleModalClose();
            }}
        >
            <div>
                <div className={styles.modalStaticContent}>
                    <h4>Code: {org.code}</h4>
                    <h4>District: {org.district_name}</h4>
                    <h4>Zone: {org.zone_name}</h4>
                </div>
                <div className={styles.modalFormContainer}>
                    <form>
                        <div className={styles.toggle}>
                            <label>
                                <h4>Visited</h4>
                                <Switch
                                    size={"3"}
                                    checked={data.visited}
                                    onCheckedChange={() =>
                                        setData({
                                            ...data,
                                            visited: !data.visited,
                                            visited_at: data.visited
                                                ? data.visited_at
                                                : null,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                <h4>Orientation</h4>
                                <Switch
                                    size={"3"}
                                    checked={data.orientation}
                                    onCheckedChange={() =>
                                        setData({
                                            ...data,
                                            orientation: !data.orientation,
                                            orientation_date: data.orientation
                                                ? data.orientation_date
                                                : null,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                <h4>Orientation Scheduled</h4>
                                <Switch
                                    size={"3"}
                                    checked={data.is_scheduled}
                                    onCheckedChange={() =>
                                        setData({
                                            ...data,
                                            is_scheduled: !data.is_scheduled,
                                            scheduled_date: data.is_scheduled
                                                ? data.scheduled_date
                                                : null,
                                        })
                                    }
                                />
                            </label>
                        </div>
                        {data.visited && (
                            <label>
                                <h4>Visited At:</h4>
                                <input
                                    type="date"
                                    name="visited_at"
                                    value={data.visited_at as string}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                        {data.orientation && (
                            <label>
                                <h4>Orientation date:</h4>
                                <input
                                    type="date"
                                    name="orientation_date"
                                    value={data.orientation_date as string}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                        {data.is_scheduled && (
                            <label>
                                <h4>Orientation Scheduled date:</h4>
                                <input
                                    type="date"
                                    name="scheduled_date"
                                    value={data.scheduled_date as string}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                        <label>
                            <h4>WhatsApp:</h4>
                            <input
                                type="text"
                                name="whatsapp"
                                placeholder="WhatsApp number"
                                value={data.whatsapp}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <h4>PTA:</h4>
                            <input
                                type="text"
                                name="pta"
                                placeholder="PTA details"
                                value={data.pta}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <h4>Alumni:</h4>
                            <input
                                type="text"
                                name="alumni"
                                placeholder="Alumni details"
                                value={data.alumni}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <h4>Participants:</h4>
                            <input
                                type="number"
                                name="participants"
                                value={data.participants}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <h4>Association:</h4>
                            <input
                                type="text"
                                name="association"
                                placeholder="Association name"
                                value={data.association}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default DashboardModal;
