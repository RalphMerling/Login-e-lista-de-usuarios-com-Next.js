
import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { sair } from "@/app/acoes";
import Rodape from "@/components/Rodape";
import "./globals.css";

export const metadata = {
    title: "Sistema de Colaboradores",
};

async function BotaoSair() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    return (
        <form action={sair}>
            <button
                type="submit"
                className="rounded bg-white px-3 py-1 text-slate-900"
            >
                Sair
            </button>
        </form>
    );
}

export default function Layout({ children }) {
    return (
        <html lang="pt-BR">
            <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
                <header className="bg-slate-900 px-4 py-3 text-white">
                    <nav
                        aria-label="Menu principal"
                        className="mx-auto flex max-w-4xl flex-wrap items-center gap-4"
                    >
                        <span className="mr-auto font-semibold">
                            Sistema de Colaboradores
                        </span>

                        <Link
                            href="/listaUsuarios"
                            className="rounded border px-3 py-1"
                        >
                            Lista de usuários
                        </Link>

                        <Suspense fallback={null}>
                            <BotaoSair />
                        </Suspense>
                    </nav>
                </header>

                <main className="mx-auto w-full max-w-4xl flex-1 p-4">
                    {children}
                </main>

                <Rodape />
            </body>
        </html>
    );
}
