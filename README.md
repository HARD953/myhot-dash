## Cloner ou Télécharger le projet

- [Téléchager le dossier](https://github.com/VickythoEros/ong-eicf-dashboard/archive/refs/heads/main.zip)
- Cloner le repo: `git clone https://github.com/VickythoEros/ong-eicf-dashboard.git`

### Installer les dependences

``` bash
$ yarn install
```

### Lancer le projet

``` bash
# lancement du server de developpement à l'adresse http://localhost:3000
$ yarn start
```

Ouvrer votre navigateur préferé avec : [http://localhost:3000](http://localhost:3000).

#### Lancer un Build

Executer la commande `build` afin de générer un Build du projet.

```bash
# build pour la version de production avec minification
$ yarn build
```

## Struecture du projet

l'aborescence du projet:

```
ong-eicf-dashboard
├── public/          # fichiers statiques
│   └── index.html   # html 
│
├── src/             # dossier principal du projet
│   ├── assets/      # images, icons, etc.
│   ├── components/  # composants communs - header, sidebar, etc.
│   ├── layouts/     # layout 
│   ├── scss/        # styles scss 
│   ├── views/       # les vues(pages) de l'application
│   ├── _nav.js      # configuration de la sidebar
│   ├── App.js
│   ├── ...
│   ├── index.js
│   ├── routes.js    # configuration des routes
│   └── store.js     # le store (react redux)
│
└── package.json
```
