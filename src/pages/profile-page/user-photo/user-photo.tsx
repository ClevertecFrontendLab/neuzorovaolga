import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './user-photo.module.css';

type Props = {
    showErrorsizeModal: () => void;
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => {
            reject(error);
        };
    });

export const UserPhoto = ({ showErrorsizeModal }: Props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [defaultList, setDefaultList] = useState<UploadFile[]>([
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [statusError, setStatusError] = useState(false);

    const handleError = () => {
        setStatusError(true);
    };
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList);
        if (newFileList[0]?.status !== 'error') {
            setFileList(newFileList);
            return fileList[0];
        } else {
            showErrorsizeModal();
            setFileList(defaultList);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className={styles.photoText}>Загрузить фото профиля</div>
        </div>
    );
    return (
        <>
            <Upload
                action='http://localhost:3000/profile'
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file) => {
                    return new Promise((resolve, reject) => {
                        console.log(file);
                        if (file.size < 60000) {
                            reject('file size big');
                        } else {
                            handleError();
                            resolve('success');
                        }
                    });
                }}
            >
                {fileList.length > 0 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
