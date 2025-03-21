# ✅ Application Todo (React + Express + MySQL + Docker)

Une application simple de gestion de tâches permettant d’ajouter, modifier, marquer comme terminée ou supprimer des tâches.  
Elle est développée avec :
- **Frontend** : React.js
- **Backend** : Express.js (Node.js)
- **Base de données** : MySQL
- **Conteneurisation** : Docker & Docker Compose

---

## 📂 Structure du projet

```
todo-app/
├── backend/             # API Express + logique de base de données
│   ├── server.js        # Point d’entrée de l’API
│   └── .env            # Variables d’environnement (base de données, API URL)
├── frontend/            # Application React
│   ├── src/             # Code source React
│   ├── .env            # Variables d’environnement (base de données, API URL)
│   └── Dockerfile       # Dockerfile pour le frontend
└── docker-compose.yml   # Orchestration Docker
```

---

## 🚀 Fonctionnalités

- ✅ Ajouter une tâche
- ✅ Modifier une tâche existante
- ✅ Supprimer une tâche
- ✅ Marquer une tâche comme terminée
- ✅ Visualiser les tâches dans une interface claire
- ✅ Affichage d’un message si une tâche est en retard
- ✅ Modal Bootstrap pour ajouter/éditer
- ✅ SweetAlert2 pour les messages de confirmation et erreurs

---

## ⚙️ Pré-requis

- [Node.js](https://nodejs.org)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 📦 Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/Alanarex/todo-app.git
cd todo-app
```

### 2. Vérifier les fichiers `.env`

#### `.env`
```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=tododb
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 🐳 Démarrage avec Docker

### 1. Lancer les services
```bash
docker compose up -d --build
```

### 2. Accéder à l'application
- Frontend (React) : http://localhost:3000
- Backend (API Express) : http://localhost:5000/tasks

---

## 🛠 Recommandations (en cas de problèmes)

### React ne s'affiche pas ?
- Vérifie que tu accèdes à `http://localhost:3000` (et pas un IP Docker)
- Assure-toi que `package.json` contient :
```json
"start": "react-scripts start --host 0.0.0.0"
```

### Base de données non reconnue ?
- Vérifie que `MYSQL_DATABASE=tododb` est bien défini dans `docker-compose.yml`
- Regénère les volumes :
```bash
docker compose down
docker compose up -d --build
```

---

## 🔧 Développement local (hors Docker)

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d’une évaluation de développement full-stack conteneurisé.  
Par **Alaa Khalil**