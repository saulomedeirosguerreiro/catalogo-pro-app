import type { Route } from "./+types/home";
import { getProdutos } from "~/services/produtos";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catálogo Pro" },
    { name: "description", content: "Lista de produtos do Catálogo Pro" },
  ];
}

export async function loader() {
  try {
    const produtos = await getProdutos();
    return { produtos, error: null as string | null };
  } catch {
    return { produtos: [], error: "Não foi possível carregar os produtos." };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { produtos, error } = loaderData;

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4 text-gray-900">Produtos</h1>

      {error && <p className="text-red-600">{error}</p>}

      {!error && (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 pr-4">Id</th>
              <th className="py-2 pr-4">Nome</th>
              <th className="py-2 pr-4">Descrição</th>
              <th className="py-2 pr-4">Preço</th>
              <th className="py-2 pr-4">Estoque</th>
              <th className="py-2 pr-4">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-b border-gray-100">
                <td className="py-2 pr-4">{produto.id}</td>
                <td className="py-2 pr-4">{produto.nome}</td>
                <td className="py-2 pr-4">{produto.descricao ?? "-"}</td>
                <td className="py-2 pr-4">
                  {produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="py-2 pr-4">{produto.estoque}</td>
                <td className="py-2 pr-4">
                  {new Date(produto.criadoEm).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
