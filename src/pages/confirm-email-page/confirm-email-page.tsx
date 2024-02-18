import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import InfoIcon from './../../assets/img/info-icon.png';
import ErrorIcon from './../../assets/img/error-icon.png';
import styles from './confirm-email-page.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import VerificationInput from 'react-verification-input';
import { confirmEmailRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export const ConfirmEmailPage = () => {
    const { loginEmail } = useContext(AuthContext);
    const [errorStatus, setErrorStatus] = useState(false);
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                {!errorStatus ? <img src={InfoIcon} /> : <img src={ErrorIcon} />}
                <div className={styles.title}>
                    Введите код <br />
                    для восстановления аккаунта
                </div>
                <div className={styles.message}>
                    {`Мы отправили вам на e-mail ${loginEmail}`}
                    <br />
                    шестизначный код. Введите его в поле ниже.
                </div>

                <VerificationInput
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
                        confirmEmailRequest(loginEmail, code)
                            .then(() => {
                                navigate('/auth/change-password');
                            })
                            .catch((error) => {
                                console.log('error', error);
                                setValue('');
                                setErrorStatus(true);
                            });
                    }}
                />

                <div className={styles.message}>Не пришло письмо? Проверьте папку Спам.</div>
            </div>
        </ScreenWrapper>
    );
};
