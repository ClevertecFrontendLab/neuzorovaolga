import styles from './error-feedback-modal.module.css';
import { Button } from 'antd';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';
import { ErrorIcon } from '@app/assets/icons/close-icon/error-icon.tsx';

type Props = {
    handleClose: () => void;
    handleRepeat: () => void;
};

export const ErrorFeedbackModal = ({ handleRepeat, handleClose }: Props) => (
    <ModalWrapper>
        <div className={styles.content}>
            <ErrorIcon />
            <div className={styles.title}>Данные не сохранились</div>
            <div className={styles.message}>Что-то пошло не так. Попробуйте еще раз.</div>
            <div className={styles.buttonsWrapper}>
                <Button
                    type='primary'
                    block
                    size='large'
                    onClick={handleRepeat}
                    data-test-id='write-review-not-saved-modal'
                    className={styles.button}
                >
                    Написать отзыв
                </Button>
                <Button
                    type='primary'
                    block
                    size='large'
                    onClick={handleClose}
                    className={styles.cancelButton}
                >
                    Закрыть
                </Button>
            </div>
        </div>
    </ModalWrapper>
);
