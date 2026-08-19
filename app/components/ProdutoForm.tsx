import { Form, Link } from "react-router";
import { Alert } from "~/components/Alert";
import type { Produto } from "~/types/produto";

interface ProdutoFormProps {
  produto?: Produto;
  error?: string | null;
}

export function ProdutoForm({ produto, error }: ProdutoFormProps) {
  return (
    <Form method="post" className="surface-card space-y-5 p-6">
      {error && (
        <Alert
          variant="error"
          title="Não foi possível salvar o produto"
          description={error}
        />
      )}

      <div>
        <label htmlFor="nome" className="form-label">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          maxLength={200}
          placeholder="Ex.: Teclado mecânico"
          defaultValue={produto?.nome}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="form-label">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={4}
          placeholder="Detalhes do produto (opcional)"
          defaultValue={produto?.descricao ?? ""}
          className="form-input resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="preco" className="form-label">
            Preço
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-400">
              R$
            </span>
            <input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={produto?.preco}
              className="form-input pl-9"
            />
          </div>
        </div>

        <div>
          <label htmlFor="estoque" className="form-label">
            Estoque
          </label>
          <input
            id="estoque"
            name="estoque"
            type="number"
            step="1"
            min="0"
            required
            defaultValue={produto?.estoque}
            className="form-input"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
        <button type="submit" className="btn-primary">
          Salvar
        </button>
        <Link to="/" className="btn-secondary">
          Cancelar
        </Link>
      </div>
    </Form>
  );
}
