import { api } from "~/lib/api";
import type { Produto } from "~/types/produto";

export async function getProdutos(): Promise<Produto[]> {
  const { data } = await api.get<Produto[]>("/produtos");
  return data;
}
