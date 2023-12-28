/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
import React from "react";
import { SelectScrollable } from "./jobSelect";
export default function ApplicationCard(): JSX.Element {
  return (
    <div className="w-full p-4 bg-white shadow rounded-xl sm:p-7 dark:bg-slate-900">
      <div className="py-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Job opening
      </div>
      <SelectScrollable />
      <div>
        <hr className="my-4 border-gray-200 border-t-1 dark:border-gray-700" />
        <div className="py-2 text-lg font-semibold text-justify text-gray-800 dark:text-gray-200">
          <div>ເງື່ອນໄຂຜູ້ສະໝັກ</div>
          <div className="text-md ">
            ລະດັບການສຶກສາຈົບຊັ້ນສູງຂຶ້ນໄປ ຫຼື ຈົບສາຂາທີ່ກ່ຽວຂ້ອງອາຍຸ 22-29ປີ
            ບໍ່ຈຳກັດເພດມີຄວາມດຸໝັ່ນ ຫ້າວຫັ່ນ ແລະ
            ອົດທົນຕໍ່ໜ້າທີ່ວຽກງານມີມະນຸດສຳພັນດີນັກສຶກສາຈົບໃໝ່ ສາມາດສະໝັກໄດ້
            2000000-3000000ຍັງ ມີເງິນເປົ້າຂະຫຍັນເຮັດວຽກໄດ້
          </div>
        </div>
        <hr className="my-4 border-gray-200 border-t-1 dark:border-gray-700" />
        <div className="py-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          <div>Responsibility</div>
          {responsibility.map((item) => (
            <div className="text-md">- {item.detail}</div>
          ))}
        </div>
        <hr className="my-4 border-gray-200 border-t-1 dark:border-gray-700" />
        <div className="py-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          <div>ຕິດຕໍ່</div>
          {contact.map((item) => (
            <>
              <div className="text-md">- {item.email}</div>
              <div className="text-md">- {item.phone}</div>
              <div className="text-md">- {item.page}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

const responsibility = [
  {
    detail: "ມີຄວາມດຸໝັ່ນ",
  },
  {
    detail: "ຫ້າວຫັ່ນ",
  },
  {
    detail: "ອົດທົນຕໍ່ໜ້າທີ່ວຽກງານ",
  },
  {
    detail: "ມີມະນຸດສຳພັນດີ",
  },
];

const contact = [
  {
    email: "abc@gmail.com",
    phone: "2098989797",
    page: "SBS ຕົວແທນຈຳໜ່າຍຫວຍທັນສະໄໝໂຊກໄຊ ແລະ ສົມໃຈນຶກ",
  },
];
