# ReplayCity

ReplayCity est une plateforme innovante d’aide à la revalorisation urbaine, utilisant l’intelligence artificielle pour identifier des espaces urbains sous-utilisés et proposer leur transformation en lieux éducatifs, durables et adaptés aux besoins des citoyens, en particulier des enfants.

Ce dépôt contient actuellement le **prototype frontend (MVP)** de l’application. La partie backend est en cours de développement et sera intégrée dans une prochaine version.

---

## Présentation du projet

L’objectif de ReplayCity est d’accompagner les collectivités, urbanistes, écoles et acteurs locaux dans la transformation d’espaces vacants ou peu exploités en projets à forte valeur sociale et environnementale.

La plateforme permet notamment de :

- Identifier des terrains ou espaces urbains sous-utilisés.
- Évaluer leur potentiel de transformation.
- Visualiser différents scénarios d’aménagement.
- Générer des propositions de projets assistées par l’intelligence artificielle.
- Faciliter la prise de décision grâce à des indicateurs.

Cette première version a pour vocation de démontrer le parcours utilisateur et les principales fonctionnalités du concept.

---

## Fonctionnalités disponibles

### Authentification (simulation)
- Connexion utilisateur
- Création de compte
- Gestion de profil (version démonstrative)

### Carte interactive
- Visualisation des espaces disponibles
- Sélection d’un terrain
- Exploration des opportunités d’aménagement

### Génération de projets assistée par IA (prototype)
- Simulation d’un processus de génération
- Recommandations de projets
- Présentation de concepts d’aménagement

### Tableau de bord
- Consultation des projets générés
- Comparaison de différentes propositions
- Gestion des projets sauvegardés

### Démonstration d’un modèle Freemium
- Fonctionnalités accessibles aux utilisateurs standards
- Aperçu de fonctionnalités premium

---

## Technologies utilisées

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- React Leaflet
- Leaflet
- Lucide React

---

## Structure du projet

```text
src/
├── components/
├── pages/
├── data/
├── assets/
├── hooks/
├── services/
└── App.jsx

```
---

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/tafsoutabdi/ReplayCity.git
```

### Accéder au projet

```bash
cd ReplayCity
```

### Installer les dépendances

```bash
npm install
```

### Lancer le projet en local

```bash
npm run dev
```

L’application sera accessible à l’adresse :

```text
http://localhost:5173
```

---

## Développement du backend

La partie backend du projet est actuellement développée dans un dépôt GitHub distinct par un membre de l’équipe.

Une fois son développement suffisamment avancé, elle sera connectée à l’application frontend afin de permettre la communication entre les différents composants du projet.

Les informations techniques relatives au backend seront ajoutées à cette documentation lorsque son intégration sera finalisée.

[lien vers le backend ](https://github.com/capatainkomic/backend-replay-city)
---

## Statut du projet

Projet actuellement en phase de prototype et de développement.

Les fonctionnalités présentées ont pour objectif de démontrer le concept et l'expérience utilisateur avant l'intégration complète du backend et des services d'intelligence artificielle.
