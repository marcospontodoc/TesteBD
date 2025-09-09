export class Animal {
  constructor(nome, especie, brinquedosFavoritos) {
    this.nome = nome;
    this.especie = especie;
    this.brinquedosFavoritos = brinquedosFavoritos;
  }

  aoAdotar(pessoa) {}
}

export class Jabuti extends Animal {
  constructor(nome, brinquedosFavoritos) {
    super(nome, "jabuti", brinquedosFavoritos);
  }
}


export class Gato extends Animal {
  constructor(nome, brinquedosFavoritos) {
    super(nome, "gato", brinquedosFavoritos);
  }

  aoAdotar(pessoa) {
    this.brinquedosFavoritos.forEach(brinquedo => {
      pessoa.brinquedos.delete(brinquedo);
    });
  }
}

export class Cao extends Animal {
  constructor(nome, brinquedosFavoritos) {
    super(nome, "cão", brinquedosFavoritos);
  }
}