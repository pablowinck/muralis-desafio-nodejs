import { BuscaDespesasMesAtual } from "../../core/use-case/busca-despesas-mes-atual";
import { DespesaMemoryRepository } from "../outbound/despesa-memory-repository";

it("quando busca, deve retornar lista", async function () {
  const buscaDespesasMesAtual = new BuscaDespesasMesAtual(
    new DespesaMemoryRepository()
  );
  const result = await buscaDespesasMesAtual.execute();
  expect(result.content).toHaveLength(1);
});
