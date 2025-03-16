import { cn } from "@/lib/utils";

export function FloatingLabelInput({
  label,
  isTextArea = false,
  ...props
}: { 
  label: string;
  isTextArea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="relative w-full">
      {isTextArea ? (
        <textarea
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          className={cn(
            "peer w-full border-b border-white bg-transparent placeholder-transparent focus:outline-none",
            "font-montserrat px-2 pt-2 pb-1 text-[24px] font-bold leading-none min-h-[100px]",
          )}
          placeholder=" " // Ensures placeholder-shown works properly
        />
      ) : (
        <input
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
          className={cn(
            "peer w-full border-b border-white bg-transparent placeholder-transparent focus:outline-none",
            "font-montserrat px-2 pt-2 pb-1 text-[24px] font-bold leading-none",
          )}
          placeholder=" " // Ensures placeholder-shown works properly
        />
      )}
      <label
        className={cn(
          "font-montserrat absolute top-2 left-1 text-[24px] font-bold transition-all select-none",
          "peer-not-placeholder-shown:top-[-12px] peer-not-placeholder-shown:text-sm peer-focus:top-[-12px] peer-focus:text-sm",
        )}
      >
        {label}
      </label>
    </div>
  );
}
