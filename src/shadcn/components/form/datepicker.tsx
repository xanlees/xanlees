import {
    FormControl,
} from "@src/shadcn/elements/form"
import { cn } from "@/lib/utils"
import { Button } from "@src/shadcn/elements/button"
import { Calendar } from "@src/shadcn/elements/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements"
import React from "react"
export const DatePickerField = ({ ...props }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        // className={cn("w-[240px] justify-start text-left font-normal", !props.value && "text-muted-foreground")}
                        className={cn(
                            "pl-3 text-left font-normal",
                            props?.className ? props.className : "w-[250px]",
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
                    captionLayout="dropdown-buttons"
                    selected={props.value}
                    onSelect={props.onChange}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    fromYear={1960}
                    toYear={2040}
                />
            </PopoverContent>
        </Popover>
    )

}