import { ViaCepRepository } from "@repository/via-cep-repository";
import { ViaCep } from "@entity/ViaCep";
import axios from "axios";

export class ViaCepRepositoryImpl implements ViaCepRepository {
  findByCep(cep: string): Promise<ViaCep> {
    return axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.data)
      .catch(() => ({ cep: "" }));
  }
}
