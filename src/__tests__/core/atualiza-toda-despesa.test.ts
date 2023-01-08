import { CategoriaMemoryRepository } from "@outbound/memory/categoria-memory-repository";
import { TipoPagamentoMemoryRepository } from "@outbound/memory/tipo-pagamento-memory-repository";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { AtualizaTodaDespesa } from "@usecase/atualiza-toda-despesa";
import { UpdateDespesaDto } from "@dto/update-despesa-dto";
import { DespesaFactory } from "../../core/factories/despesa-factory";
import { HttpException } from "@entity/HttpException";

const categoriaRepository = new CategoriaMemoryRepository();
const tipoPagamentoRepository = new TipoPagamentoMemoryRepository();
const despesaRepository = new DespesaMemoryRepository();
const buscaCategoriaEspecifica = new BuscaCategoriaEspecifica(
  categoriaRepository
);
const buscaTipoPagamentoEspecifico = new BuscaTipoPagamentoEspecifico(
  tipoPagamentoRepository
);
const atualizaDespesa = new AtualizaTodaDespesa(
  despesaRepository,
  buscaCategoriaEspecifica,
  buscaTipoPagamentoEspecifico
);

test("Atualiza despesa", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = new UpdateDespesaDto(
    100,
    "08/01/2023",
    "teste unitario",
    1,
    1,
    "93346140",
    "teste",
    "S/N",
    "sem complmento",
    "super sayadin",
    "goku",
    "vegeta"
  );
  expect(despesa.descricao).not.toEqual(dto.descricao);
  const result = await atualizaDespesa.execute(id, dto);
  expect(result).not.toBeNull();
  expect(result?.success).toBeTruthy();
  const findedDepesa = await despesaRepository.findById(id);
  expect(findedDepesa?.descricao).toEqual(dto.descricao);
});

test("Quando nao existir categoria deve retornar erro", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = new UpdateDespesaDto(
    100,
    "08/01/2023",
    "teste unitario",
    1,
    999,
    "93346140",
    "teste",
    "S/N",
    "sem complmento",
    "super sayadin",
    "goku",
    "vegeta"
  );
  await expect(atualizaDespesa.execute(id, dto)).rejects.toEqual(
    new HttpException(404, "Categoria não encontrada")
  );
});

test("Quando nao existir tipo de pagamento deve retornar erro", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = new UpdateDespesaDto(
    100,
    "08/01/2023",
    "teste unitario",
    999,
    1,
    "93346140",
    "teste",
    "S/N",
    "sem complmento",
    "super sayadin",
    "goku",
    "vegeta"
  );
  await expect(atualizaDespesa.execute(id, dto)).rejects.toEqual(
    new HttpException(404, "Tipo de Pagamento não encontrado")
  );
});

test("Quando despesa nao existir deve retornar erro", async () => {
  const dto = new UpdateDespesaDto(
    100,
    "08/01/2023",
    "teste unitario",
    1,
    1,
    "93346140",
    "teste",
    "S/N",
    "sem complmento",
    "super sayadin",
    "goku",
    "vegeta"
  );
  await expect(atualizaDespesa.execute(999, dto)).rejects.toEqual(
    new HttpException(404, "Despesa não encontrada")
  );
});

test("Quando nao conseguir atualizar, deve retornar erro", async () => {
  const despesa = DespesaFactory.execute();
  const id = await despesaRepository.save(despesa);
  const dto = new UpdateDespesaDto(
    100,
    "08/01/2023",
    "erro",
    1,
    1,
    "93346140",
    "teste",
    "S/N",
    "sem complmento",
    "super sayadin",
    "goku",
    "vegeta"
  );
  await expect(atualizaDespesa.execute(id, dto)).rejects.toEqual(
    new HttpException(400, "Erro ao atualizar despesa")
  );
});
