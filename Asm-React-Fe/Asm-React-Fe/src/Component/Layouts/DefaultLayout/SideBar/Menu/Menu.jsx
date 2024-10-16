import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoiceDollar,
    faBug,
    faList,
    faCoins,
    faBullseye,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Menu = () => {
    const itemMenu = [
        {
            icon: faList,
            name: 'DashBoard',
            path: '/dashBoard',
        },
        {
            icon: faFileInvoiceDollar,
            name: 'TranckExpenses',
            path: '/trackExpenses',
        },
        {
            icon: faBug,
            name: 'BudgetSettings',
            path: '/budget',
        },
        {
            icon: faCoins,
            name: 'CostOverview',
            path: '/costOverview',
        },
        {
            icon: faBullseye,
            name: 'DailyCost',
            path: '/dailyCost',
        },
    ];
    return (
        <>
            {itemMenu.map((item, index) => (
                <div className={`${styles.listMenu}`} key={index}>
                    <ul>
                        <li>
                            <span>
                                <FontAwesomeIcon icon={item.icon} />
                            </span>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    </ul>
                </div>
            ))}
        </>
    );
    
};

export default Menu;
