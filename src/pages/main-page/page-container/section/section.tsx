import { useContext } from 'react';
import { Main } from './main/main';
import styles from './section.module.css';
import { Footer } from './footer/footer';
import { GlobalContext } from '../../../../context/GlobalContext';
import useWindowDimensions from '@hooks/useWindowDimensions';

export const Section = () => {
    const { width } = useWindowDimensions();
    const isTablet = width < 1440 && width > 833;
    const { collapsed } = useContext(GlobalContext);
    return (
        <div className={isTablet && collapsed ? styles.wrapperShort : styles.wrapper}>
            <Main />
            <Footer />
        </div>
    );
};
