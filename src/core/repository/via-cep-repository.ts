import { ViaCep } from "@entity/ViaCep";

export interface ViaCepRepository {
  findByCep: (cep: string) => Promise<ViaCep>;
}
