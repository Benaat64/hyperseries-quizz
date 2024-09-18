# Hyperseries Quizz

Hyperseries Quizz est une application web de quiz qui récupère des questions depuis l'API Open Trivia Database. Les utilisateurs peuvent répondre à des questions à choix multiples et recevoir un score à la fin du quiz. L'application comprend des animations et une barre de progression pour améliorer l'expérience utilisateur.

## Fonctionnalités

- Récupère et affiche des questions à choix multiples depuis l'API Open Trivia Database.
- Fournit un retour en temps réel sur les réponses des utilisateurs.
- Animations pour des transitions fluides à l'aide de Framer Motion.
- Barre de progression pour indiquer l'avancement de l'utilisateur dans le quiz.
- Mécanisme de réessai avec retour exponentiel en cas de limitation du taux d'API.

## Technologies

- **React** : Pour la création de l'interface utilisateur.
- **TypeScript** : Pour la sécurité des types et une meilleure expérience de développement.
- **Framer Motion** : Pour les animations.
- **Tailwind CSS** : Pour le style.

## Installation

1. **Clonez le dépôt :**

    ```bash
    git clone https://github.com/yourusername/hyperseries-quizz.git
    ```

2. **Accédez au répertoire du projet :**

    ```bash
    cd hyperseries-quizz
    ```

3. **Installez les dépendances :**

    ```bash
    npm install
    # ou
    pnpm install
    ```

4. **Démarrez l'application :**

    ```bash
    npm start
    # ou
    pnpm start
    ```

    Cela démarrera le serveur de développement et ouvrira l'application dans votre navigateur par défaut.

## Structure du Code

- **`App.tsx`** : Composant principal qui gère la logique du quiz, la récupération des questions, et affiche soit le quiz soit les résultats.
- **`components/QuizCard.tsx`** : Affiche une question et ses options.
- **`components/ResultCard.tsx`** : Montre le score final et les réponses correctes/incorrectes après la fin du quiz.
- **`components/ProgressBar.tsx`** : Affiche la progression du quiz.

## Gestion des Limites d'API

L'application inclut un mécanisme de réessai pour gérer les erreurs de limitation du taux d'API. Si l'API renvoie un code de statut 429, l'application réessaiera automatiquement la requête avec un délai croissant jusqu'à un nombre maximum de réessais.

## Problèmes Connus

- **Limitation du Taux** : Si la limite de taux de l'API est dépassée, vous pourriez rencontrer des erreurs. Le mécanisme de réessai est en place, mais il peut y avoir des cas où une intervention manuelle est nécessaire.

## Contribuer

N'hésitez pas à soumettre des problèmes ou des demandes de tirage. Les contributions pour améliorer l'application ou ajouter de nouvelles fonctionnalités sont les bienvenues !

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

