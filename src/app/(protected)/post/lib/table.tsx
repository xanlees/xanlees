/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { Button } from "@src/shadcn/ui/button";
import { FileEdit, Share } from "lucide-react";

const Index = () => {
  return (
    <div className="w-full bg-red-500 ">
      <div className="flex p-4 fl ">
        {jobOpen.map((job, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-500 transform bg-white shadow-lg w-96 rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            <a href="#">
              <div className="relative">
                <img
                  className="w-full"
                  src={job.image ?? ""}
                  alt="Sunset in the mountains"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 transition duration-300 bg-gray-900 opacity-25 hover:bg-transparent"></div>
              </div>
            </a>
            <div className="px-6 py-4">
              <a
                href="#"
                className="inline-block text-lg font-semibold transition duration-500 ease-in-out hover:text-black"
              >
                {job.jobTitle}
              </a>
              {job.position.map((position, positionIndex) => (
                <p key={positionIndex} className="text-sm text-gray-500">
                  {`${position.positionName}: Amount ${position.open}`}
                </p>
              ))}
            </div>
            <div className="flex flex-row items-center gap-2 px-6 py-4">
              <Button className="justify-between w-full">
                Edit <FileEdit />
              </Button>
              <Button className="justify-between w-full ">
                Share <Share />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

const jobOpen = [
  {
    jobTitle: "Available Positions",
    image:
      "https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    position: [
      {
        positionName: "Programmer",
        open: 3,
        location: "San Francisco",
      },
      {
        positionName: "Programmer",
        open: 3,
        location: "San Francisco",
      },
    ],
  },
  {
    jobTitle: "Available Positions",
    image:
      "https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    position: [
      {
        positionName: "Programmer",
        open: 7,
        location: "Los Angeles",
      },
      {
        positionName: "Programmer",
        open: 3,
        location: "San Francisco",
      },
    ],
  },
  {
    jobTitle: "Available Positions",
    image:
      "https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    position: [
      {
        positionName: "Customer Support Representative",
        open: 2,
        location: "Chicago",
      },
      {
        positionName: "Programmer",
        open: 3,
        location: "San Francisco",
      },
    ],
  },
  {
    jobTitle: "Available Positions",
    image:
      "https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    position: [
      {
        positionName: "Data Analyst",
        open: 4,
        location: "Seattle",
      },
      {
        positionName: "Programmer",
        open: 3,
        location: "San Francisco",
      },
    ],
  },
];
