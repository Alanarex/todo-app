
# To-Do List Application avec Docker

## Installation
1. **Cloner le projet**
   ```sh
   git clone https://github.com/Alanarex/todo-app.git
   cd todo-app
   ```

2. **Créer le fichier `.env`**
   ```sh
   cp backend/.env.example backend/.env
   ```

3. **Lancer l’application**
   ```sh
   docker compose up -d
   ```

4. **Accéder à l’application**
   - Frontend : [http://localhost:3000](http://localhost:3000)
   - API : [http://localhost:5000/todos](http://localhost:5000/todos)
