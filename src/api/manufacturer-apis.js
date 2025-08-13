import Request from "./api-request";

async function fetchManufacturerList(){

    return Request('manufacturer/list').then(response => {
        return response.json();
    });
}

async function saveManufacturer(manufacturer){

    return await Request('manufacturer', 'POST', manufacturer);
}

async function fetchManufacturerDetails(manufacturerId){

    return await Request('manufacturer?manufacturerId='+manufacturerId).then(response => {
        return response.json();
    });

}

async function updateManufacturer(manufacturer){

    return await Request('manufacturer', 'PUT', manufacturer);

}

async function deleteManufacturer(manufacturerId){

    return await Request('manufacturer?manufacturerId='+manufacturerId, 'DELETE');

}

export {fetchManufacturerList, saveManufacturer, fetchManufacturerDetails, updateManufacturer, deleteManufacturer}