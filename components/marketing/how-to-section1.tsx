import { cn } from "@/lib/utils"

export function HowToSection1({className}: {className?: string}) {

  return (
      <section className={cn(className)}>
      <div className="container">
          <div className="flex justify-between sm:gap-10 sm:justify-center">
            <div className="lg:flex gap-3 items-center">
              <div className="flex justify-center"><span className="bg-foreground text-background rounded-full w-8 h-8 font-bold justify-center items-center text-md flex">1</span></div>
              <div className="mt-3 lg:mt-0">Do This</div>
            </div>
            <div className="lg:flex gap-3 items-center">
              <div className="flex justify-center"><span className="bg-foreground text-background rounded-full w-8 h-8 font-bold justify-center items-center text-md flex">2</span></div>
              <div className="mt-3 lg:mt-0">Then This</div>
            </div>
            <div className="lg:flex gap-3 items-center">
              <div className="flex justify-center"><span className="bg-foreground text-background rounded-full w-8 h-8 font-bold justify-center items-center text-md flex">3</span></div>
              <div className="mt-3 lg:mt-0">Lastly That</div>
            </div>
          </div>
          </div>
      </section>
  )
}
