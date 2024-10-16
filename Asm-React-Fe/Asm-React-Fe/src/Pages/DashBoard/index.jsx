import styles from './DashBoard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';

const DashBoard = () => {
    return (
        <>
            <div className={styles.app}>
                <header className={styles.appHeader}>
                    <h1>DashBoard</h1>
                </header>
                <main className={styles.appMain}>
                    <section className={styles.expenseTracking}>
                        <h2>TranckExpenses</h2>
                        <button className={styles.btnAdd}>Thêm Chi Phí</button>
                        <button className={styles.btnEdit}>
                            Chỉnh Sửa Chi Phí
                        </button>
                        <button className={styles.btnCategorize}>
                            Phân Loại Chi Phí
                        </button>
                        {/* Thêm danh sách chi phí ở đây */}
                    </section>

                    <section className={styles.budgetSettings}>
                        <h2>BudgetSettings</h2>
                        <button className={styles.btnSetBudget}>
                            Đặt Ngân Sách
                        </button>
                        <button className={styles.btnAdjustBudget}>
                            Điều Chỉnh Ngân Sách
                        </button>
                        {/* Thêm cài đặt ngân sách ở đây */}
                    </section>

                    <section className={styles.expenseSummary}>
                        <h2>CostOverview</h2>
                        <div className={styles.summaryDetails}>
                            <p>
                                <strong>Tổng Chi Tiêu:</strong> 0 VND
                            </p>
                            <p>
                                <strong>Ngân Sách Còn Lại:</strong> 0 VND
                            </p>
                            <p>
                                <strong>Phân Tích Theo Danh Mục:</strong>
                            </p>
                            {/* Thêm biểu đồ hoặc phân tích ở đây */}
                        </div>
                        <button className={styles.btnViewTrends}>
                            Xem Xu Hướng Chi Phí
                        </button>
                    </section>

                    <section className={styles.recurringExpenses}>
                        <h2>DailyCost</h2>
                        <button className={styles.btnAddRecurring}>
                            Thêm Chi Phí Định Kỳ
                        </button>
                        {/* Thêm danh sách chi phí thường xuyên ở đây */}
                    </section>
                </main>
            </div>
        </>
    );
};

export default DashBoard;
