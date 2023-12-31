import {
    FormControl,
} from "@src/shadcn/elements/form"
import { cn } from "@/lib/utils"
import { Button } from "@src/shadcn/elements/button"
import { Calendar } from "@src/shadcn/elements/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements"
export const DatePickerField = ({ ...props }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !props.value && "text-muted-foreground"
                        )}
                    >
                        {props.value ? (
                            format(new Date(props.value), "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={props.value}
                    onSelect={props.onChange}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )

}