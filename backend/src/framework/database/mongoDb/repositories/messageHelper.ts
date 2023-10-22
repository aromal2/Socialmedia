import Message from "../models/messageModel";
import mongoose from 'mongoose';
import Chat from "../models/chatModel";

export const messageHelper = () => {
    const addMessages = async (chatterId: string,userId:string, secondId: string, message: string) => {
        try {
            console.log(chatterId,userId,secondId,message,"fixxxxxxx");
            
            if (chatterId) {
                const newMessage = new Message({
                    chatId: chatterId,
                    userId: userId,
                    message: message
                });

                const result = await newMessage.save();
                console.log(result,"nnnnnnnnnnnnnnnn");
                return result

               
        } }catch (error) {
            console.log(error);
        }
    };

    const getAllChats = async (userId: string) => {
        try {
            const userID = new mongoose.Types.ObjectId(userId);

            return await Message.aggregate([
                {
                    $project: {
                        chatId: 1,
                        createdAt: 1
                    }
                },
                {
                    $group: {
                        _id: "$chatId",
                        createdAt: {
                            $last: "$createdAt",
                        }
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $addFields: {
                        chatId: {
                            $toObjectId: "$_id"
                        }
                    }
                },
                {
                    $lookup: {
                        from: "chats",
                        localField: "chatId",
                        foreignField: "_id",
                        as: "result"
                    }
                },
                {
                    $unwind: {
                        path: "$result"
                    }
                },
                {
                    $match: {
                        "result.members": {
                            $in: [
                                userID
                            ]
                        }
                    }
                },
                {
                    $unwind: {
                        path: "$result.members"
                    }
                },
                {
                    $match: {
                        "result.members": {
                            $ne: userID,
                        }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "result.members",
                        foreignField: "_id",
                        as: "result"
                    }
                },
                {
                    $unwind: {
                        path: "$result"
                    }
                },
                {
                    $project: {
                  
                        chatId: "$_id",
                        userName: "$result.userName",
                        firstName: "$result.firstName",
                        lastName: "$result.lastName",
                        profilePic: "$result.profilePic",
                        createdAt: 1,
                        _id:"$result._id"
                    }
                }
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const getChatlist =async (userId:string)=>{
        try {

            return await Message.aggregate(
              [
                {
                  '$group': {
                    '_id': '$chatId', 
                    'createTime': {
                      '$last': '$createdAt'
                    }
                  }
                }, {
                  '$sort': {
                    'createTime': -1
                  }
                }, {
                  '$lookup': {
                    'from': 'chats', 
                    'localField': '_id', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }, {
                  '$unwind': {
                    'path': '$result'
                  }
                }, {
                  '$match': {
                    'result.members': {
                      '$in': [
                        new mongoose.Types.ObjectId(userId)
                      ]
                    }
                  }
                }, {
                  '$unwind': {
                    'path': '$result.members'
                  }
                }, {
                  '$match': {
                    'result.members': {
                      '$ne': new mongoose.Types.ObjectId(userId)
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'result.members', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }, {
                  '$unwind': {
                    'path': '$result'
                  }
                }, {
                  '$project': {
                    'userName': '$result.userName', 
                    'profilePic': '$result.profilePic', 
                    'createTime': 1, 
                    'chatId': '$_id', 
                    '_id': '$result._id'
                  }
                }
              ]
                  
            )

        } catch(error)
        {
            console.log(error);
            
        }
    }

    const getMessage = async (chatId: string) => {
        try {
            const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

            if (messages) {
                return messages;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        addMessages,
        getAllChats,
        getChatlist,
        getMessage
    };
};

export type messageHelper = typeof messageHelper
