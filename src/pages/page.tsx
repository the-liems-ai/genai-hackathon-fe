"use client";
import { Pin } from "../components/ui/3d-pin";

const HomePage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black ">
      <Pin>
        <div className="flex basis-full flex-col mt-24 items-center justify-center tracking-tight text-slate-100/50 sm:basis-1/2 w-[70rem] h-[40rem]">
          <div className="w-[650px]">
            <img src="./logo.png" alt="logo" />
          </div>
          <div className="text-slate-500 text-xl font-medium uppercase flex items-center text-center justify-center">
            The Liems
          </div>
        </div>
        <div>HomePage</div>
      </Pin>
    </div>
  );
};
export default HomePage;
