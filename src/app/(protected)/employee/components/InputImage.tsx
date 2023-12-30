/* eslint-disable max-lines-per-function */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/shadcn/elements/form";
import { cn } from "@/lib/utils";
import { Button } from "@src/shadcn/elements/button";
import { Calendar } from "@src/shadcn/elements/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements";

export const InputImage = ({ ...props }) => {
  return (
    <div className="w-full">
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{props.label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
? (
                      format(new Date(field.value), "PPP")
                    )
: (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

{
  /* <div className="overflow-hidden bg-white rounded-lg w-80">
  <div className="px-4 py-6">
    <div
      id="image-preview"
      className="items-center max-w-sm p-6 mx-auto mb-4 text-center bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer"
    >
      <input id="upload" type="file" className="hidden" accept="image/*" />
      <label htmlFor="upload" className="cursor-pointer">
        <Upload className="w-8 h-8 mx-auto mb-4 text-gray-700" />
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
          Upload picture
        </h5>
        <p className="text-sm font-normal text-gray-400 md:px-6">
          Choose photo size should be less than
          <b className="text-gray-600">2mb</b>
        </p>
        <p className="text-sm font-normal text-gray-400 md:px-6">
          and should be in <b className="text-gray-600">JPG, PNG, or GIF</b>
          format.
        </p>
        <span id="filename" className="z-50 text-gray-500 bg-gray-200" />
      </label>
    </div>
    <div className="flex items-center justify-center">
      <div className="w-full">
        <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
          <span className="ml-2 text-center">Upload</span>
        </label>
      </div>
    </div>
  </div>
</div>; */
}
