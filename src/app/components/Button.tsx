import { useState } from "react";

export default function Button({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="fixed bottom-4 right-16 z-10 shadow-xl bg-slate-200 text-gray-600 rounded-2xl border border-gray-600 px-4 py-3 cursor-pointer"
      onClick={onClick}
    >
      Criar evento
    </div>
  );
}
