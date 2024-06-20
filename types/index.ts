import { Icons } from "@/components/icons";

type ThemeOptions = 'light' | 'dark';
type ConstructionOptions = boolean;

interface EmailConfig {
  testEmail: string;
  authEmail: string;
}

interface RoutesConfig {
  publicRoutes: string[];
  authRoutes: string[];
  apiAuthPrefix: string;
  defaultLoginRedirect: string;
}

interface FileStorageConfig {
  bucket: string;
  bucketUrl: string;
  endpoint: string;
  region: string;
  cdn: string;
}

interface Feature {
  name: string;
  included: boolean;
}

export interface Plan {
  priceId: string;
  mode: 'payment' | 'subscription';
  isFeatured: boolean;
  name: string;
  successRedirect: string;
  description: string;
  price: number;
  priceAnchor: number;
  features: Feature[];
}

interface StripeConfig {
  plans: Plan[];
}

export interface SiteConfig {
  appName: string;
  appDescription: string;
  keywords: string[];
  primaryDomain: string;
  isUnderConstruction: ConstructionOptions;
  isBlogPublic: boolean;
  themeColor: ThemeOptions;
  email: EmailConfig;
  routes: RoutesConfig;
  fileStorage: FileStorageConfig;
  stripe: StripeConfig;
}

export interface SubMenu {
  title: string;
  text: string;
  href: string;
}

export interface NavItems {
  icon?: keyof typeof Icons;
  text: string;
  href: string;
  upgrade?: boolean;
  subMenu?: SubMenu[];
}

export interface TablePost {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  author: string;
}
export interface TableCategories {
  id: string;
  name: string;
}
export interface TableUsers {
  id: string;
  name: string | null;
  role: string;
}

export interface Benefit {
  icon?: keyof typeof Icons;
  title: string;
  description: string;
}
export interface Testimonial {
  review: string;
  name?: string;
  handle?: string;
  image?: string;
  stars?: string;
}

export interface FeatureData {
  icon?: keyof typeof Icons;
  title: string;
  description?: string;
}

export interface TrustLogo {
   name?: string; 
  imageUrl: string;
}
