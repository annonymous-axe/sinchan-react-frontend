export default async function Request(endpoint, method = 'GET', data = null){

    const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if(data){
        options.body = JSON.stringify(data);
    }

    try{

        const response = await fetch(`${BASE_URL}/${endpoint}`, options);

        if(response.ok){
            
            return response;
        }else{
            console.warn("HTTP Status : "+response.status);
            return null;
        }
    }catch(error){
        console.error("error :"+error);
    }

}