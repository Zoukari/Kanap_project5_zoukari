
/* card page */
const itemsSection = document.getElementById("items");
const url = "http://localhost:3000/api/products"


const basketDataDisplay = document.getElementById("cart__items");
let basketData

fetch(url)
    .then(response => response.json())
    .then(prouctsDatas => prouctsDatas.filter((item) => {

        basketData = item

        //var basketItemsStorage= localStorage.getItem('basketItemId')
        let basketDatasStorage = localStorage.getItem('basketDataItems')

        let datason = JSON.parse(basketDatasStorage)
        datason.filter((item2) => {
            let item_id_ = item2.id
            if (item_id_.includes(item._id)) {


                basketDataDisplay.innerHTML += `

    <article class="cart__item" data-id="${item._id}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${basketData.imageUrl}" alt="${item.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${basketData.name}</h2>
        <p>${item2.color}</p>
        <p>${basketData.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :${item2.productNumber} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item2.productNumber}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article> 
    
    
    `;


            }
        })




    }))



/*  commander */
let order_url = "http://localhost:3000/api/products/order"
setTimeout(function() {
    const order = document.getElementById("order");
    order.addEventListener("click", function(e) {



        e.preventDefault()
        /*get input and user data*/
        const user_firstName = document.getElementById("firstName").value
        const user_lastName = document.getElementById("lastName").value
        const user_address = document.getElementById("address").value
        const user_city = document.getElementById("city").value
        const user_email = document.getElementById("email").value



        /* convert the data structure into the required structure at the backend (post)*/
        const basketItemsStorage_ = localStorage.getItem('basketItemId')
        let array_item2 = basketItemsStorage_.replace(/\\/g, '')
        let array_item3 = array_item2.replace(/\"/g, '')
        let array_item4 = array_item3.replace(/\[/g, '')
        let array_item5 = array_item4.replace(/\]/g, '')


        console.log("array_item 5:" + array_item5)



        let payload = {
            contact: {
                firstName: user_firstName,
                lastName: user_lastName,
                address: user_address,
                city: user_city,
                email: user_email
            },

        }
        let stringifyedPayload_;



        stringifyedPayload_ = payload
        stringifyedPayload_.products = array_item5.split(/[.,!,?,;,...]/);
        console.log(stringifyedPayload_)




        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stringifyedPayload_)

        }
        fetch(order_url, options).then((res) => {
                return res.json();
            })
            .then((data) => {



                //validation form

                if (user_firstName == "") {

                    alert("Veuillez entrer votre nom")
                } else if (user_lastName == "") {

                    alert("Veuillez entrer votre prenom")
                } else if (user_address == "") {

                    alert("Veuillez entrer votre adresse")
                } else if (user_city == "") {

                    alert("Veuillez entrer votre ville")
                } else if (user_email == "") {

                    alert("Veuillez entrer votre mail")
                } else {

                    window.location.href = "../html/confirmation.html?order-id=" + data.orderId;
                    localStorage.clear();



                }




                console.log(data)
            });



    })
}, 1000)




/*total to pay*/

let total = 0
let updatedTotal = 0

function displayTotalToPay() {
    fetch(url)
        .then(response => response.json())
        .then(prouctsDatas => prouctsDatas.filter((item) => {

            setItem_filter = item

            let basketDatasStorage = localStorage.getItem('basketDataItems')

            let datason = JSON.parse(basketDatasStorage)
            datason.filter((item2) => {
                let item_id_ = item2.id
                if (item_id_.includes(item._id)) {

                    let toAdd = item.price * parseInt(item2.productNumber)

                    total += toAdd

                    document.getElementById("totalPrice").innerHTML = total
                    document.getElementById("totalQuantity").innerHTML = datason.length
                }
            })




        }))
}
displayTotalToPay()




//delete product from basket
setTimeout(function() {
    const deletProductBtn = document.getElementsByClassName("deleteItem")
    for (i = 0; i < deletProductBtn.length; i++) {

        deletProductBtn[i].addEventListener("click", function(event) {




            let getOldBasketItemId = JSON.parse(localStorage.getItem("basketItemId"));
            let getOldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems"));

            let rest_basketItemId = getOldBasketItemId.filter((data) => {
                const data_set_delete = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")

                return data !== data_set_delete
            })

            let rest_getOldbasketDataItems = getOldbasketDataItems.filter((data) => {
                let data_set_delete = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")

                return data.id !== data_set_delete
            })




            localStorage.setItem('basketItemId', JSON.stringify(rest_basketItemId));
            localStorage.setItem('basketDataItems', JSON.stringify(rest_getOldbasketDataItems));


            window.location.href = "../html/cart.html"
        })


    }


}, 2000)



setTimeout(function() {
    let productNumber_
    var itemNumbers_ = document.getElementsByClassName('itemQuantity')

    for (i = 0; i < itemNumbers_.length; i++) {
        productNumber_ = itemNumbers_[i].value

        itemNumbers_[i].addEventListener('change', changeFonction);


        function changeFonction(event) {

            let getOldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems"));




            let oldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems"));
            let itemId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")

            let newProductNumber = event.target.value




            oldbasketDataItems.filter((data) => {

                if (data.id == itemId) {
                    SendNewObject = {
                        "color": data.color,
                        "id": data.id,
                        "productNumber": newProductNumber
                    }
                    let rest_getOldbasketDataItems_ = getOldbasketDataItems.filter((datas) => {

                        return datas.id !== itemId
                    })
                    console.log(rest_getOldbasketDataItems_)
                    localStorage.setItem('basketDataItems', JSON.stringify(rest_getOldbasketDataItems_));

                    setTimeout(function() {

                        let oldbasketDataItemsNew = JSON.parse(localStorage.getItem("basketDataItems"));
                        oldbasketDataItemsNew.push(SendNewObject)
                        localStorage.setItem('basketDataItems', JSON.stringify(oldbasketDataItemsNew));


                        setTimeout(function() {



                            let arr_ = []
                            fetch(url)
                                .then(response => response.json())
                                .then(prouctsDatas => prouctsDatas.filter((item) => {

                                    setItem_filter = item

                                    let basketDatasStorage = localStorage.getItem('basketDataItems')

                                    let datason = JSON.parse(basketDatasStorage)
                                    datason.filter((item2) => {
                                        let item_id_ = item2.id
                                        if (item_id_.includes(item._id)) {



                                            arr_.push(item.price * parseInt(item2.productNumber))
                                            console.log(arr_)
                                            const sumarr_ = arr_.reduce((partialSum, a) => partialSum + a, 0);
                                            document.getElementById("totalPrice").innerHTML = sumarr_
                                            document.getElementById("totalQuantity").innerHTML = datason.length
                                        }
                                    })




                                }))



                        }, 700)



                    }, 100)
                }

            })


        }


    }

}, 1000)