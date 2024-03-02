import styles from './create-feedback-modal.module.css';

interface Props {
    children: React.ReactNode;
}

export const ModalWrapper = ({ children }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>{children}</div>
        </div>
    );
};
