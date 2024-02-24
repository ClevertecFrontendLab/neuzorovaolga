import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import InfoIcon from './../../assets/img/info-icon.png';
import ErrorIcon from './../../assets/img/error-icon.png';
import styles from './confirm-email-page.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import VerificationInput from 'react-verification-input';
import { confirmEmailRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '../../context/LoaderContext';
import { PATH } from '../../router';

export const ConfirmEmailPage = () => {
    const navigate = useNavigate();

    const { email } = useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [errorStatus, setErrorStatus] = useState(false);
    const [value, setValue] = useState('');

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                {!errorStatus ? <img src={InfoIcon} /> : <img src={ErrorIcon} />}
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
                    data-test-id='verification-input'
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
                            .catch((error) => {
                                setValue('');
                                setErrorStatus(true);
                            })
                            .finally(hideLoader);
                    }}
                />

                <div className={styles.message}>Не пришло письмо? Проверьте папку Спам.</div>
            </div>
        </ScreenWrapper>
    );
};
