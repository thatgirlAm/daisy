
# Instructions pour faire fonctionner Daily en local

## 1. Étapes à réaliser uniquement lors de la première utilisation :

### Automate

- Dans le fichier `globals.py`, modifiez le chemin (répertoire) où se trouvent les documents.
- Décommentez la fonction d'envoi de mail en supprimant le `#` à la ligne 93 dans le fichier `_0_main_comparison_script.py`.
- Assurez-vous que les fichiers et chemins pour OM et Partenaire sont dans le répertoire sous les noms conventionnels :
  - **Partenaire** : `FILEPATH_PARTENAIRE = REPERTOIRE + 'PARTENAIRE_' + date (format "%Y%m%d") + '.xlsx'`
  - **OM** : `REPERTOIRE + 'Transactions_' + date + '.xlsx'`
- Installez les dépendances avec :
  ```bash
  pip install -r requirements.txt
  ```
- Pour transformer l'automate en exécutable :
  - Installez PyInstaller :
    ```bash
    pip install pyinstaller
    ```
  - Naviguez dans le répertoire où se trouve le fichier :
    ```bash
    cd [chemin du fichier]
    ```
  - Générez l'exécutable avec :
    ```bash
    pyinstaller --onefile _0_main_comparison_script.py
    ```
  - Un dossier `dist` apparaîtra avec l'exécutable.

### Interface utilisateur (UI)

- Clonez les répertoires du projet :
  ```bash
  git clone [lien du dépôt]
  ```
- Démarrez les serveurs pour la base de données (ex. : XAMPP).
- Décompressez les fichiers si nécessaire.
- Dans la barre de recherche, faites un clic droit et ouvrez le chemin dans le terminal.
- Tapez :
  ```bash
  code .
  ```
  (Une fenêtre VS Code ou autre IDE s'ouvre normalement. Sinon, ouvrez manuellement le dossier dans votre IDE.)

#### Backend

- Dans le terminal :
  ```bash
  cd UI/daisy/back
  composer install
  ```
- Copiez le fichier `.env_example`, renommez-le en `.env`, et configurez-le avec vos informations de base de données.
- Migrez la base de données :
  ```bash
  php artisan migrate
  ```
- Si vous utilisez Passport pour l'authentification, créez des clés client :
  ```bash
  php artisan passport:client --personal
  ```
  Donnez-lui un nom selon vos préférences.
- Seed la base de données :
  ```bash
  php artisan db:seed
  ```
- Lancez le serveur backend :
  ```bash
  php artisan serve
  ```

#### Frontend

- Dans le terminal :
  ```bash
  cd UI/daisy
  npm install
  ng serve --open
  ```

## 2. Étapes à réaliser à chaque utilisation :

- Démarrez les serveurs de la base de données.
- Ouvrez le dossier dans votre IDE.
- Lancez le backend :
  ```bash
  cd back
  php artisan serve
  ```
- Dans un autre terminal, lancez le frontend :
  ```bash
  cd daisy
  ng serve
  ```

## Fonctions inachevées

- **Demande d’accès** : Implémenter la production et l’envoi d’accès utilisateur par mail. Actuellement, il existe deux types d’accès :
  - Utilisateur : `user@orange.sn`, mot de passe : `secretuser`
  - Admin : `admin@orange.sn`, mot de passe : `secretadmin`
  
- **Envoi des résultats via l’application** :  
  La base de données n’est pas encore complètement adaptée pour recevoir les fichiers résultats. Le formulaire et la fonction backend sont à 80% achevés. Actuellement, l’envoi des résultats se fait automatiquement et quotidiennement.  
  **NB** : Pour recevoir les mails, modifiez les destinataires dans le fichier `_7_email_manager.py`.

- **Adaptation et tests pour plusieurs partenaires** :  
  Les partenaires ont des colonnes différentes selon leur dénomination. Le système initial prévoit de renseigner un fichier texte pour stocker les dictionnaires de partenaires ainsi que le nom des colonnes utilisées.  
  **Exemple :**
  ```json
  {
    "Rapido": ["Id", "Montant"],
    "Xeweul": ["transaction_id", "Montant"]
  }
  ```
  
  Deux solutions possibles :
  1. Rechercher le nom des colonnes pour déduire le partenaire.
  2. Utiliser le nom du fichier pour déterminer les colonnes, toujours en se basant sur le fichier texte.
