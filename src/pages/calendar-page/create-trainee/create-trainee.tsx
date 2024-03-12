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
import useWindowDimensions from '@hooks/useWindowDimensions';
import { EditOutlined } from '@ant-design/icons';
import { createTrainingRequest } from '@app/api/training';

type Props = {
    handleClose: () => void;
    date: string;
    isRightPosition?: boolean;
    dateISO: string;
};

export const CreateTrainee = ({ handleClose, date, isRightPosition, dateISO }: Props) => {
    const dispatch = useDispatch();
    const trainingsList = useSelector(selectTrainingsList);
    const selectedTraining = useSelector(selectSelectedTraining);
    const [isCreateTrainee, setIsCreateTrainee] = useState(false);
    const desktopPositionStyles = isRightPosition ? styles.right : styles.left;

    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const handleButton = () => {
        setIsCreateTrainee(true);
    };

    const handleOpenDrawer = () => {
        dispatch(showDrawer());
    };

    const handleSelectTrainingName = (value: string) => {
        dispatch(
            selectTraining({ name: value, date: date, isImplementation: false, exercises: [] }),
        );
    };

    const handleSaveTraining = () => {
        selectedTraining &&
            createTrainingRequest({ ...selectedTraining, date: dateISO }).then((data) =>
                console.log(data),
            );
    };

    return (
        <div className={classnames(styles.wrapper, !isMobile && desktopPositionStyles)}>
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
                            disabled={!!selectedTraining?.exercises?.length}
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
                    {selectedTraining?.exercises.map((item) => (
                        <div className={styles.userExercisesWrapper}>
                            <div className={styles.userExercises}>{item.name}</div>
                            <div className={styles.change} onClick={handleOpenDrawer}>
                                <EditOutlined />
                            </div>
                        </div>
                    ))}
                    <div className={styles.buttons}>
                        <Button onClick={handleOpenDrawer} disabled={!selectedTraining}>
                            Добавить упражнения
                        </Button>
                        <Button
                            type='text'
                            disabled={!selectedTraining?.exercises?.length}
                            className={styles.buttonSave}
                            onClick={handleSaveTraining}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
