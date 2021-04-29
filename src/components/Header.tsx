import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentSearchResult } from "../hooks/userAuthentication";
import { UserProps } from "../constants/loginProps";
import { LoginService } from "../services/loginAuth";

const HeaderComponent = () => {
	const useCurrentSearchResultContext = useCurrentSearchResult();
	const [menuState, setMenuState] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [user, setUser] = useState<UserProps | null>(null);
	const history = useHistory();

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		if (screenWidth > 1024) {
			setMenuState(false);
		}
		setUser(useCurrentSearchResultContext.currentUser);
	}, [screenWidth, menuState, useCurrentSearchResultContext.currentUser]);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
	};

	const handleRoutingClick = (path: string) => {
		history.push(path);
	};

	const handleMenuClick = () => {
		setMenuState(!menuState);
	};

	const handleLogOut = () => {
		LoginService().logoutUser();
		useCurrentSearchResultContext.setCurrentUser(null);
		history.push('/');
	};

	return (
		<nav className="flex items-center justify-between flex-wrap bg-red-400 p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<div
					onClick={() => {
						handleRoutingClick("/");
					}}
				>
					<span className="font-semibold text-xl tracking-tight">U n Forms</span>
				</div>
			</div>
			<div className="block lg:hidden">
				<button
					onClick={handleMenuClick}
					className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
				>
					<svg
						className="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			{menuState ? (
				<></>
			) : (
				<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-right">
					<div className="text-sm lg:flex-grow">
						{user ? (
							<span
								onClick={handleLogOut}
								className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
							>
								Log Out
							</span>
						) : (
							<span
								onClick={() => {
									handleRoutingClick("/login");
								}}
								className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
							>
								Login
							</span>
						)}
						{user ? <span
							onClick={() => {
								handleRoutingClick("/dashboard");
							}}
							className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
						>
							Dashboard
						</span>:<></>}
						
					</div>
				</div>
			)}
		</nav>
	);
};

export default HeaderComponent;
