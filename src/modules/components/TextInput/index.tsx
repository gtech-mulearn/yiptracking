import React, { useRef, useState } from "react";
import styles from "./index.module.css";
type Props_T = {
    label: string;
    type?: "text" | "password";
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
};
export default function TextInput(props: Props_T) {
    const [value, setValue] = useState(props.value ?? "");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(e.target.value);
        setValue(e.target.value);
    };
    const id = useRef(`${props.label}${Math.round(1000 * Math.random())}`);
    return (
        <div className={styles.container}>
            <input
                type={props.type ?? "text"}
                name={props.label}
                id={id.current}
                className={styles.input}
                value={value}
                onChange={handleChange}
                required={props.required}
            />
            <label
                htmlFor={id.current}
                className={value.length ? styles.hasValue : ""}
            >
                {props.label}
            </label>
        </div>
    );
}
