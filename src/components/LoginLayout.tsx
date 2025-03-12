import { useOidc } from "@/oidc";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogInIcon } from "lucide-react";

export const LoginLayout = () => {
  const { isUserLoggedIn, login } = useOidc();
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full flex-col justify-center md:w-[600px]">
        <div className="flex min-h-screen flex-col justify-between">
          <div className="flex w-full items-center justify-between gap-2 p-2">
            <p className="text-xs">
              version: {import.meta.env.VITE_APP_VERSION}
            </p>
            <ThemeToggle />
          </div>

          <div className="px-10 pb-5">
            {/* <h1 className="bg-gradient-to-b from-slate-400 to-green-800 bg-clip-text py-5 text-7xl font-extrabold text-transparent"> */}
            <h1 className="py-5 text-5xl font-extrabold text-gray-700 dark:text-gray-300">
              Demo
            </h1>
            {!isUserLoggedIn && (
              <Button
                size={"lg"}
                onClick={() => login({ doesCurrentHrefRequiresAuth: false })}
              >
                <LogInIcon className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
          <div className="hidden h-20 md:block"></div>

          <h1 className="mx-20 block h-20 px-10 text-center text-3xl font-extrabold text-gray-700 md:hidden">
            MOSAIC Integration Demo
          </h1>
        </div>
      </div>

      <div
        className="hidden w-full items-center justify-center bg-cover bg-center md:flex"
        style={{ backgroundImage: "url('/images/bg.svg')" }}
      >
        <div className="flex flex-col items-center p-4">
          <img src="/images/logo.svg" alt="mosaic" width="500px" />
          <h1 className="text-center text-5xl font-extrabold leading-snug">
            MOSAIC Integration Demo
          </h1>
        </div>
      </div>
    </div>
  );
};
