import React from "react";
import styles from "./index.module.css";

type Props_T = {
    label: string;
    type?: "submit" | "reset" | "button";
};

export default function Button(props: Props_T) {
    return (
        <button type={props.type} className={styles.button}>
            {props.label}
        </button>
    );
}
