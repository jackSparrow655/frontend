import React, { useContext} from 'react'
// import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context';

const OrderPage = () => {
//   const [data,setData] = useState([])

//   const fetchOrderDetails = async()=>{
//     const response = await fetch(SummaryApi.getOrder.url,{
//       method : SummaryApi.getOrder.method,
//       credentials : 'include'
//     })

//     const responseData = await response.json()

//     setData(responseData.data)
//     console.log("order list",responseData)
//   }

//   useEffect(()=>{
//     fetchOrderDetails()
//   },[])
const context = useContext(Context)

const data = context.orderDetails
console.log(data);

  return (
    <div>
    {
        (!data[0] && (<div>no order is available</div>))
    }

    { (data[0]) &&  <div className='p-4 w-full'>
          {
            data.map((item,index)=>{
              return(
                <div key={item.userId+index}>
                   <p className='font-medium text-lg '>{moment(item.createdAt).format('LL')}</p> 
                   <div className='border rounded'>
                        <div className='flex flex-col lg:flex-row justify-between'>
                            <div className='grid gap-1'>
                              {
                                item?.productDetails.map((product,index)=>{
                                  return(
                                    <div key={index} className='flex  gap-3 bg-slate-100'>
                                        <img 
                                          src={product.productId.productImage[0]}
                                          alt='product'
                                          className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                                        />
                                        <div>
                                          <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.productId.productName}</div>
                                          <div className='flex items-center gap-5 mt-1'>
                                            <div className='text-lg text-red-500'>{displayINRCurrency(product.productId.sellingPrice)}</div>
                                            <p>Quantity : {product.quantity}</p>
                                          </div>
                                        </div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                            <div className="flex flex-row gap-10">
                                        <div>
                                            <h2>order status</h2>
                                            <div>{item.orderStatus}</div>
                                        </div>
                                    </div>
                            <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                              <div>
                                  <div className='text-lg font-medium'>Payment Details : </div>
                                  <p className=' ml-1'>Payment method : {item.paymentDetails.payment_method_type}</p>
                                  <p className=' ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                              </div>
                            </div>
                        </div>

                      <div className='font-semibold ml-auto w-fit lg:text-lg'>
                        Total Amount : {item.totalAmount}
                      </div>
                   </div>
                </div>
              )
            })
          }
      </div>}
    </div>
  )
}

export default OrderPage