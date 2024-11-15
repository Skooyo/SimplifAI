import { model, models, Schema } from "mongoose";

export interface IUser {
    _id: string;
    userID: string;
    circleWalletAddress: string;
    entitySecret: string;
    orderBook: [{
        tradeMin: number;
        tradeMax: number;
        orderType: string;
        quantity: number;
        transactionCount: number;
        lastTimeStampSinceTransaction: Date;
    }];
    userPreference: number;
}

const UserSchema = new Schema<IUser>({
    userID: {
        type: String,
        required: true,
        unique: true, // each user shold have a unique private wallet address
    },
    circleWalletAddress: {
        type: String,
        required: false,
    },
    entitySecret: {
        type: String,
        required: false,
    }, // this will be encrypted
    orderBook: {
        type: [{
            tradeMin: {
                type: Number,
                required: false,
            },
            tradeMax: {
                type: Number,
                required: false,
            },
            orderType: {
                type: String,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            },
            transactionCount: {
                type: Number,
                required: false,
            },
            lastTimeStampSinceTransaction: {
                type: Date,
                default: null,
                required: false,
            },
        }],
    default: [],
    },
    userPreference: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
        default: 0.5
    }
});

const Users = models.Users || model<IUser>("Users", UserSchema);

export default Users;