import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const sidebarItemVariants = cva(
    'group/item flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium outline-none transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'text-muted-foreground hover:bg-slate-100 hover:text-slate-900',
                active: 'bg-slate-100 text-slate-900',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const sidebarItemIconVariants = cva('h-5 w-5 text-muted-foreground transition-colors', {
    variants: {
        variant: {
            default: 'group-hover/item:text-emphasis',
            active: 'text-emphasis',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface NavItem {
    title: string;
    icon?: LucideIcon;
    items?: NavItem[];
    href?: string;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: NavItem[];
    title?: string;
}

const SidebarItem = ({
    item,
    level = 0,
    isActive,
    onItemClick,
}: {
    item: NavItem;
    level?: number;
    isActive: boolean;
    onItemClick: (item: NavItem) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.items && item.items.length > 0;
    const Icon = item.icon;

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!hasChildren) {
            onItemClick(item);
        }
    };

    return (
        <div className="w-full">
            <div
                className={cn(sidebarItemVariants({ variant: isActive ? 'active' : 'default' }))}
                style={{ paddingLeft: `${12 + level * 16}px` }}
                onClick={handleToggle}
            >
                {Icon && (
                    <Icon
                        className={cn(
                            sidebarItemIconVariants({ variant: isActive ? 'active' : 'default' }),
                        )}
                    />
                )}
                <span className="flex-1">{item.title}</span>
                {hasChildren && (
                    <ChevronDown
                        size={16}
                        className={cn(
                            'text-muted-foreground ml-auto transition-transform duration-200',
                            isOpen && 'rotate-180',
                        )}
                    />
                )}
            </div>

            <AnimatePresence initial={false}>
                {hasChildren && isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.3, ease: 'easeInOut' },
                            opacity: { duration: 0.2, ease: 'linear' },
                        }}
                        className="overflow-hidden"
                    >
                        <div className="pt-1">
                            {item.items?.map((subItem) => (
                                <SidebarItem
                                    key={subItem.title}
                                    item={subItem}
                                    level={level + 1}
                                    isActive={false}
                                    onItemClick={onItemClick}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Sidebar = ({ isOpen, onClose, items, title = 'Menu' }: SidebarProps) => {
    const [activeItem, setActiveItem] = useState<NavItem | null>(null);

    const handleItemClick = (item: NavItem) => {
        setActiveItem(item);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 220 }}
                        className="border-default bg-card absolute top-0 right-0 flex h-full w-80 flex-col border-l"
                    >
                        <div className="flex items-center justify-between p-4">
                            <h2 className="text-emphasis text-xl font-bold tracking-tight">
                                {title}
                            </h2>
                        </div>
                        <nav className="flex-1 space-y-1 p-2">
                            {items.map((item) => (
                                <SidebarItem
                                    key={item.title}
                                    item={item}
                                    isActive={activeItem?.title === item.title}
                                    onItemClick={handleItemClick}
                                />
                            ))}
                        </nav>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
