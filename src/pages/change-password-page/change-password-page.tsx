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
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password
                            placeholder='Новый пароль'
                            size='large'
                            style={{ width: 368, fontSize: '15px' }}
                        />
                    </Form.Item>

                    <Form.Item<FormData>
                        name='confirmPassword'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            size='large'
                            style={{ width: 368, fontSize: '15px' }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 360 }}>
                        <Button
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
