import { Button, Input, InputNumber } from 'antd';
import styles from './exercises.module.css';

export const Exercises = () => {
    return (
        <div>
            <Input placeholder='Упражнение' />
            <div className={styles.exercises}>
                <div>
                    <div>Подходы</div>
                    <InputNumber addonBefore='+' placeholder={'1'} type='number' />
                </div>
                <div className={styles.exercisesCount}>
                    <div>
                        <div>Вес, кг</div>
                        <InputNumber placeholder={'0'} type='number' />
                    </div>
                    <div>
                        <div>Количество</div>
                        <InputNumber placeholder={'3'} type='number' />
                    </div>
                </div>
            </div>
            <button className={styles.button}>+ Добавить еще </button>
        </div>
    );
};
