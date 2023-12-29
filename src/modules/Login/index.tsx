import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { login } from "./api";
import styles from "./index.module.css";
export default function Login() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            Username: { value: string };
            Password: { value: string };
        };
        const { Username, Password } = target;
        login(Username.value, Password.value);
    };

    return (
        <section className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextInput label="Username" required />
                    <TextInput label="Password" type="password" required />
                    <Button label="Login" />
                </form>
            </div>
        </section>
    );
}
