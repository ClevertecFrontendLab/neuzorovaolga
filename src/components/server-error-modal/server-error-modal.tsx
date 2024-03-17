import styles from './server-error-modal.module.css';
import { Button } from 'antd';
import ServerErrorSrc from '../../assets/img/server-error.png';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';

type Props = {
    handleButton: () => void;
    isModal?: boolean;
    textError?: string;
};
export const ServerErrorModal = ({ handleButton, isModal, textError, ...props }: Props) => (
    <>
        {isModal ? (
            <ModalWrapper modalWrapperStales={styles.wrapper} {...props}>
                <img src={ServerErrorSrc} alt='error' />
                <div className={styles.title}>Что-то пошло не так</div>
                <div className={styles.message}>
                    {textError || 'Произошла ошибка, попробуйте ещё раз.'}
                </div>
                <Button
                    type='primary'
                    size='large'
                    onClick={handleButton}
                    data-test-id='check-back-button'
                >
                    Назад
                </Button>
            </ModalWrapper>
        ) : (
            <div className={styles.wrapper}>
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
            </div>
        )}
    </>
);
