import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const Login = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    };
    return (
        <>
            <h1>Login In</h1>
            {error && <p className="error">{error}</p>}
            <input
                placeholder="Your email address"
                value={email}
                onChange={x => setEmail(x.target.value)}
            />
            <input type="password"
                placeholder="Your password"
                value={password}
                onChange={x => setPassword(x.target.value)}
            />
            <button onClick={Login}>LogIn</button>
            <Link to="/create-account">Don't have an account? Create one here.</Link>
        </>
    );
}

export default LoginPage;