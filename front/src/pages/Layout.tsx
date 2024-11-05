import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <main className="mt-16 flex flex-1 justify-center bg-gray-100">
      {children}
    </main>
  );
};
