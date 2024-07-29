import axios from "axios";
import { WEBDOCK_TOKEN } from "../../WEBDOCK_PROVIDER/constant/Token";

const Test = () => {

    const url = 'https://api.webdock.io/v1/account/scripts';
    const data = {
        name: "test",
        filename: "test",
        content: "test"
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${WEBDOCK_TOKEN}`, // Replace with your actual token
            'Cookie': 'CONCRETE5=5bsp9n17e5tvc4i2ih8ar21q54'
        }
    };

    axios.post(url, data, config)
        .then(response => {
            console.log('Response data:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return (
        <>
        test script
        </>
    );
}
export default Test