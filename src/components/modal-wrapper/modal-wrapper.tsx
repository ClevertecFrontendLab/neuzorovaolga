import styles from './modal-wrapper.module.css';
import classnames from 'classnames';
import { Modal } from 'antd';

interface Props {
    children: React.ReactNode;
    modalWrapperStales?: string;
}

export const ModalWrapper = ({ children, modalWrapperStales }: Props) => {
    return (
        <div className={classnames(styles.wrapper)}>
            <Modal open closable={false} footer={null} className={modalWrapperStales}>
                {children}
            </Modal>
        </div>
    );
};
