import logo from "@/assets/logo.png";
import Center from "@/components/Center";

export default function Loading() {
  return (
    <Center>
      <img src={logo} className="h-80 w-80" alt="logo" />
    </Center>
  );
}
