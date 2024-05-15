import { useEffect } from "react";
import { auth } from "./index";
import { useRouter } from "solito/router";
import SignInScreen from "../signin/screen";

export function AuthGate({children, navigation}) {
    const user = auth.currentUser;
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.replace("/signin");
        }
    }, [])

    if (!user) {
        return  <SignInScreen />;
    }

    if (user) {
        return children;
    }
}