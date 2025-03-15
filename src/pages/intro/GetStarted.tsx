import Center from "@/components/Center";
import { Button } from "@/components/ui/button";

export default function GetStarted() {
  return (
    <Center>
      <div className="block">
        <h1 className="text-[64px] font-moul text-center leading-none mb-2">
          Oishii
        </h1>
        <div className="w-[327px]">
          <p className="text-[20px] font-montserrat font-bold text-center leading-tight">
            A meal swap marketplace for students and by students.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <Button className="text-[#f57600] w-[257px] h-[44px] font-montserrat font-semibold text-[20px] rounded-[20px]">
            Get Started
          </Button>
        </div>
      </div>
    </Center>
  );
}
