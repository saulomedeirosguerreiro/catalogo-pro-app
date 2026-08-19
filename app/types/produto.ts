// Modelo usado internamente pela aplicação (sempre em português).
export interface Produto {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  estoque: number;
  criadoEm: string;
}

export interface ProdutoInput {
  nome: string;
  descricao: string | null;
  preco: number;
  estoque: number;
}

// Formato retornado pela API (em inglês) — usado só na camada de serviço.
export interface ProdutoApi {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: string;
}

export interface ProdutoInputApi {
  name: string;
  description: string | null;
  price: number;
  stock: number;
}
