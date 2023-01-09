import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { ExcluiDespesa } from "@usecase/exclui-despesa";
import { DespesaFactory } from "../../core/factories/despesa-factory";

const repository = new DespesaMemoryRepository();
const excluiDespesa = new ExcluiDespesa(repository);

test("Exclui despesa", async () => {
  const despesa = DespesaFactory.execute();
  const id = await repository.save(despesa);
  await excluiDespesa.execute(id);
  const findedDepesa = await repository.findById(id);
  expect(findedDepesa).toBeUndefined();
});

test("Quando nao existir despesa deve retornar erro", async () => {
  await expect(excluiDespesa.execute(999)).rejects.toThrowError(
    "Despesa não encontrada"
  );
});
