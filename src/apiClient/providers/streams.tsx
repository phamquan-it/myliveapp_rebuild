import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import axiosInstance from "../axiosConfig";
import { getMaxResolutionFormat } from "@/helpers/youtubefilterlink";
import { message } from "antd";

const useCheckLink = (form: any, setLinkState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const token = getCookie('token');

    return useMutation({
        mutationKey: ['checklink'],
        mutationFn: (data: any) =>
            axiosInstance.get('/autolive-control/get-video-metadata', {
                params: { source_link: data },
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: (res) => {
            const resolution = `${res.data[0].width}x${res.data[0].height}`;
            setLinkState(true);
        },
        onError: () => {
            setLinkState(false);
        },
    });
};

const useGoogleDriveCheckLink = (form: any, setLinkState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const token = getCookie('token');

    return useMutation({
        mutationKey: ['googledrivechecklink'],
        mutationFn: (data: any) =>
            axiosInstance.get('/autolive-control/get-google-drive-video-metadata', {
                params: { source_link: data },
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: (res) => {
            const { width, height } = res.data?.videoMediaMetadata
            const resolution = `${width}x${height}`;
            console.log(resolution)
            setLinkState(true);
        },
        onError: (err) => {
            setLinkState(false);
            form.setFieldsValue({ resolution: '' });
        },
    });
};

const useYoutubeCheckLink = (form: any, setLinkState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const token = getCookie('token');
    return useMutation({
        mutationKey: ['youtubechecklink'],
        mutationFn: (data: any) =>
            axiosInstance.get('/youtubedl', {
                params: { youtube_link: data },
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: (res) => {
            setLinkState(true);
            console.log(res.data?.data)
        },
        onError: (err) => {
            setLinkState(false);
            console.error(err.message)
        },
    });
};

export {
    useCheckLink,
    useGoogleDriveCheckLink,
    useYoutubeCheckLink
}
