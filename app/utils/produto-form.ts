import type { ProdutoInput } from "~/types/produto";

export function parseProdutoInput(formData: FormData): ProdutoInput {
  const descricao = String(formData.get("descricao") ?? "").trim();

  return {
    nome: String(formData.get("nome") ?? "").trim(),
    descricao: descricao || null,
    preco: Number(formData.get("preco")),
    estoque: Number(formData.get("estoque")),
  };
}
