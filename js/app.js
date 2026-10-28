import { books } from "./books.js";
import { sauvegarderLivres } from "./storage.js";

const listeLivres = document.querySelector("#liste-livres");

console.log(books);
console.log(listeLivres);

const rechercheLivres = document.querySelector("#recherche-livres");
const articles = document.querySelectorAll("#liste-livres article");

rechercheLivres.addEventListener("input", function () {
  const recherche = rechercheLivres.value.toLowerCase().trim();

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

const ajouterLivre = document.querySelector("#ajouter-livre");
const formulaireLivre = document.querySelector("#formulaire-livre");



ajouterLivre.addEventListener("click", function () {
  formulaireLivre.classList.toggle("hidden");
});


const titreLivre = document.querySelector("#titre-livre");
const auteurLivre = document.querySelector("#auteur-livre");

formulaireLivre.addEventListener("submit", function (event) {
  event.preventDefault();

  const titre = titreLivre.value.trim();
  const auteur = auteurLivre.value.trim();

  if (titre === "" || auteur === "") {
  console.log("Le titre et l'auteur sont obligatoires.");
  return;

  
}
const article = document.createElement("article");
article.className = "bg-white rounded-lg shadow-md p-4 my-4";

const titreElement = document.createElement("h2");
titreElement.textContent = titre;
titreElement.className = "font-bold";

const auteurElement = document.createElement("p");
auteurElement.textContent = auteur;
auteurElement.className = "text-[#66785F]";

article.append(titreElement, auteurElement);
listeLivres.append(article);

formulaireLivre.reset();
formulaireLivre.classList.add("hidden");

console.log("Livre valide !");

  console.log(titre);
  console.log(auteur);
});

