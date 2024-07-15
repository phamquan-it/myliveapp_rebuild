import {AxiosInstance} from "axios"
//getData
export const GetData = async (axiosClient: AxiosInstance, accessURL: string, params: any, token: string) => {
    return await axiosClient.get(accessURL, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
//postData
export const PostData = async(axiosClient: AxiosInstance, accessURL: string, body: any, token: string) => {
    const url = accessURL;
              const headers = {
                  Authorization: 'Bearer '+token,
                  Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
              };
          
    return await axiosClient.post(url, body, { headers });
}

//patch data
export const PatchData = async (axiosClient: AxiosInstance, accessURL: string, body: any, token: string) => {
    const url = accessURL;
    const headers = {
        Authorization: `Bearer ${token}`,
        Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
    };

    return await axiosClient.patch(url, body, { headers });
}


// deleteData
export const DeleteData = async (axiosClient: AxiosInstance, accessURL: string, token: string) => {
    const url = accessURL;
    const headers = {
        Authorization: `Bearer ${token}`,
        Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
    };

    return await axiosClient.delete(url, { headers });
}