import { CadastraDespesa } from "@usecase/cadastra-despesa";
import { CategoriaMemoryRepository } from "@outbound/memory/categoria-memory-repository";
import { TipoPagamentoMemoryRepository } from "@outbound/memory/tipo-pagamento-memory-repository";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { ViaCepMemoryRepository } from "@outbound/memory/via-cep-memory-repository";
import { BuscaCategoriaEspecifica } from "@usecase/busca-categoria-especifica";
import { BuscaTipoPagamentoEspecifico } from "@usecase/busca-tipo-pagamento-especifico";
import { PersistDespesaDto } from "@dto/persist-despesa-dto";
import { HttpException } from "@entity/HttpException";

const categoriaRepository = new CategoriaMemoryRepository();
const tipoPagamentoRepository = new TipoPagamentoMemoryRepository();
const despesaRepository = new DespesaMemoryRepository();
const viacepRepository = new ViaCepMemoryRepository();
const buscaCategoriaEspecifica = new BuscaCategoriaEspecifica(
  categoriaRepository
);
const buscaTipoPagamentoEspecifico = new BuscaTipoPagamentoEspecifico(
  tipoPagamentoRepository
);

const cadastraDespesa = new CadastraDespesa(
  despesaRepository,
  buscaCategoriaEspecifica,
  buscaTipoPagamentoEspecifico,
  viacepRepository
);

test("Cadastra despesa", async () => {
  const persistDespesaDto = new PersistDespesaDto(
    "teste unitario",
    100,
    "93346140",
    "S/N",
    "08/01/2023",
    1,
    1
  );
  const result = await cadastraDespesa.execute(persistDespesaDto);
  expect(result).not.toBeNull();
  expect(result?.success).toBeTruthy();
});

test("Quando nao existir categoria deve retornar erro", async () => {
  const persistDespesaDto = new PersistDespesaDto(
    "teste unitario",
    100,
    "93346140",
    "S/N",
    "08/01/2023",
    999,
    1
  );
  await expect(cadastraDespesa.execute(persistDespesaDto)).rejects.toThrow(
    new HttpException(400, "Categoria não encontrada")
  );
});

test("Quando nao existir tipo de pagamento deve retornar erro", async () => {
  const persistDespesaDto = new PersistDespesaDto(
    "teste unitario",
    100,
    "93346140",
    "S/N",
    "08/01/2023",
    1,
    999
  );
  await expect(cadastraDespesa.execute(persistDespesaDto)).rejects.toThrow(
    new HttpException(400, "Tipo de Pagamento não encontrado")
  );
});

test("Quando nao achar cep no viacep deve retornar erro", async () => {
  const persistDespesaDto = new PersistDespesaDto(
    "teste unitario",
    100,
    "99999999",
    "S/N",
    "08/01/2023",
    1,
    1
  );
  await expect(cadastraDespesa.execute(persistDespesaDto)).rejects.toEqual(
    new HttpException(400, "CEP não encontrado")
  );
});

test("Quando erro ao salvar despesa deve retornar erro", async () => {
  const persistDespesaDto = new PersistDespesaDto(
    "erro",
    100,
    "93346140",
    "S/N",
    "08/01/2023",
    1,
    1
  );
  await expect(cadastraDespesa.execute(persistDespesaDto)).rejects.toEqual(
    new HttpException(500, "Erro ao salvar despesa")
  );
});
