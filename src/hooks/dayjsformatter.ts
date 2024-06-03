import dayjs from "dayjs";
import { useRouter } from "next/router"

const format = (dateTime:string, language:string)=>{
    return dayjs(dateTime).format((language == "vi")?"DD/MM/YYYY":"YYYY/MM/DD")
}
export default format;