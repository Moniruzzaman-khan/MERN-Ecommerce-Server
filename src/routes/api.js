const express = require('express');
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");
const AuthVerification = require("../middlewares/AuthVerification");
const InvoiceController = require("../controllers/InvoiceController");
const FeaturesController = require("../controllers/FeaturesController");

const router = express.Router();


// Product
router.get('/ProductBrandList',ProductController.ProductBrandList)
router.get('/ProductCategoryList',ProductController.ProductCategoryList)
router.get('/ProductSliderList',ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategory)
router.get('/ProductListBySimilar/:CategoryID',ProductController.ProductListBySimilar)
router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)
router.post('/ProductListByFilter',ProductController.ProductListByFilter)


// User
router.get('/UserOTP/:email',UserController.UserOTP)
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin)
router.get('/UserLogout',AuthVerification,UserController.UserLogout)
router.post('/CreateProfile',AuthVerification,UserController.CreateProfile)
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile)
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile)


// Wishlist
router.get('/WishList',AuthVerification,WishListController.WishList)
router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList)
router.post('/RemoveWishList',AuthVerification,WishListController.RemoveWishList)


// Cart
router.get('/CartList',AuthVerification,CartListController.CartList)
router.post('/SaveCartList',AuthVerification,CartListController.SaveCartList)
router.post('/UpdateCartList/:cartID',AuthVerification,CartListController.UpdateCartList)
router.post('/RemoveCartList',AuthVerification,CartListController.RemoveCartList)


// Invoice and Payment
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice)
router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList)
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList)

router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess)
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail)
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel)
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN)


// Feature
router.get('/FeatureList',FeaturesController.FeatureList)
router.get('/LegalDetails/:type',FeaturesController.LegalDetails)

// Review
router.post('/CreateReview',AuthVerification,ProductController.CreateReview)

module.exports = router;