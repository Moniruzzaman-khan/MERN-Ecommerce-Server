const WishModel = require('../models/WishModel');
const mongoose = require("mongoose");

const ObjectID = mongoose.Types.ObjectId;

const WishListService = async (req) => {
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


        let data = await WishModel.aggregate([
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

const SaveWishListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
        return {status:"success", message:"Wishlist Save"}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}

const RemoveWishListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        await WishModel.deleteOne(reqBody)
        return {status:"success", message:"Wishlist delete Save"}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}

module.exports = {
    WishListService,
    SaveWishListService,
    RemoveWishListService
}