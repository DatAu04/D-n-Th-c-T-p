import styles from './SideBar.module.scss';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
import Support from './Support/Support';

const SideBar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.menu}>
                    <Menu />
                </div>
                <div className={styles.support}>
                    <Support />
                </div>
            </div>
        </>
    );
};

export default SideBar;
