import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

import {placeOrder ,placeOrderRazorpay ,placeOrderStripe ,allOrders ,userOrders,updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js'

const orderRouter = express.Router()


// Admin features

orderRouter.post('/list' , adminAuth ,allOrders)
orderRouter.post('/status' , adminAuth ,updateStatus)

// Payment Features

orderRouter.post('/place' , authUser,placeOrder)
orderRouter.post('/stripe' , authUser ,placeOrderStripe)
orderRouter.post('/razorpay' , authUser ,placeOrderRazorpay)

// user feature

orderRouter.post('/userorders', authUser ,userOrders)

// verify payment

orderRouter.post('/verifyStripe' ,authUser, verifyStripe)
orderRouter.post('/verifyRazorpay' ,authUser, verifyRazorpay)

export default orderRouter;




