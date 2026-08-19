import { api } from "~/lib/api";
import type { Produto, ProdutoApi, ProdutoInput } from "~/types/produto";
import { toProduto, toProdutoInputApi } from "./produto-mapper";

export async function getProdutos(): Promise<Produto[]> {
  const { data } = await api.get<ProdutoApi[]>("/produtos");
  return data.map(toProduto);
}

export async function getProduto(id: number): Promise<Produto> {
  const { data } = await api.get<ProdutoApi>(`/produtos/${id}`);
  return toProduto(data);
}

export async function createProduto(input: ProdutoInput): Promise<Produto> {
  const { data } = await api.post<ProdutoApi>(
    "/produtos",
    toProdutoInputApi(input),
  );
  return toProduto(data);
}

export async function updateProduto(
  id: number,
  input: ProdutoInput,
): Promise<Produto> {
  const { data } = await api.put<ProdutoApi>(
    `/produtos/${id}`,
    toProdutoInputApi(input),
  );
  return toProduto(data);
}

export async function deleteProduto(id: number): Promise<void> {
  await api.delete(`/produtos/${id}`);
}
