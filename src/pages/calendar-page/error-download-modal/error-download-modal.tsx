import { Button } from 'antd';
import styles from './error-download-modal.module.css';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper';
import { getTrainingsListRequest } from '@app/api/training';
import { useDispatch } from 'react-redux';
import { setTrainingsList } from '@redux/calendar/reducer';

type Props = {
    handleButton: () => void;
};

export const ErrorDownloadModal = ({ handleButton }: Props) => {
    const dispatch = useDispatch();

    const handleRepeatedRequest = () => {
        // getTrainingsListRequest().then((data) => {
        //     dispatch(setTrainingsList(data));
        //     handleButton();
        // });
    };
    return (
        <ModalWrapper width={'384'}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <CloseCircleTwoTone style={{ fontSize: '24px' }} />
                        <div className={styles.content}>
                            <div
                                className={styles.title}
                                data-test-id='modal-error-user-training-title'
                            >
                                {`При открытии данных
                                произошла ошибка`}
                            </div>
                            <div
                                className={styles.message}
                                data-test-id='modal-error-user-training-subtitle'
                            >
                                Попробуйте еще раз
                            </div>
                        </div>
                    </div>
                    <CloseOutlined
                        onClick={handleButton}
                        data-test-id='modal-error-user-training-button-close'
                    />
                </div>
                <div className={styles.wrapperButton}>
                    <Button
                        data-test-id='modal-error-user-training-button'
                        type='primary'
                        size='large'
                        className={styles.button}
                        onClick={handleRepeatedRequest}
                    >
                        Обновить
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
};
