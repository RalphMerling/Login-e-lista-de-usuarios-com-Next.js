
"use client";

import { useState } from "react";

const USUARIOS_POR_PAGINA = 5;

export default function TabelaUsuarios({ usuarios }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [busca, setBusca] = useState("");
    const [ordenacao, setOrdenacao] = useState("az");

    // Filtra os usuários por nome ou e-mail
    const usuariosFiltrados = usuarios.filter((usuario) => {
        const nome = String(usuario.nome ?? "").toLowerCase();
        const email = String(usuario.email ?? "").toLowerCase();
        const textoBusca = busca.toLowerCase().trim();

        return (
            nome.includes(textoBusca) ||
            email.includes(textoBusca)
        );
    });

    // Ordena os usuários filtrados pelo nome
    const usuariosOrdenados = [...usuariosFiltrados].sort((a, b) => {
        const nomeA = String(a.nome ?? "");
        const nomeB = String(b.nome ?? "");

        if (ordenacao === "az") {
            return nomeA.localeCompare(nomeB, "pt-BR");
        }

        return nomeB.localeCompare(nomeA, "pt-BR");
    });

    // Calcula a paginação após filtrar e ordenar
    const totalPaginas = Math.ceil(
        usuariosOrdenados.length / USUARIOS_POR_PAGINA
    );

    const inicio = (paginaAtual - 1) * USUARIOS_POR_PAGINA;
    const fim = inicio + USUARIOS_POR_PAGINA;

    const usuariosDaPagina = usuariosOrdenados.slice(inicio, fim);

    // Atualiza a pesquisa e retorna à primeira página
    function alterarBusca(evento) {
        setBusca(evento.target.value);
        setPaginaAtual(1);
    }

    // Atualiza a ordenação e retorna à primeira página
    function alterarOrdenacao(evento) {
        setOrdenacao(evento.target.value);
        setPaginaAtual(1);
    }

    return (
        <section>
            <h1 className="mb-4 text-2xl font-semibold">
                Lista de usuários
            </h1>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="busca"
                        className="mb-1 block font-medium"
                    >
                        Buscar por nome ou e-mail
                    </label>

                    <input
                        id="busca"
                        type="search"
                        value={busca}
                        onChange={alterarBusca}
                        placeholder="Digite um nome ou e-mail"
                        className="w-full rounded border bg-white p-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="ordenacao"
                        className="mb-1 block font-medium"
                    >
                        Ordenar por nome
                    </label>

                    <select
                        id="ordenacao"
                        value={ordenacao}
                        onChange={alterarOrdenacao}
                        className="w-full rounded border bg-white p-2"
                    >
                        <option value="az">
                            Nome (A–Z)
                        </option>

                        <option value="za">
                            Nome (Z–A)
                        </option>
                    </select>
                </div>
            </div>

            {usuarios.length === 0 ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : usuariosFiltrados.length === 0 ? (
                <p role="status">
                    Nenhum usuário encontrado para essa pesquisa.
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white text-left">
                            <caption className="sr-only">
                                Usuários cadastrados na API
                            </caption>

                            <thead className="bg-slate-200">
                                <tr>
                                    <th scope="col" className="p-2">
                                        ID
                                    </th>
                                    <th scope="col" className="p-2">
                                        Nome
                                    </th>
                                    <th scope="col" className="p-2">
                                        E-mail
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuariosDaPagina.map((usuario) => (
                                    <tr
                                        key={usuario.id}
                                        className="border-b"
                                    >
                                        <td className="p-2">
                                            {usuario.id}
                                        </td>
                                        <td className="p-2">
                                            {usuario.nome}
                                        </td>
                                        <td className="p-2">
                                            {usuario.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p>
                            Página {paginaAtual} de {totalPaginas}
                        </p>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setPaginaAtual(paginaAtual - 1)
                                }
                                disabled={paginaAtual === 1}
                                className="rounded bg-blue-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Anterior
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setPaginaAtual(paginaAtual + 1)
                                }
                                disabled={paginaAtual === totalPaginas}
                                className="rounded bg-blue-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
