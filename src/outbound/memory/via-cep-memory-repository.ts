import { ViaCepRepository } from "@repository/via-cep-repository";
import { ViaCep } from "@entity/ViaCep";

export class ViaCepMemoryRepository implements ViaCepRepository {
  findByCep(cep: string): Promise<ViaCep> {
    if (cep == "99999999")
      return Promise.resolve(new ViaCep("", "", "", "", "", ""));
    return Promise.resolve(
      new ViaCep("teste", "teste", "teste", "teste", "teste", "teste")
    );
  }
}
