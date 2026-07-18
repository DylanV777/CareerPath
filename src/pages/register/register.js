import { navigate } from "../../router/router.js";

export function Register() {
    return `
        <section class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            <div class="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
                <div class="mb-8 text-center">
                    <p class="text-sm uppercase tracking-[0.4em] text-slate-400">Registro</p>
                    <h1 class="mt-4 text-4xl font-semibold text-slate-900">Cuenta profesional</h1>
                    <p class="mt-3 text-slate-500">Pronto podrás crear tu cuenta y guardar tus resultados.</p>
                </div>

                <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-slate-700 shadow-sm">
                    <p class="font-semibold text-slate-900">Registro en preparación</p>
                    <p class="mt-2 text-sm text-slate-500">Por ahora vuelve al login para continuar con tu prueba.</p>
                </div>

                <a href="#/login" id="goLogin" class="mt-8 inline-flex w-full items-center justify-center rounded-[24px] bg-slate-900 px-5 py-3 text-center text-white text-base font-semibold transition hover:bg-slate-800">
                    Volver al login
                </a>
            </div>
        </section>
    `;
}
export function registerEvents() {
    const goLogin = document.getElementById("goLogin");

    if (goLogin) {
        goLogin.addEventListener("click", (event) => {
            event.preventDefault();
            navigate("/login");
        });
    }
}
