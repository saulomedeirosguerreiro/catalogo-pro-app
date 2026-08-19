import { api } from "~/lib/api";
import type { Produto, ProdutoInput } from "~/types/produto";

export async function getProdutos(): Promise<Produto[]> {
  const { data } = await api.get<Produto[]>("/produtos");
  return data;
}

export async function getProduto(id: number): Promise<Produto> {
  const { data } = await api.get<Produto>(`/produtos/${id}`);
  return data;
}

export async function createProduto(input: ProdutoInput): Promise<Produto> {
  const { data } = await api.post<Produto>("/produtos", input);
  return data;
}

export async function updateProduto(
  id: number,
  input: ProdutoInput,
): Promise<Produto> {
  const { data } = await api.put<Produto>(`/produtos/${id}`, input);
  return data;
}

export async function deleteProduto(id: number): Promise<void> {
  await api.delete(`/produtos/${id}`);
}
