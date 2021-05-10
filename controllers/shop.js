const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodName = req.params.productName;
    console.log(prodName);
    Product.findByName(prodName, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: "Product",
            path: '/products'
        });
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.fetchAll(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            const totalPrice = cart.totalPrice;
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.name === product.name);
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                products: cartProducts,
                totalPrice: totalPrice,
                pageTitle: 'Cart',
                path: '/cart'
            });

        })
    })
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.postCart = (req, res, next) => {
    const prodName = req.body.productName;
    Product.findByName(prodName, (product) => {
        Cart.addProduct(prodName, product.price);

    })
    res.redirect('/prove03/cart');
};
