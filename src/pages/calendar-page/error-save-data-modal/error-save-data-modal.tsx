import { Button } from 'antd';
import styles from './error-save-data-modal.module.css';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper';

type Props = {
    handleButton: () => void;
};

export const ErrorSaveDataModal = ({ handleButton }: Props) => {
    return (
        <ModalWrapper width={'384'}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <CloseCircleTwoTone twoToneColor='#eb2f96' style={{ fontSize: '24px' }} />
                        <div className={styles.content}>
                            <div className={styles.title}>
                                {`При сохранении данных произошла
                                ошибка`}
                            </div>
                            <div className={styles.message}>Попробуйте еще раз</div>
                        </div>
                    </div>
                </div>
                <div className={styles.wrapperButton}>
                    <Button
                        type='primary'
                        size='large'
                        className={styles.button}
                        onClick={handleButton}
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
};
