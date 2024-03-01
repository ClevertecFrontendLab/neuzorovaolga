import React, { useState } from 'react';
import styles from './feedbacks-card.module.css';
import { Avatar, Rate } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
    id: string;
    fullName: string | null;
    imageSrc: React.ReactNode | null;
    message: string | null;
    rating: number;
    createdAt: string;
}

export const FeedbacksCard = ({ id, fullName, imageSrc, message, rating, createdAt }: Props) => {
    const [value, setValue] = useState(rating);
    const getTime = (data: any) => {
        const date = new Date(data);
        const day = date.getDate();

        const month = date.getMonth() + 1;

        const year = date.getFullYear();

        return `${day.toString().length < 2 ? '0' + day : day}.${
            month.toString().length < 2 ? '0' + month : month
        }.${year}`;
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                {/* <div className={styles.photo}>{imageSrc}</div> */}
                <Avatar size={42} icon={<UserOutlined />} />
                <div>Вероника Киверова</div>
            </div>
            <div>
                <div className={styles.rate}>
                    <Rate style={{ fontSize: '14px' }} value={value} />
                    <div style={{ paddingLeft: '16px', paddingTop: '2px' }}>
                        {getTime(createdAt)}
                    </div>
                </div>
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    );
};
