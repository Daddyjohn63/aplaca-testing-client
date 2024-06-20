import {Poppins} from 'next/font/google'
import {cn} from '@/lib/utils'

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

type HeaderProps = {
    title: string,
    subtitle: string;
}

export const Header = ({title, subtitle}: HeaderProps) => {
    
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold text-center", font.className)}>{title}</h1>
            <p className="text-muted-foreground text-sm text-center">{subtitle}</p>
        </div>
    )

}
