import { books } from "./books.js";
import {
  sauvegarderLivres,
  recupererLivres
} from "./storage.js";

let livres = recupererLivres() ?? [...books]
let livreAModifier = null;

const listeLivres = document.querySelector("#liste-livres");
const ajouterLivre = document.querySelector("#ajouter-livre");


function afficherLivres() {
  listeLivres.innerHTML = "";

  

//   const modifier = document.createElement("div");
//   modifier.className =
//     "cursor-pointer bg-red-100 rounded-full h-6 w-6 flex items-center justify-center";

// livreAModifier = livre.id;

// formulaireLivre.classList.remove("hidden");
// ajouterLivre.classList.add("invisible");

// titreLivre.value = livre.titre;
// auteurLivre.value = livre.auteur;
// anneeLivre.value = livre.annee;
// categorieLivre.value = livre.categorie;
  
  
const triLivres = document.querySelector("#tri-livres");

triLivres.addEventListener("change", function () {
  const critere = triLivres.value;

  if (critere === "titre" || critere === "auteur") {
    livres.sort(function (a, b) {
      return a[critere].localeCompare(b[critere], "fr");
    });
  }

  if (critere === "annee") {
    livres.sort(function (a, b) {
      return a.annee - b.annee;
    });
  }

  afficherLivres();
})



  livres.forEach(function (livre) {
    const article = document.createElement("article");
    article.className =
      "shadow-md my-4 bg-white w-full h-72 sm:h-80 lg:h-95 rounded-lg";

    const image = document.createElement("img");
    image.src = livre.image;
    image.alt = livre.titre;
    image.className =
      "h-30 sm:h-40 lg:h-50 w-full rounded-lg object-cover";

    const titre = document.createElement("h2");
    titre.textContent = livre.titre;
    titre.className = "cursor-pointer text-[100%] font-bold pt-2 px-2";

    const auteur = document.createElement("p");
    auteur.textContent = livre.auteur;
    auteur.className = "text-[70%] text-[#66785F] px-2 py-2";

    const infos = document.createElement("section")
    infos.className = "flex justify-between gap-3 py-2"

    const annee = document.createElement("p");
    annee.textContent = livre.annee;
    annee.className = "text-[70%] text-[#66785F] px-2";

    const categorie = document.createElement("p");
    categorie.textContent = livre.categorie;
    categorie.className = "text-[70%] text-[#66785F] px-2";

    infos.append(annee, categorie)
    article.append(image, titre, auteur, infos);


  // -- code les icones -----------
  
const actions = document.createElement("div");
actions.className = "flex justify-between px-2";

const options = document.createElement("div");
options.className =
  "cursor-pointer bg-red-100 rounded-full h-6 w-6 flex items-center justify-center";

const imageOptions = document.createElement("img");
imageOptions.src = "src/icones/7.png";
imageOptions.alt = "Options";
imageOptions.className = "w-3 h-3";
options.append(imageOptions);

const boutons = document.createElement("div");
boutons.className = "flex gap-2";

const modifier = document.createElement("div");
modifier.className =
  "cursor-pointer bg-red-100 rounded-full h-6 w-6 flex items-center justify-center";

const imageModifier = document.createElement("img");
imageModifier.src = "src/icones/3.png";
imageModifier.alt = "Modifier";
imageModifier.className = "w-3 h-3";
modifier.append(imageModifier);

modifier.addEventListener("click", function () {
  livreAModifier = livre.id;

  formulaireLivre.classList.remove("hidden");
  ajouterLivre.classList.add("invisible");

  titreLivre.value = livre.titre;
  auteurLivre.value = livre.auteur;
  anneeLivre.value = livre.annee;
  categorieLivre.value = livre.categorie;
});

const supprimer = document.createElement("div");
supprimer.className =
  "cursor-pointer bg-red-100 rounded-full h-6 w-6 flex items-center justify-center";

const imageSupprimer = document.createElement("img");
imageSupprimer.src = "src/icones/1.png";
imageSupprimer.alt = "Supprimer";
imageSupprimer.className = "w-3 h-3";
supprimer.append(imageSupprimer);

supprimer.addEventListener("click", function () {
  const confirmation = window.confirm(
    "Voulez-vous vraiment supprimer ce livre ?"
  );

  if (confirmation) {
    livres = livres.filter(function (livreActuel) {
      return livreActuel.id !== livre.id;
    });

    sauvegarderLivres(livres);
    afficherLivres();
  }
})

boutons.append(modifier, supprimer);
actions.append(options, boutons);

article.append(actions);

listeLivres.append(article);
  
  });

  listeLivres.append(ajouterLivre);
}

