// import React, { useContext, useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import Context from '../context'
// import displayINRCurrency from '../helpers/displayCurrency'
// import { MdDelete } from "react-icons/md";
// import {loadStripe} from '@stripe/stripe-js';

// const Cart = () => {
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const context = useContext(Context)
//     const loadingCart = new Array(4).fill(null)

//     const fetchData = async() =>{

//         const response = await fetch(SummaryApi.addToCartProductView.url,{
//             method : SummaryApi.addToCartProductView.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//         })

//         const responseData = await response.json()

//         if(responseData.success){
//             setData(responseData.data)
//         }

//     }

//     const handleLoading = async() =>{
//         await fetchData()
//     }

//     useEffect(()=>{
//         setLoading(true)
//         handleLoading()
//          setLoading(false)
//     },[])

//     const increaseQty = async(id,qty) =>{
//         const response = await fetch(SummaryApi.updateCartProduct.url,{
//             method : SummaryApi.updateCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {
//                     _id : id,
//                     quantity : qty + 1
//                 }
//             )
//         })

//         const responseData = await response.json()

//         if(responseData.success){
//             fetchData()
//         }
//     }

//     const decraseQty = async(id,qty) =>{
//        if(qty >= 2){
//             const response = await fetch(SummaryApi.updateCartProduct.url,{
//                 method : SummaryApi.updateCartProduct.method,
//                 credentials : 'include',
//                 headers : {
//                     "content-type" : 'application/json'
//                 },
//                 body : JSON.stringify(
//                     {
//                         _id : id,
//                         quantity : qty - 1
//                     }
//                 )
//             })

//             const responseData = await response.json()

//             if(responseData.success){
//                 fetchData()
//             }
//         }
//     }

//     const deleteCartProduct = async(id)=>{
//         const response = await fetch(SummaryApi.deleteCartProduct.url,{
//             method : SummaryApi.deleteCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {
//                     _id : id,
//                 }
//             )
//         })

//         const responseData = await response.json()

//         if(responseData.success){
//             fetchData()
//             context.fetchUserAddToCart()
//         }
//     }

//     const handlePayment = async()=>{

//         const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
//         const response = await fetch(SummaryApi.payment.url,{
//             method : SummaryApi.payment.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify({
//                 cartItems : data
//             })
//         })

//         const responseData = await response.json()

//         if(responseData?.id){
//             stripePromise.redirectToCheckout({ sessionId : responseData.id})
//         }

//         console.log("payment response",responseData)
//     }

//     const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
//     const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
//   return (
//     <div className='container mx-auto'>

//         <div className='text-center text-lg my-3'>
//             {
//                 data.length === 0 && !loading && (
//                     <p className='bg-white py-5'>No Data</p>
//                 )
//             }
//         </div>

//         <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
//                 {/***view product */}
//                 <div className='w-full max-w-3xl'>
//                     {
//                         loading ? (
//                             loadingCart?.map((el,index) => {
//                                 return(
//                                     <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
//                                     </div>
//                                 )
//                             })

//                         ) : (
//                           data.map((product,index)=>{
//                            return(
//                             <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
//                                 <div className='w-32 h-32 bg-slate-200'>
//                                     <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
//                                 </div>
//                                 <div className='px-4 py-2 relative'>
//                                     {/**delete product */}
//                                     <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
//                                         <MdDelete/>
//                                     </div>

//                                     <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
//                                     <p className='capitalize text-slate-500'>{product?.productId.category}</p>
//                                     <div className='flex items-center justify-between'>
//                                             <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
//                                             <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
//                                     </div>
//                                     <div className='flex items-center gap-3 mt-1'>
//                                         <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
//                                         <span>{product?.quantity}</span>
//                                         <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
//                                     </div>
//                                 </div>
//                             </div>
//                            )
//                           })
//                         )
//                     }
//                 </div>

//                 {/***summary  */}
//                 {
//                     data[0] && (
//                         <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                         {
//                             loading ? (
//                             <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

//                             </div>
//                             ) : (
//                                 <div className='h-36 bg-white'>
//                                     <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Quantity</p>
//                                         <p>{totalQty}</p>
//                                     </div>

//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Total Price</p>
//                                         <p>{displayINRCurrency(totalPrice)}</p>
//                                     </div>

//                                     <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>

//                                 </div>
//                             )
//                         }
//                         </div>
//                     )
//                 }

//         </div>
//     </div>
//   )
// }

