function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;
    console.log(data);
    console.log(tagline)

    const picture = `assets/photographersID/${portrait}`;

    function getUserCardDOM() {

        // Création des éléments HTML
        const article = document.createElement( 'article' );
        const circleImg = document.createElement( 'div' );
        const img = document.createElement( 'img' );
        const locationDisplay = document.createElement( 'p' );
        const taglinedisplay = document.createElement( 'p' );
        const priceDisplay= document.createElement( 'p' );
        const nameImgClick = document.createElement( 'a' );

        // Ajout des classes et du contenu


        nameImgClick.href = `/photographer.html?id=${data.id}`;
        nameImgClick.classList.add("name-img-click");
        img.setAttribute("src", picture)
        img.classList.add("photographer-img")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographer-name");
        locationDisplay.textContent = `${city}, ${country}`;
        locationDisplay.classList.add("location")
        taglinedisplay.textContent = `${tagline}`;
        taglinedisplay.classList.add("tagline");
        priceDisplay.textContent = `${price}€/jour`;
        priceDisplay.classList.add("price");
        circleImg.classList.add("circle");


        // Ajout des éléments au DOM
        circleImg.appendChild(img);
        nameImgClick.appendChild(circleImg);
        nameImgClick.appendChild(h2);
        
        article.appendChild(nameImgClick);
        article.appendChild(locationDisplay);
        article.appendChild(taglinedisplay);
        article.appendChild(priceDisplay);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}