import { CheckSquare } from "lucide-react";
import { FC } from "react";
import { Badge } from "../../../../elements";
import { changelogData } from './changelog';
import {
    Accordion, AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@src/shadcn/elements/accordion";
import React from "react";

export const WebVersion: FC = () => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={changelogData[0].version}>
                <AccordionTrigger className="mx-5 -my-2 italic text-blue-500 underline">
                    {changelogData[0].version}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-wrap">
                        {changelogData[0].features.map((feature) => (
                            <React.Fragment key={feature.id}>
                                <div className="px-1 mx-2">
                                    <CheckSquare color="#0055ff" className="w-4" />
                                </div>
                                <div className="pt-0.5 font-bold">
                                    {feature.title} <Badge className="h-4">{feature.badge}</Badge>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
