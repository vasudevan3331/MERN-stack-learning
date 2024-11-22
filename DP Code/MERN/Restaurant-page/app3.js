class ProductData {
    constructor(name,description,price,imageUrl) {
     this.name = name
     this.description = description
     this.price = price
     this.imageUrl = imageUrl
    }
 }
 
 class Component {
     constructor(id) {
         this.id = id
         this.render()
     }
 
     createRootEle(tag,classes,attr) {
         const rootEle = document.createElement(tag)
         if(classes) {
             rootEle.classList.add(classes)
         }
 
         if(attr && attr.length>0) {
             for(const att of attr) {
                 rootEle.setAttribute(att.name,att.val)
             }
         }
         document.getElementById(this.id).append(rootEle)
         return rootEle
     }
 }
 
 class Cart extends Component {
     constructor(id) {
         super(id)
     }
 
     items = []
     render() {
         const div = this.createRootEle("div")
         div.innerHTML = `
           <section class="cart">
             <h2>Total:0</h2>
             <button>Order Now</button>
           </section>
         `
         this.h2 = div.querySelector("h2")
     }
 
     get Total() {
         return this.items.reduce((pre,cur)=> pre + cur.price,0)
     }
 
     addToCart(prod) {
        this.items.push(prod)
        this.h2.innerHTML = `Total:${this.Total}`
     }
 }
 
 class RenderSingleProduct {
     constructor(data) {
         this.productData = data
     }
 
     renderProd(ele) {
         const li = document.createElement("li")
         li.classList.add("product-item")
         li.innerHTML = `
           <div>
             <img src="${this.productData.imageUrl}"/>
             <div class="product-item__content">
                <h2>${this.productData.name}</h2>
                <h3>${this.productData.price}</h3>
                <p>${this.productData.description}</p>
                <button>Add to Cart</button>
             </div>
           </div>
         `
 
         const btn = li.querySelector("button")
         btn.addEventListener("click",()=> {
             App.addToCart(this.productData)
         })
         ele.append(li)
     }
 }
 
 
 class ProductList extends Component {
     constructor(id) {
        super(id)  
     }
 
     fetchProducts() {
         return [
            new ProductData("Crab","crispy",300,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHbH0VwkfgH6VW6E57ElWkB-bBGdz7fdsQ6Q&s"),
            new ProductData("Grill-fish","fleshly",299,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQUAGEocojD1QjBfkcWEHrKarCP9zv6KwrRg&s"),
            new ProductData("prown","softy",388,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhOn22yNz_KjeKwC_f4x5KM-dYEU3LB-iIg&s"),
         ]
     }
 
     render() {
         const ele = this.createRootEle("ul","product-list")
         for(const data of this.fetchProducts())  {
             new RenderSingleProduct(data).renderProd(ele)
         }
     }
 }
 
 class Shop {
     render() {
         this.cart = new Cart("app")
         new ProductList("app")
     }
 }
 
 class App {
     static init() {
         const shop = new Shop()
         shop.render()
         this.cart = shop.cart
     }
 
     static addToCart(prod) {
         console.log(this.cart)
         this.cart.addToCart(prod)
     }
 }
 
 App.init()