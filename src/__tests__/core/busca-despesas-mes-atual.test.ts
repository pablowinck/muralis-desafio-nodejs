import { BuscaDespesasMesAtual } from "@usecase/busca-despesas-mes-atual";
import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { Pageable } from "@entity/Pageable";
import { DespesaFactory } from "../../core/factories/despesa-factory";

const repository = new DespesaMemoryRepository();
const buscaDespesasMesAtual = new BuscaDespesasMesAtual(repository);
it("quando busca, deve retornar lista", async function () {
  const despesa = DespesaFactory.execute();
  await repository.save(despesa);
  const result = await buscaDespesasMesAtual.execute(new Pageable(0, 10));
  expect(result.content).toHaveLength(1);
});
