# DiniTech - Plateforme de Streaming

Une application web moderne pour la gestion de services de streaming, développée avec React et TypeScript.

## Fonctionnalités

- 🔐 Authentification sécurisée
- 📊 Tableau de bord administratif
- 🎥 Gestion des plateformes de streaming
- 💰 Gestion des offres et abonnements
- 👥 Gestion des utilisateurs et profils
- ⚙️ Paramètres personnalisables

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- Node.js
- Prisma
- PostgreSQL

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/dinitech.git
cd dinitech
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```
Puis modifiez le fichier `.env` avec vos paramètres.

4. Lancez les migrations de la base de données :
```bash
npx prisma migrate dev
```

5. Démarrez l'application :
```bash
npm run dev
```

## Structure du projet

```
src/
  components/
    admin/           # Composants de l'interface d'administration
    auth/            # Composants d'authentification
    common/          # Composants réutilisables
  context/          # Contextes React (auth, theme, etc.)
  pages/            # Pages principales de l'application
  services/         # Services (API, auth, etc.)
  styles/           # Styles globaux
  types/           # Types TypeScript
  utils/           # Fonctions utilitaires
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
