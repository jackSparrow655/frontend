// const backendDomin = "https://ashish-e-comm-2-backend.vercel.app"
const backendDomin = "http://localhost:5000"
const token = localStorage.getItem("token")
const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details?token=${token}`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout?token=${token}`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user?token=${token}`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user?token=${token}`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product?token=${token}`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product?token=${token}`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct?token=${token}`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product?token=${token}`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details?token=${token}`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart?token=${token}`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct?token=${token}`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product?token=${token}`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product?token=${token}`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product?token=${token}`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method : 'post'
    },
    userOrder:{
        url : `${backendDomin}/api/user-order?token=${token}`,
        method: 'get'
    },
    allOrder:{
        url : `${backendDomin}/api/all-order?token=${token}`,
        method: 'get'
    },
    orderStatus:{
        url:`${backendDomin}/api/change-status?token=${token}`,
        method: 'post'
    },
    getKey:{
        url:`${backendDomin}/api/getkey`,
        method:'get'
    },
    paymentVarification:{
        url:`${backendDomin}/api/paymentvarification`,
        method:'get'
    },
    orderCheckout:{
        url:`${backendDomin}/api/checkout`,
        method:'post'
    }
}


export default SummaryApi