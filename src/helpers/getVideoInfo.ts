import { RcFile } from "antd/es/upload";

const getVideoProperties = (file: RcFile): Promise<{ width: number; height: number; duration: number }> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        // When metadata is loaded, we get the resolution and duration
        video.onloadedmetadata = () => {
            const width = video.videoWidth;
            const height = video.videoHeight;
            const duration = video.duration;
            resolve({ width, height, duration });
        };

        video.onerror = () => {
            reject(new Error("Failed to load video metadata"));
        };

        // Load the video file as a source URL
        video.src = URL.createObjectURL(file);

        // Clean up the object URL after the video loads
        video.onloadeddata = () => {
            URL.revokeObjectURL(video.src);
        };
    });
};

const getFileExtension = (file: RcFile): string => {
    return file.name.split('.').pop() || '';
};
export {
    getVideoProperties,
    getFileExtension
}
