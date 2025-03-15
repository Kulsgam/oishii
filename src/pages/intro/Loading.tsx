import logo from "@/assets/logo.png";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={logo} className="w-80 h-80" alt="logo" />
    </div>
  );
}
