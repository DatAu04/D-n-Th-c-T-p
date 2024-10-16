import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './CostOverview.module.scss';
import apiClient from '../../api/apiClient';
import { formatNumber } from '../../utils';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const CostOverview = () => {
    // Lấy dữ liệu chi phí
    const { data: expenses, refetch: refetchExpenses } = useQuery({
        queryKey: ['EXPENSES'],
        queryFn: () => apiClient.get('/expenses'),
    });

    // Lấy dữ liệu ngân sách
    const { data: budgets } = useQuery({
        queryKey: ['BUDGET'],
        queryFn: () => apiClient.get('/budgets'),
    });

    // Hàm xoá chi phí
    const mutation = useMutation({
        mutationFn: (id) => apiClient.delete(`/expenses/${id}`),
        onSuccess: () => {
            toast.success('Xoá thành công');
            refetchExpenses();
        },
    });

    // Xác nhận xoá chi phí
    const onDelete = (id) => {
        const isConfirm = confirm('Xác nhận xoá khoản chi?');

        isConfirm && mutation.mutate(id);
    };

    // Tính tổng chi tiêu
    const totalSpent = useMemo(() => {
        return expenses?.data?.reduce((total, item) => total + item.price, 0) || 0;
    }, [expenses]);

    // Tính ngân sách còn lại
    const remainingBudget = useMemo(() => {
        const totalBudget = budgets?.data?.reduce((total, budget) => total + budget.budget, 0) || 0;
        return totalBudget - totalSpent;
    }, [budgets, totalSpent]);

    // Phân tích chi tiêu theo danh mục
    const expenseByCategory = useMemo(() => {
        const categories = {};
        expenses?.data?.forEach(item => {
            if (!categories[item.budget.name]) {
                categories[item.budget.name] = 0;
            }
            categories[item.budget.name] += item.price;
        });
        return categories;
    }, [expenses]);

    // Dữ liệu xu hướng chi phí theo thời gian
    const trendData = useMemo(() => {
        const trend = {};
        expenses?.data?.forEach(item => {
            const date = dayjs(item.date).format('MM/YYYY');
            if (!trend[date]) {
                trend[date] = 0;
            }
            trend[date] += item.price;
        });
        return Object.keys(trend).map(date => ({ date, amount: trend[date] }));
    }, [expenses]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>CostOverview</h1>
                </div>

                {/* Tổng quan về chi phí */}
                <div className={styles.summary}>
                    <p><strong>Tổng chi tiêu:</strong> {formatNumber(totalSpent)}</p>
                    <p><strong>Ngân sách còn lại:</strong> {formatNumber(remainingBudget)}</p>
                    <h3>Chi tiêu theo danh mục:</h3>
                    <ul>
                        {Object.keys(expenseByCategory).map((category, index) => (
                            <li key={index}>{category}: {formatNumber(expenseByCategory[category])}</li>
                        ))}
                    </ul>
                </div>

                {/* Biểu đồ xu hướng chi phí */}
                
                <div className={styles.bar}>
                    <div className={styles.trendChart}>
                        <h3>Xu hướng chi phí theo thời gian:</h3>
                        <ResponsiveContainer width="100%" height={290}>
                            <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
                            <XAxis dataKey="date" tick={{ fill: '#8884d8', fontSize: 14 }} />
                            <YAxis tick={{ fill: '#8884d8', fontSize: 14 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                            <Legend verticalAlign="top" align="right" />
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CostOverview;
