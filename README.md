# BNF-Scan

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 📚 ScanBNF

> Projet développé par :
> - Marlène  
> - Camille  
> - Caroline  
> - Bastien

---

## 🎯 Présentation

**ScanBNF** est une application web permettant de **scanner un code-barres (EAN/ISBN)** pour récupérer automatiquement des **informations bibliographiques** à partir des données de la **Bibliothèque nationale de France (BNF)**.

L'utilisateur accède à des données enrichies sur :
- 📖 La manifestation (titre, éditeur, date, langue…)
- 🧠 L’auteur (biographie, dates/lieux de naissance et mort, image…)
- 📚 L'œuvre (sujets, description…)

---

## 🖼️ Aperçu de l’interface

L’interface repose sur une logique simple de composants Vue dynamiques selon la page active :

```html
<div id="app">
  <accueil v-if="page=='accueil'"></accueil>
  <pageScan v-if="page=='pageScan'" :resultats='resultats'></pageScan>
  <pageLivre v-if="page=='pageLivre'" :resultats='resultats'></pageLivre>
  <pageAuteur v-if="page=='pageAuteur'" :resultats='resultats'></pageAuteur>
  <pageInfo v-if="page=='pageInfo'" :resultats='resultats'></pageInfo>
</div>
🛠️ Technologies utilisées
Vue.js

JavaScript

HTML / CSS

API BnF (Bibliothèque nationale de France)

📦 Structure des données
Extrait du data() dans App.vue :

js
Copier
Modifier
resultats: {
  ean: "",
  isbn10: "",
  titre_manifestation: "",
  date_manifestation: "",
  lieu_publication_manifestation: "",
  langue_expression: "",
  description_manifestation: "",
  editeur_manifestation: "",
  nom_auteur: "",
  sujet_oeuvre: "",
  auteur: {
    pays_auteur: "",
    image_auteur: "",
    informations_auteur: "",
    page_auteur: "",
    date_naissance_auteur: "",
    lieu_naissance_auteur: "",
    date_mort_auteur: "",
    lieu_mort_auteur: ""
  }
}
🎓 Objectifs pédagogiques
Utiliser une API publique

- Structurer une application Vue.js par composants

- Dynamiser l'affichage des données avec le binding Vue

- Gérer une navigation simple entre pages

- Créer une interface claire et fluide pour la consultation de données bibliographiques

🚀 Lien du projet GitHub
🔗 https://github.com/Marymille/ScanBNF

📝 Licence
Ce projet est destiné à un usage pédagogique.

---

### 📌 Prochaine étape :
- Copie ce contenu dans un fichier `README.md`
- Ajoute-le dans ton dépôt avec :
```bash
git add README.md
git commit -m "Ajout du README de présentation"
git push
