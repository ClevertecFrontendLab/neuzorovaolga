import { Input, InputNumber } from 'antd';
import styles from './exercise-item.module.css';
import { Exercise } from '@models/trainings';
import { ChangeEvent, ChangeEventHandler } from 'react';

type Props = {
    item: Exercise;
    index: number;
    handleChangeExercise: (item: Exercise, index: number) => void;
};

export const ExerciseItem = ({ item, index, handleChangeExercise }: Props) => {
    const handleChangeReplays = (replays: number | null) => {
        handleChangeExercise({ ...item, replays: replays || 0 }, index);
    };
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        handleChangeExercise({ ...item, name: event.target.value || '' }, index);
    };
    const handleChangeWeight = (weight: number | null) => {
        handleChangeExercise({ ...item, weight: weight || 0 }, index);
    };
    const handleChangeApproaches = (approaches: number | null) => {
        handleChangeExercise({ ...item, approaches: approaches || 0 }, index);
    };

    return (
        <div>
            <Input placeholder='Упражнение' onChange={handleChangeName} value={item.name} />
            <div className={styles.exercises}>
                <div>
                    <div>Подходы</div>
                    <InputNumber
                        value={item.replays}
                        addonBefore='+'
                        min={1}
                        type='number'
                        onChange={handleChangeReplays}
                    />
                </div>
                <div className={styles.exercisesCount}>
                    <div>
                        <div>Вес, кг</div>
                        <InputNumber
                            value={item.weight}
                            min={0}
                            type='number'
                            onChange={handleChangeWeight}
                        />
                    </div>
                    <div>
                        <div>Количество</div>
                        <InputNumber
                            value={item.approaches}
                            min={1}
                            type='number'
                            onChange={handleChangeApproaches}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
