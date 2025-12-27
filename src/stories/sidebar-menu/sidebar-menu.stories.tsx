import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, type NavItem } from './sidebar-menu';
import {
    LayoutDashboard,
    User,
    Shield,
    CreditCard,
    Lock,
    Package,
    Globe,
    Bell,
    Settings,
    Mail,
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Sidebar> = {
    title: 'Components/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'A responsive sidebar component that slides in from the right. It can be used for navigation, menus, or other content that needs to be displayed in a dismissible overlay.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            description: 'Controls the open and closed state of the sidebar.',
            control: {
                type: 'boolean',
            },
        },
        onClose: {
            description: 'Callback function that is called when the sidebar is closed.',
            action: 'closed',
        },
        items: {
            description: 'An array of navigation items to be displayed in the sidebar.',
        },
        title: {
            description: 'The title of the sidebar.',
            control: {
                type: 'text',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="bg-background flex h-screen w-full font-sans">
                <Story />
            </div>
        ),
    ],
};

export default meta;

const mockItemsL1: NavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { title: 'Account', icon: User, href: '/account' },
    { title: 'E-commerce', icon: Package, href: '/ecommerce' },
    { title: 'Global Settings', icon: Globe, href: '/settings/global' },
    { title: 'Notifications', icon: Bell, href: '/notifications' },
    { title: 'System', icon: Settings, href: '/system' },
];

const mockItemsL2: NavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    {
        title: 'Account',
        icon: User,
        href: '/account',
        items: [
            { title: 'Personal Info', icon: Mail, href: '/account/personal' },
            { title: 'Billing', icon: CreditCard, href: '/account/billing' },
            {
                title: 'Security',
                icon: Shield,
                href: '/account/security',
                items: [
                    { title: 'Change Password', icon: Lock, href: '/account/security/password' },
                    { title: '2FA', href: '/account/security/2fa' },
                ],
            },
        ],
    },
    {
        title: 'E-commerce',
        icon: Package,
        href: '/ecommerce',
        items: [
            { title: 'Products', href: '/ecommerce/products' },
            { title: 'Inventory', href: '/ecommerce/inventory' },
            { title: 'Orders', href: '/ecommerce/orders' },
        ],
    },
    { title: 'Global Settings', icon: Globe, href: '/settings/global' },
];

const SidebarDemo = ({ items, title = 'Menu', ...args }: React.ComponentProps<typeof Sidebar>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-background relative flex h-screen w-full flex-col items-center justify-center font-sans">
            <div className="max-w-md space-y-6 text-center">
                <div className="border-default bg-card inline-flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm">
                    <LayoutDashboard className="text-emphasis" size={32} />
                </div>
                <h1 className="text-emphasis text-3xl font-extrabold tracking-tight">
                    Application View
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    Click the button to open the sidebar.
                </p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:translate-y-0.5 active:scale-95"
                >
                    Open Sidebar
                </button>
            </div>

            <Sidebar
                {...args}
                items={items}
                title={title}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

export const OneLevel: StoryObj<typeof Sidebar> = {
    render: (args) => <SidebarDemo {...args} />,
    args: {
        title: 'Main Menu',
        items: mockItemsL1,
    },
};

export const TwoLevels: StoryObj<typeof Sidebar> = {
    render: (args) => <SidebarDemo {...args} />,
    args: {
        title: 'Project Hub',
        items: mockItemsL2,
    },
};
