import styles from './Support.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Support = () => {
    const itemSupport = [
        {
            icon: faCircleQuestion,
            name: 'Help',
            path: '/help',
        },
        {
            icon: faGear,
            name: 'Setting',
            path: '/setting',
        },
    ];
    return (
        <>
            {itemSupport.map((item, index) => (
                
                    <div className={`${styles.listSupport}`} key={index}>
                        <ul>
                            <li>
                                <span>
                                    <FontAwesomeIcon icon={item.icon} />
                                </span>
                                <Link to={item.path}>
                                    {item.name}
                                </Link>
                            </li>
                        </ul>
                    </div>
                
            ))}
        </>
    );
};
export default Support;
