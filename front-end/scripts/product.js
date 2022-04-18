
(async function(){
    const productId = getProductId()
    const productData = await getProductData(productId)
    dispatchData(productData);
}) ()

// Récupération de l'ID produit
const queryString_url_id = window.location.search;
console.log(queryString_url_id)
const urlSearchParams = new URLSearchParams(queryString_url_id);

getProductId();
function getProductId() {
    return new URL (location.href).searchParams.get("id")
    // const id = urlSearchParams.get("id")
    // console.log(id)

}

// Récupération des datas en fonction de l'ID produit
getProductData();
function getProductData(productId) {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
        .then(res => res.json())
        .catch(function(err){
            alert("Désolé, l'article ne peut pas être affiché pour l'instant.")
            console.error("Ne fonctionne pas");
        })
}

// Séléction de la classe HTML accueillant les datas
const productContainer = document.querySelector(".product-container");

// DISPATCH DATAS
function dispatchData(productData) {
    
    // CREATE PRODUCT CARD
    const productCard = document.createElement("div")
    productCard.classList.add("product-card")
    productContainer.appendChild(productCard)
        
        const productFrame = document.createElement("div")
        productFrame.classList.add("product-frame")
        productCard.appendChild(productFrame)

        const productImage = document.createElement("img")
        productImage.classList.add("product-image")
        productImage.src = productData.imageUrl
        productFrame.appendChild(productImage)
    
        const productInfos = document.createElement("div")
        productInfos.classList.add("product-infos")
        productInfos.id = "product-infos"
        productCard.appendChild(productInfos)

            const productName = document.createElement("h2")
            productName.classList.add("product-name")
            productName.innerHTML = productData.name
            productInfos.appendChild(productName)

            const productDescription = document.createElement("p")
            productDescription.classList.add("product-description")
            productDescription.innerHTML = productData.description
            productInfos.appendChild(productDescription)

            // CREATE FORM SELECTOR
            const optionForm = document.createElement("form")
            optionForm.classList.add("option-form")
            optionForm.id = "option-form"
            productInfos.appendChild(optionForm)

            const label = document.createElement("label")
            label.classList.add("form-label")
            label.innerText = "Choisir une option :"
            optionForm.appendChild(label) 

            const optionSelector = document.createElement("select")
            optionSelector.id = "option-list"
            optionSelector.classList.add("option-list")
            optionForm.appendChild(optionSelector)

            // JSON ARRAY
            let optionJson = productData.lenses
            console.log(optionJson)

            // POPULARTE SELECT OPTION
            let select = document.getElementById("option-list")
                for(let i = 0; i < optionJson.length; i++) {
                    let opt = optionJson[i];
                    let el = document.createElement("option");
                    //el.inner = "Choisissez une option :"
                    el.innerHTML = opt;
                    el.value = opt;
                    optionSelector.appendChild(el);
                }

            // populateOption()
            // function populateOption(el, optionJson) {
            //         let optionValue = document.getElementsByClassName("product-option")
            //         for (i = 0; i < optionJson.length; i++) {
            //             // POPULATE SELECT ELEMENT WITH JSON.
            //             optionValue.innerText = optionJson[i]
            //             optionValue.value = optionJson[i]
            //             console.log(optionValue);
            //         }
            // }

            const productPrice = document.createElement("p")
            productPrice.classList.add("product-price")
            productPrice.id = "product-price"
            productPrice.innerHTML = productData.price /100 + `<span>€</span>`
            productInfos.appendChild(productPrice);

            // REACH OPTION CHOICE
            const optionChoice = document.querySelector("#option-list");
            console.log(optionChoice)

            // CREATE SUBMIT BUTTON
            const infos = document.querySelector("#product-infos");
            const submitButton = document.createElement("button")
            submitButton.classList.add("submit-button")
            submitButton.id = "submit-button"
            submitButton.innerText = "Ajouter au panier"
            infos.appendChild(submitButton);

            const getAddToCartButton = document.querySelector("#submit-button");
            


            // Récupération des objets et d'ajout au panier
            getAddToCartButton.addEventListener("click", (event)=>{
            event.preventDefault();

            // Récupération de l'objet produit choisis par le User
            const productChoice = {
                productName : productData.name,
                productId : productData._id,
                productOption : optionChoice.value,
                productQuantity : 1,
                productPrice : productData.price /100
            };

            //Récupération des données pour les convertir en JSON
            addProductToLocalStorage(productChoice);
        });
}

// Fonction pour ajouter les produits au localstorage
const addProductToLocalStorage = (prod) => {
    if(localStorage.getItem('cart') !== null){
        let productLocalStorage = Array.from(JSON.parse(localStorage.getItem("cart")));
        productLocalStorage.push(prod);
        localStorage.setItem('cart', JSON.stringify(productLocalStorage));
    }
    else {
        localStorage.setItem('cart', JSON.stringify(prod));
    }

}