import { useState } from 'react';
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './user-photo.module.css';
import { useSelector } from 'react-redux';
import { selectUserImageSrc } from '@redux/user/selectors';

type Props = {
    showErrorsizeModal: () => void;
    handleSaveImage: (url: string) => void;
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

export const UserPhoto = ({ showErrorsizeModal, handleSaveImage }: Props) => {
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
            console.log(file.size);
            return false; // Отклоняем загрузку файла
        }
        console.log(file.size);
        return true; // Разрешаем загрузку файла
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
        console.log('newFileList', newFileList, file);
        if (file.status === 'done') {
            handleSaveImage(`https://training-api.clevertec.ru${file.response.url}`);
        }
        if ((newFileList[0]?.size || 0) < maxFileSize) {
            console.log(newFileList[0]?.size, newFileList[0]?.size || 0 < 400000);
            setFileList(newFileList);
        } else {
            console.log('newFileList');
            showErrorsizeModal();
            setFileList([errorFile]);
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
                action='https://marathon-api.clevertec.ru/upload-image'
                headers={{ Authorization: `Bearer ${token}` }}
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleBeforeUpload}
            >
                {fileList.length > 0 ? null : uploadButton}
            </Upload>

            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
