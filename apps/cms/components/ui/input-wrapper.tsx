import { FormMessage, Input } from "@all-blue/ui/components/input";
import { Label } from "@all-blue/ui/components/label";
interface InputWrapperProps {
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export const InputWrapper = ({
  label,
  error,
  inputProps,
  onChange,
  value,
}: InputWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...inputProps}
      />
      <FormMessage error={error} />
    </div>
  );
};
