const calculateResolutionArea = (width: any, height: any) => {
    return width && height ? width * height : 0;
};

// Function to get the max resolution format
const getMaxResolutionFormat = (formats: any[]) => {
    if (!Array.isArray(formats) || formats.length === 0) return null;

    return formats.reduce((maxFormat, currentFormat) => {
        const maxResolutionArea = calculateResolutionArea(maxFormat.width, maxFormat.height);
        const currentResolutionArea = calculateResolutionArea(currentFormat.width, currentFormat.height);
        return currentResolutionArea > maxResolutionArea ? currentFormat : maxFormat;
    });
};

const getManifestUrls = (formats:any[]) => {
  if (!Array.isArray(formats)) return null; // Check if formats is an array

  return formats
    .map((format) => format.manifest_url)
    .filter((url) => url); // Filters out undefined or null manifest URLs
};

const getManifestUrl = (formats: any[]) => {
  if (!Array.isArray(formats)) return null; // Ensure formats is an array

  const manifestObject = formats.find((format) => format.manifest_url); // Find first object with manifest_url
  return manifestObject ? manifestObject.manifest_url : null; // Return the manifest_url if found, otherwise null
};


export {
    calculateResolutionArea,
    getMaxResolutionFormat,
    getManifestUrls,
    getManifestUrl
}
