export class Model {
    constructor(objeto?) {
        Object.assign(this, objeto);
    }
  }
  //classe usuario extendendo a classe Model
  export class Usuario extends Model {
      codcoligada: string;
      idhabilitacaoficial: string;
      idperlet: string;
      ra: string;
      codcfo: string;
      token: string;
      cpf: string;
      nome: string;
      codigo: string;
      tipo: string;
      senha: string;
  }