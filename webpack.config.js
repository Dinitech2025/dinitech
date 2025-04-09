const path = require('path');

module.exports = {
  // Autres configurations webpack...
  
  // Désactiver le source-map-loader pour Prisma
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          // Exclure tous les fichiers des node_modules
          /node_modules/,
          // Exclure spécifiquement les fichiers générés par Prisma
          /src\/generated/,
        ],
      },
    ],
  },
  
  // Ignorer les avertissements liés aux source maps manquantes
  ignoreWarnings: [/Failed to parse source map/],
}; 