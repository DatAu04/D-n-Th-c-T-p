/* eslint-disable react/prop-types */
import { TOKEN_STORAGE_KEY } from '../../constants';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLogin = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!isLogin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
