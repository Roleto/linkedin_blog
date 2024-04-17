import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const CreateAcountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Password and confirm password do not match');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    };


    return (
        <>
            <h1>Create Account</h1>
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
            <input type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={x => setConfirmPassword(x.target.value)}
            />
            <button onClick={createAccount}>LogIn</button>
            <Link to="/login">Already have an account? Log in Here?.</Link>
        </>
    );
}

export default CreateAcountPage;