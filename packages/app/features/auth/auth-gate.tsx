import { useEffect } from "react";
import { auth } from "./index";
import { useRouter } from "solito/router";

export function AuthGate({children}) {
    const user = auth.currentUser;
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.replace("/signin");
        }
    }, [])

    if (user) {
        return children;
    }
}