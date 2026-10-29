
export function sauvegarderLivres(livres) {
  localStorage.setItem("livres", JSON.stringify(livres));
}

export function recupererLivres() {
  const livresEnregistres = localStorage.getItem("livres")

  if (livresEnregistres === null) {
    return null;
  }

  return JSON.parse(livresEnregistres)
}



