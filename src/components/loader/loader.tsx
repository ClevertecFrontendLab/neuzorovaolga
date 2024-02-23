import Lottie from 'lottie-react';
import loaderAnimation from '../../assets/animation/loader.json';

import styles from './loader.module.css';

export const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <Lottie
                data-test-id='loader'
                animationData={loaderAnimation}
                className={styles.lottie}
                loop={true}
            />
        </div>
    );
};
