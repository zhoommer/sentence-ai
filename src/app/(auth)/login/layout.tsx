import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-3 mx-auto h-dvh">
      <div className="">1</div>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
}
