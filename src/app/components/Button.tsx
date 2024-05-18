import { useState } from "react";

export default function Button({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-10 bg-white rounded-xl border border-zinc-950 p-4 cursor-pointer"
      onClick={onClick}
    >
      Criar evento
    </div>
  );
}
