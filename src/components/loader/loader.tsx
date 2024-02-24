import Lottie from 'lottie-react';
import loaderAnimation from '../../assets/animation/loader.json';

import styles from './loader.module.css';
import classNames from 'classnames';

interface IProps {
    loaderStatus: boolean;
}

export const Loader = ({ loaderStatus }: IProps) => {
    return (
        <div className={classNames(styles.wrapper, loaderStatus && styles.display)}>
            <Lottie
                data-test-id='loader'
                animationData={loaderAnimation}
                className={styles.lottie}
                loop={true}
            />
        </div>
    );
};
