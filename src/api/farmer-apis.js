import Request from "./api-request";

async function fetchFarmerList(){

    var farmerList = null;
    await fetch('http://localhost:8080/farmer/list', {
        method: 'GET',
    }).then(response => {
        if(response.ok){
            farmerList = response.json();
        }else{
            console.error("Error : "+response.status);
            return null;
        }
    })

    return farmerList;
}

function saveFarmer(farmer){

    fetch('http://localhost:8080/farmer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(farmer)
    }).then(response => {
        
        if(response.ok){
            console.log("Farmed saved!");
        }
        
    })

}

async function fetchFarmerDetails(farmerId){

    var farmer = null;

    await fetch('http://localhost:8080/farmer/'+farmerId,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok){
            farmer = response.json();
        }else{
            console.log("Error : "+response.status);
        }
    })

    return farmer

}

function updateFarmer(farmer){

    fetch('http://localhost:8080/farmer', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(farmer)
    }).then(response => {
        
        if(response.ok){
            console.log("Farmed updated!");
        }
        
    })

}

async function deleteFarmer(farmerId){

    await fetch('http://localhost:8080/farmer?farmerId='+farmerId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        
        if(response.ok){
            console.log("Farmed deleted!");
        }
        
    })

}



export {fetchFarmerList, saveFarmer, fetchFarmerDetails, updateFarmer, deleteFarmer}