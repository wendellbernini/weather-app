module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', // Regras do Airbnb
    'plugin:prettier/recommended', // Integração com Prettier
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'], // Adiciona Prettier como plugin
  rules: {
    'prettier/prettier': 'error', // Marca como erro qualquer desvio das regras do Prettier
    // Limita a complexidade de funções/métodos
    complexity: ['error', 5],

    // Limita o número de linhas em uma função/arquivo
    'max-lines': [
      'error',
      { max: 90, skipBlankLines: true, skipComments: true },
    ],

    // Limita o número de declarações em uma função
    'max-statements': ['error', 30],

    // Previne o uso de números "mágicos"
    'no-magic-numbers': ['error', { ignore: [0, 1] }],

    // Evita ternários aninhados
    'no-nested-ternary': 'error',

    // Limita o número de linhas em branco consecutivas
    'no-multiple-empty-lines': ['error', { max: 1 }],
  },
};
