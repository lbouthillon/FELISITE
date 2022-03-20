import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './Desktop.css';

import isLogged from './utils/isLogged';
// import isValidated from './utils/isValidated';



import Accueil from './pages/accueil';
// import Rules from './pages/rules';
// import Story from './pages/Story';


import MenuLogged from './components/bar/navbarDLogged';
import Menu from './components/bar/navbarD';
// import MenuAdmin from './components/bar/navbarDAdmin';
import Activities from './pages/activities';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Profile from './pages/profile';
import LogoutComponent from './components/auth/logout.component';
import background from './img/background.png';
// import Users from './pages/users';
// import User from './pages/user';
// import Teams from './pages/teams';
// import Team from './pages/team';
// import Messages from './pages/message';
// import CreateTeam from './pages/createTeam';
// import KillFeed from './pages/killFeed';
// import Enigma from './pages/enigma';

// import Gestion from './pages/admin/gestion';
// import TeamsAdmin from './pages/admin/teams';
// import TeamAdmin from './pages/admin/team';
// import UserAdmin from './pages/admin/user';
// import UsersAdmin from './pages/admin/users';
// import MessagesAdmin from './pages/admin/message';
// import Kill from './pages/admin/kill';
// import KillFeedAdmin from './pages/admin/killFeed';
// import Afk from './pages/admin/afk';
// import Stats from './pages/admin/stats';

// import CreateUser from './components/user/createuser';
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";
// import PageSecrete from './pages/pageSecrete';
// import Reliques from './pages/Reliques';
// import Covelba from './pages/covelba';

function App() {
    // useEffect(() => {
    //     isValidated();
    // }, []);
    if (isLogged()) {
        // if (localStorage.getItem('admin') !== 'JOUEUR') {
        //     const Content = () => (
        //         <>
        //             <Route exact path="/" component={Accueil}/>
        //             <Route exact path="/admin/users/:id" component={UserAdmin}/>
        //             <Route exact path="/admin/users" component={UsersAdmin}/>
        //             <Route exact path="/users/:id" component={User}/>
        //             <Route exact path="/users" component={Users}/>
        //         </>
        //     );

        //     return (
        //         <Router>
        //             <MenuAdmin/>
        //             <Responsive
        //                 as="div"
        //                 minWidth={1201}
        //                 style={{
        //                     width: '60%',
        //                     marginLeft: '20%',
        //                     minHeight: '250px',
        //                 }}
        //             >
        //                 <Content/>
        //             </Responsive>
        //             <Responsive as="div" maxWidth={1200}>
        //                 <Content/>
        //             </Responsive>
        //         </Router>

        //     );
        // }

        const Content = () => (
            <>
                <Route exact path="/" component={Accueil}/>
                {/* <Route path="/logout" component={LogoutComponent}/>
                <Route path="/login/:token" component={LoginComponent}/> */}
                <Route exact path="/logout" component={LogoutComponent}/>
                <Route exact path="/activity" component={Activities}/>
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/signIn" component={SignIn}/>
                <Route exact path="/profile" component={Profile}/>
                {/* <Route exact path="/users/:id" component={User}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/createteam/" component={CreateTeam}/>
                <Route exact path="/teams/:id" component={Team}/>
                <Route exact path="/teams" component={Teams}/>
                <Route exact path="/killFeed" component={KillFeed}/>
                <Route exact path="/enigmas" component={Enigma}/>
                <Route exact path="/messages" component={Messages}/>
        <Route exact path="/rules" component={Rules}/> */}
                {/* <Route exact path="/story" component={Story}/> */}
                {/*<Route exact path="/salleDesMachines" component={PageSecrete}/>
                <Route exact path="/relique" component={Reliques}/>
                <Route exact path="/covelba" component={Covelba}/> */}
            </>
        );

        return (
            <Router>
                <MenuLogged/>
                <Responsive
                    as="div"
                    minWidth={1201}
                    style={{
                        width: '60%',
                        marginLeft: '20%',
                        minHeight: '250px',
                    }}
                >
                    <Content/>
                </Responsive>
                <Responsive as="div" maxWidth={1200}>
                    <Content/>
                </Responsive>
            </Router>
        );
    }
    const Content = () => (
        <>
            <Route exact path="/" component={Accueil}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/signIn" component={SignIn}/>
        </>
//     const Content = () => (
//         <>
//             <Route exact path="/" component={Accueil}/>
//             {/* <Route exact path="/rules" component={Rules}/>*/}
//             <Route exact path="/story" component={Story}/> 
//             <Route path="/logout" component={LogoutComponent}/>
//             <Route path="/login/:token" component={LoginComponent}/>
//             {/* <Route path="/createUser/:token" component={CreateUser}/> */}
//         </>
    );
    return (
        <div>
        <Router forceRefresh>
            <Menu/>
            <Responsive
                as="div"
                minWidth={1201}
                style={{
                    width: '60%',
                    marginLeft: '20%',
                    minHeight: '250px',
                }}
            >
                <Content/>
            </Responsive>
            <Responsive as="div" maxWidth={1200}>
                <Content/>
            </Responsive>
        </Router>
        
        </div>
    );
}

export default App;
