import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setsLoading] = useState(true);
    // const [email, set] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setsLoading(false);
        });

        return unsubscribe;
    }, [])
    return ({ user, isLoading });
}

export default useUser;