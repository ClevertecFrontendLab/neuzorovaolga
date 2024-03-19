import { hideDrawer, updateExercises } from '@redux/calendar/reducer';
import {
    selectIsDrawer,
    selectIsEditTraining,
    selectSelectedTraining,
} from '@redux/calendar/selectors';
import { Badge, Button, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './exercise-drawer.module.css';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { ExerciseItem } from './exercise-item/exercise-item';
import { useState } from 'react';
import { Exercise } from '@models/trainings';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useWindowDimensions from '@hooks/useWindowDimensions';

const DEFAULT_EXERCISE = {
    name: '',
    replays: 1,
    weight: 0,
    approaches: 1,
    isImplementation: false,
    checked: false,
};

export const ExerciseDrawer = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const selectedTraining = useSelector(selectSelectedTraining);
    const isEditTraining = useSelector(selectIsEditTraining);

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

    const handleDelete = () => {
        const updatedExercises = exercises.filter((item) => !item.checked);
        setExercises(updatedExercises.length ? updatedExercises : [DEFAULT_EXERCISE]);
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
                    <div>{!isEditTraining ? 'Добавление упражнений' : 'Редактирование'}</div>
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
                            key={`ExerciseItem-${index}`}
                            item={item}
                            index={index}
                            handleChangeExercise={handleChangeExercise}
                        />
                    ))}
                </div>
                <div className={styles.buttonWrapper}>
                    <Button
                        className={styles.button}
                        onClick={handleAddNew}
                        icon={<PlusOutlined />}
                    >
                        Добавить ещё
                    </Button>
                    {isEditTraining && (
                        <Button
                            className={styles.button}
                            onClick={handleDelete}
                            icon={<MinusOutlined />}
                            disabled={!exercises.some((item) => item?.checked)}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </div>
        </Drawer>
    );
};
