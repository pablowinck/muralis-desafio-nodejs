import { DespesaMemoryRepository } from "@outbound/memory/despesa-memory-repository";
import { DespesaFactory } from "../../core/factories/despesa-factory";
import { BuscaDespesasPorPeriodo } from "@usecase/busca-despesas-por-periodo";
import { HttpException } from "@entity/HttpException";

const repository = new DespesaMemoryRepository();
const buscaDespesasPorPeriodo = new BuscaDespesasPorPeriodo(repository);

it("quando busca, deve retornar lista", async function () {
  const despesa = DespesaFactory.execute();
  await repository.save(despesa);
  const result = await buscaDespesasPorPeriodo.execute({
    page: 0,
    size: 10,
    dataInicio: despesa.dataCompra.toISOString(),
    dataFim: despesa.dataCompra.toISOString(),
  });
  expect(result.content).toHaveLength(1);
});

it("quando data inicio maior que data fim, deve lancar exception", async function () {
  await expect(
    buscaDespesasPorPeriodo.execute({
      page: 0,
      size: 10,
      dataInicio: "2021-01-01",
      dataFim: "2020-01-01",
    })
  ).rejects.toThrow(
    new HttpException(500, "Data inicial não pode ser maior que data final")
  );
});
