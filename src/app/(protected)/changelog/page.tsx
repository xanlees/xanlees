"use client";

import React from "react";
import { CheckSquare } from "lucide-react";
import { Badge } from "@src/shadcn/elements";

const changelogData = [
  {
    version: "Version 0.6.0",
    date: "2024-04-24",
    features: [
      { id: 1, title: "ສ້າງ User Account ໃຫ້ພະນັກງານເຂົ້າ Check-In Check-Out ", badge: "New" },
      { id: 1, title: "Feature ຕັ້ງຄ່າ ເວລາເຂົ້າວຽກ-ເລີກວຽກ (ສ້າງ ແລະ ສະແດງ) ", badge: "New" },
      { id: 1, title: "Feature ຕັ້ງຄ່າ ເວລາເຂົ້າວຽກ-ເລີກວຽກ (ສ້າງ ແລະ ສະແດງ) ", badge: "New" },
      { id: 1, title: "ຕາຕາງສະແດງຂໍ້ມູນການປໍ້າເຂົ້າວຽກ ແລະ ປໍ້າເລີກວຽກ ", badge: "New" },
      { id: 1, title: "Feature ແກ້ໄຂຂໍ້ມູນ (ຂໍ້ມູນສ່ວນບຸກຄົນ, ເອກກະສານ, ຕໍາແໜ່ງ, ທີຢູ່, ການສຶກສາ)", badge: "New" },
      { id: 1, title: "Feature ເລືອນຂັ້ນ ຜູ້ສະໜັກວຽກເປັນພະນັກງານ (ສ້າງຕໍາແໜ່ງ ແລະ ສ້າງ  User Account )", badge: "New" },
      { id: 1, title: "ເພີ່ມເລກລະຫັດສະໝັກໃຫ້ຟອມສະໜັກວຽກ ເພື່ອໃຊ້ຕິດຕາມ", badge: "Updated" },
      { id: 2, title: "ເພີ່ມປະເພດ ໃຫ້ສາຂາ ແລະ ພະແນກ", badge: "Updated" },
    ],
  },
  {
    version: "Version 0.5.0",
    date: "2024-03-01",
    features: [
      { id: 4, title: "ຟອມສະໝັບວຽກ", badge: "Fixed" },
    ],
  },
];

const ChangelogPage = () => {
  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl px-4 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Changelog</h1>
        <div className="space-y-6">
          {changelogData.map((version, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-300">{version.version} - {version.date}</h2>
              {newFunction(version)}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

function newFunction(version: { version: string, date: string, features: Array<{ id: number, title: string, badge: string }> }) {
  return <ul className="mt-2">
    {version.features.map((feature) => (
      <li key={feature.id} className="flex items-center mt-2 space-x-2">
        <CheckSquare className="w-5 h-5 text-blue-500 dark:text-blue-300" />
        <span className="flex-1 text-gray-700 dark:text-gray-300">{feature.title}</span>
        <Badge className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-200">{feature.badge}</Badge>
      </li>
    ))}
  </ul>;
}

export default ChangelogPage;

