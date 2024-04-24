import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  numericOnly: boolean,
  type: string | undefined,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  onNumber: ((value: string) => void) | undefined = undefined,
  onFileSelect: ((file: File | null) => void) | undefined = undefined
) => {
  if (event.target.type === 'file') {
    handleFileInputChange(event, onFileSelect, onChange);
    return;
  }
  if (numericOnly) {
    handleNumericInputChange(event, onNumber);
  }
  if (type === 'currency') {
    handleCurrencyInputChange(event, onChange);
    return; 
  }
  if (type === 'checkbox') {
    handleCurrencyInputChange(event, onChange);
    return; 
  }
  onChange?.(event);
};

const handleFileInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  onFileSelect: ((file: File | null) => void) | undefined,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
) => {
  const files = event.target.files;
  const file = files && files.length > 0 ? files[0] : null;
  if (onFileSelect) {
    onFileSelect(file);
  }
  if (onChange) {
    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        value: file ? file.name : '',
        files: event.target.files
      }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  }
};
const handleNumericInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  onNumber: ((value: string) => void) | undefined
) => {
  let { value } = event.target;
  const originalValue = value;
  value = value.replace(/\D/g, "");
  event.target.value = value;

  if (onNumber && value !== originalValue) {
    onNumber(value);
  }
};

const handleCurrencyInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
) => {
  const { selectionStart } = event.target;
  let { value } = event.target;

  const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
  const formattedValue = numericValue.toLocaleString(undefined, { minimumFractionDigits: 0 });
  const validValue = formattedValue === 'NaN' ? "" : formattedValue;
  event.target.value = validValue;

  if (selectionStart !== null) {
    const diff = validValue.length - value.length;
    const newCursorPos = selectionStart + diff;
    setTimeout(() => {
      if (event.target.setSelectionRange) {
        event.target.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }

  if (onChange) {
    onChange(event);
  }
};
