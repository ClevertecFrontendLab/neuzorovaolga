import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { BackIcon } from '@app/assets/icons/close-icon/back-icon';
import styles from './create-trainee.module.css';
import Empty from '../../../assets/img/empty-image.png';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showDrawer } from '@redux/calendar/reducer';

export const CreateTrainee = ({ handleClose, date }: any) => {
    const dispatch = useDispatch();
    const [isCreateTrainee, setIsCreateTrainee] = useState(false);
    const exercises = [
        {
            _id: '1',
            name: 'Силовая',
            replays: 0,
            weight: 0,
            approaches: 0,
            isImplementation: false,
        },
        {
            _id: '2',
            name: 'Кардио',
            replays: 0,
            weight: 0,
            approaches: 0,
            isImplementation: false,
        },
        {
            _id: '3',
            name: 'Руки',
            replays: 0,
            weight: 0,
            approaches: 0,
            isImplementation: false,
        },
        {
            _id: '4',
            name: 'Грудь',
            replays: 0,
            weight: 0,
            approaches: 0,
            isImplementation: false,
        },
        {
            _id: '5',
            name: 'Спина',
            replays: 0,
            weight: 0,
            approaches: 0,
            isImplementation: false,
        },
        {
            _id: '6',
            name: 'Ноги',
            replays: 0,
            weight: 0,
            approaches: 0,
            isImplementation: false,
        },
    ];
    const handleButton = () => {
        setIsCreateTrainee(true);
    };

    const handleOpenDrawer = () => {
        dispatch(showDrawer());
    };

    return (
        <div className={styles.wrapper}>
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
                            style={{ width: 220 }}
                            bordered={false}
                            options={[
                                {
                                    value: 'Силовая',
                                    label: 'Силовая',
                                },
                                {
                                    value: 'Кардио',
                                    label: 'Кардио',
                                },
                                {
                                    value: 'Руки',
                                    label: 'Руки',
                                },
                                {
                                    value: 'Грудь',
                                    label: 'Грудь',
                                },
                                {
                                    value: 'Спина',
                                    label: 'Спина',
                                },
                                {
                                    value: 'Ноги',
                                    label: 'Ноги',
                                },
                            ]}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button onClick={handleOpenDrawer}>Добавить упражнения</Button>
                        <Button type='text' disabled>
                            Сохранить
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
