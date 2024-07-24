import { WEBDOCK_TOKEN } from "../constant/Token";

const webdockConfig = {
    headers:{
      "Authorization":`Bearer ${WEBDOCK_TOKEN}`,
      "Cookie": 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr'
    }
  }

  export {
    webdockConfig
  }