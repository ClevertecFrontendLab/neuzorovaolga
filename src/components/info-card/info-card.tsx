import { Button } from 'antd';
import WarningIcon from './../../assets/img/warning-icon.png';
import SuccessfulIcon from './../../assets/img/successful-icon.png';
import ErrorIcon from './../../assets/img/error-icon.png';
import styles from './info-card.module.css';
import classNames from 'classnames';

interface Props {
    iconType: 'error' | 'success' | 'warning';
    title: string;
    message: string;
    buttonText: string;
    handleButton: () => void;
    dataTestId: string;
    wrapperStyles?: string;
    buttonStyles?: string;
}

export const InfoCard = ({
    iconType,
    title,
    message,
    buttonText,
    handleButton,
    dataTestId,
    wrapperStyles,
    buttonStyles,
}: Props) => {
    const icon = {
        error: <img src={ErrorIcon} />,
        success: <img src={SuccessfulIcon} />,
        warning: <img src={WarningIcon} />,
    };

    return (
        <div className={classNames(styles.wrapper, wrapperStyles)}>
            {icon[iconType]}
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>{message}</div>
            <Button
                type='primary'
                block
                size='large'
                onClick={handleButton}
                data-test-id={dataTestId}
                className={classNames(styles.button, buttonStyles)}
            >
                {buttonText}
            </Button>
        </div>
    );
};