afficherLivres();


console.log(books);
console.log(listeLivres);

const rechercheLivres = document.querySelector("#recherche-livres");

rechercheLivres.addEventListener("input", function () {
  const recherche = rechercheLivres.value.toLowerCase().trim();

    const articles = listeLivres.querySelectorAll("article:not(#ajouter-livre)");
 
  articles.forEach(function (article) {
    const titre = article.querySelector("h2").textContent.toLowerCase();
    const auteur = article.querySelector("p").textContent.toLowerCase();

    if (titre.includes(recherche) || auteur.includes(recherche)) {
      article.classList.remove("hidden");
    } else {
      article.classList.add("hidden");
    }
  });
});


    

const formulaireLivre = document.querySelector("#formulaire-livre");



ajouterLivre.addEventListener("click", function () {
  console.log("Carte cliquée !");
  formulaireLivre.classList.toggle("hidden");
  ajouterLivre.classList.toggle("invisible");
   console.log(formulaireLivre.classList.contains("hidden"));
});

const annulerLivre = document.querySelector("#annuler-livre");

annulerLivre.addEventListener("click", function () {
  formulaireLivre.classList.add("hidden");
  ajouterLivre.classList.remove("invisible");
});


const titreLivre = document.querySelector("#titre-livre");
const auteurLivre = document.querySelector("#auteur-livre");
const anneeLivre = document.querySelector("#annee-livre");
const categorieLivre = document.querySelector("#categorie-livre");
const imageLivre = document.querySelector("#image-livre");




formulaireLivre.addEventListener("submit", function (event) {
  event.preventDefault();

  const titre = titreLivre.value.trim();
  const auteur = auteurLivre.value.trim();
  const fichierImage = imageLivre.files[0];

  if (titre === "" || auteur === "") {
    console.log("Le titre et l'auteur sont obligatoires.");
    return;
  }

  function enregistrerLivre(image) {
    if (livreAModifier !== null) {
      livres = livres.map(function (livre) {
        if (livre.id === livreAModifier) {
          return {
            ...livre,
            titre: titre,
            auteur: auteur,
            annee: Number(anneeLivre.value),
            categorie: categorieLivre.value,
            image: image
          };
        }

        return livre;
      });

      livreAModifier = null;
    } else {
      livres.push({
        id: Date.now(),
        titre: titre,
        auteur: auteur,
        annee: Number(anneeLivre.value),
        categorie: categorieLivre.value,
        image: image
      });
    }

    sauvegarderLivres(livres);
    afficherLivres();

    formulaireLivre.reset();
    formulaireLivre.classList.add("hidden");
    ajouterLivre.classList.remove("invisible");
  }

  if (fichierImage) {
    const lecteur = new FileReader();

    lecteur.onload = function () {
      enregistrerLivre(lecteur.result);
    };

    lecteur.readAsDataURL(fichierImage);
  } else if (livreAModifier !== null) {
    const livreExistant = livres.find(function (livre) {
      return livre.id === livreAModifier;
    });

    enregistrerLivre(livreExistant.image);
  } else {
    console.log("Veuillez choisir une image.");
  }
});





