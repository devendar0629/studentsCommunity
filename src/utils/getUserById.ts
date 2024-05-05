import User from "@/models/user.model";

const getUserById = async (id: string | null | undefined) => {
    try {
        if (!(id?.trim())) return null;

        const user = await User.findById(id).select('-password -refreshToken');

        return user;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { getUserById }