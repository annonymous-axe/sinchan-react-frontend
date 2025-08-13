import Request from "./api-request";

async function fetchCategoryList(){

    return await Request('category/list').then(response => {
        return response.json();
    });

}

export {fetchCategoryList};