import { apiRequest } from "./api.js";

// GET /questions -> { success, questions: [{ id, text, options: [{id, text, profileWeights}] }] }
export async function getQuestions() {

    return apiRequest("/questions", {
        method: "GET"
    });

}
