import { IRouter } from "express";
import { BuscaTodasCategorias } from "@usecase/busca-todas-categorias";

export class CategoriaController {
  constructor(
    readonly router: IRouter,
    readonly buscaTodasCategorias: BuscaTodasCategorias
  ) {
    this.router.get("/api/categorias", async (req, res) => {
      const categorias = await buscaTodasCategorias.execute();
      res.json(categorias);
    });
  }
}
