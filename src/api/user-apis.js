import { apiClient } from "./apiClient"

const saveUser = async (user) => {

    return await apiClient.post("user", user);
}

const getUser = async () => {

    return await apiClient.get("user");
}

export {saveUser, getUser};