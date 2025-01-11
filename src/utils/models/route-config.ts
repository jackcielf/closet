export interface RouteConfig {
  path: string;
  component: React.ElementType;
  to?: string;
  children?: RouteConfig[];
  breadcrumb?: string;
}