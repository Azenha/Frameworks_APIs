const soma = require('./somador');

teste('soma 1 + 2 que é igual a 3', () => {
    expect(soma(1, 2)).toBe(3);
});