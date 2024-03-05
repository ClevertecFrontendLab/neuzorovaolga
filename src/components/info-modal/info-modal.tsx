import { Button } from 'antd';
import styles from './info-modal.module.css';
import classNames from 'classnames';
import { ErrorIcon } from '@app/assets/icons/close-icon/error-icon.tsx';
import { SuccessIcon } from '@app/assets/icons/close-icon/success-icon.tsx';
import { WarningIcon } from '@app/assets/icons/close-icon/warning-icon.tsx';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';

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

export const InfoModal = ({
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
        error: <ErrorIcon />,
        success: <SuccessIcon />,
        warning: <WarningIcon />,
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
