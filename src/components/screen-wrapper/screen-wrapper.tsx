import styles from './screen-wrapper.module.css';

interface Props {
    children: React.ReactNode;
}

export const ScreenWrapper = ({ children }: Props) => {
    return (
        <div className={styles.style}>
            {/* <div className={styles.background}></div> */}
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};
