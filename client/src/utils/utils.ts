import { jwtDecode } from "jwt-decode";
import { User } from "../types/Users";

export const LoggedUser = (): User | null => {
    const token = localStorage.getItem("token");
    if ( token ) {
        return jwtDecode<User>(token);
    }

    return null
}