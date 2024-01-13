import { ChangeEvent, FunctionComponent, useRef } from "react";
import styles from "../Idea.module.css";
import { MdOutlineUploadFile } from "react-icons/md";

interface ExcelUploadComponentProps {
    onFileSelect: (file: File) => void;
}

const IdeaCSV: FunctionComponent<ExcelUploadComponentProps> = ({
    onFileSelect,
}) => {
    // const [fileName, setFileName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            // setFileName(files[0].name);
            onFileSelect(files[0]);
            setTimeout(() => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }, 2000);
        }
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.IdeaCSV} onClick={handleDivClick}>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
            />
            <MdOutlineUploadFile />
            <b>Upload Excel</b>
        </div>
    );
};

export default IdeaCSV;
