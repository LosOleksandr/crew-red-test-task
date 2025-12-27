import * as React from 'react';
import { Eye, EyeOff, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
    label?: string;
    clearable?: boolean;
    onClear?: () => void;
    error?: string;
    icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            label,
            clearable,
            onClear,
            error,
            value,
            onChange,
            icon: Icon,
            id,
            ...props
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const generatedId = React.useId();
        const inputId = id || generatedId;

        const isPassword = type === 'password';
        const currentType = isPassword && showPassword ? 'text' : type;

        const handleClear = (e: React.MouseEvent) => {
            e.preventDefault();
            onClear?.();
        };

        return (
            <div className="flex w-full flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            'text-muted-foreground cursor-pointer px-1 text-sm font-medium select-none',
                            error && 'text-red-500',
                        )}
                    >
                        {label}
                    </label>
                )}

                <div className="group relative flex items-center">
                    {Icon && (
                        <div className="pointer-events-none absolute left-3">
                            <Icon
                                className={cn(
                                    'text-muted-foreground h-5 w-5 transition-colors',
                                    error && 'text-red-500',
                                )}
                            />
                        </div>
                    )}

                    <input
                        id={inputId}
                        type={currentType}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        className={cn(
                            'bg-background ring-offset-background placeholder:text-muted-foreground flex h-10 w-full rounded-lg border py-2 text-base transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                            Icon ? 'pl-10' : 'pl-4',
                            clearable || isPassword ? 'pr-12' : 'pr-4',
                            error
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : 'border-input focus-visible:ring-ring',
                            className,
                        )}
                        {...props}
                    />

                    <div className="absolute right-3 flex items-center gap-2">
                        {clearable && value && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-muted-foreground cursor-pointer transition-colors hover:text-red-500 focus:outline-none"
                                aria-label="Clear input"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        )}

                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground hover:text-primary cursor-pointer transition-colors focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="animate-in fade-in slide-in-from-top-1 px-1 text-xs font-medium text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

export { Input };
