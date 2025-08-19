import axios from "axios";

export default async function translateText(text, lang, target){

    var result = "";

    await axios.post("http://localhost:5000/translate", {
        "q": text,
        "source": lang,
        "target": target,
        "format": "text"
    })
    .then((response) => {
        console.log(response);
        
        result = response.data
    })
    .catch((error) => {
        console.log(error);
    })

    console.log(result);
    
    return result;

}