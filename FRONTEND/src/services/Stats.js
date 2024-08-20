import axios from "axios";
export default function Stats() {
    let data = null;
    axios.get("http://localhost:3000/api/stats")
    .then((res)=>{
        data = res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}