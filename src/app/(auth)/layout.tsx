import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
