const TOKEN_KEY = "cp_token";
const USER_KEY = "cp_user";

export function saveSession(token, user) {

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

}

export function getToken() {

    return localStorage.getItem(TOKEN_KEY);

}

export function getUser() {

    const raw = localStorage.getItem(USER_KEY);

    return raw ? JSON.parse(raw) : null;

}

export function isLoggedIn() {

    return Boolean(getToken());

}

export function clearSession() {

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

}
