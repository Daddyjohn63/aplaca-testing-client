import * as React from "react"
import { cn } from "@/lib/utils"


export const Section = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement> >((
  {children, className, ...props}, ref) => (
    <section 
      ref={ref}
      className={cn("relative py-20 bg-cover bg-center bg-no-repeat", className)} 
      {...props}
    >
      <div className="container">
        {children}
      </div>
    </section>
  ))
Section.displayName = "Section"

export const SectionContent = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement> >((
  {className, ...props}, ref) => (
    <div 
      ref={ref} 
      className={cn("space-y-2", className)} 
      {...props} 
    />
  ))
SectionContent.displayName = "SectionContent"

export const SectionHeader = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement> >((
  {className, ...props}, ref) => (
    <div 
      ref={ref} 
      className={cn("text-center pb-10 space-y-4", className)}
      {...props}
    />
  ))
SectionHeader.displayName = "SectionHeader"

export const SectionTitle1 = React.forwardRef< HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> >((
  {className, ...props}, ref) => (
    <h1 
      ref={ref} 
      className={cn("text-4xl md:text-5xl font-black", className)}
      {...props}
    />
  ))
SectionTitle1.displayName = "SectionTitle1"

export const SectionTitle2 = React.forwardRef< HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> >((
  {className, ...props}, ref) => (
    <h2 
      ref={ref} 
      className={cn("text-3xl md:text-4xl font-black", className)}
      {...props}
    />
  ))
SectionTitle2.displayName = "SectionTitle2"

export const SectionDescription = React.forwardRef< HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> >((
  {className, ...props}, ref) => (
    <p 
      ref={ref} 
      className={cn("text-lg", className)}
      {...props}
    />
  ))
SectionDescription.displayName = "SectionDescription"

export const SectionFooter = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement> >((
  {className, ...props}, ref) => (
    <div 
      ref={ref} 
      className={cn("pt-5 text-center space-y-3", className)}
      {...props}
    />
  ))
SectionFooter.displayName = "SectionFooter"
