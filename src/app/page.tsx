"use client";

import { createTurkishSentese } from "./genkit";
import { useState } from "react";
import TextInput from "@/common/TextInput";

export default function Home() {
  const [sentese, setSentese] = useState<string>("");

  async function createSentese(formData: FormData) {
    const word = formData.get("word")?.toString() ?? "";
    const suggestion = await createTurkishSentese(word);
    setSentese(suggestion);
  }

  return (
    <main>
      <form action={createSentese}>
        <div className="container h-dvh mx-auto flex flex-col justify-center items-center">
          <h3 className="mb-10 text-3xl">
            Bir kelime giriniz ve AI sizin icin cumle kursun
          </h3>
          <TextInput />
          <button className="rounded-lg bg-[#222] hover:bg-[#333] px-4 py-2 mt-5">
            Cumle Kur
          </button>
          {!!sentese ? (
            <pre className="border border-[#222] hover:border-[#333] rounded-xl mt-10 w-[500px] min-h-[200px] text-wrap p-3">
              {sentese}
            </pre>
          ) : null}
        </div>
      </form>
    </main>
  );
}
