
"use client";

import { useActionState } from "react";
import { entrar } from "@/app/acoes";

export default function Login() {
    const [mensagem, acaoDoFormulario, enviando] = useActionState(entrar, "");

    return (
        <section className="mx-auto max-w-sm rounded border bg-white p-6">
            <h1 className="mb-5 text-2xl font-semibold">Login</h1>

            <form action={acaoDoFormulario} className="grid gap-4">
                <label className="grid gap-1">
                    E-mail
                    <input
                        type="email"
                        name="email"
                        autoComplete="username"
                        required
                        className="rounded border p-2"
                    />
                </label>

                <label className="grid gap-1">
                    Senha
                    <input
                        type="password"
                        name="senha"
                        autoComplete="current-password"
                        required
                        className="rounded border p-2"
                    />
                </label>

                {mensagem && (
                    <p role="alert" className="text-red-700">
                        {mensagem}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={enviando}
                    className="rounded bg-blue-700 p-2 text-white disabled:opacity-60"
                >
                    {enviando ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </section>
    );
}
