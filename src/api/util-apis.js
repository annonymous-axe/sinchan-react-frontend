async function fetchDistrictList(){
    
    var districtList = null;

    await fetch("http://localhost:8080/district/list", {
        method: 'GET'
    })
    .then(resonse => {

        if(resonse.ok){
            districtList = resonse.json();
        }else{
            console.log('error : '+resonse);
        }
        
    })

    return districtList
}

async function fetchTehsilList(districtId){

    var tehsilList = null;

    await fetch("http://localhost:8080/tehsil/list?districtId="+districtId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resonse => {

        if(resonse.ok){
            tehsilList = resonse.json();
        }else{
            console.log('error : '+resonse);
        }
        
    })

    return tehsilList

}

export {fetchDistrictList, fetchTehsilList};