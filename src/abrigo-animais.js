import { Cao, Gato, Jabuti } from './Animal.js';
import { Pessoa } from './Pessoa.js';

class AbrigoAnimais {
  constructor() {
    this.animaisDisponiveis = [
      new Cao("Rex", ["RATO", "BOLA"]),
      new Gato("Mimi", ["BOLA", "LASER"]),
      new Gato("Fofo", ["BOLA", "RATO", "LASER"]),
      new Gato("Zero", ["RATO", "BOLA"]),
      new Cao("Bola", ["CAIXA", "NOVELO"]),
      new Cao("Bebe", ["LASER", "RATO", "BOLA"]),
      new Jabuti("Loco", ["SKATE", "RATO"]),
    ];
    
    this.brinquedosValidos = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);
  }

  _brinquedosInvalidos(listaItens) {
    if (new Set(listaItens).size !== listaItens.length) return true;
    for (const item of listaItens) {
      if (!this.brinquedosValidos.has(item)) return true;
    }
    return null;
  }

  _animaisInvalidos(animais) {
    if (new Set(animais).size !== animais.length) return true;
    const nomesDisponiveis = this.animaisDisponiveis.map(animal => animal.nome);  
    for (const nomeAnimal of animais) {
      if (!nomesDisponiveis.includes(nomeAnimal)) {
        return true;
      }
    }
    return null;
  }  
  
  _verificaAptidao(pessoa, animal) {
    if (!pessoa.podeAdotar()) return false;

    if (animal.nome === 'Loco' && pessoa.animaisAdotados.length > 0) {
      return pessoa.possuiBrinquedosSemOrdem(animal.brinquedosFavoritos);
    }
    
    return pessoa.possuiBrinquedosEmOrdem(animal.brinquedosFavoritos);
  }

  encontraPessoas(brinquedosP1, brinquedosP2, ordemAnimais) {
    const brinquedosPessoa1 = brinquedosP1.split(',').map(b => b.trim());
    const brinquedosPessoa2 = brinquedosP2.split(',').map(b => b.trim());
    const listaAnimais = ordemAnimais.split(',').map(a => a.trim());

    if (this._brinquedosInvalidos(brinquedosPessoa1) || this._brinquedosInvalidos(brinquedosPessoa2)) {
      return { erro: 'Brinquedo inválido' };
    }
    if (this._animaisInvalidos(listaAnimais)) {
      return { erro: 'Animal inválido' };
    }
    
    const pessoa1 = new Pessoa(1, brinquedosPessoa1);
    const pessoa2 = new Pessoa(2, brinquedosPessoa2);
    const adocaoStatus = new Map();
    
    const animaisOrdenados = listaAnimais.filter(nome => nome !== 'Loco');
    if(listaAnimais.includes('Loco')){
      animaisOrdenados.push('Loco');
    };
    
    for (const nomeAnimal of animaisOrdenados) {
      const animal = this.animaisDisponiveis.find(a => a.nome === nomeAnimal);
      
      const pessoa1PodeAdotar = this._verificaAptidao(pessoa1, animal);
      const pessoa2PodeAdotar = this._verificaAptidao(pessoa2, animal);

      if (pessoa1PodeAdotar && !pessoa2PodeAdotar) {
        pessoa1.adotar(animal);
        adocaoStatus.set(nomeAnimal, 'pessoa 1');
      } else if (!pessoa1PodeAdotar && pessoa2PodeAdotar) {
        pessoa2.adotar(animal);
        adocaoStatus.set(nomeAnimal, 'pessoa 2');
      } else {
        adocaoStatus.set(nomeAnimal, 'abrigo');
      }
    }
    
    const listaFinal = listaAnimais
      .map(nomeAnimal => `${nomeAnimal} - ${adocaoStatus.get(nomeAnimal)}`)
      .sort();
      
    return { lista: listaFinal };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
