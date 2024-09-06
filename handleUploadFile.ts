
import axiosInstance from '@/apiClient/axiosConfig';
import dayjs from 'dayjs';

export interface Response {
    key: string;
    content_type: string;
    extension: string;
}

export interface GetLinkUploadPayload {
    key: string;
    content_type: string;
}

export interface GetLinkUploadResponse {
    key: string;
    content_type: string;
    url: string;
}

export async function handleUploadFile(
    file: File,
    rootFolder: string,
    fileName?: string,
    extension?: string
): Promise<Response> {
    const date = dayjs().format('YYYYMMDDHhmmss');
    const payload: GetLinkUploadPayload = {
        key: `${rootFolder}/${date}_filename_example`,
        content_type: file.type,
    };

    try {
        const response = await axiosInstance.post<GetLinkUploadResponse>(
            '/file/get-link-upload',
            payload
        );

        const { key, url, content_type } = response.data;

        const result: Response = {
            key,
            content_type: content_type,
            extension: extension ?? file?.name?.split?.('.')?.pop?.() ?? '',
        };

        await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(result);
                } else {
                    reject(
                        new Error(
                            `Failed to upload file. Status: ${xhr.status}`
                        )
                    );
                }
            };
            xhr.onerror = () => {
                reject(new Error('Failed to upload file. Network error.'));
            };
            xhr.send(file);
        });

        return result;
    } catch (error) {
        
        return {
            key: '',
            content_type: '',
            extension: '',
        };
    }
}