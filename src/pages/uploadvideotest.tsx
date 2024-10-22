import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { handleUploadFile } from '../../handleUploadFile';
export const customUploadFile = async (fileList: any, setUploading: any) => {
    if (fileList.length === 0) {
        message.error('No file selected');
        return;
    }

    const file = fileList[0]; // Taking the first file

    setUploading(true);

    try {
        const response = await handleUploadFile(file, 'video-uploads');
        if (response.key) {
            message.success('Upload successful!');
        } else {
            message.error('Upload failed');
        }
    } catch (error) {
        message.error('Error uploading video');
    } finally {
        setUploading(false);
    }
};
const VideoUploader = () => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);



    const props = {
        onRemove: (file: any) => {
            setFileList((prevFileList) => {
                const index = prevFileList.indexOf(file);
                const newFileList = prevFileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
        beforeUpload: (file: File) => {
            setFileList([file]); // Allow only one file
            return false; // Prevent automatic upload
        },
        fileList,
    };
    const handleUpload = () => {
        customUploadFile(fileList, setUploading)
    }
    return (
        <div>
            <Upload {...props} accept="video/*">
                <Button icon={<UploadOutlined />}>Select Video</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </div>
    );
};

export default VideoUploader;

