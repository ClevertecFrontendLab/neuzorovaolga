import { useState } from 'react';
import 'antd/dist/antd.css';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './user-photo.module.css';
import { useSelector } from 'react-redux';
import { selectUserImageSrc } from '@redux/user/selectors';

type Props = {
    showErrorProfileModal: () => void;
    handleSaveImage: (url: string) => void;
    isMobile: boolean;
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

export const UserPhoto = ({ showErrorProfileModal, handleSaveImage, isMobile }: Props) => {
    const userImageSrc = useSelector(selectUserImageSrc);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const token = sessionStorage.getItem('token');
    const errorFile: UploadFile = {
        uid: '-5',
        name: 'image.png',
        status: 'error',
    };
    const defaultFile: UploadFile = {
        uid: '-1',
        name: 'user.png',
        status: 'done',
        url: userImageSrc,
    };
    const [fileList, setFileList] = useState<UploadFile[]>(userImageSrc ? [defaultFile] : []);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const maxFileSize = 5 * 1024 * 1024; // Максимальный размер файла 5 МБ

    const handleBeforeUpload = (file: RcFile) => {
        if (file.size > maxFileSize) {
            return false; // Отклоняем загрузку файла
        }
        return true; // Разрешаем загрузку файла
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
        if (file.status === 'done') {
            handleSaveImage(`https://training-api.clevertec.ru${file.response.url}`);
        }
        if ((newFileList[0]?.size || 0) < maxFileSize) {
            setFileList(newFileList);
        } else {
            showErrorProfileModal();
            setFileList([errorFile]);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className={styles.photoText}>Загрузить фото профиля</div>
        </div>
    );

    const mobileUploadButton = (
        <div className={styles.upload}>
            <div className={styles.uploadText}>Загрузить фото профиля:</div>
            <Button className={styles.uploadButton} size='large' icon={<UploadOutlined />}>
                Загрузить
            </Button>
        </div>
    );
    return (
        <>
            <Upload
                action='https://marathon-api.clevertec.ru/upload-image'
                headers={{ Authorization: `Bearer ${token}` }}
                listType={isMobile ? 'picture' : 'picture-card'}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleBeforeUpload}
            >
                {(fileList.length > 0 || isMobile ? null : uploadButton) ||
                    (isMobile && fileList.length < 1 && mobileUploadButton)}
            </Upload>

            {!isMobile && (
                <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                    <img alt='example' style={{ width: '100%' }} src={previewImage} />
                </Modal>
            )}
        </>
    );
};
