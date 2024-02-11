import React from 'react';

import styles from './main.module.css';
import { CardAction } from './cardAction';
import { CalendarTwoTone, HeartFilled, SolutionOutlined } from '@ant-design/icons';

const cards = [
    {
        icon: <HeartFilled color='primary' />,
        iconTitle: 'Тренировки',
        title: 'Расписать тренировки',
    },
    {
        icon: <CalendarTwoTone twoToneColor='link' />,
        iconTitle: 'Календарь',
        title: 'Назначить календарь',
    },
    { icon: <SolutionOutlined color='link' />, iconTitle: 'Профиль', title: 'Заполнить профиль' },
];

export const Main: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.about}>
                С CleverFit ты сможешь:
                <br />— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                <br />— отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                с нормами и рекордами;
                <br />— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                тренировках;
                <br />— выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и советам профессиональных тренеров.
            </div>
            <div className={styles.card}>
                CleverFit — это не просто приложение, а твой личный помощник
                <br />
                в мире фитнеса. Не откладывай на завтра — начни тренироваться
                <br /> уже сегодня!
            </div>
            <div className={styles.cardsActionWrapper}>
                {cards.map(({ icon, iconTitle, title }) => (
                    <CardAction icon={icon} iconTitle={iconTitle} title={title} />
                ))}
            </div>
        </div>
    );
};
