import { useContext, useState } from 'react';
import FullLogoSrc from '../../../assets/img/full-logo.png';
import ShortLogoSrc from '../../../assets/img/short-logo.png';
import styles from './menu.module.css';

import {
    CalendarTwoTone,
    HeartFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SolutionOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import useWindowDimensions from '@hooks/useWindowDimensions.ts';
import { MenuItem } from '@pages/main-page/menu/menu-item/menu-item';
import ExitSrc from '../../../assets/img/exit.png';
import { GlobalContext } from '@context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@app/router';
import { removeTokenHelper } from '@utils/storage';
import { getTrainingsRequest } from '@app/api/training';
import { LoaderContext } from '@context/LoaderContext';
import { ServerErrorModal } from '@components/server-error-modal/server-error-modal';
import { useDispatch } from 'react-redux';
import { setTrainings } from '@redux/calendar/reducer';
import moment from 'moment';

export const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;
    const { collapsed, showMenu, hideMenu, logOut } = useContext(GlobalContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [isServerErrorModal, setIsServerErrorModal] = useState(false);

    const handleServerError = () => {
        setIsServerErrorModal(true);
    };

    const handleCloseServerErrorModal = () => {
        setIsServerErrorModal(false);
    };

    const handleCalendar = () => {
        showLoader();
        getTrainingsRequest()
            .then((trainingsResponse) => {
                dispatch(
                    setTrainings(
                        trainingsResponse.map((item) => ({
                            ...item,
                            date: moment(item.date).format('DD.MM.yyyy'),
                        })),
                    ),
                );
                navigate(PATH.CALENDAR);
            })
            .catch(handleServerError)
            .finally(hideLoader);
    };

    const actionButtons = [
        {
            key: '1',
            icon: (
                <CalendarTwoTone
                    twoToneColor='#061178'
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Календарь',
            handleClick: handleCalendar,
            testId: 'menu-button-calendar',
        },
        {
            key: '2',
            icon: (
                <HeartFilled
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Тренировки',
        },
        {
            key: '3',
            icon: (
                <TrophyFilled
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Достижения',
        },
        {
            key: '4',
            icon: (
                <SolutionOutlined
                    style={{
                        color: '#061178',
                    }}
                />
            ),
            label: 'Профиль',
        },
    ];

    const handleLogOut = () => {
        logOut();
        removeTokenHelper();
        navigate(PATH.AUTH);
    };

    return (
        <div className={styles.menuWrapper}>
            <div className={collapsed ? styles.menuContentCollapsed : styles.menuContent}>
                <div className={styles.menu}>
                    <div className={styles.logoWrapper}>
                        {!collapsed && <img className={styles.logo} src={FullLogoSrc} />}
                        {collapsed && !isMobile && (
                            <img className={styles.logo} src={ShortLogoSrc} />
                        )}
                    </div>
                    <div className={styles.tabs}>
                        {actionButtons.map(({ icon, label, key, handleClick, testId }) => (
                            <MenuItem
                                key={key}
                                icon={icon}
                                label={label}
                                collapsed={collapsed}
                                handleClick={handleClick}
                                testId={testId}
                            />
                        ))}
                    </div>

                    <div className={styles.exitWrapper}>
                        <div className={styles.exitButtonWrapper}>
                            <MenuItem
                                icon={<img src={ExitSrc} />}
                                label='Выход'
                                collapsed={collapsed}
                                handleClick={handleLogOut}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className={styles.trigger}
                    data-test-id={!isMobile ? 'sider-switch' : 'sider-switch-mobile'}
                    onClick={collapsed ? showMenu : hideMenu}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </div>
            {isServerErrorModal && (
                <ServerErrorModal
                    handleButton={handleCloseServerErrorModal}
                    isModal
                    data-test-id='modal-no-review'
                />
            )}
        </div>
    );
};
