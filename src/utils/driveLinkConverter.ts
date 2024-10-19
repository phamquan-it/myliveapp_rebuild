// utils/driveLinkConverter.js
export const convertGoogleDriveLinkToDownload = (viewLink: string) => {
    // Extract the file ID from the view link
    const fileIdMatch = viewLink.match(/\/d\/(.*?)\//);
    if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        // Return the direct download link
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return null;
};

export const getGoogleDriveKey = (url: string) => {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\//;
    const match = url.match(regex);

    if (match && match[1]) {
        return match[1]; // Return the file key
    } else {
        return null; // Return null if the URL doesn't match the pattern
    }
}

