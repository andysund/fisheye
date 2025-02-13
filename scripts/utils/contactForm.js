function displayModal() {
    // 1. Récupérer la modale
    const modal = document.getElementById("contact_modal");
    
    // 2. Récupérer le texte du nom du photographe (l’élément h1.artist-name)
    const artistNameElement = document.querySelector(".artist-name");
    if (artistNameElement) {
      // 3. Copier ce texte dans la div #artiste-name-modal
      document.getElementById("modalNameDiv").textContent = artistNameElement.textContent;
    }

    // 4. Afficher la modale
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
