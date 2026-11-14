# API REST - Gestion de Projets et Tâches

Mini-Projet DS1 - ISIDS (Express.js + MongoDB)

## Auteur
- Ayoub Assila

## Description
API REST permettant à des utilisateurs authentifiés (JWT) de gérer leurs projets et les tâches associées, avec deux rôles : **user** et **manager**.

## Technologies
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken) pour l'authentification
- bcryptjs pour le cryptage des mots de passe
- dotenv pour les variables d'environnement

## Installation
```bash
git clone https://github.com/AyoubAssila/gestion-projets-api.git
cd gestion-projets-api
npm install
```

Créer un fichier `.env` à la racine (voir `.env.example`) :
```
MONGO_URI=mongodb://127.0.0.1:27017/gestion-projets
JWT_SECRET=une_cle_secrete
JWT_EXPIRES_IN=1h
PORT=3000
```

Lancer le serveur :
```bash
npm run dev
```

## Structure du projet
```
src/
├── config/        -> connexion à MongoDB
├── controllers/   -> reçoivent la requête et envoient la réponse
├── middlewares/   -> logger, verifierToken, autoriser (rôles), gestion des erreurs
├── models/        -> schémas Mongoose (User, Projet, Tache)
├── routes/        -> définition des routes
├── services/      -> logique métier
├── utils/         -> HttpError, recherche et tri
├── app.js         -> configuration de l'application Express
└── server.js      -> démarrage du serveur
```

## Règles de gestion
- Un projet peut être créé par n'importe quel utilisateur authentifié (user ou manager).
- Un user voit uniquement ses projets ; seul le manager voit tous les projets.
- Chaque tâche est associée à un projet et peut être créée par n'importe quel utilisateur.
- Le statut d'une tâche est obligatoirement : `todo`, `doing` ou `done`.
- Seul le manager peut affecter une tâche à un utilisateur.
- Les routes sont protégées par les middlewares `verifierToken` (JWT) et `autoriser` (rôles).

## Routes

Toutes les routes, sauf `register` et `login`, nécessitent le header :
`Authorization: Bearer <token>`

### Authentification
| Méthode | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Inscription (`nom`, `login`, `motDePasse`, `role`) |
| POST | `/api/auth/login` | Connexion, renvoie un token JWT |

### Utilisateurs
| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/api/users/me` | connecté | Profil de l'utilisateur connecté |
| GET | `/api/users` | manager | Liste des utilisateurs |

### Projets
| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/api/projets` | connecté | Créer un projet |
| GET | `/api/projets` | connecté | Liste (user : ses projets, manager : tous) |
| GET | `/api/projets/:id` | propriétaire / manager | Détail d'un projet |
| PATCH | `/api/projets/:id` | propriétaire / manager | Modifier un projet |
| DELETE | `/api/projets/:id` | propriétaire / manager | Supprimer un projet et ses tâches |

Recherche et tri : `?search=texte&statut=en cours&tri=nom&ordre=asc`
(tri possible sur `nom`, `statut`, `dateCreation`)

### Tâches
| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/api/taches` | connecté | Créer une tâche (`titre`, `projet`, `statut`, `deadline`) |
| GET | `/api/taches` | connecté | Liste (manager : toutes, user : ses projets + ses tâches assignées) |
| GET | `/api/taches/mine` | connecté | Tâches assignées à l'utilisateur connecté |
| GET | `/api/taches/:id` | propriétaire du projet / assigné / manager | Détail d'une tâche |
| PATCH | `/api/taches/:id` | propriétaire du projet / assigné / manager | Modifier une tâche |
| PATCH | `/api/taches/:id/affecter` | **manager** | Affecter une tâche (`userId`) |
| DELETE | `/api/taches/:id` | propriétaire du projet / manager | Supprimer une tâche |

Filtres, recherche et tri : `?projet=<id>&assigne=<id>&statut=doing&search=texte&tri=deadline&ordre=asc`
(tri possible sur `titre`, `statut`, `deadline`, `dateCreation`)

## Codes de réponse
| Code | Signification |
|---|---|
| 200 / 201 | Succès / ressource créée |
| 400 | Données invalides ou id invalide |
| 401 | Token manquant, invalide ou expiré / identifiants incorrects |
| 403 | Accès refusé (rôle ou propriétaire) |
| 404 | Ressource ou route introuvable |
| 409 | Login déjà utilisé |