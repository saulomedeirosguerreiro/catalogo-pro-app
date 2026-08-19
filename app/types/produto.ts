export interface Produto {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  estoque: number;
  criadoEm: string;
}