// export default Cart
import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
// import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import AddressInput from "../components/AddressInput";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);
    const [address, setAddress] = useState("");

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        const handleLoading = async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
        };
        handleLoading();
    }, []);

    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty + 1,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error("Error increasing quantity", error);
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            try {
                const response = await fetch(SummaryApi.updateCartProduct.url, {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        _id: id,
                        quantity: qty - 1,
                    }),
                });

                const responseData = await response.json();

                if (responseData.success) {
                    fetchData();
                }
            } catch (error) {
                console.error("Error decreasing quantity", error);
            }
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    _id: id,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    // const handlePayment = async () => {
    //     try {
    //         const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    //         const response = await fetch(SummaryApi.payment.url, {
    //             method: SummaryApi.payment.method,
    //             credentials: 'include',
    //             headers: {
    //                 "content-type": 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 cartItems: data
    //             })
    //         });

    //         const responseData = await response.json();

    //         if (responseData?.id && stripe) {
    //             stripe.redirectToCheckout({ sessionId: responseData.id });
    //         }

    //         console.log("payment response", responseData);
    //     } catch (error) {
    //         console.error("Error handling payment", error);
    //     }
    // };

    const checkOutHandler = async (products, amount) => {
        const {
            data: { order },
        } = await axios.post(SummaryApi.orderCheckout.url, { amount });
        // console.log(order)
        // console.log(window)

        const {
            data: { key},
        } = await axios.get(SummaryApi.getKey.url);
        // const data = await axios.get("http://localhost:5000/api/getkey")
        // console.log("key is: ", key);
        // console.log("id is: ", userId);
        // console.log("data = ", data)
        const options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Arijit Barik",
            description: "hii..I am learning payment baby",
            image: "https://avatars.githubusercontent.com/u/121745672?v=4",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

            // callback_url: "http://localhost:5000/api/v1/paymentvarification",
            handler: async function (response) {
                await fetch(SummaryApi.paymentVarification.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        products: {
                            products,
                        },
                        address,
                        amount,
                        userId:localStorage.getItem("userId"),// Include all the options
                    }),
                }).then((response) => {
                    console.log(response);
                    if (response.redirected) {
                        console.log(response.url)
                        window.location.href = response.url;
                        
                    } else {
                        console.log(response.JSON);
                    }
                });
            },

            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#FF0000",
            },
        };
        const razor = new window.Razorpay(options);
        razor.open();
    };

    const totalQty = data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
    );
    const totalPrice = data.reduce(
        (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
        0
    );

    return (
        <div className="container mx-auto">
            <div className="text-center text-lg my-3">
                {data.length === 0 && !loading && (
                    <p className="bg-white py-5">No Data</p>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                <div className="w-full max-w-3xl">
                    {loading
                        ? loadingCart.map((el, index) => (
                              <div
                                  key={el + "Add To Cart Loading" + index}
                                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                              ></div>
                          ))
                        : data.map((product) => (
                              <div
                                  key={product?._id + "Add To Cart Loading"}
                                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                              >
                                  <div className="w-32 h-32 bg-slate-200">
                                      <img
                                          src={
                                              product?.productId
                                                  ?.productImage[0]
                                          }
                                          className="w-full h-full object-scale-down mix-blend-multiply"
                                          alt="Product"
                                      />
                                  </div>
                                  <div className="px-4 py-2 relative">
                                      <div
                                          className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                                          onClick={() =>
                                              deleteCartProduct(product?._id)
                                          }
                                      >
                                          <MdDelete />
                                      </div>
                                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                                          {product?.productId?.productName}
                                      </h2>
                                      <p className="capitalize text-slate-500">
                                          {product?.productId?.category}
                                      </p>
                                      <div className="flex items-center justify-between">
                                          <p className="text-red-600 font-medium text-lg">
                                              {displayINRCurrency(
                                                  product?.productId
                                                      ?.sellingPrice
                                              )}
                                          </p>
                                          <p className="text-slate-600 font-semibold text-lg">
                                              {displayINRCurrency(
                                                  product?.productId
                                                      ?.sellingPrice *
                                                      product?.quantity
                                              )}
                                          </p>
                                      </div>
                                      <div className="flex items-center gap-3 mt-1">
                                          <button
                                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                                              onClick={() =>
                                                  decreaseQty(
                                                      product?._id,
                                                      product?.quantity
                                                  )
                                              }
                                          >
                                              -
                                          </button>
                                          <span>{product?.quantity}</span>
                                          <button
                                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                                              onClick={() =>
                                                  increaseQty(
                                                      product?._id,
                                                      product?.quantity
                                                  )
                                              }
                                          >
                                              +
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>

                {data.length > 0 && (
                    <div className="mt-5 lg:mt-0 w-full max-w-sm bg-yellow-600">
                        {loading ? (
                            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
                        ) : (
                            <div className="h-36 bg-white">
                                <div>
                                    <h1>Enter Your Address</h1>
                                    <AddressInput
                                        onAddressChange={handleAddressChange}
                                    />
                                </div>
                                <h2 className="text-white bg-red-600 px-4 py-1">
                                    Summary
                                </h2>
                                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                <button
                                    className="bg-blue-600 p-2 text-white w-full mt-2"
                                    onClick={() => {
                                        console.log(totalPrice);
                                        checkOutHandler(data, totalPrice);
                                    }}
                                >
                                    Payment
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
