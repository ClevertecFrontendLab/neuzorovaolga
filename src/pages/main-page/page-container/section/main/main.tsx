import React, { useContext } from 'react';

import styles from './main.module.css';
import { CardAction } from './card-action/card-action';
import { CalendarTwoTone, HeartFilled, SolutionOutlined } from '@ant-design/icons';
import { GlobalContext } from '../../../../../context/GlobalContext';
import useWindowDimensions from '@hooks/useWindowDimensions';

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
    const { width } = useWindowDimensions();
    const isTablet = width < 1440 && width > 833;
    const { collapsed } = useContext(GlobalContext);
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
            <div className={isTablet && collapsed ? styles.cardShort : styles.card}>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </div>
            <div className={styles.cardsActionWrapper}>
                {cards.map(({ icon, iconTitle, title }) => (
                    <CardAction icon={icon} iconTitle={iconTitle} title={title} />
                ))}
            </div>
        </div>
    );
};
