import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Layout from "./components/Layout";
import LoginMainComponent from "./components/login/Login";
import PageNotFound404 from "./components/404";
import Dashboard from "./components/dashboard/Dashboard";
import HeaderComponent from "./components/Header";
import {
	UserAuthenticationProvider,
	useCurrentSearchResult,
} from "./hooks/userAuthentication";
import { UserProps } from "./constants/loginProps";

const Home = () => {
	const useCurrentSearchResultContext = useCurrentSearchResult();
	const [user, setUser] = useState<UserProps | null>(null);
	const history = useHistory();

	useEffect(() => {
		setUser(useCurrentSearchResultContext.currentUser);
	}, [useCurrentSearchResultContext.currentUser]);

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
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					WELCOME {user ? user.username : <></>}
				</h2>
				<div className="mt-6">
					<button
						onClick={handleUserStart}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Click to start
					</button>
				</div>
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
						<Route exact path="/dashboard" component={Dashboard} />
						<Route component={PageNotFound404} />
					</Switch>
				</UserAuthenticationProvider>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
