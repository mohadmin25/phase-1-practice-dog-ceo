


document.addEventListener('DOMContentLoaded', () => {
    upLoadingImage()
    upLoadBreedOptions()
});

//on page load, fetches the images using the url above parses the response as JSON
function upLoadingImage(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch (imgUrl)
    .then(response => response.json())
    .then(imgResult => imgResult.message.forEach(dog => addingImg(dog)))

}
// adds image elements to the DOM
function addingImg(dogImage){
    let card = document.querySelector('#dog-image-container') // i created acard for each dog
    let imageCard = document.createElement('img')
    imageCard.src = dogImage
    card.appendChild(imageCard)
}

//on page load, fetches all the dog breeds using the url above
function upLoadBreedOptions(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(response => response.json())
    .then(breedResul => { 
        breeds = Object.keys(breedResul.message)
        breedList(breeds)
        breedEventListener() 
    })
}

//adds the breeds to the page in the <ul> provided in
function breedList(breeds){
    let ul = document.querySelector('#dog-breeds')
    removeChildren(ul) 
    breeds.forEach(breed => addBreed(breed))

}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
}

// user can filter breeds that start with a particular letter
function selectingBy(letter){
    breedList(breeds.filter(breed => breed.startsWith(letter)))
}

// adding event listener to the dropdown
function breedEventListener(){
    let selection = document.querySelector('#breed-dropdown')
    selection.addEventListener('change', (event) => {selectingBy(event.target.value)})
}

// adding a list of the breeds to the UL
function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener('click', updateColor)
}

//user clicks on any one of the <li>s, the font color of that <li> changes
function updateColor(event) {
    event.target.style.color = 'green';
}