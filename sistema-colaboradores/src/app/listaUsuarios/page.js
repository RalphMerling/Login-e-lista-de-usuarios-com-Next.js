
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { api } from "@/services/api";
import TabelaUsuarios from "@/components/TabelaUsuarios";

export default async function ListaUsuarios() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    await connection();

    let usuarios;

    try {
        const resposta = await api.get("/usuarios", {
            headers: { Authorization: `Bearer ${token}` },
        });

        usuarios = resposta.data;
    } catch (erro) {
        const status = axios.isAxiosError(erro)
            ? erro.response?.status
            : null;

        if (status === 401 || status === 403) {
            redirect("/login");
        }

        return (
            <p role="alert">
                Não foi possível consultar a API.
                Atualize a página para tentar novamente.
            </p>
        );
    }

    if (!Array.isArray(usuarios)) {
        return (
            <p role="alert">
                A API respondeu em um formato inesperado.
            </p>
        );
    }

    return <TabelaUsuarios usuarios={usuarios} />;
}
