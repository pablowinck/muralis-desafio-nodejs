import { BuscaDespesasMesAtual } from "@usecase/busca-despesas-mes-atual";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { Pageable } from "@entity/Pageable";
import { Despesa } from "../../core/domain/entity/Despesa";

const repository = new DespesaMemoryRepository();
const buscaDespesasMesAtual = new BuscaDespesasMesAtual(repository);

it("quando busca, deve retornar lista", async function () {
  const despesa = new Despesa(
    111,
    20,
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
  );
  await repository.save(despesa);
  const result = await buscaDespesasMesAtual.execute(new Pageable(0, 10));
  expect(result.content).toHaveLength(1);
});
