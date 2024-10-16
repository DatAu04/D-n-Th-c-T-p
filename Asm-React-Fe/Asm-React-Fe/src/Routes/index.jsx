import LoginLayout from '../Component/Layouts/LoginLayout/index.jsx';
import Login from '../Pages/Login/index.jsx';
import Signup from '../Pages/Signup/index.jsx';
import DashBoard from '../Pages/DashBoard/index.jsx';
import TrackExpenses from '../Pages/TrackExpenses/index.jsx';
import AddTrack from '../Pages/AddTrack/index.jsx';
import CostOverview from '../Pages/CostOverview/index.jsx';
import DailyCost from '../Pages/DailyCost/index.jsx';
import BudgetSettings from '../Pages/BudgetSettings/index.jsx';
import Setting from '../Pages/Setting/index.jsx';
import Help from '../Pages/Help/index.jsx';
import AddBudget from '../Pages/AddBudget/index.jsx';
import UpdateBudget from '../Pages/UpdateBudget/index.jsx';
import UpdateExpenses from '../Pages/UpdateExpenses/index.jsx';

const publicRouter = [
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/signup', component: Signup, layout: LoginLayout },
];

const privateRouter = [
    { path: '/', component: DashBoard },
    { path: '/dashBoard', component: DashBoard },

    { path: '/trackExpenses', component: TrackExpenses },
    { path: '/expenses/add', component: AddTrack },
    { path: '/expenses/:id/edit', component: UpdateExpenses },

    { path: '/costOverview', component: CostOverview },
    { path: '/dailyCost', component: DailyCost },

    { path: '/budget', component: BudgetSettings },
    { path: '/budget/add', component: AddBudget },
    { path: '/budget/:id/edit', component: UpdateBudget },

    { path: '/setting', component: Setting },
    { path: '/help', component: Help },
];

export { publicRouter, privateRouter };
