let navBar = document.querySelector('.navBar')
let mobileBar= document.querySelector('.header__right-one-mobile');
let closeIcon = document.querySelector('.icon-close');
navBar.addEventListener('click', ()=>{
mobileBar.style.display = 'flex';
})
closeIcon.addEventListener('click', ()=>{
mobileBar.style.display = 'none';
})
let addedItems =[];
let addCart = document.querySelectorAll('.addCart');
let removeCart = document.querySelectorAll('.removeCart');
let addCartPar = document.querySelector('.addCartPar');
let countOfItems = document.querySelector('.count');
addCart && addCart.forEach((item)=>{
    item.addEventListener('click', ()=>{
        if(event.target.className == 'addCart'){
addedItems.push(event.target.nextElementSibling.textContent);
event.target.className = 'removeCart'
event.target.textContent = 'Remove from cart';

        }else{
            let idx = addedItems.findIndex(x=> x == event.target.nextElementSibling.textContent);
            idx != -1 && addedItems.splice(idx,1);
event.target.className = 'addCart'
event.target.textContent = 'Add to cart';
        }
//         const count = document.createElement('span');
// count.className = 'countOfItems';
countOfItems.textContent = addedItems.length;
// addCartPar.append(count);
updateCartDom();
    })
})

let isViewAll = false;
let t_products = document.querySelectorAll('.trending-now-sec__products-product');
let viewArr = document.querySelector('.viewAll');
updateViewAll();
viewArr.addEventListener('click', ()=>{
    isViewAll = !isViewAll;
    event.target.className = isViewAll ? 'fa-solid fa-angle-up viewAll' : 'fa-solid fa-angle-down viewAll'
    updateViewAll();
})
function updateViewAll(){

    t_products.forEach( (product,idx)=>{
    if(!isViewAll && idx > 2){
    product.style.display = 'none';
    }else{
        product.style.display = 'block';
    }
    })
}

let f_prod_par = document.querySelector('.featured-products-sec-img-sec');
let f_prod__arr = f_prod_par.querySelectorAll('.featured-products-sec-img-sec-image');
let cartItemDom = document.querySelector('.cartItem-dom');
let cartClose = document.querySelector('.cart-close');
let amountDom = document.querySelector('.amount');

cartClose.addEventListener('click', ()=>{
    cartItemDom.style.right ='-55%';
    cartItemDom.style.display = 'none';
})
addCartPar.addEventListener('click', ()=>{
   updateCartDom(true);
})

function updateCartDom(fromButClick){
    if(fromButClick){

        cartItemDom.style.right ='0';
            cartItemDom.style.display = 'block';
    }
    var t_body = document.querySelector('tbody');
    t_body.replaceChildren();
    var totalPrice = 0;
    f_prod__arr.forEach((prod,idx)=>{
        if(addedItems.includes(prod.querySelector('tags').textContent)){
            var cleanString = prod.querySelector('h2').textContent.replace(/\D/g, '');
            var priceNumber = Number(cleanString);
    var htmlPart = `<tr>
          <td><img src=${prod.querySelector('img').src}></td>
          <td>${prod.querySelector('h2').textContent}</td>
        </tr>`
        totalPrice+=priceNumber;
        }
        amountDom.textContent = "Rs. "+totalPrice;
        htmlPart && t_body.insertAdjacentHTML('beforeend', htmlPart);
    })
}