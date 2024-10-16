import styles from './DailyCost.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const DailyCost = () => {
    const [recurringExpenses, setRecurringExpenses] = useState([
        { name: 'Tiền thuê nhà', amount: 5000000, startDate: '2024-01-01', endDate: '2024-12-31' },
        { name: 'Internet', amount: 200000, startDate: '2024-01-01', endDate: '2024-12-31' },
    ]);

    const handleAddExpense = () => {
        setRecurringExpenses([...recurringExpenses, { name: 'Chi phí mới', amount: 0, startDate: '', endDate: '' }]);
    };
    return (
        <>
             <div className={styles.container}>
            <h1>Chi Phí Thường Xuyên</h1>
            <div className={styles.scrollable}>
                <form id="recurring-expense-form">
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Tên chi phí:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="amount">Số tiền:</label>
                        <input type="number" id="amount" name="amount" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate">Ngày bắt đầu:</label>
                        <input type="date" id="startDate" name="startDate" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="endDate">Ngày kết thúc:</label>
                        <input type="date" id="endDate" name="endDate" required />
                    </div>
                    <button type="button" onClick={handleAddExpense}>Thêm chi phí</button>
                </form>
            </div>
            <div className={styles.scrollable}>
                <table className={styles.expenseTable}>
                    <thead>
                        <tr>
                            <th>Tên chi phí</th>
                            <th>Số tiền</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recurringExpenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.name}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.startDate}</td>
                                <td>{expense.endDate}</td>
                                <td>
                                    <button>Chỉnh sửa</button>
                                    <button>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default DailyCost;