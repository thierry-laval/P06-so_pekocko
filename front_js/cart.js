/*Javascript pour le chargement de la page panier
=================================================*/


// fonction pour le chargement des items du panier
loadCartPage = ()=>{

    if(localStorage.getItem("userCart")){
        const cartToDisplay = JSON.parse(localStorage.getItem("userCart"));
        console.log(cartToDisplay);

        //Selection de l'élément du DOM ou s'affichera l'état du panier
        const displayCart = document.getElementById("bloc2__title");
        displayCartTitle = document.createElement("h2");
        displayCart.append(displayCartTitle);

        const cartBloc = document.getElementById('cart__bloc');

        // verification de l'existence de produits dans le local.storage
        if(cartToDisplay.length === 0){
            displayCartTitle.textContent ="Votre panier est vide";
            removeCart = document.getElementById("bloc2__cart");
            removeCart.remove();
        } else {
            displayCartTitle.textContent ="Contenu de votre panier";


            /* Une boucle pour l'affichage des produit dans le tableau du panier */
            for (let i = 0; i < cartToDisplay.length; i++) {
                const itemInCart = cartToDisplay[i];

                const itemName = itemInCart.teddyName;
                const itemQuantity = itemInCart.teddyQuantity;
                const itemColor = itemInCart.teddyColor;
                const itemPrice = ((itemInCart.teddySubTotal / 100)+"€");
                        
                let row = cartBloc.insertRow(-1);

                let nameCell = row.insertCell(0);
                nameCell.innerText = itemName;

                let colorCell = row.insertCell(1);
                colorCell.innerText = itemColor

                /* bouton ajout */
                let quantityCell = row.insertCell(2);
                quantityCell.setAttribute('id', 'quantity_cell');
                const addItem =document.createElement('button');
                addItem.setAttribute('id', 'add_button')
                addItem.textContent =('+')

                /* fonction pour ajouter un objet au panier */
                addItem.addEventListener('click', ()=>{
                    if(itemQuantity < 9){
                        itemInCart.teddyQuantity ++;
                        itemInCart.teddySubTotal = itemInCart.teddyQuantity*itemInCart.teddyPrice;
                        localStorage.setItem('userCart', JSON.stringify(cartToDisplay));
                        window.location.reload();
                    }
                });

                /* bouton soustraire */
                const substractItem =document.createElement('button');
                substractItem.setAttribute('id', 'substract_button')
                substractItem.textContent =('-')
                quantityCell.append(substractItem, itemQuantity, addItem);

                /* fonction pour soustraire un objet du panier */
                substractItem.addEventListener('click', ()=>{
                    if(itemQuantity >= 2){
                        itemInCart.teddyQuantity --;
                        itemInCart.teddySubTotal = itemInCart.teddyQuantity*itemInCart.teddyPrice;
                        localStorage.setItem('userCart', JSON.stringify(cartToDisplay));
                        window.location.reload();
                    }
                });
                
                /* bouton supprimer */
                let deleteCell = row.insertCell(3);
                const deleteItem = document.createElement('button');            
                deleteItem.setAttribute('id', 'delete_button');            
                deleteItem.textContent = ('X');
                deleteCell.append(deleteItem); 

                /* fonction pour supprimer un objet du panier */
                deleteItem.addEventListener('click', ()=>{
                    localStorage.removeItem[i];
                    cartToDisplay.splice(i, 1); 
                    localStorage.setItem('userCart', JSON.stringify(cartToDisplay));
                    window.location.reload();    
                });

                let priceCell = row.insertCell(4);
                priceCell.innerText = itemPrice;

                // afficher le montant total du panier
                let totalPrice = 0;
                cartToDisplay.forEach((itemInCart)=>{
                totalPrice += itemInCart.teddySubTotal / 100;
                });
                console.log(totalPrice);
                document.getElementById('total_cart').textContent = totalPrice + "€";

                //Apparition du formulaire utilisateur au clic sur le bouton "Valider la commande" 
                const openOrder = document.getElementById('order__btn');
                openOrder.addEventListener('click', ()=>{
                    document.getElementById('bloc2__order').style.display='block';
                });
            }
        }
    }else{
        const displayCart = document.getElementById("bloc2__title");
        displayCartTitle = document.createElement("h2");
        displayCart.append(displayCartTitle);
        displayCartTitle.textContent ="Votre panier est vide";
        removeCart = document.getElementById("bloc2__cart");
        removeCart.remove();
    }
};

//Définition d'une constante pour l'url de la requête GET Api
const URL = "http://localhost:3000/api/teddies/";

// fonction pour passer la commande aprés le clic sur le bouton "passer commande"
sendOrder = ()=>{

    // Récupération du panier et des données de contact utilisateur pour l'envoi de la commande
    let cartToSend = JSON.parse(localStorage.getItem("userCart"));
    let checkForm = document.getElementById('contactbloc');
    const clickToSend = document.getElementById('validorder__btn');

    clickToSend.addEventListener('click',($event)=>{

        $event.preventDefault();
        document.getElementById('bloc2__order').style.display='block';
        let lastName = document.getElementById('lastname').value;
        let firstName = document.getElementById('firstname').value;
        let email = document.getElementById('email').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;

        // création de l'objet contact 
        let contact = {lastName, firstName, email, address, city};

        // création du tableau product
        const products = [];
        cartToSend.forEach(item =>{
            products.push(item.teddyId)
        });

        //requete POST avec methode Fetch
        
        const request = new Request((URL + "order"), {
            method: 'POST',
            // Pour valider la requête on a besoin d'un objet JSON contenant "contact" et "products"
            body: JSON.stringify({contact, products}),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });
        if (checkForm.checkValidity() === true){
            fetch(request)
            .then(response => response.json())
            .then(response=>{
        
                    let getOrderId = response.orderId;
                    let getTotalPrice = document.getElementById('total_cart').textContent;
                    localStorage.clear();
                    let validOrder = {getOrderId, getTotalPrice};
                    sessionStorage.setItem("confirmOrder", JSON.stringify(validOrder));
                    setTimeout(function() {window.location = 'validation.html'; }, 1500);
                    console.log(validOrder);
            
            })
            .catch(error => {
                // en cas d'erreur de chargement de l'API affichage d'un message d'erreur dans la console
                console.error(error);
            });
        }
        else if(checkForm.checkValidity() === false){
            // en cas d'erreur sur le formulaire affichage d'un message sur l'écran de l'utilisateur
            apiFail = document.getElementById('bloc2__order');
            apiFail.classList.add('fail__msg');
            apiFail.innerHTML = "Veuillez verifier vos données dans le formulaire";
        }
        
    });
};
