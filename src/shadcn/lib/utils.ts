import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyInput(type: string | undefined, onChange: React.ChangeEventHandler<HTMLInputElement> | undefined) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'currency') {
      const { selectionStart, selectionEnd } = event.target;
      let { value } = event.target;
      const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
      const formattedValue = numericValue.toLocaleString(undefined, {
        minimumFractionDigits: 0
      });
      const validValue = formattedValue !== 'NaN' ? formattedValue : "";
      const cursorPos = selectionStart as number + (validValue.length - value.length);
      event.target.value = validValue;
      event.target.setSelectionRange(cursorPos, cursorPos);
      return event;
    }
    return onChange?.(event); 
  };
}

export const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, numericOnly: boolean, type: string | undefined, onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => {
  let newValue = event.target.value;
  
  if (numericOnly) {
    newValue = newValue.replace(/\D/g, "");
  }
  
  if (type === 'currency' && onChange) {
    const formattedOnChange = formatCurrencyInput(type, onChange);
    const formattedValue = formattedOnChange(event);
    if (formattedValue && 'target' in formattedValue) {
      newValue = formattedValue.target.value;
    }
  }
  onChange?.({ ...event, target: { ...event.target, value: newValue } });
};
