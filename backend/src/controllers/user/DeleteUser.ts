import { Request, Response } from "express";
import User from "../../models/UserSchema";

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};