
"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/services/api";

export async function entrar(estadoAnterior, formData) {
    const email = String(formData.get("email") ?? "").trim();
    const senha = String(formData.get("senha") ?? "");

    if (!email || !senha) {
        return "Preencha o e-mail e a senha.";
    }

    let token;

    try {
        const resposta = await api.post(
            "/auth/login",
            { email, senha },
            { headers: { "Content-Type": "application/json" } }
        );

        token = resposta.data?.token;
    } catch (erro) {
        const status = axios.isAxiosError(erro)
            ? erro.response?.status
            : null;

        if (status === 401 || status === 403) {
            return "A API recusou o login. Confira o e-mail e a senha.";
        }

        return "Não foi possível concluir o login. Tente novamente.";
    }

    if (typeof token !== "string" || !token.trim()) {
        return "A API respondeu sem um token válido.";
    }

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    redirect("/listaUsuarios");
}

export async function sair() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
}
