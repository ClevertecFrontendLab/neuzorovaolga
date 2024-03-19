import { Checkbox, CheckboxProps, Input, InputNumber } from 'antd';
import styles from './exercise-item.module.css';
import CrossIcon from '../../../../assets/img/input.png';
import { Exercise } from '@models/trainings';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { selectIsEditTraining } from '@redux/calendar/selectors';

type Props = {
    item: Exercise;
    index: number;
    handleChangeExercise: (item: Exercise, index: number) => void;
};

export const ExerciseItem = ({ item, index, handleChangeExercise }: Props) => {
    const isEditTraining = useSelector(selectIsEditTraining);

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
    const handleChangeCheckbox: CheckboxProps['onChange'] = (event) => {
        handleChangeExercise({ ...item, checked: event.target.checked }, index);
    };

    return (
        <div className={styles.wrapper}>
            <Input
                placeholder='Упражнение'
                onChange={handleChangeName}
                value={item.name}
                data-test-id={`modal-drawer-right-input-exercise${index}`}
                addonAfter={
                    isEditTraining ? (
                        <Checkbox
                            checked={item.checked}
                            onChange={handleChangeCheckbox}
                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                        />
                    ) : undefined
                }
            />
            <div className={styles.exercises}>
                <div className={styles.replays}>
                    <div className={styles.text}>Подходы</div>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                        value={item.replays}
                        addonBefore='+'
                        min={1}
                        type='number'
                        onChange={handleChangeReplays}
                    />
                </div>
                <div className={styles.exercisesCount}>
                    <div className={styles.weight}>
                        <div className={styles.textWeight}>Вес, кг</div>
                        <div className={styles.marginCross}>
                            <InputNumber
                                data-test-id={`modal-drawer-right-input-weight${index}`}
                                value={item.weight}
                                min={0}
                                type='number'
                                onChange={handleChangeWeight}
                            />
                            <p className={styles.cross}>X</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.textApproaches}>Количество</div>
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-quantity${index}`}
                            defaultValue={1}
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
