import { createContext, useContext, useState } from "react";
import { UserProps } from "../constants/loginProps";

type UserAuthenticationContextProps = {
 currentUser: UserProps | null;
 setCurrentUser: (loggedInUser: UserProps | null) => void;
};

const UserAuthenticationContext = createContext<UserAuthenticationContextProps>(
 {
  currentUser: null,
  setCurrentUser: () => {},
 }
);

export function UserAuthenticationProvider({ children }: any): JSX.Element {
 const [user, setUser] = useState<UserProps | null>(null);

 const setCurrentUser = (loggedInUser: UserProps | null) => {
  setUser(loggedInUser);
 };

 const value: UserAuthenticationContextProps = {
  currentUser: user,
  setCurrentUser,
 };

 return (
  <UserAuthenticationContext.Provider value={value}>
   {children}
  </UserAuthenticationContext.Provider>
 );
}

export const useCurrentSearchResult = () => {
 return useContext(UserAuthenticationContext);
};
