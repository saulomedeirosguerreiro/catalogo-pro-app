import { redirect, Link } from "react-router";
import type { Route } from "./+types/novo";
import { createProduto } from "~/services/produtos";
import { parseProdutoInput } from "~/utils/produto-form";
import { ProdutoForm } from "~/components/ProdutoForm";

export function meta() {
  return [{ title: "Novo produto - Catálogo Pro" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const input = parseProdutoInput(await request.formData());

  try {
    await createProduto(input);
    return redirect("/?status=created");
  } catch {
    return {
      error: "Verifique os dados informados e tente novamente.",
    };
  }
}

export default function NovoProduto({ actionData }: Route.ComponentProps) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Voltar para produtos
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Novo produto
      </h1>
      <ProdutoForm error={actionData?.error} />
    </main>
  );
}
