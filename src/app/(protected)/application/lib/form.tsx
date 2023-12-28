/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { Button, Input, Label, Textarea } from "@src/shadcn/ui";

export default function ApplicationForm(): JSX.Element {
  return (
    <div className="p-4 bg-white shadow rounded-xl sm:p-7 dark:bg-slate-900">
      <form className="">
        <div className="grid gap-2 py-8 border-t border-gray-200 sm:grid-cols-12 sm:gap-4 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
          <div className="sm:col-span-12">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Submit your application
            </h2>
          </div>
          <div className="sm:col-span-3">
            <Label
              htmlFor="text"
              className="inline-block text-sm font-medium text-gray-500 mt-2.5"
            >
              Full name
            </Label>
          </div>
          <div className="sm:col-span-9">
            <div className="gap-2 sm:flex">
              <Input
                type="text"
                id="text"
                placeholder="First Name"
                className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 shadow-sm pe-11 -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
              <Input
                type="text"
                id="text"
                placeholder="Last Name"
                className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 shadow-sm pe-11 -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <Label
              htmlFor="Email"
              className="inline-block text-sm font-medium text-gray-500 mt-2.5"
            >
              Email
            </Label>
          </div>
          <div className="sm:col-span-9">
            <Input
              type="text"
              id="text"
              className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 shadow-sm pe-11 -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
          </div>
          <div className="sm:col-span-3">
            <Label
              htmlFor="Email"
              className="inline-block text-sm font-medium text-gray-500 mt-2.5"
            >
              Phone
            </Label>
          </div>
          <div className="sm:col-span-9">
            <input
              id="af-submit-application-current-company"
              type="text"
              className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
          </div>
        </div>
        <hr className="my-4 border-gray-200 border-t-1 dark:border-gray-700" />
        <div>
          <div className="sm:col-span-12">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Profile
            </h2>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="af-submit-application-resume-cv"
              className="inline-block text-sm font-medium text-gray-500 mt-2.5"
            >
              Resume/CV
            </label>
          </div>
          <div className="sm:col-span-9">
            <label
              htmlFor="af-submit-application-resume-cv"
              className="sr-only"
            >
              Choose file
            </label>
            <input
              type="file"
              name="af-submit-application-resume-cv"
              id="af-submit-application-resume-cv"
              className="block w-full text-sm border border-gray-200 rounded-lg shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 file:bg-transparent file:border-0 file:bg-gray-100 file:me-4 file:py-2 file:px-3 dark:file:bg-gray-700 dark:file:text-gray-400"
            />
          </div>
          <div className="sm:col-span-3">
            <div className="inline-block">
              <label
                htmlFor="af-submit-application-bio"
                className="inline-block text-sm font-medium text-gray-500 mt-2.5"
              >
                Personal summary
              </label>
            </div>
          </div>
          <div className="sm:col-span-9">
            <Textarea
              rows={6}
              className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
          </div>
        </div>
        <Button type="button" className="w-full py-4 my-2">
          Submit application
        </Button>
      </form>
    </div>
  );
}
