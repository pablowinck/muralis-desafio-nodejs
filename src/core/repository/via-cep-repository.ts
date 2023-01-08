import { ViaCep } from "../domain/entity/ViaCep";

export interface ViaCepRepository {
  findByCep: (cep: string) => Promise<ViaCep>;
}
