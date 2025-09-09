import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve retornar erro para brinquedos duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,BOLA',
      'RATO', 
      'Mimi'
    );
      expect(resultado.erro).toBe('Brinquedo inválido');
      expect(resultado.lista).toBeUndefined();
  });

  test('Deve retornar erro para animais duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 
      'LASER', 
      'Rex,Fofo,Rex'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeUndefined();
  });

  test('Deve retornar erro para brinquedos inexistentes', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,POTE',
      'BOLA', 
      'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeUndefined();
  });

  test('Quando Loco estiver sozinho deve ser adotado somente com a ordem dos brinquedos correta', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'RATO,SKATE', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
    });
  
  test('Deve adotar Loco independente da ordem se outro animal for adotado na mesma rodada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,SKATE', 'BOLA,RATO', 'Rex,Loco');  
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1')
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
    });
  
  test('Deve aplicar ordem estrita para Loco se o outro animal considerado for para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,SKATE', 'SKATE,RATO', 'Loco,Rex');      
    expect(resultado.lista[0]).toBe('Loco - pessoa 2');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
    });

    test('Deve enviar Loco para o abrigo se ele estiver "sozinho" e a ordem dos brinquedos estiver incorreta', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,SKATE','NOVELO,CAIXA','Loco,Rex');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Gatos não dividem seus brinquedos com outros animais', () => {
      const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,LASER','RATO,LASER','Mimi,Rex');
      expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
      expect(resultado.lista[1]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
    });

});
