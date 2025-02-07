"use client";

import { createTurkishSentese } from "./genkit";
import { useState } from "react";

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
        <label htmlFor="word">
          Suggest a menu item for a restaurant with this word:{" "}
        </label>
        <input type="text" name="word" id="word" />
        <br />
        <br />
        <button type="submit">Generate</button>
      </form>
      <br />
      <pre>{sentese}</pre>
    </main>
  );
}
