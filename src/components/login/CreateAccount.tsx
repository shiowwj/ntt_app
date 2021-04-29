import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserTypes } from "../../constants/loginProps";

const CreateAccountComponent: React.FC = () => {
	let { path, url } = useRouteMatch();
	const [loginErrors, setLoginErrors] = useState([]);
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

	const handleCreateAccount = handleSubmit(async (data) => {
		// clear loginErrors
		setLoginErrors([]);
		// const loginResult = await LoginService().loginUser(data);
		// get user from DB
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create an account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						<Link to={`${url}`}>
							<span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
								Have an Account? Sign in here
							</span>
						</Link>
					</p>
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
			</div>
		</div>
	);
};

export default CreateAccountComponent;
