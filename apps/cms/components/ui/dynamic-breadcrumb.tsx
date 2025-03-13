"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@all-blue/ui/components/breadcrumb";
import { cn } from "@all-blue/ui/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
interface DynamicBreadcrumbProps {
  className?: string;
}
export const DynamicBreadcrumb = ({ className }: DynamicBreadcrumbProps) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  return (
    <div className={cn("p-4", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            const comp = isLast ? (
              <BreadcrumbPage>{part}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                href={`/${pathParts.slice(0, index + 1).join("/")}`}
              >
                {part}
              </BreadcrumbLink>
            );
            return (
              <Fragment key={part + index}>
                <BreadcrumbItem key={part}>{comp}</BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
