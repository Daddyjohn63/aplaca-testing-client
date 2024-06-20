"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { Logo } from "@/components/logo";

type CardWrapperProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  title,
  subtitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div>
      <div className="mb-8 flex justify-center">
        <Logo size="sm"/>
      </div>
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <Header title={title} subtitle={subtitle} />
          <CardContent className="p-3">{children}</CardContent>
          {showSocial && (
            <div>
              <div className="flex items-center justify-center p-3 pt-0">
                <div className="flex-grow border-t border-muted-foreground"></div>
                <span className="px-4 text-muted-foreground">or</span>
                <div className="flex-grow border-t border-muted-foreground"></div>
              </div>
              <CardFooter className="p-4">
                <Social />
              </CardFooter>
            </div>
          )}
          <CardFooter className="pb-0">
            <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
};
