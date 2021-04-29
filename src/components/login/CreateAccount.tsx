import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserProps, UserTypes } from "../../constants/loginProps";
import {
	useCurrentSearchResult
} from "../../hooks/userAuthentication";
import { LoginService } from '../../services/login';
import { UserDBService } from "../../utils/userDBController";

const CreateAccountComponent: React.FC = () => {
	const useCurrentSearchResultContext = useCurrentSearchResult();
	const [loginErrors, setLoginErrors] = useState([]);
	const [user, setUser] = useState<UserProps | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const history = useHistory();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<{
		email: string;
		password: string;
		username: string;
		type: UserTypes;
	}>();

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
			history.push('/login')
		}

	},[useCurrentSearchResultContext.currentUser, history]);

	const handleCreateAccount = handleSubmit(async (data) => {
		// clear loginErrors
		setLoginErrors([]);
		console.log('create user data start', data);
		const createUserAuthResult = await LoginService().createUser(data);

		if (createUserAuthResult?.hasOwnProperty("code")) {
      setLoginErrors(Object.values(createUserAuthResult)[1]);
    }
		console.log('create user data end', createUserAuthResult);
		//create db record for user
		if( createUserAuthResult !== null && createUserAuthResult?.id) {
			const createUserDBResult = await UserDBService().createUserRecord(createUserAuthResult);

			if( createUserDBResult !== undefined && createUserDBResult.username ) {
				history.push('/')
			}
		}
		// get user from DB
	});

	return (
		<div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			{isAdmin && user !== null ? <div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create Account for Users
					</h2>
				</div>

				{/* LOGIN FORM START */}
				<form className="mt-8 space-y-6">
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								id="username"
								type="text"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="User"
								{...register("username", {
									required: true,
								})}
							/>
						</div>
						<div>
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								id="email"
								type="text"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email"
								{...register("email", {
									required: true,
									pattern: {
										value: /\S+@\S+.\S+/,
										message: "Entered value does not match email format",
									},
								})}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								type="password"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								{...register("password", {
									required: true,
								})}
							/>
						</div>
						<div>
							<label htmlFor="select" className="sr-only">
								Select Type Of User
							</label>
							<select
								// id="password"
								// type="password"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Select Type of User"
								{...register("type", {
									required: true,
								})}
							>
								<option value={UserTypes.ADMIN}>Admin</option>
								<option value={UserTypes.NORMAL}>Normal</option>
							</select>
						</div>
						{errors?.username?.type === "required" && (
							<div className="mt-2 text-xs text-red-600">
								<p>Username is required</p>
							</div>
						)}
						{errors?.email?.type === "required" && (
							<div className="mt-2 text-xs text-red-600">
								<p>Email is required</p>
							</div>
						)}
						{errors.email && (
							<div className="mt-2 text-xs text-red-600">
								<p>{errors.email.message}</p>
							</div>
						)}
						{errors?.password?.type === "required" && (
							<div className="mt-2 text-xs text-red-600">
								<p>Password is required</p>
							</div>
						)}
						{errors?.type?.type === "required" && (
							<div className="mt-2 text-xs text-red-600">
								<p>Selecting the Type of user is required</p>
							</div>
						)}
					</div>

					{loginErrors.length > 0 ? (
						<div className="mt-2 text-xs text-red-600">
							<p>{loginErrors}</p>
						</div>
					) : (
						<></>
					)}

					{/* <div className="flex items-center justify-between">
						<div className="text-sm">
							<Link to={`${url}/forgetpassword`}>
								<span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
									Forgot your password?
								</span>
							</Link>
						</div>
					</div> */}

					<div>
						<button
							type="submit"
							onClick={handleCreateAccount}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign Up
						</button>
					</div>
				</form>
				{/* LOGIN FORM END */}
			</div> : 
			<div className="max-w-md w-full space-y-8">
				Oops. It seems like you do not have access here. 
				<p>You might be
					<Link to='/dashboard'>
						<span> looking for this  </span>
					</Link>
				</p>
			</div>
			}
			
		</div>
	);
};

export default CreateAccountComponent;
