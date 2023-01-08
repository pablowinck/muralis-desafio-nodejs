import { BuscaDespesasMesAtual } from "../../core/use-case/busca-despesas-mes-atual";
import { DespesaMemoryRepository } from "../outbound/despesa-memory-repository";
import { Pageable } from "../../core/domain/entity/Pageable";

it("quando busca, deve retornar lista", async function () {
  const buscaDespesasMesAtual = new BuscaDespesasMesAtual(
    new DespesaMemoryRepository()
  );
  const result = await buscaDespesasMesAtual.execute(new Pageable(0, 10));
  expect(result.content).toHaveLength(1);
});
