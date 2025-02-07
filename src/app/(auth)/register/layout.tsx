import React from "react";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-3 mx-auto h-dvh">
      <div className="hidden lg:block" >
        <div className="flex flex-col justify-center items-center h-full text-white p-8">
          <h1 className="text-4xl font-bold mb-4 text-[#dedede] drop-shadow-[0_0_5px_#ddd]">
            İngilizce Öğrenmeye Başla
          </h1>
          <p className="text-lg text-center text-[#dedede] drop-shadow-[0_0_5px_#ddd]">
            Cümle çeviri pratiği yaparak dil becerilerinizi geliştirin
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#111]">{children}</div>
    </div>
  );
}
