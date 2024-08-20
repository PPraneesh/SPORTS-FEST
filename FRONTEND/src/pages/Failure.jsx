import { useLocation } from "react-router-dom"
function Failure(){
    const location = useLocation();
    console.log(location.state);

    return (
        <div>
            <h1>Failure</h1>
            <p>{location.state?.error}</p>
            <p>{location.state?.reason}</p>
        </div>
    )
}
export default Failure;