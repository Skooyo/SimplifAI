"use server"

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Users from "../database/models/user.model";

export const getUserByUserID = async (userID: string) => {
    try{
        await connectToDatabase();

        const user = await Users.findOne({ userID: userID });

        if (user) {
            console.log("User found")
            return JSON.parse(JSON.stringify(user));
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        try {
            const user = await createUser(userID);
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            handleError(error);
        }
    }
}

export const createUser = async(userID: string) => {
    try {
        await connectToDatabase();

        const user = await Users.create({
            userID: userID,
            circleWalletAddress: "",
            entitySecret: "",
            orderBook: [],
            userPreference: 0.5,
        })

        console.log("User created")

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Error creating user:", error);
        handleError(error);
    }
}