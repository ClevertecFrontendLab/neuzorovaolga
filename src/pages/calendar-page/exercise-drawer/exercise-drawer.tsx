import { hideDrawer, updateExercises } from '@redux/calendar/reducer';
import { selectIsDrawer, selectSelectedTraining } from '@redux/calendar/selectors';
import { Badge, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './exercise-drawer.module.css';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { ExerciseItem } from './exercise-item/exercise-item';
import { useState } from 'react';
import { Exercise } from '@models/trainings';

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
                {exercises.map((item, index) => (
                    <ExerciseItem
                        item={item}
                        index={index}
                        handleChangeExercise={handleChangeExercise}
                    />
                ))}
                <button className={styles.button} onClick={handleAddNew}>
                    + Добавить еще
                </button>
            </div>
        </Drawer>
    );
};
