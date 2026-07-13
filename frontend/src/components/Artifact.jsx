// import React from "react";
// import { FiCopy, FiDownload } from "react-icons/fi";

// function Artifact() {
//   const code = `function Hello() {
//   return (
//     <h1>Hello Multi Agent AI 🚀</h1>
//   );
// }

// export default Hello;`;

//   return (
//     <div className="hidden lg:flex h-screen w-[40%] flex-col border-l border-zinc-800 bg-[#111827] text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
//         <div>
//           <h2 className="text-lg font-semibold">Artifact</h2>
//           <p className="text-sm text-zinc-400">
//             Generated code preview
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <button className="rounded-lg bg-zinc-800 p-2 transition hover:bg-zinc-700">
//             <FiCopy size={18} />
//           </button>

//           <button className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700">
//             <FiDownload size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Code */}
//       <div className="flex-1 overflow-auto p-6">
//         <pre className="overflow-x-auto rounded-xl bg-[#0d1117] p-5 text-sm leading-7 text-green-400">
//           <code>{code}</code>
//         </pre>
//       </div>
//     </div>
//   );
// }

// export default Artifact;