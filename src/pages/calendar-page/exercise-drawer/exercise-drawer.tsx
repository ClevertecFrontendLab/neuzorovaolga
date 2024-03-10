import { hideDrawer } from '@redux/calendar/reducer';
import { selectIsDrawer } from '@redux/calendar/selectors';
import { Badge, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './exercise-drawer.module.css';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { Exercises } from './exercises/exercises';

export const ExerciseDrawer = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
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
                <div className={styles.badge}>
                    <Badge status={'success'} text={'item.content'} className={styles.badge} />
                    <div>19.01.2024</div>
                </div>
                <Exercises />
            </div>
        </Drawer>
    );
};
