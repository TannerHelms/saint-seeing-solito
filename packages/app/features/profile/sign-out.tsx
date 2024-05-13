import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../auth";

export default function SignOutScreen() {
    useEffect(() => {
        signOut(auth)
    }, [])

    return null
}