import { redirect, Link } from "react-router";
import type { Route } from "./+types/editar";
import { API_CLIENT_ID, keycloak, ROLE_ADMIN } from "~/lib/keycloak";
import { getProduto, updateProduto } from "~/services/produtos";
import { parseProdutoInput } from "~/utils/produto-form";
import { ProdutoForm } from "~/components/ProdutoForm";

export function meta() {
  return [{ title: "Editar produto - Catálogo Pro" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const produto = await getProduto(Number(params.id));
  return { produto };
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
  if (!keycloak.hasResourceRole(ROLE_ADMIN, API_CLIENT_ID)) {
    throw new Response("Acesso não autorizado.", { status: 403 });
  }

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
