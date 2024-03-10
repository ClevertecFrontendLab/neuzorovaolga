import { Button } from 'antd';
import styles from './error-download-modal.module.css';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper';

export const ErrorDownloadModal = () => {
    return (
        <ModalWrapper width={'384'}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <CloseCircleTwoTone style={{ fontSize: '24px' }} />
                        <div className={styles.content}>
                            <div className={styles.title}>
                                {`При открытии данных
                                произошла ошибка`}
                            </div>
                            <div className={styles.message}>Попробуйте еще раз</div>
                        </div>
                    </div>
                    <CloseOutlined />
                </div>
                <div className={styles.wrapperButton}>
                    <Button type='primary' size='large' className={styles.button}>
                        Обновить
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
};
