import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './confirm-email-page.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '@context/AuthContext';
import VerificationInput from 'react-verification-input';
import { confirmEmailRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '@context/LoaderContext';
import { PATH } from '../../router';
import { ErrorIcon } from '@app/assets/icons/close-icon/error-icon.tsx';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';
import { InfoIcon } from '@app/assets/icons/close-icon/info-icon.tsx';

export const ConfirmEmailPage = () => {
    const navigate = useNavigate();

    const { email } = useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [errorStatus, setErrorStatus] = useState(false);
    const [value, setValue] = useState('');

    return (
        <ScreenWrapper>
            <ModalWrapper modalWrapperStales={styles.wrapper}>
                {!errorStatus ? <InfoIcon /> : <ErrorIcon />}
                <div className={styles.title}>
                    Введите код <br />
                    для восстановления аккаунта
                </div>
                <div className={styles.message}>
                    {`Мы отправили вам на e-mail ${email}`}
                    <br />
                    шестизначный код. Введите его в поле ниже.
                </div>

                <VerificationInput
                    inputProps={{
                        'data-test-id': 'verification-input',
                    }}
                    classNames={{
                        container: `${styles.secretCod}`,
                        character: `${
                            !errorStatus ? styles.numberWrapper : styles.numberWrapperError
                        }`,
                        characterInactive: `${styles.number}`,
                        characterSelected: `${styles.selected}`,
                        characterFilled: `${styles.characterFilled}`,
                    }}
                    placeholder=''
                    value={value}
                    onChange={(data) => {
                        setValue(data);
                        console.log('data', data);
                    }}
                    onComplete={(code: string) => {
                        showLoader();
                        confirmEmailRequest(email, code)
                            .then(() => {
                                navigate(PATH.CHANGE_PASSWORD);
                            })
                            .catch(() => {
                                setValue('');
                                setErrorStatus(true);
                            })
                            .finally(hideLoader);
                    }}
                />

                <div className={styles.text}>Не пришло письмо? Проверьте папку Спам.</div>
            </ModalWrapper>
        </ScreenWrapper>
    );
};
