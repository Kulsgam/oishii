import Center from "@/components/Center";
import { Button } from "@/components/ui/button";

export default function GetStarted() {
  return (
    <Center>
      <div className="block">
        <h1 className="font-moul mb-2 text-center text-[64px] leading-none">
          Oishii
        </h1>
        <div className="w-[327px]">
          <p className="font-montserrat text-center text-[20px] leading-tight font-bold">
            A meal swap marketplace for students and by students.
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <Button className="font-montserrat h-[44px] w-[257px] rounded-[20px] text-[20px] font-semibold text-[#f57600]">
            Get Started
          </Button>
        </div>
      </div>
    </Center>
  );
}
