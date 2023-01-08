import { CategoriaMemoryRepository } from "@outbound/memory/categoria-memory-repository";
import { TipoPagamentoMemoryRepository } from "@outbound/memory/tipo-pagamento-memory-repository";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { AtualizaTodaDespesa } from "@usecase/atualiza-toda-despesa";
import { UpdateDespesaDto } from "@dto/update-despesa-dto";
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
