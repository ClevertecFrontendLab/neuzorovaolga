import styles from './screen-wrapper.module.css';

interface Props {
    children: React.ReactNode;
    className: string;
}

export const ScreenWrapper = ({ children }: Props) => {
    return <ScreenWrapper className={styles.wrapper}>{children}</ScreenWrapper>;
};
