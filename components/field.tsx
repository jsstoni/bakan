import {
  FieldError,
  FieldLabel,
  Field as UIField,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  className?: string;
  render: (
    field: ControllerRenderProps<TFieldValues, TName>
  ) => React.ReactNode;
}

export function Field<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  render,
  className,
}: FieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <UIField className={cn(className)} data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}
          {render(field)}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </UIField>
      )}
    />
  );
}
