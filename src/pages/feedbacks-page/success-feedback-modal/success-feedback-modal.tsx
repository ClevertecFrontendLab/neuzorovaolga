import styles from './success-feedback-modal.module.css';
import { Button } from 'antd';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';
import { SuccessIcon } from '@app/assets/icons/close-icon/success-icon.tsx';

type Props = {
    handleClose: () => void;
};

export const SuccessFeedbackModal = ({ handleClose }: Props) => (
    <ModalWrapper>
        <div className={styles.content}>
            <SuccessIcon />
            <div className={styles.title}>Отзыв успешно опубликован</div>
            <Button
                type='primary'
                block
                size='large'
                onClick={handleClose}
                className={styles.button}
            >
                Отлично
            </Button>
        </div>
    </ModalWrapper>
);
