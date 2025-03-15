import { FormMessage } from "@all-blue/ui/components/input";
import { Textarea } from "@all-blue/ui/components/textarea";
import { Label } from "@all-blue/ui/components/label";
interface TextareaWrapperProps {
  label: string;
  error?: string;
  value: string;
  textareaProps?: React.ComponentProps<typeof Textarea>;
  onChange: (value: string) => void;
}
export const TextareaWrapper = ({
  label,
  error,
  value,
  onChange,
  textareaProps,
}: TextareaWrapperProps) => {
  console.log({ error });

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...textareaProps}
      />
      <FormMessage error={error} />
    </div>
  );
};
