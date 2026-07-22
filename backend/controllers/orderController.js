const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

const createOrder = async (req, res) =>{
    try{
        const {items, totalAmount, address, paymentId } = req.body;
        if(!items || items.length === 0 ||!totalAmount || !address){
            return res.status(400).json({message: 'Invalid order data'});
        }
        else{
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            const message = `Dear ${req.user.name},\n\nThank you for order! Your order has been successfully created with the following details: \n\nOrder ID: ${order._id}\nTotal Amount: ${totalAmount}\n Shipping Address: Shipping Address:
            ${address.fullName}
            ${address.street}
            ${address.city}
            ${address.postalCode}
            ${address.country}\n\nWe will notify once your order is shipped.\n\nBest regard,\nShopNest Team`;
            await order.save();
            await sendEmail(req.user.email, "Order Created", message);
            res.status(201).json({message: 'Order Created Successfully', order});
        }
    } catch(error){
        res.status(500).json({message: 'Error creating order', error});
    }
};


const myOrders = async (req, res)=>{
    try{
        const orders = await Order.find({user: req.user._id}).populate('items.productId', 'name price');
        return res.json(orders);
    } catch(error){
        return res.status(500).json({message: 'Error fetching order', error});
    }
};

const getOrders = async (req, res) =>{
    try{
        const orders = await Order.find({}).populate('user','name email');
        return res.json(orders);
    } catch(error){
        return res.status(500).json({message: 'Errir fetching order', error})
    }
};

const updateOrderStatus = async(req, res) =>{
    try{
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        order.status = status;
        await order.save();
        return res.json({message: 'Order status updated', order});
    } catch(error){
        return res.status(500).json({
            message: error.message || 'Error updating order status',
            error
        });
    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
}