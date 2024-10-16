import styles from './DefaultLayout.module.scss';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.left}>
                    <SideBar />
                </div>
                <div className={styles.right}>
                    <div className={styles.header}>
                        <Header />
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
