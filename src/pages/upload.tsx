
import { PlusOutlined } from '@ant-design/icons';
import { Image, Modal, Upload, UploadFile, UploadProps } from 'antd';
// import Image from 'next/image';
import { useState } from 'react';

const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

interface ImageUploadProps extends UploadProps {
    value?: any;
}

const ImageUpload = ({
    value,
    onChange,
    maxCount = 1,
    disabled,
}: ImageUploadProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<undefined | string>('');
    const [previewTitle, setPreviewTitle] = useState<undefined | string>('');
    const fileList = value?.fileList || [];

    // Prevent upload action
    function beforeUpload() {
        return false;
    }

    function handleCancel() {
        setPreviewOpen(false);
    }

    async function handlePreview(file: UploadFile) {
        if (!file.url && !file.preview) {
            file.preview = (await getBase64(file.originFileObj)) as string;
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name ||
                file.url?.slice(
                    file.url?.lastIndexOf('/') + 1,
                    file.url?.indexOf('?')
                )
        );
    }

    return (
        <>
            <Upload
                fileList={fileList}
                beforeUpload={beforeUpload}
                listType="picture-card"
                onChange={onChange}
                onPreview={handlePreview}
                accept="image/*"
                disabled={disabled}
            >
                {(fileList.length < maxCount && (
                    <div>
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            {('common.upload')}
                        </div>
                    </div>
                )) ||
                    null}
            </Upload>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                width={500}
                className="top-10"
            >
                <Image
                    alt="thumbnail"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                    // width={1400}
                    // height={1000}
                />
            </Modal>
        </>
    );
};

export default ImageUpload;
