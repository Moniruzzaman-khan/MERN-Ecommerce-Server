const mongoose = require("mongoose");
const CartModel = require('../models/CartModel');
const ObjectID = mongoose.Types.ObjectId;

const CartListService = async (req) => {
    try{
        let user_id = new ObjectID(req.headers.user_id);
        let MatchStage = {$match:{userID:user_id}}
        let JoinStageProduct = {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};
        let unwindProductStage = {$unwind:"$product"}
        let JoinBrandStage = {$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}};
        let unwindBrandtStage = {$unwind:"$brand"}
        let JoinCategoryStage = {$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}};
        let unwindCategorytStage = {$unwind:"$category"}

        let projectionStage = {
            $project:{
                '_id':0,'userID':0,'createdAt':0,'updateAt':0,'product._id':0,'product.categoryID':0,'product.brandID':0
            }
        }


        let data = await CartModel.aggregate([
            MatchStage,
            JoinStageProduct,
            unwindProductStage,
            JoinBrandStage,
            unwindBrandtStage,
            JoinCategoryStage,
            unwindCategorytStage,
            projectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}

const SaveCartListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        await CartModel.create(reqBody);

        return {status:"success",message:"Cart list create success"}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}

const UpdateCartListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID;
        let reqBody = req.body;

        await CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody})

        return {status:"success",message:"Cart list update success"}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}

const RemoveCartListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.deleteOne(reqBody)

        return {status:"success",message:"Cart list delete success"}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}

module.exports = {
    CartListService,
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService
}