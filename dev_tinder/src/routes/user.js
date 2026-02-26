const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../models/connectionRequest");
const USER_SAFE_DATA="firstName lastName photo age gender about skills";
const User=require("../models/user");
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{
const loggedInUser=req.user;
const connectionRequest=await ConnectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested",
}).populate("fromUserId","firstName lastName photo age gender about skills");

res.json({message : "Data fetched succesfully",data:connectionRequest});


}catch(err){
    req.statusCode(400).send("ERROR: "+err.message);
}

});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      status: "accepted",
      $or: [
        { toUserId: loggedInUser._id },
        { fromUserId: loggedInUser._id },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      const isSender =
        row.fromUserId._id.toString() === loggedInUser._id.toString();

      return {
        _id: row._id, // 👈 IMPORTANT (connection id)
        user: isSender ? row.toUserId : row.fromUserId,
      };
    });

    res.json({ data });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    // ❗ ONLY BLOCK ACTIVE CONNECTIONS
    const connectionRequest = await ConnectionRequest.find({
      status: { $in: ["interested", "accepted"] },
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      _id: {
        $nin: Array.from(hideUsersFromFeed),
        $ne: loggedInUser._id,
      },
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports=userRouter;