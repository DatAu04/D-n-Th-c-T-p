import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { privateRouter, publicRouter } from './Routes/index.jsx';
import { DefaultLayout } from './Component/Layouts';
import PrivateRoute from './Component/PrivateRoute/index.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRouter.map((item, index) => {
                    const Layout = item.layout ? item.layout : DefaultLayout;
                    const Page = item.component;
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {privateRouter.map((item, index) => {
                    const Layout = item.layout ? item.layout : DefaultLayout;
                    const Page = item.component;
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
