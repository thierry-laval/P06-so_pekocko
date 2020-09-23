// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// ESLint est un outil linting utility (linter) pour le JavaScript.
// Ainsi dans son fonctionnement, ESlint va comparer notre code source à un ensemble de règles qui ont été définit et il va nous aider à les respecter.

module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};
