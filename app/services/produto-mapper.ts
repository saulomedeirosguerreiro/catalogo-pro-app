import type {
  Produto,
  ProdutoApi,
  ProdutoInput,
  ProdutoInputApi,
} from "~/types/produto";

export function toProduto(raw: ProdutoApi): Produto {
  return {
    id: raw.id,
    nome: raw.name,
    descricao: raw.description,
    preco: raw.price,
    estoque: raw.stock,
    criadoEm: raw.createdAt,
  };
}

export function toProdutoInputApi(input: ProdutoInput): ProdutoInputApi {
  return {
    name: input.nome,
    description: input.descricao,
    price: input.preco,
    stock: input.estoque,
  };
}
