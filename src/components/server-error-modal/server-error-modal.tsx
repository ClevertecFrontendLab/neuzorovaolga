import styles from './server-error-modal.module.css';
import { Button } from 'antd';
import ServerErrorSrc from '../../assets/img/server-error.png';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';

interface Props {
    handleButton: () => void;
    isModal?: boolean;
}
export const ServerErrorModal = ({ handleButton, isModal }: Props) => {
    const content = (
        <>
            <img src={ServerErrorSrc} alt='error' />
            <div className={styles.title}>Что-то пошло не так</div>
            <div className={styles.message}>
                Произошла ошибка, попробуйте отправить форму еще раз
            </div>
            <Button
                type='primary'
                size='large'
                onClick={handleButton}
                data-test-id='check-back-button'
            >
                Назад
            </Button>
        </>
    );
    return (
        <>
            {isModal ? (
                <ModalWrapper modalWrapperStales={styles.wrapper}>{content}</ModalWrapper>
            ) : (
                <div className={styles.wrapper}>{content}</div>
            )}
        </>
    );
};
