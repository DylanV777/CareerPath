import { getToken } from "../utils/storage.js";

export const API_URL = "http://localhost:8000";

export async function apiRequest(path, options = {}) {

    try {

        const token = getToken();

        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {})
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {

            return {
                success: false,
                message: data.message || "Request error."
            };

        }

        return {
            success: true,
            ...data
        };

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: "Error Server."
        };

    }

}
