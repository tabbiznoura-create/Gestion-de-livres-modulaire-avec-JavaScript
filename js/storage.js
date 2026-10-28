
export function sauvegarderLivres(books) {
  localStorage.setItem("livres", JSON.stringify(books));
}


