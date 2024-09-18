# Hyperseries Quizz

## Aperçu

Hyperseries Quizz est une application web interactive de quiz développée avec React, Tailwind CSS et Vite.js. Elle permet aux utilisateurs de répondre à des questions à choix multiple, d'obtenir un score à la fin du quiz, et de visualiser les résultats. L'application est conçue pour être visuellement attrayante, responsive, et facile à utiliser.

## Objectif du Projet

Créer une application de quiz interactive avec les fonctionnalités suivantes :

- Présenter au moins 5 questions avec des réponses à choix multiple.
- Fournir un retour en temps réel pour chaque réponse sélectionnée.
- Afficher le score final sur 5 à la fin du quiz.
- Utiliser Tailwind CSS pour le style et garantir que l'application est responsive.

## Fonctionnalités

- **Questions à Choix Multiple** : Les utilisateurs peuvent répondre à des questions avec quatre options, dont une seule est correcte.
- **Retour d'Information** : Lorsqu'une réponse est sélectionnée, l'application indique si la réponse est correcte ou incorrecte.
- **Score Final** : Affichage du score total à la fin du quiz.
- **Design Moderne** : Utilisation de Tailwind CSS pour un design épuré et responsive.
- **Transitions Animées** : Animation fluide entre les questions pour une meilleure expérience utilisateur.
- **Barre de Progression** (Bonus) : Affichage de la progression du quiz.
- **Page de Résumé** (Bonus) : Affichage des réponses de l'utilisateur, des réponses correctes, et du score détaillé.

## Installation

1. **Clonez le Dépôt :**

    ```bash
    git clone https://github.com/yourusername/hyperseries-quizz.git
    ```

2. **Accédez au Répertoire du Projet :**

    ```bash
    cd hyperseries-quizz
    ```

3. **Installez les Dépendances :**

    ```bash
    npm install
    ```

4. **Démarrez l'Application :**

    ```bash
    npm run dev
    ```

    Cela démarrera le serveur de développement et ouvrira l'application dans votre navigateur par défaut.

## Structure des Dossiers

- **`src/`** : Contient les composants React et les fichiers CSS.
  - **`components/`** : Composants de l'application.
    - **`QuizCard.tsx`** : Affiche une question et ses options.
    - **`ResultCard.tsx`** : Affiche le score final et les réponses correctes/incorrectes.
    - **`ProgressBar.tsx`** : Affiche la progression du quiz.
  - **`App.tsx`** : Composant principal de l'application qui gère l'état du quiz et le flux de l'application.

## Technologies Utilisées

- **React** : Pour construire les composants et gérer l'état.
- **Tailwind CSS** : Pour le style et le design responsive.
- **Vite.js** : Pour le processus de build rapide et efficace.

## Problèmes rencontrés

### **Fonctionnalité :** ERROR API 429 (Too Many Requests)
J'ai rencontré une erreur de limite de requêtes API (HTTP 429) lors de l'appel à l'API Open Trivia Database. Pour contourner ce problème, j'ai mis en place une boucle de nouvelle tentative avec une temporisation exponentielle. Cependant, je pense qu'il existe des solutions plus robustes, comme l'utilisation d'un cache local ou la gestion plus fine des appels API.

### **Qualité du Code :**
Le code a été structuré dans un délai de 2 heures, ce qui a limité le temps disponible pour le nettoyage et l'organisation approfondie. J'ai fait de mon mieux pour respecter les bonnes pratiques de développement tout en respectant le temps imparti.

### **Design & UI :**
Le design a été réalisé en utilisant Tailwind CSS pour créer une interface moderne et épurée. J'ai utilisé les components de shadcn-ui.

### **Responsivité :**
L'application a été conçue pour être fonctionnelle et attrayante sur différentes tailles d'écran (bureau, tablette, mobile). Les utilitaires responsifs de Tailwind CSS ont été utilisés pour garantir une bonne adaptabilité.

### **Fonctionnalités Bonus :**
Des fonctionnalités supplémentaires telles qu'une barre de progression en haut de l'écran et des transitions animées entre les questions ont été ajoutées pour améliorer l'expérience utilisateur.





---


