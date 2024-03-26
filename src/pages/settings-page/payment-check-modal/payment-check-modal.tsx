import styles from './payment-check-modal.module.css';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';
import { SuccessBlueIcon } from '@app/assets/icons/close-icon/success-blue-icon.tsx';

import { CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '@redux/user/selectors';
import { useContext } from 'react';
import { GlobalContext } from '@context/GlobalContext';
import { removeTokenHelper } from '@utils/storage';
import { PATH } from '@app/router';
import { useNavigate } from 'react-router-dom';

export const PaymentCheckModal = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(GlobalContext);
    const userEmail = useSelector(selectUserEmail);

    const handleLogOut = () => {
        logOut();
        removeTokenHelper();
        navigate(PATH.AUTH);
    };

    return (
        <ModalWrapper>
            <div className={styles.content}>
                <CloseOutlined onClick={handleLogOut} className={styles.closeButton} />
                <SuccessBlueIcon />
                <div className={styles.title}>Чек для оплаты у вас на почте</div>
                <div className={styles.message}>
                    Мы отправили инструкцию для оплаты вам на e-mail
                    <b> {`${userEmail}`}</b>. После подтверждения оплаты войдите
                    <br /> в приложение заново.
                </div>
                <div className={styles.text}>{`Не пришло письмо? Проверьте папку Спам`}</div>
            </div>
        </ModalWrapper>
    );
};
