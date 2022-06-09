
const itemsSection = document.getElementById("items");
const url = "http://localhost:3000/api/products"



const url_ = window.location.href
const strs = url_.split('=');
const product_id = strs.at(-1)

let display_data;
 const single_product = document.getElementById("product_display");

fetch(url)
  .then(response => response.json())
  .then(prouctsDatas => prouctsDatas.filter((item) => {
   
    if(item._id === product_id){
        display_data = item
         
        
            setTimeout(() => {
                const color_list = document.getElementById("colors")

                item.colors.forEach((element, index) => {
                    color_list.innerHTML +=  `<option value="${index}">${element}</option>`
                })
            }, 100);
          
    

product_display.innerHTML = `

<article>
<div class="item__img">
  <img src="${display_data.imageUrl}" alt="${display_data.altTxt}"> 
</div>
<div class="item__content">

  <div class="item__content__titlePrice">
    <h1 id="title">${display_data.name}</h1>
    <p>Prix : <span id="price">${display_data.price}</span>€</p>
  </div>

  <div class="item__content__description">
    <p class="item__content__description__title">Description :</p>
    <p id="description">${display_data.description}</p>
  </div>

  <div class="item__content__settings">
    <div class="item__content__settings__color">
      <label for="color-select">Choisir une couleur :</label>
      <select name="color-select" id="colors">

         
         


      </select>
    </div>

    <div class="item__content__settings__quantity">
      <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
      <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
    </div>
  </div>

  <div class="item__content__addButton">
    <button id="addToCart">Ajouter au panier</button>
  </div>

</div>
</article>


`;

    } 
       
       
}))



/* add to card */



if(localStorage.getItem('basketItemId') == null){
    localStorage.setItem('basketItemId', '[]'); 
  
  }
  
  
  if(localStorage.getItem('basketDataItems') == null){
    localStorage.setItem('basketDataItems', '[]'); 
  
  } 
  
  
  
  let url2 = "http://localhost:3000/api/products/order"
  setTimeout(function(){
    const addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", function(){
  
  
  
    
     
  
  
      
        const colors_selected = document.getElementById("colors")
        const color_selected = colors_selected.options[colors_selected.selectedIndex].text;
        const quantity_selected = document.getElementById("quantity").value 
  
      
       let oldBasketItemId = JSON.parse(localStorage.getItem("basketItemId")); 
       let oldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems")); 
  
  
       if (oldBasketItemId.includes(product_id) === false){
       
  
  
          oldBasketItemId.push(product_id);
          oldbasketDataItems.push({"color":color_selected, "productNumber": quantity_selected, "id":product_id});
          
  
          alert("Le produit a ete ajoute au panier")
        }else{
          alert("Le produit existe deja dans le panier")
  
        }
      
       localStorage.setItem('basketItemId', JSON.stringify(oldBasketItemId));
       localStorage.setItem('basketDataItems', JSON.stringify(oldbasketDataItems));
    
      
     
  
  
    })
  }, 2000)
