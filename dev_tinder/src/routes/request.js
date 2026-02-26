const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

/* =====================================================
   SEND REQUEST (FEED → interested / ignored)
===================================================== */
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId, status } = req.params;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type --> " + status,
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingConnectionRequest =
        await ConnectionRequestModel.findOne({
          $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
          ],
        });

      if (existingConnectionRequest) {
        return res.status(409).json({
          code: "REQUEST_EXISTS",
          message: "You have already interacted with this profile",
        });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/* =====================================================
   REVIEW REQUEST (REQUESTS PAGE → accept / reject)
===================================================== */
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest =
        await ConnectionRequestModel.findOne({
          _id: requestId,
          toUserId: loggedInUserId,
          status: "interested",
        });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: `Connection request ${status}`,
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/* =====================================================
   CONNECTION ACTIONS (CONNECTIONS PAGE → remove / block)
===================================================== */
requestRouter.patch(
  "/request/connection/:connectionId/:status",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { connectionId, status } = req.params;

      const allowedStatus = ["removed", "blocked"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const connection =
        await ConnectionRequestModel.findOne({
          _id: connectionId,
          status: "accepted",
          $or: [
            { fromUserId: loggedInUserId },
            { toUserId: loggedInUserId },
          ],
        });

      if (!connection) {
        return res
          .status(404)
          .json({ message: "Connection not found" });
      }

      connection.status = status;
      await connection.save();

      res.json({
        message: `Connection ${status} successfully`,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = requestRouter;