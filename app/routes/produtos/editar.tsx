import { redirect, Link } from "react-router";
import type { Route } from "./+types/editar";
import { getProduto, updateProduto } from "~/services/produtos";
import { parseProdutoInput } from "~/utils/produto-form";
import { ProdutoForm } from "~/components/ProdutoForm";

export function meta() {
  return [{ title: "Editar produto - Catálogo Pro" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const produto = await getProduto(Number(params.id));
  return { produto };
}

export async function action({ request, params }: Route.ActionArgs) {
  const input = parseProdutoInput(await request.formData());

  try {
    await updateProduto(Number(params.id), input);
    return redirect("/?status=updated");
  } catch {
    return {
      error: "Verifique os dados informados e tente novamente.",
    };
  }
}

export default function EditarProduto({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Voltar para produtos
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Editar produto
      </h1>
      <ProdutoForm produto={loaderData.produto} error={actionData?.error} />
    </main>
  );
}
