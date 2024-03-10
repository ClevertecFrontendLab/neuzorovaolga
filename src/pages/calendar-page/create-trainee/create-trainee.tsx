import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { BackIcon } from '@app/assets/icons/close-icon/back-icon';
import classnames from 'classnames';
import styles from './create-trainee.module.css';
import Empty from '../../../assets/img/empty-image.png';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectTraining, showDrawer } from '@redux/calendar/reducer';
import { useSelector } from 'react-redux';
import { selectSelectedTraining, selectTrainingsList } from '@redux/calendar/selectors';

type Props = {
    handleClose: () => void;
    date: string;
    isRightPosition: boolean;
};

export const CreateTrainee = ({ handleClose, date, isRightPosition }: Props) => {
    const dispatch = useDispatch();
    const trainingsList = useSelector(selectTrainingsList);
    const selectedTraining = useSelector(selectSelectedTraining);
    const [isCreateTrainee, setIsCreateTrainee] = useState(false);

    const handleButton = () => {
        setIsCreateTrainee(true);
    };

    const handleOpenDrawer = () => {
        dispatch(showDrawer());
    };

    const handleSelectTrainingName = (value: string) => {
        console.log(value);
        dispatch(
            selectTraining({ name: value, date: date, isImplementation: false, exercises: [] }),
        );
    };

    return (
        <div className={classnames(styles.wrapper, isRightPosition ? styles.right : styles.left)}>
            {!isCreateTrainee && (
                <div>
                    <div className={styles.top}>
                        <div>
                            <div className={styles.title}>{`Tренировки на ${date}`}</div>
                            <div className={styles.message}>Нет активных тренировок</div>
                        </div>
                        <CloseIcon handleClick={handleClose} />
                    </div>
                    <div className={styles.logo}>
                        <img src={Empty} />
                    </div>
                    <Button
                        type='primary'
                        size='large'
                        className={styles.button}
                        onClick={handleButton}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
            {isCreateTrainee && (
                <div>
                    <div className={styles.topSelect}>
                        <BackIcon handleClick={handleClose} />
                        <Select
                            defaultValue='Выбор типа тренировки'
                            onSelect={handleSelectTrainingName}
                            style={{ width: 220 }}
                            bordered={false}
                            options={trainingsList.map(({ name, key }) => ({
                                value: name,
                                label: name,
                            }))}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button onClick={handleOpenDrawer} disabled={!selectedTraining}>
                            Добавить упражнения
                        </Button>
                        <Button type='text' disabled>
                            Сохранить
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
