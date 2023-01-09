import { CategoriaMemoryRepository } from "@outbound/memory/categoria-memory-repository";
import { TipoPagamentoMemoryRepository } from "@outbound/memory/tipo-pagamento-memory-repository";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { AtualizaParcialDespesa } from "@usecase/atualiza-parcial-despesa";
import { DespesaFactory } from "../../core/factories/despesa-factory";

const categoriaRepository = new CategoriaMemoryRepository();
const tipoPagamentoRepository = new TipoPagamentoMemoryRepository();
const despesaRepository = new DespesaMemoryRepository();
const buscaCategoriaEspecifica = new BuscaCategoriaEspecifica(
  categoriaRepository
);
const buscaTipoPagamentoEspecifico = new BuscaTipoPagamentoEspecifico(
  tipoPagamentoRepository
);
const atualizaDespesa = new AtualizaParcialDespesa(
  despesaRepository,
  buscaCategoriaEspecifica,
  buscaTipoPagamentoEspecifico
);

test("Atualiza despesa", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = {
    descricao: "teste unitario2222",
  };
  expect(despesa.descricao).not.toEqual(dto.descricao);
  await atualizaDespesa.execute(id, dto);
  const despesaAtualizada = await despesaRepository.findById(id);
  expect(despesaAtualizada?.descricao).toEqual(dto.descricao);
});

test("Quando nao existir categoria deve retornar erro", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = {
    descricao: "teste unitario",
    categoriaId: 999,
  };
  await expect(atualizaDespesa.execute(id, dto)).rejects.toThrowError(
    "Categoria não encontrada"
  );
});

test("Quando nao existir tipo de pagamento deve retornar erro", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = {
    descricao: "teste unitario",
    tipoPagamentoId: 999,
  };
  await expect(atualizaDespesa.execute(id, dto)).rejects.toThrowError(
    "Tipo de Pagamento não encontrado"
  );
});

test("Quando nao existir despesa deve retornar erro", async () => {
  const dto = {
    descricao: "teste unitario",
  };
  await expect(atualizaDespesa.execute(999, dto)).rejects.toThrowError(
    "Despesa não encontrada"
  );
});
