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

