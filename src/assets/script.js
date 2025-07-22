/**
 * Array containing all available product objects for the store.
 * @type {Array<{name: string, price: number, quantity: number, productId: number, image: string}>}
 */
let products = [];
/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
/**
 * Product object representing a strawberry.
 * @type {{name: string, price: number, quantity: number, productId: number, image: string}}
 */
const strawberry = {
  name: "strawberry",
  price: 0.25,
  quantity: 0,
  productId: 990,
  image: "../images/strawberry.jpg",

}
/**
 * Product object representing an orange.
 * @type {{name: string, price: number, quantity: number, productId: number, image: string}}
 */
const orange = {
  name: "orange",
  price: 2,
  quantity: 0,
  productId: 991,
  image: "../images/orange.jpg",
}

/**
 * Product object representing a cherry.
 * @type {{name: string, price: number, quantity: number, productId: number, image: string}}
 */
const cherry = {
  name: "cherry",
  price: 0.5,
  quantity: 0,
  productId: 992,
  image: "../images/cherry.jpg",
}

// Add all product objects to the products array
products = [strawberry, orange, cherry]

/**
 * Finds and returns a product object by its unique productId.
 * @param {number} id - The unique productId of the product to find.
 * @returns {object|undefined} The product object if found, otherwise undefined.
 */
function findProductById(id){
  return products.find(products => products.productId === id);
}


/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/**
 * Array holding the products currently in the user's cart.
 * @type {Array<object>}
 */
let cart = []
/**
 * Tracks the total amount paid by the user (not used in current logic).
 * @type {number}
 */
let totalPaid = 0;

/**
 * Adds a product to the cart by productId. Increases quantity if already in cart.
 * @param {number} productId - The unique productId of the product to add.
 * @returns {void}
 */
function addProductToCart(productId){
  const product = findProductById(productId);
  if (!product) return;

  if (cart.includes(product)){
    product.quantity += 1;
  }
  else{
    product.quantity += 1;
    cart.push(product);
  }
}

/**
 * Increases the quantity of a product in the cart by productId.
 * @param {number} productId - The unique productId of the product to increase.
 * @returns {void}
 */
function increaseQuantity(productId){
  const product = findProductById(productId);
  if (cart.includes(product)){
    product.quantity += 1;
  }
  else{
    cart.push(product);
    product.quantity += 1;
  }
}

/**
 * Decreases the quantity of a product in the cart by productId. Removes from cart if quantity reaches zero.
 * @param {number} productId - The unique productId of the product to decrease.
 * @returns {void}
 */
function decreaseQuantity(productId){
  const product = findProductById(productId);
  if (!product) return;

  if (product.quantity > 0){
    product.quantity -= 1;
    if (product.quantity === 0) {
      const idx = cart.indexOf(product);
      if (idx > -1){
        cart.splice(idx, 1);
      }
    }
  }
}

/**
 * Removes a product from the cart and sets its quantity to zero.
 * @param {number} productId - The unique productId of the product to remove.
 * @returns {void}
 */
function removeProductFromCart(productId){
  const product = findProductById(productId);
  if (!product) return;
  product.quantity = 0;
  const idx = cart.indexOf(product);
  if (idx > -1){
    cart.splice(idx, 1);
  }
}

/**
 * Calculates and returns the total cost of all products in the cart.
 * @returns {number} The total price of all items in the cart.
 */
function cartTotal(){
  let total = 0;
  for (const item of cart){
    total += item.price * item.quantity;
  };
  return total;
}

/**
 * Empties the cart and resets the totalPaid variable.
 * @returns {void}
 */
function emptyCart(){
  cart = [];
  totalPaid = 0;
}

/**
 * Processes a payment for the current cart and determines the balance or change due.
 *
 * @param {number} amount - The amount of money provided by the customer for payment.
 * @returns {number} Returns:
 *   - A negative number if the payment is insufficient (the negative value is the remaining balance owed).
 *   - A positive number if the payment exceeds the cart total (the value is the change to return to the customer).
 *   - Zero if the payment exactly matches the cart total.
 *   - If the cart is empty, returns the amount provided (no payment processed).
 *
 * The function does not modify the cart or the amount paid; it only calculates the result based on the current cart total.
 */
function pay(amount) {
  // Add the received amount to the total paid so far
  totalPaid += amount;

  // Calculate how much the customer still owes (negative = still owed) 
  // or how much change to give (positive = change due)
  const remaining = totalPaid - cartTotal();

  // If the cart is fully paid or overpaid, reset totalPaid for the next transaction
  if (remaining >= 0) {
    totalPaid = 0;
  }

  // Return the remaining balance
  return remaining;
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
}