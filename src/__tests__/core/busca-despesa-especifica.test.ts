import { HttpException } from "@entity/HttpException";
import { Despesa } from "@entity/Despesa";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { BuscaDespesaEspecifica } from "@usecase/busca-despesa-especifica";

const repository = new DespesaMemoryRepository();
const buscaDespesaEspecifica = new BuscaDespesaEspecifica(repository);

it("deve buscar despesa especifica", async function () {
  const id = await repository.save(
    new Despesa(
      undefined,
      100,
      new Date(),
      "teste",
      1,
      1,
      "12345678",
      "rua teste",
      "123",
      "casa",
      "bairro teste",
      "cidade teste",
      "estado teste"
    )
  );
  expect(id).toBeGreaterThan(0);
  const despesa = await buscaDespesaEspecifica.execute(id);
  expect(despesa).not.toBeUndefined();
  expect(despesa.id).toBe(id);
  expect(despesa.valor).toBe("R$ 100,00");
});

it("deve retornar erro ao buscar despesa especifica inexistente", async function () {
  await expect(buscaDespesaEspecifica.execute(0)).rejects.toThrow(
    new HttpException(404, "Despesa não encontrada")
  );
});
