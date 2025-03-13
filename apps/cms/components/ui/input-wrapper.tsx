import { FormMessage, Input } from "@all-blue/ui/components/input";
import { Label } from "@all-blue/ui/components/label";
interface InputWrapperProps {
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type: HTMLInputElement["type"];
}
export const InputWrapper = ({
  label,
  error,
  value,
  onChange,
  type,
}: InputWrapperProps) => {
  console.log({ error });

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      <FormMessage error={error} />
    </div>
  );
};
