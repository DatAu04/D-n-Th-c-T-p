import styles from './Logo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Logo = () => {
    return (
        <>
            <div className={styles.logo}>
                <div className={styles.logoImage}>
                    <img src="/images/logo.jpg" alt="" />
                    <p>QuikFin</p>
                </div>
                <div className={styles.logoIcon}>
                    <span>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Logo;
