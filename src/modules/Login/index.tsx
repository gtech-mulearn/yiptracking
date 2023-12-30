import { useState } from "react";
import TextInput from "../../components/TextInput";
import styles from "./index.module.css";
import { login } from "./services/LoginApis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate()
    const [data, setData] = useState<LoginData>({
		email: "",
		password: "",
	});

	const handleEmailChange = (value: string) => {
        setData((prev) => ({ ...prev, email: value }));
    };

    const handlePasswordChange = (value: string) => {
        setData((prev) => ({ ...prev, password: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
		toast.promise(login(data.email, data.password), {
            loading: "Loading...",
            success: <b>Logged in successfully</b>,
            error: (message) => {
                return <b>{message}</b>;
            },
		}).then(() => {
			navigate("/");
		});
    };

    return (
        <section className={styles.loginContainer}>
            <div className={styles.content}>
                <img
                    src="https://yip.kerala.gov.in/wp-content/uploads/2022/10/logonew-1.png"
                    alt="YIP logo"
                />
                <h1>Welcome back!</h1>
                <p>Enter your credentials to login</p>
            </div>
            <div className={styles.loginCard}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email"
                        required
                        onChange={handleEmailChange}
                    />
                    <TextInput
                        label="Password"
                        type="password"
                        required
                        onChange={handlePasswordChange}
                    />
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
}
