import { NavItems } from "@/types";

//User Nav component navigation items
//
//The /admin route is baked into the component and only availabe to users with admin role
//which can be changed in the database
export const userNavItems: NavItems[] = [
    {
        text: "Dashboard",
        href: "/dashboard"
    },
    {
        text: "Settings",
        href: "/dashboard/settings"
    }
]

//MARKETING
//Header & Mobile Header Navigation
export const marketingNavItems: NavItems[] = [

    {
        text: "Home",
        href: "/",
    },
    {
        text: "Pages",
        href: "#",
        subMenu: [
            {
                title: "404 Page",
                text: "A custom designed page for bad routes.",
                href: "/badpath"
            },
            {
                title: "Contact Page",
                text: "A page for users to email your team.",
                href: "/contact-us"

            },
            {
                title: "Newsletter Page",
                text: "A page to help generate leads for a newsletter.",
                href: "/newsletter"
            },
            {
                title: "Under Construction Page",
                text: "Must change the setting in siteConfig to view this page.",
                href: "/under-construction"
            },
            {
                title: "Order Completed",
                text: "This page shows after a user has purchased. With no id in searchParams it will show not found page",
                href: "/order-completed"
            },

        ]
    },
    {
        text: "Blog",
        href: "/blog",
    },
    {
        text: "Reviews",
        href: "/#testimonials2-section",
    },
    {
        text: "Pricing",
        href: "/#pricing-section",
    },
];

//FOOTER Component Navigation
export const interestingNavItems: NavItems[] = [
    {
        text: "Pricing",
        href: "/#pricing-section",
    },
    {
        text: "Reviews",
        href: "/#testimonials2-section",
    },
    {
        text: "Blog",
        href: "/blog",
    },
]
export const boringNavItems: NavItems[] = [
    {
        text: "Terms & Conditions",
        href: "/terms-conditions"
    },
    {
        text: "Privacy Policy",
        href: "/privacy-policy"
    },
        {
        text: "Contact Us",
        href: "/contact-us"
    }

]

// ADMIN
export const adminNavItems: NavItems[] = [
    {
        icon: "home",
        text: "Dashboard",
        href: "/admin",
    },
    {
        icon: "post",
        text: "Posts",
        href: "/admin/posts",
    },
    {
        icon: "category",
        text: "Categories",
        href: "/admin/categories",
    },
    {
        icon: "media",
        text: "Media",
        href: "/admin/media",
    },
    {
        icon: "user",
        text: "Users",
        href: "/admin/users",
    },
];

// DASHBOARD
export const dashboardNavItems: NavItems[] = [
    {
        icon: "home",
        text: "Dashboard",
        href: "/dashboard",
        upgrade: true,
    },
    {
        icon: "wand",
        text: "Example",
        href: "/dashboard/example",
        upgrade: true,
    },
    {
        icon: "cog",
        text: "Settings",
        href: "/dashboard/settings",
        upgrade: false,
    },
    { 
        icon: "card",
        text: "Billing",
        href: "/dashboard/billing",
        upgrade: false,

    },
];

