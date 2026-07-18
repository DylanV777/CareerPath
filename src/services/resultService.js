import { apiRequest } from "./api.js";

// POST /results  body: { answers: [{questionId, optionId}] }
// -> { success, profile, explanation, careers: [{id, name, affinity}] }
export async function submitTest(answers) {

    return apiRequest("/results", {
        method: "POST",
        body: JSON.stringify({ answers })
    });

}

// GET /results/latest -> resultado más reciente del usuario autenticado
export async function getLatestResult() {

    return apiRequest("/results/latest", {
        method: "GET"
    });

}

// GET /results -> historial de resultados del usuario
export async function getResultHistory() {

    return apiRequest("/results", {
        method: "GET"
    });

}

// GET /careers/compare?a=ID&b=ID
export async function compareCareers(careerIdA, careerIdB) {

    return apiRequest(`/careers/compare?a=${careerIdA}&b=${careerIdB}`, {
        method: "GET"
    });

}

// GET /favorites
export async function getFavorites() {

    return apiRequest("/favorites", {
        method: "GET"
    });

}

// POST /favorites/:careerId  (toggle)
export async function toggleFavorite(careerId) {

    return apiRequest(`/favorites/${careerId}`, {
        method: "POST"
    });

}
