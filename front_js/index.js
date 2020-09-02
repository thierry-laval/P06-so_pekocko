// Javascript pour l'affichage en liste des produits
 
//Définition d'une constante pour l'url de la requête GET Api
const URL = "http://localhost:3000/api/teddies/";
// initialisation d'une variable idParams qui sera utilisé pour compléter l'url produit et comme "key" pour le stockage dans le session.storage
let idParams;

//creation d'une condition pour attribuer une valeur à la variable "idParams"
const URLParams = new URLSearchParams(window.location.search);
let objectId = URLParams.get('id');
if(objectId === null){
    idParams = "";
}else {
    idParams = objectId;
}

// promise pour la requete API avec méthode Fetch
getApiData = () =>{
	return new Promise((objectList) =>{
		let requestOptions = {
            method: 'GET', // utilisation de la methode GET
            redirect: 'follow'
        };  
        fetch((URL + idParams) , requestOptions)
        .then(response => response.json())
        .then(result => objectList(result))
        .catch(error => {
            // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
            apiFail = document.querySelector('.bloc2');
            apiFail.classList.add('fail__msg');
            apiFail.innerHTML = "Veuillez démarrer le serveur";
            console.error(error);
        });
	});
};

//fonction pour l'affichage des produits en liste sur la page index.html
async function objectsList(){
    let teddies = await getApiData();
    console.log(teddies);
    
    // selection d'un élément du DOM a modifier ultérieurement
    let teddiesList = document.querySelector ('.bloc2');
    let blocTitle = document.createElement ('h2');
    blocTitle.textContent = "Choisissez votre ours en peluche";

    teddiesList.appendChild (blocTitle);
    
    // création d'une boucle FOR OF pour l'affichage en liste des objets
    for (let teddy of teddies){
        
        // création des éléments du DOM pour l'affichage des items
        let cardElt = document.createElement ('article');
        let contentElt = document.createElement ('div');
        let picElt = document.createElement ('img')
        let nameElt = document.createElement ('h3');
        let descriptionElt = document.createElement ('p');
        let btnElt = document.createElement ('a');
        
        // Récupération des données correspondantes à afficher dans les différents éléments du DOM
        picElt.src = teddy.imageUrl ;
        nameElt.textContent = teddy.name;
        descriptionElt.textContent = teddy.description;
        btnElt.textContent = "Acheter le produit";
                
        teddiesList.appendChild (cardElt);            
        cardElt.appendChild (picElt);
        cardElt.appendChild (contentElt)
        contentElt.appendChild (nameElt);
        contentElt.appendChild (descriptionElt);
        contentElt.appendChild (btnElt);
        
        // attribution de class au éléments du DOM nouvellement créés
        cardElt.classList.add ('card');
        picElt.classList.add ('card__pics');
        contentElt.classList.add ('card__content');
        btnElt.classList.add ('card__btn');

        btnElt.setAttribute('href', './pages/product.html?id=' + teddy._id);
    };
};

