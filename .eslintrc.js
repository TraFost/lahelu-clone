// export const eslintConfig = {
// 	extends: ["universe", "universe/native", "universe/shared/typescript-analysis"],
// 	plugins: ["react-hooks"],
// 	overrides: [
// 		{

//       files: ['*.ts', '*.tsx', '*.d.ts'],

//       parserOptions: {

//         project: './tsconfig.json',

//       },

//     },
// 	],
// 	env: {
// 		node: true,
// 	}
// };

module.exports = {

  extends: [

    'universe',

    'universe/native',

    'universe/web',

    'universe/shared/typescript-analysis',

  ],

  overrides: [

    {

      files: ['*.ts', '*.tsx', '*.d.ts'],

      parserOptions: {

        project: './tsconfig.json',

      },

    },

  ],

  plugins: ['react-hooks'],

  rules: {

    'import/order': 'off',

  },

  env: {

    node: true,

  },

};