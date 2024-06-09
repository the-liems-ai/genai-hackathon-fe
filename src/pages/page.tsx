"use client";
import { Pin } from "../components/ui/3d-pin";

const HomePage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black ">
      <Pin className="bg-[url('/bg.png')] bg-cover bg-center">
        <div className="flex basis-full flex-col mt-8 items-center justify-center tracking-tight text-slate-100/50 sm:basis-1/2 w-[60rem] h-[35rem]">
          <div className="w-[550px]">
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="text-slate-500 mt-10 text-lg font-normal uppercase flex items-center text-center justify-center">
            The Liems
          </div>
        </div>
      </Pin>
    </div>
  );
};
export default HomePage;
