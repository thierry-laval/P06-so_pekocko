// Javascript pour le chargement de la page de validation de commande

validOrder = ()=>{
    const validInfo = JSON.parse(sessionStorage.getItem('confirmOrder')) || [];
    console.log(validInfo.getOrderId);

    let displayOrderId = document.getElementById("orderId");
    let displaytotalPrice = document.getElementById("totalprice");

    displayOrderId.textContent = "" + validInfo.getOrderId;
    displaytotalPrice.textContent = "" + validInfo.getTotalPrice;
    
};
