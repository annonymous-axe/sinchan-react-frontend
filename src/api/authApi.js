import { apiClient } from "./apiClient";


export default async function loginApi(userCred){

    return await apiClient.get('/login', {
        params: {
            "email": userCred.email,
            "password": userCred.password
        }
    });
    
}