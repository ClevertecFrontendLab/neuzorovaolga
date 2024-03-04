import styles from './page-container.module.css';
import { Header } from './header';
import { Section } from './section/section';

export const PageContainer = () => (
    <div className={styles.wrapper}>
        <Header />
        <Section />
    </div>
);
