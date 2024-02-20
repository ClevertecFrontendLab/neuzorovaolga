import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './change-password-page.module.css';
import { Button, Form, Input } from 'antd';

import { changePasswordRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface FormData {
    password: string;
    confirmPassword: string;
}

export const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { rechangePassword, changeRechangePassword, password, changePassword } =
        useContext(AuthContext);

    const handleChangePassword = (password: string, confirmPassword: string) => {
        changePasswordRequest(password, confirmPassword)
            .then(() => {
                navigate('/result/success-change-password');
            })
            .catch(() => {
                navigate('/result/error-change-password');
            });
    };

    const onFinish = ({ password, confirmPassword }: FormData) => {
        changePassword(password);
        handleChangePassword(password, confirmPassword);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const regex = (value: string) => {
        const regexValue = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
        const result = regexValue.test(value);
        return result;
    };

    useEffect(() => {
        console.log('useEffect', rechangePassword);
        if (rechangePassword) {
            changeRechangePassword(false);
            handleChangePassword(password, password);
        }
    }, [rechangePassword, password]);

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <div className={styles.title}>Восстановление аккаунта</div>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: '100%', height: 320 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item<FormData>
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: '',
                            },

                            {
                                validator: (_, value) =>
                                    value && regex(value)
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                          ),
                            },
                        ]}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password
                            data-test-id='change-password'
                            placeholder='Новый пароль'
                            size='large'
                            style={{ width: 368, fontSize: '15px' }}
                        />
                    </Form.Item>

                    <Form.Item<FormData>
                        name='confirmPassword'
                        dependencies={['password']}
                        rules={[
                            { required: true, message: '' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Пароли не совпадают');
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            data-test-id='change-confirm-password'
                            placeholder='Повторите пароль'
                            size='large'
                            style={{ width: 368, fontSize: '15px' }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 360 }}>
                        <Button
                            data-test-id='change-submit-button'
                            type='primary'
                            htmlType='submit'
                            block
                            size='large'
                            style={{ marginTop: 38 }}
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ScreenWrapper>
    );
};
