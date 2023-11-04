module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint: recommended",
        "plugin: react/recommended",
        "plugin: react-hooks/recommended",
        "plugin: jsx-a11y/recommended",
        "plugin: @typescript-eslint/recommended",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": ["jest"],
    "extends": ["plugin:jest/recommended"],
    "rules": {}
    
};

