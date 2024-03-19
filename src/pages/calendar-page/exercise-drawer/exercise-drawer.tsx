import { hideDrawer, updateExercises } from '@redux/calendar/reducer';
import { selectIsDrawer, selectSelectedTraining } from '@redux/calendar/selectors';
import { Badge, Button, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './exercise-drawer.module.css';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { ExerciseItem } from './exercise-item/exercise-item';
import { useState } from 'react';
import { Exercise } from '@models/trainings';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import useWindowDimensions from '@hooks/useWindowDimensions';

const DEFAULT_EXERCISE = {
    name: '',
    replays: 1,
    weight: 0,
    approaches: 1,
    isImplementation: false,
};

export const ExerciseDrawer = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const selectedTraining = useSelector(selectSelectedTraining);

    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const [exercises, setExercises] = useState(
        !selectedTraining?.exercises?.length ? [DEFAULT_EXERCISE] : selectedTraining?.exercises,
    );

    const handleChangeExercise = (item: Exercise, index: number) => {
        const newExercises = exercises.map((exercise, exerciseIndex) => {
            if (index === exerciseIndex) {
                return item;
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const handleAddNew = () => {
        setExercises([...exercises, DEFAULT_EXERCISE]);
    };

    const onClose = () => {
        dispatch(updateExercises(exercises.filter((item) => item.name)));
        dispatch(hideDrawer());
    };
    return (
        <Drawer
            data-test-id='modal-drawer-right'
            className={styles.drawer}
            placement={isMobile ? 'bottom' : 'right'}
            closable={false}
            onClose={onClose}
            open={isDrawer}
            getContainer={false}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div>+ Добавление упражнений</div>
                    <div onClick={onClose} data-test-id='modal-drawer-right-button-close'>
                        <CloseIcon />
                    </div>
                </div>
                <div className={styles.trainingInfo}>
                    <Badge status={'success'} text={selectedTraining?.name} />
                    <div>{selectedTraining?.date}</div>
                </div>
                <div className={styles.exerciseWrapper}>
                    {exercises.map((item, index) => (
                        <ExerciseItem
                            item={item}
                            index={index}
                            handleChangeExercise={handleChangeExercise}
                        />
                    ))}
                </div>
                <Button className={styles.button} onClick={handleAddNew} icon={<PlusOutlined />}>
                    Добавить ещё
                </Button>
            </div>
        </Drawer>
    );
};
