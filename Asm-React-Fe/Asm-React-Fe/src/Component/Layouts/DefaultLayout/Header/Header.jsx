import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBell,
    faChevronDown,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
    TOKEN_STORAGE_KEY,
    USER_INFO_STORAGE_KEY,
} from '../../../../constants';

const Header = () => {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO_STORAGE_KEY));

    const onLogOut = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_INFO_STORAGE_KEY);

        window.location.href = '/login';
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerSearch}>
                    <div className={styles.searchContainer}>
                        <span className={styles.searchIcon}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search of type command"
                        />
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.notification}>
                        <span className={styles.notificationIcon}>
                            <FontAwesomeIcon icon={faBell} />
                        </span>
                    </div>
                    <div className={styles.user}>
                        <img src="/images/concho.jpg" alt="concho" />
                        <ul className={styles.userIcon}>
                            <li>
                                <Link to="">
                                    {userInfo.name}{' '}
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </Link>
                                <ul className={styles.userAccount}>
                                    {/* <li>
                                        <Link to="/login">Đăng nhập</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Đăng ký</Link>
                                    </li> */}
                                    <li>
                                        <div
                                            className={styles.userLogout}
                                            onClick={onLogOut}
                                        >
                                            Log Out
                                            <FontAwesomeIcon
                                                className={
                                                    styles.userIconlogout
                                                }
                                                icon={faArrowRightFromBracket}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
