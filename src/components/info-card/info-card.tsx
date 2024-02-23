import { Button } from 'antd';
import WarningIcon from './../../assets/img/warning-icon.png';
import SuccessfulIcon from './../../assets/img/successful-icon.png';
import ErrorIcon from './../../assets/img/error-icon.png';
import styles from './info-card.module.css';

interface Props {
    iconType: 'error' | 'success' | 'warning';
    title: string;
    message: string;
    buttonText: string;
    handleButton: () => void;
    dataTestId: string;
}

export const InfoCard = ({
    iconType,
    title,
    message,
    buttonText,
    handleButton,
    dataTestId,
}: Props) => {
    return (
        <div className={styles.wrapper}>
            {iconType === 'error' && <img className={styles.errorIcon} src={ErrorIcon} />}
            {iconType === 'success' && (
                <img className={styles.successfulIcon} src={SuccessfulIcon} />
            )}
            {iconType === 'warning' && <img className={styles.warningIcon} src={WarningIcon} />}
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>{message}</div>
            <Button
                type='primary'
                block
                size='large'
                onClick={handleButton}
                data-test-id={dataTestId}
            >
                {buttonText}
            </Button>
        </div>
    );
};
