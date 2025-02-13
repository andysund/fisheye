// 1. Récupérer l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Retourne l'ID sous forme de string
}

// 2. Récupérer les photographes depuis le fichier JSON
async function getPhotographers() {
  try {
    const response = await fetch('assets/photographers/photographers.json');
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes :", error);
    return [];
  }
}

// 3. Afficher les informations du photographe (détails personnels)
function displayPhotographerInfo(photographer) {
  const photographerInfo = document.querySelector(".artist-info");
  const profilePicture = document.querySelector(".img-personal-page");
  
  // Construction du chemin de l'image de profil
  const picture = `assets/PhotographersID/${photographer.portrait}`;
  const imgPersonalPage = document.createElement("div");
  const artistResume = document.createElement("div");
  
  imgPersonalPage.innerHTML = `<img src="${picture}" alt="${photographer.name}" class="artist-img">`;
  artistResume.classList.add("artist-resume");

  // Création du lien dynamique
  const artistLink = document.createElement("a");
  artistLink.href = `/photographer.html?id=${photographer.id}`;
  artistLink.classList.add("artist-link");
  
  const nameDiv = document.createElement("div");
  const artistName = document.createElement("h1");
  artistName.classList.add("artist-name");
  artistName.textContent = photographer.name;
  
  const artistLocation = document.createElement("p");
  artistLocation.textContent = `${photographer.city}, ${photographer.country}`;
  artistLocation.classList.add("artist-location");
  
  const artistTagline = document.createElement("p");
  artistTagline.classList.add("artist-tagline");
  artistTagline.textContent = photographer.tagline;
  
  // Ajout des éléments créés aux conteneurs HTML
  artistResume.appendChild(artistLocation);
  artistResume.appendChild(artistTagline);
  nameDiv.appendChild(artistName);
  photographerInfo.appendChild(nameDiv);
  photographerInfo.appendChild(artistResume);
  profilePicture.appendChild(imgPersonalPage); 
}

// 4. Récupérer les médias depuis le fichier JSON
async function getArtistWork() {
  try {
    const response = await fetch('./assets/FishEye_Photos (1)/Sample Photos/media.json');
    const artistData = await response.json();
    console.log("Médias récupérés :", artistData);
    return artistData;
  } catch (error) {
    console.error("Erreur lors de la récupération des médias :", error);
    return {};
  }
}

// 5. Afficher uniquement les médias (images et vidéos) du photographe courant
function displayMedia(artistData, photographerKey) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = "";

  // On récupère uniquement les médias du photographe (exemple "Mimi")
  const currentMedia = artistData[photographerKey];
  if (!currentMedia) {
    console.error("Aucun média trouvé pour " + photographerKey);
    return;
  }
  
  // Chemin de base pour accéder aux médias
  const baseMediaPath = 'assets/FishEye_Photos (1)/Sample Photos/';
  
  // Tableau global des médias (contenant tous les objets avec id, title, image/video, etc.)
  const globalMedia = artistData.media; // On suppose qu'il existe dans votre JSON

  // === Affichage des photos ===
  if (currentMedia.photos && Array.isArray(currentMedia.photos)) {
    currentMedia.photos.forEach(photoPath => {
      // Extraction du nom du fichier (ex : "Mimi\\Event_SeasideWedding.jpg" -> "Event_SeasideWedding.jpg")
      const fileName = photoPath.split(/[\\/]/).pop();
      
      // Recherche dans le tableau global de médias l'objet dont la propriété "image" correspond
      const mediaInfo = globalMedia.find(item => item.image === fileName);
      
      const photoDiv = document.createElement('div');
      photoDiv.classList.add('media-item');
  
      const img = document.createElement('img');
      // Correction du chemin : ajout du préfixe et remplacement des antislashs par des slashs
      img.src = baseMediaPath + photoPath.replace(/\\/g, '/');
      img.alt = `${photographerKey} photo`;
      
      if (mediaInfo) {
        // Ajout des informations du média à l'élément image (on peut utiliser des data-attributes pour un usage ultérieur)
        img.title = mediaInfo.title;
        img.dataset.mediaId = mediaInfo.id;
        img.dataset.photographerId = mediaInfo.photographerId;
        img.dataset.likes = mediaInfo.likes;
        img.dataset.date = mediaInfo.date;
        img.dataset.price = mediaInfo.price;
      } else {
        img.title = "Aucune information trouvée";
      }
      const presentation = document.createElement("div");
      presentation.classList.add("presentation");
      const title = document.createElement("p");
      const likes = document.createElement("p");
      likes.classList.add("likes");
      likes.textContent = mediaInfo.likes + " ❤";
       // Ajout de l'écouteur d'événements pour incrémenter les likes
      likes.addEventListener("click", () => {
      mediaInfo.likes++; // Incrémente le nombre de likes dans l'objet
      likes.textContent = mediaInfo.likes + " ❤"; // Met à jour l'affichage
});
      presentation.appendChild(likes);
      title.textContent = img.title;  
      presentation.appendChild(title);
      photoDiv.appendChild(presentation);
      photoDiv.appendChild(img);
      gallery.appendChild(photoDiv);
    });
  }
  
  // === Affichage des vidéos ===
  if (currentMedia.videos && Array.isArray(currentMedia.videos)) {
    currentMedia.videos.forEach(videoPath => {
      const fileName = videoPath.split(/[\\/]/).pop();
      
      // Recherche dans le tableau global de médias l'objet dont la propriété "video" correspond
      const mediaInfo = globalMedia.find(item => item.video === fileName);
      
      const videoDiv = document.createElement('div');
      videoDiv.classList.add('media-item');
  
      const video = document.createElement('video');
      video.src = baseMediaPath + videoPath.replace(/\\/g, '/');
      video.controls = true;
      
      if (mediaInfo) {
        video.title = mediaInfo.title;
        video.dataset.mediaId = mediaInfo.id;
        video.dataset.photographerId = mediaInfo.photographerId;
        video.dataset.likes = mediaInfo.likes;
        video.dataset.date = mediaInfo.date;
        video.dataset.price = mediaInfo.price;
      } else {
        video.title = "Aucune information trouvée";
      }
      
      videoDiv.appendChild(video);
      gallery.appendChild(videoDiv);
    });
  }
}

// 6. Fonction d'initialisation : on récupère les infos du photographe et ses médias
(async function init() {
  // Récupération de l'ID dans l'URL
  const photographerId = getPhotographerIdFromURL();
  if (!photographerId) {
    console.error("Aucun ID trouvé dans l'URL.");
    return;
  }
  
  // Récupération des photographes et identification du photographe courant
  const photographers = await getPhotographers();
  const photographer = photographers.find(p => p.id == photographerId);
  if (!photographer) {
    console.error("Photographe non trouvé !");
    return;
  }
  
  // Affichage des informations du photographe
  displayPhotographerInfo(photographer);
  
  // Récupération du JSON des médias
  const artistData = await getArtistWork();
  
  // Extraction du prénom depuis le nom complet pour correspondre à la clé du JSON des médias
  const photographerKey = photographer.name.split(" ")[0];
  
  // Affichage des médias du photographe courant (images et vidéos) avec leurs informations associées
  displayMedia(artistData, photographerKey);
})();

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const button = document.querySelector(".dropdown-btn");
  const likes = document.querySelector(".likes");

  // Au clic sur le bouton, on active/désactive le dropdown
  button.addEventListener("click", (event) => {
    event.stopPropagation(); // Pour éviter que le document ne masque immédiatement le dropdown
    dropdown.classList.toggle("active");
  });


  // Si on clique ailleurs dans le document, on désactive le dropdown
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });


});
