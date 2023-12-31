import React from "react";
import styles from "./Toggle.module.css";

type Props = {
    data: OrgStatusData; // Assuming you have access to the entire data object
    setData: React.Dispatch<React.SetStateAction<OrgStatusData>>;
};

const Toggle = ({ data, setData }: Props) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, visited: e.target.checked });
    };

    return (
        <label className={styles.toggle} htmlFor="uniqueID">
            <input
                type="checkbox"
                className={styles.toggleInput}
                id="uniqueID"
                checked={data.visited}
                onChange={handleCheckboxChange}
            />
            <span className={styles.toggleTrack}>
                <span className={styles.toggleIndicator}>
                    <span className={styles.checkMark}>
                        <svg
                            viewBox="0 0 24 24"
                            id="ghq-svg-check"
                            role="presentation"
                            aria-hidden="true"
                        >
                            <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                        </svg>
                    </span>
                </span>
            </span>
        </label>
    );
};

export default Toggle;