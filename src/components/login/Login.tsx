import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { LoginService } from "../../services/login";
import { UserDBService } from "../../utils/userDBController";
import { useCurrentSearchResult } from "../../hooks/userAuthentication";
import CreateAccountComponent from "./CreateAccount";
import ForgetPasswordComponent from "./ForgetPassword";
// import { UserTypes } from '../../constants/loginProps';

const LoginFormComponent: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string; password: string }>();

  const [loginErrors, setLoginErrors] = useState([]);
  const useCurrentSearchResultContext = useCurrentSearchResult();
  const history = useHistory();
  /**
  // handle login, 
  // * if auth success 
  // * -> return user from db 
  // * -> redirect to dashboard page
 */
  const handleLogin = handleSubmit(async (data) => {
    // clear loginErrors
    setLoginErrors([]);
    const loginResult = await LoginService().loginUser(data);
    // check for login auth errors
    if (loginResult?.hasOwnProperty("code")) {
      setLoginErrors(Object.values(loginResult)[1]);
    }
    // get user from DB
    if (loginResult !== null && loginResult?.id) {
      const getUserDBResult = await UserDBService().getUser(loginResult);

      //  set user context
      // redirect to dashboard page
      if (getUserDBResult !== undefined && getUserDBResult.username) {
        useCurrentSearchResultContext.setCurrentUser(getUserDBResult);
        history.push('/');
      }
    }
  });

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
					</h2>

          
        </div>

        {/* LOGIN FORM START */}
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
            </div>
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
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
						</button>
          </div>
        </form>
        {/* LOGIN FORM END */}
      </div>
    </div>
  );
};

const LoginMainComponent: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <LoginFormComponent />
        </Route>
        <Route path={`${path}/createaccount`}>
          <CreateAccountComponent />
        </Route>
        <Route path={`${path}/forgetpassword`}>
          <ForgetPasswordComponent />
        </Route>
      </Switch>
    </>
  );
};

export default LoginMainComponent;
