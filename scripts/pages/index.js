async function getPhotographers() {
    try {
        const response = await fetch('assets/photographers/photographers.json');
        const data = await response.json();
        // Return the photographers only after data is fully fetched
        return {
            photographers: data.photographers // Example to repeat the array three times
        };
    } catch (error) {
        console.error(error);
        return { photographers: [] }; // Return an empty array in case of error
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Get photographers data
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
