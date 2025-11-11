import { WaitlistForm } from "@/components/layout/form";
import { GithubStarButton } from "@/components/layout/github-star-btn";
import PlusSvg from "@/components/svgs/plus-svg";
import { cn } from "@/lib/utils";

import { Toaster } from "sonner";

export default function Home() {
  return (
    <div
      className={cn("flex  flex-col justify-center items-center w-lvw h-lvh")}
    >
      <Toaster richColors closeButton position="top-center" />
          <GithubStarButton/>
      <div className={cn(" relative w-1/2 h-30 px-4 py-2")}>
        <h1 className={cn("text-[1rem] md:text-3xl lg:text-5xl tracking-tighter  font-cutive-mono font-extrabold  text-center")}>
          Query.Fit — Your Database, Now Chat-Friendly
        </h1>
        <PlusSvg opacity={.2}/>
      </div>
      <WaitlistForm />
    </div>
  );
}
