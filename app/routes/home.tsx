import { useEffect } from "react";
import { Form, Link, redirect, useRevalidator, useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { Alert } from "~/components/Alert";
import { useIsAdmin } from "~/hooks/useIsAdmin";
import { hasRole, keycloak, ROLE_ADMIN } from "~/lib/keycloak";
import { getProdutos, deleteProduto } from "~/services/produtos";
import type { Produto } from "~/types/produto";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catálogo Pro" },
    { name: "description", content: "Lista de produtos do Catálogo Pro" },
  ];
}

export async function clientLoader() {
  try {
    const produtos = await getProdutos();
    return { produtos, error: null as string | null };
  } catch {
    return {
      produtos: [],
      error:
        "Não foi possível conectar à API de produtos. Verifique sua conexão e tente novamente.",
    };
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  if (!hasRole(keycloak, ROLE_ADMIN)) {
    throw new Response("Acesso não autorizado.", { status: 403 });
  }

  const formData = await request.formData();
  const id = Number(formData.get("id"));
  await deleteProduto(id);
  return redirect("/?status=deleted");
}

const STATUS_MESSAGES: Record<string, string> = {
  created: "Produto criado com sucesso.",
  updated: "Produto atualizado com sucesso.",
  deleted: "Produto excluído com sucesso.",
};

function estoqueBadgeClass(estoque: number) {
  if (estoque === 0) return "bg-red-50 text-red-700 ring-red-600/10";
  if (estoque <= 10) return "bg-amber-50 text-amber-700 ring-amber-600/10";
  return "bg-green-50 text-green-700 ring-green-600/10";
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { produtos, error } = loaderData;
  const revalidator = useRevalidator();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const statusMessage = status ? STATUS_MESSAGES[status] : undefined;
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!status) return;
    const timeout = setTimeout(() => {
      setSearchParams(
        (params) => {
          params.delete("status");
          return params;
        },
        { replace: true },
      );
    }, 4000);
    return () => clearTimeout(timeout);
  }, [status, setSearchParams]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Produtos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie os produtos do seu catálogo
          </p>
        </div>
        {isAdmin && (
          <Link to="/produtos/novo" className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Novo produto
          </Link>
        )}
      </div>

      {statusMessage && (
        <Alert
          variant="success"
          title={statusMessage}
          className="mb-6"
        />
      )}

      {error && (
        <Alert
          variant="error"
          title="Erro ao carregar produtos"
          description={error}
          className="mb-6"
          action={
            <button
              type="button"
              onClick={() => revalidator.revalidate()}
              disabled={revalidator.state === "loading"}
              className="shrink-0 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-900 disabled:opacity-50"
            >
              {revalidator.state === "loading"
                ? "Tentando..."
                : "Tentar novamente"}
            </button>
          }
        />
      )}

      {!error && produtos.length === 0 && (
        <div className="surface-card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-6 w-6"
            >
              <path d="M21 8l-9-5-9 5 9 5 9-5Z" />
              <path d="M3 8v8l9 5 9-5V8" />
              <path d="M12 13v8" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">
            Nenhum produto cadastrado
          </p>
          <p className="text-sm text-gray-500">
            Comece adicionando o primeiro produto do catálogo.
          </p>
          {isAdmin && (
            <Link to="/produtos/novo" className="btn-primary mt-2">
              Novo produto
            </Link>
          )}
        </div>
      )}

      {!error && produtos.length > 0 && (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Id
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Nome
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Descrição
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                  Preço
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Estoque
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Criado em
                </th>
                {isAdmin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produtos.map((produto: Produto) => (
                <tr key={produto.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">
                    {produto.id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {produto.nome}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-500">
                    {produto.descricao ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-sm tabular-nums text-gray-900">
                    {produto.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${estoqueBadgeClass(produto.estoque)}`}
                    >
                      {produto.estoque}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(produto.criadoEm).toLocaleDateString("pt-BR")}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/produtos/${produto.id}/editar`}
                          title="Editar"
                          className="btn-icon"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </Link>
                        <Form
                          method="post"
                          onSubmit={(event) => {
                            if (!confirm(`Excluir "${produto.nome}"?`)) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <input type="hidden" name="id" value={produto.id} />
                          <button type="submit" title="Excluir" className="btn-icon-danger">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.75}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            </svg>
                          </button>
                        </Form>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
