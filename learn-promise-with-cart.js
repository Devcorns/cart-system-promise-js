/*
title:- Learn Promises with cart system
desc:- Promise is an object by which we can handle eventual completion or failure of async operations
author:- Prakhar Mathur
date: 30-10-2022

//validate-cart
//Order-Id
//Payment-Info
//Thankyou message

*/

const cart = [
    {
        id:2000,
        product:"kurta",
        payment:800
    },
    {
        id:2001,
        product:"pajama",
        payment:2000
    },
    {
        id:2002,
        product:"towel",
        payment:1600
    }
]

//starting point
createOrder(cart)
.then(function(orderId){
    console.log('orderid',orderId)
    return createPayment(orderId)
})
.then(function(paymentInfo){
    if(paymentInfo.status) {
        return paymentInfo
    }
})
.then(function({amt}) {
    thankyou(amt)
})
.catch(err=>console.log(err.message))
.then(()=>{
    console.log("transaction end here")
})

//return if cart having some items or not
function validatecart(cart) {
    return cart.length
}

//this function is used to generate random orderid
function getOrderId(obj) {

    orderId = 0;
    obj.map(item=>{
        orderId = orderId + item.id 
    })
    //creation of random ordrid
    return new Date().getMilliseconds()+""+new Date().getMonth()+1+""+new Date().getFullYear()+""+orderId;    

}


//createorder is used to create cart order for further process
function createOrder(cartObj) {
    return new Promise((res,rej)=>{
        if(!validatecart(cartObj)) return rej(new Error("cart is not valid"));
        if(!getOrderId(cartObj)) return rej(new Error("OrderId is not valid"));
        res(getOrderId(cartObj));
    }) 
}


//createpayment is used to create payment info with process
function createPayment(orderId) {
    return new Promise((res,rej)=>{
        let payment = 0;
        cart.map((item)=>{
            payment = item.payment+payment;
        })
        const paymentInfo = {
            orderId: orderId,
            amt: payment,
            status:payment>0
        }
        res(paymentInfo)
    })
}

//Thankyou function calls after successfull attempt of payment system
function thankyou(amt) {
    console.log("Thankyou!!! we have recieved payment of", amt,"rupee" )
}
