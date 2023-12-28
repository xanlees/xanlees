/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { FaEye } from "react-icons/fa";

interface InputProps {
  register: any
  name: string
  label: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Password: React.FC<InputProps> = ({ register, name, label }) => {
  return (
    <div>
      <div className="max-w-sm">
        <label className="block mb-2 text-sm dark:text-white ">{label}</label>
        <div className="relative">
          <input
            id="hs-toggle-password"
            type="password"
            className="block w-full px-4 py-3 text-sm capitalize border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Enter password"
            {...register(name)}
          />
          <button
            type="button"
            data-hs-toggle-password='{"target": "#hs-toggle-password"}'
            className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <FaEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
