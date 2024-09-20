import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
import axios from 'axios'

const AllOrder = () => {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false)

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: "include",
        });

        const responseData = await response.json();

        setData(responseData.data);
        // console.log("order list", data);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [flag]);
    
    const [status, setStatus] = useState("PACKED")
    
    const statusHandler = (e) => {
        const {value} = e.target
        setStatus(value)
    }
    
    const changeStatusHandler = async(item) => {
        // console.log("hii")
        const orderId = item._id
        // console.log(orderId)
        const token = localStorage.getItem("token")
        const response = await axios.post(SummaryApi.orderStatus.url,
            {
                orderId,
                status,
                token
            }
        )
        const currentStatus = response.data.status
        console.log(currentStatus)
        setFlag((prev) => !prev)
        // return currentStatus
    }

    return (
        <div className="h-[calc(100vh-190px)] overflow-y-scroll">
            {
           !data[0] && (
            <p>No Order available</p>
           )
        }

            {(data[0]) &&
                <div className="p-4 w-full">
                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className="font-medium text-lg">
                                {moment(item?.createdAt).format("LL")}
                            </p>
                            <div className="border rounded p-2">
                                <div className="flex flex-col lg:flex-row justify-between">
                                    <div className="grid gap-1">
                                        {item?.productDetails.map(
                                            (product, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex  gap-3 bg-slate-100"
                                                    >
                                                        <img
                                                            src={
                                                                product
                                                                    .productId
                                                                    .productImage[0]
                                                            }
                                                            alt='prod'
                                                            className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                                                {
                                                                    product
                                                                        .productId
                                                                        .productName
                                                                }
                                                            </div>
                                                            <div className="flex items-center gap-5 mt-1">
                                                                <div className="text-lg text-red-300">
                                                                    {displayINRCurrency(
                                                                        product
                                                                            .productId
                                                                            .sellingPrice
                                                                    )}
                                                                </div>
                                                                <p>
                                                                    Quantity :{" "}
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <div>
                                            <h2>order status</h2>
                                            <div>{item.orderStatus}</div>
                                        </div>
                                        <div>
                                            <p>change order status</p>
                                            <label htmlFor="status">status</label> <br />
                                                <select name="status" id="status" value={status} onChange={statusHandler}>
                                                    <option value="PACKED">PACKED</option>
                                                    <option value="SHIPPED">SHIPPED</option>
                                                    <option value="OUT FOR DELIVERY">OUT FOR DELEVERY</option>
                                                    <option value="DELIVERED">DELIVERD</option>
                                                </select>
                                                <button className="h-[30px] w-[100px] border border-black bg-red-600 text-white font-bold hover:scale-90 transition-all duration-200 rounded-md mx-10" onClick={() =>{
                                                    changeStatusHandler(item)
                                                }}>change</button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                                        <div>
                                            <div className="text-lg font-medium">
                                                Payment Details :{" "}
                                            </div>
                                            <p className=" ml-1">
                                                Payment method :{" "}
                                                {
                                                    item.paymentDetails
                                                        .payment_method_type
                                                }
                                            </p>
                                            <p className=" ml-1">
                                                Payment Status :{" "}
                                                {
                                                    item.paymentDetails
                                                        .payment_status
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="font-semibold ml-auto w-fit lg:text-lg">
                                    Total Amount : {item.totalAmount}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>}
        </div>
    );
};

export default AllOrder;
