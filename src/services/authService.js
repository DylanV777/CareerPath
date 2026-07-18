import { apiRequest } from "./api.js";

export async function login(email, password) {
    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required."
        };
    }

    return await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}
