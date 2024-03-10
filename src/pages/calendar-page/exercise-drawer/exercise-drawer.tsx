import { hideDrawer } from '@redux/calendar/reducer';
import { selectIsDrawer, selectSelectedTraining } from '@redux/calendar/selectors';
import { Badge, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './exercise-drawer.module.css';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { Exercise } from './exercise/exercise';

export const ExerciseDrawer = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const selectedTraining = useSelector(selectSelectedTraining);

    const onClose = () => {
        dispatch(hideDrawer());
    };
    return (
        <Drawer
            placement='right'
            closable={false}
            onClose={onClose}
            open={isDrawer}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div>+ Добавление упражнений</div>
                    <CloseIcon />
                </div>
                <div className={styles.trainingInfo}>
                    <Badge status={'success'} text={selectedTraining?.name} />
                    <div>{selectedTraining?.date}</div>
                </div>
                <Exercise />
                <button className={styles.button}>+ Добавить еще </button>
            </div>
        </Drawer>
    );
};
