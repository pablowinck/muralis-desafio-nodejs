# Etapa Técnica - Muralis

### URL da aplicação
- https://muralis-desafio-react.vercel.app/
- Utilizar a collection do Postman para testar a API: https://www.getpostman.com/collections/1b0b0c1b0c1b0c1b0c1b

#### obs: Avaliador, favor verificar erratas do desafio no final do README.md.

### Problema

Controlar os gastos de acordo com a renda disponível é fator fundamental para organização do Orçamento Doméstico, uma etapa importante nesse processo é manter um histórico detalhado de despesas, principalmente para os pequenos gastos diários. Nesse intuito você deve construir uma API REST que permita armazenar e exibir registros de despesas.

### Orientações Gerais

- Uma DESPESA deve possuir os seguintes dados: Valor, Descrição, Data, Tipo de Pagamento e Categoria;
- Os TIPOS DE PAGAMENTO são: Dinheiro, Débito, Crédito e Pix;
- A listagem de DESPESAS deve mostrar apenas os registros do mês vigente;
- Não será permitido utilização de ORMs;
- Mantenha uma separação adequada de responsabilidades;
- Utilize conceitos de Programação Orientada a Objetos quando achar pertinente;

### Endpoints principais necessários
| Método | Endpoint      | Descrição         |
|--------|---------------|-------------------|
| GET    | /api/despesas | Listar despesas   |
| POST   | /api/despesas | Cadastrar despesa |

### Response Body
```json
{
  "data": null,
  "success": true
}
```
O valor do atributo **data** deve ser o resultado da **request** executada.
Para a função "Listar" deve conter a lista de despesas cadastradas no banco de dados. Para a função "Cadastrar" deve conter o ID da despesa recém inserida no banco de dados.

O atributo **success** será **true** caso a **request** seja executada com sucesso, caso contrário será **false**.

### Demais demandas
- Implementar os verbos http: POST, GET, PUT, DELETE, e PATCH;
- Retornar um **PDF** contendo as despesas, respeitando um intervalo de tempo;
- Retornar uma **lista** de despesas, respeitando a paginação;
- Retornar uma **Planilha Excel** contendo as despesas do mês vigente;
- Adicionar o endereço do estabelecimento onde a despesa aconteceu:
  - O usuário informar somente o CEP e o número do estabelecimento, os demais dados devem ser adquiridos através de um mecanismo externo, como o viacep.com.br, por exemplo.

### Modelo de dados: