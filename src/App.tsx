import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory, Link } from "react-router-dom";
import Layout from "./components/Layout";
import LoginMainComponent from "./components/login/Login";
import PageNotFound404 from "./components/404";
import DashBoardMainComponent from "./components/dashboard/Dashboard";
import HeaderComponent from "./components/Header";
import {
	UserAuthenticationProvider,
	useCurrentSearchResult,
} from "./hooks/userAuthentication";
import { UserProps, UserTypes } from "./constants/loginProps";



const Home: React.FC = () => {
	const useCurrentSearchResultContext = useCurrentSearchResult();
	const [user, setUser] = useState<UserProps | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const history = useHistory();

	useEffect(() => {
		setUser(useCurrentSearchResultContext.currentUser);

		if (useCurrentSearchResultContext.currentUser !== null) {
			const userType = useCurrentSearchResultContext.currentUser.type;
			if (userType === UserTypes.ADMIN) {
				setIsAdmin(true);
			} else {
				setIsAdmin(false)
			}
		} else {
			setUser(null);
			setIsAdmin(false);
		}
	}, [useCurrentSearchResultContext.currentUser, isAdmin]);

	const handleUserStart = () => {
		if (user) {
			history.push("/dashboard");
		} else {
			history.push("/login");
		}
	};

	return (
		<div className="flex justify-center mt-8 pt-4">
			<div className="w-6/12">
				<h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
					WELCOME back {user ? <> {user.username}</>
					: <></>}
				</h2>
				<h4 className="mt-6 text-center text-sm font-bold text-purple-400">
					{user ? <>You are logged in with - {isAdmin ? <>ADMIN</> : <>NORMAL</>} Privileges</> : <></>}
				</h4>
				<div className="mt-6">
					<button
						onClick={handleUserStart}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Click to start
					</button>
				</div>
				{isAdmin ?
					<p className="mt-2 text-center text-sm text-gray-600">
						<Link to={`/login/createaccount`}>
							<span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
								Creating an account for a user? Click here!
							</span>
						</Link>
					</p> : <></>}
			</div>
		</div>
	);
};

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<UserAuthenticationProvider>
					<HeaderComponent />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login">
							<LoginMainComponent />
						</Route>
						<Route path="/dashboard">
							<DashBoardMainComponent/>							
						</Route>
						<Route component={PageNotFound404} />
					</Switch>
				</UserAuthenticationProvider>
			</Layout>
		</BrowserRouter>
	);
}

export default App;


