import { ViaCepRepository } from "../../core/repository/via-cep-repository";
import { ViaCep } from "../../core/domain/entity/ViaCep";
import axios from "axios";

export class ViaCepRepositoryImpl implements ViaCepRepository {
  findByCep(cep: string): Promise<ViaCep> {
    return axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.data)
      .catch(() => ({ cep: "" }));
  }
}
