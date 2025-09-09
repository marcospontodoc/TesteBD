export class Pessoa {
  constructor(id, brinquedos) {
    this.id = id;
    this.brinquedos = new Set(brinquedos);
    this.animaisAdotados = [];
  }

  podeAdotar() {
    return this.animaisAdotados.length < 3;
  }

  adotar(animal) {
    this.animaisAdotados.push(animal);
    animal.aoAdotar(this)
  }

  possuiBrinquedosEmOrdem(brinquedosDoAnimal) {
    let indiceBrinquedoAnimal = 0;
    
    for (const brinquedoPessoa of this.brinquedos) {
      if (brinquedoPessoa === brinquedosDoAnimal[indiceBrinquedoAnimal]) {
        indiceBrinquedoAnimal++;
      }
      if (indiceBrinquedoAnimal === brinquedosDoAnimal.length) {
        return true;
      }
    }
    return false;
  }
  
  possuiBrinquedosSemOrdem(brinquedosDoAnimal) {
    const meusBrinquedos = this.brinquedos;
    return brinquedosDoAnimal.every(brinquedo => meusBrinquedos.has(brinquedo));
  }
}
