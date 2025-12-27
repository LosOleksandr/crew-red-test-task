import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const toastVariants = cva(
    'flex max-w-md min-w-75 items-center gap-3 rounded-xl border p-4 shadow-lg pointer-events-auto',
    {
        variants: {
            type: {
                info: 'bg-blue-200 border-blue-400 text-blue-900',
                success: 'bg-green-200 border-green-400 text-green-900',
                error: 'bg-red-50 border-red-200 text-red-900 ',
                warning: 'bg-yellow-50 border-yellow-200 text-yellow-900 ',
            },
        },
        defaultVariants: {
            type: 'info',
        },
    },
);

const iconVariants = cva('shrink-0 h-5 w-5', {
    variants: {
        type: {
            info: 'text-blue-500',
            success: 'text-green-600',
            error: 'text-red-600',
            warning: 'text-yellow-600',
        },
    },
    defaultVariants: {
        type: 'info',
    },
});

export type ToastType = VariantProps<typeof toastVariants>['type'];

export interface ToastProps extends VariantProps<typeof toastVariants> {
    id: string;
    message: string;
    duration?: number;
    closable?: boolean;
    onClose: (id: string) => void;
}

const icons: Record<NonNullable<ToastType>, LucideIcon> = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export const Toast = ({
    id,
    message,
    type = 'info',
    duration = 3000,
    closable = true,
    onClose,
}: ToastProps) => {
    const Icon = icons[type || 'info'];

    React.useEffect(() => {
        if (duration === Infinity) return;
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className={cn(toastVariants({ type }))}
        >
            <Icon className={cn(iconVariants({ type }))} />
            <p className="flex-1 text-sm font-medium">{message}</p>

            {closable && (
                <button
                    onClick={() => onClose(id)}
                    className="focus:ring-ring cursor-pointer rounded-md p-1 opacity-70 transition-all hover:bg-black/5 hover:opacity-100 focus:ring-2 focus:outline-none dark:hover:bg-white/10"
                    aria-label="Close notification"
                >
                    <X size={16} />
                </button>
            )}
        </motion.div>
    );
};

export const Toaster = ({
    toasts,
    removeToast,
}: {
    toasts: ToastProps[];
    removeToast: (id: string) => void;
}) => {
    return (
        <div className="pointer-events-none fixed right-6 bottom-6 z-100 flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast {...toast} onClose={removeToast} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};
