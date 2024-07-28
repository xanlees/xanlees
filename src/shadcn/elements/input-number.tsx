import React, { useState, forwardRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                step="0.01"
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 my-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

interface DecimalInputProps extends Omit<InputProps, 'onChange'> {
    value?: number | '';
    onChange?: (value: number | '') => void;
    placeholder?: string;
    defaultValue?: number;
}

const DecimalInput: React.FC<DecimalInputProps> = ({ value = 0, onChange = () => {}, placeholder = '', defaultValue = 0, ...props }) => {
    const [inputValue, setInputValue] = useState<string>(value?.toString());
    useEffect(() => {
        setInputValue(value?.toString());
    }, [value]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const validValue = /^[0-9]*\.?[0-9]*$/.test(value);
        if (validValue || value === '') {
            setInputValue(value);
            const decimalValue = value === '' ? '' : parseFloat(value);
            onChange(decimalValue);
        }
    };
    return (
        <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...props}
            pattern="[0-9]*\.?[0-9]*"
        />
    );
};
interface NumberInputProps extends Omit<InputProps, 'onChange'> {
    value?: number | '';
    onChange?: (value: number | '') => void;
    placeholder?: string;
    defaultValue?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ value = 0, onChange = () => {}, placeholder = '', defaultValue = 0, ...props }) => {
    return (
        <NumberField>
            <NumberFieldContent>
                <NumberFieldDecrement onClick={() => onChange(value === '' ? 0 : Math.max(value - 1, 0))} />
                <NumberFieldInput
                    value={value}
                    onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    {...props}
                />
                <NumberFieldIncrement onClick={() => onChange(value === '' ? 1 : value + 1)} />
            </NumberFieldContent>
        </NumberField>
    );
};

export { DecimalInput, NumberInput };

const NumberField = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
    <div className="grid gap-1.5" {...props} ref={ref} />
));

const NumberFieldContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative [&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5 [&>[data-slot=input]]:has-[[data-slot=decrement]]:pl-5">
        {children}
    </div>
);

const NumberFieldDecrement: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button type="button" onClick={onClick} className="absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20">-</button>
);

const NumberFieldIncrement: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button type="button" onClick={onClick} className="absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20 p-3">+</button>
);

const NumberFieldInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <Input type="text" {...props} className={cn('text-center flex h-9 w-full rounded-md border border-input bg-background py-2 pl-5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.className)} />
);