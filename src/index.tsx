import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from './redux/configure-store';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';

import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import '../src/styles/colors.css';
import '../src/styles/variables.css';
import { Router } from './router';
import { GlobalProvider } from '@context/GlobalContext';
import { AuthProvider } from '@context/AuthContext';
import { LoaderProvider } from '@context/LoaderContext';
import dayjs from 'dayjs';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
moment.locale('ru');
dayjs.locale('ru');

const customLocale: Locale = {
    ...locale,
    DatePicker: {
        lang: {
            ...locale?.DatePicker?.lang,
            shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ],
        },
        // week: { ...locale.week, firstDayOfWeek: 1 },
        timePickerLocale: { ...locale?.DatePicker?.timePickerLocale },
    },
};

root.render(
    <React.StrictMode>
        <LoaderProvider>
            <ConfigProvider locale={customLocale}>
                <GlobalProvider>
                    <AuthProvider>
                        <Provider store={store}>
                            <HistoryRouter history={history}>
                                <Router />
                            </HistoryRouter>
                        </Provider>
                    </AuthProvider>
                </GlobalProvider>
            </ConfigProvider>
        </LoaderProvider>
    </React.StrictMode>,
);
