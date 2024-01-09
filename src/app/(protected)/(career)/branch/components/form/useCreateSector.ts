// /* eslint-disable max-params */
// import { useCreate } from "@refinedev/core";

// export async function useCustomCreate() {
//   console.log("calling useCustomCreate ");
//   const { mutate } = useCreate();

//   const val = {
//     name: "string",
//     branchId: 14,
//   };

//   try {
//     const result = mutate(
//       {
//         resource: "sector",
//         values: val,
//       },
//       {
//         onSuccess: (variables) => {
//           console.log("data", data);
//         },
//       },
//     );

//     // Handle the result here
//     console.log("Mutation successful", result);
//     return result;
//   } catch (error) {
//     // Handle errors here
//     console.error("Mutation error", error);
//     throw error; // Optionally rethrow the error if needed
//   }
// }
