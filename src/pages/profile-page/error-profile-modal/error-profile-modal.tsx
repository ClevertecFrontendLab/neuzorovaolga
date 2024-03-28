import { Button } from 'antd';
import styles from './error-profile-modal.module.css';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper';

type Props = {
    handleButton: () => void;
    title: string;
    message: string;
};

export const ErrorProfileModal = ({ handleButton, title, message }: Props) => {
    return (
        <ModalWrapper width={'384'}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <CloseCircleTwoTone twoToneColor='#eb2f96' style={{ fontSize: '24px' }} />
                        <div className={styles.content}>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.message}>{message}</div>
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
