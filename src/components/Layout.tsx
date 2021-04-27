import React, { ReactNode } from "react";

type Props = {
 children?: ReactNode;
 title?: string;
};

const Layout = ({
 children,
 title = "Your Personalized Weather Report",
}: Props) => {
 return <div className="min-h-screen bg-main font-test">{children}</div>;
};

export default Layout;
