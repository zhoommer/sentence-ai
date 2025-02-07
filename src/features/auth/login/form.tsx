import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from "react-icons/ai";

const LoginForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-3 border border-[#222] hover:border-[#333] rounded-xl p-32">
        <div className="text-5xl text-zinc-400">Hoş geldiniz</div>
        <div className=" relative mt-10">
          <AiOutlineMail
            size={23}
            className="absolute top-2 left-2 text-[#ddd]"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email adresinizi giriniz"
            className="w-full rounded-xl ps-10 px-4 py-2 bg-[#222] placeholder:text-sm focus:outline-none"
            autoComplete="false"
          />
        </div>

        <div className="relative">
          <AiOutlineLock
            size={23}
            className="absolute top-2 left-2 text-[#ddd]"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Şifrenizi giriniz"
            className="w-full rounded-xl ps-11 px-4 py-2 bg-[#222] placeholder:text-sm focus:outline-none"
            autoComplete="false"
          />
        </div>

        <div>
          <button className="w-full flex justify-center items-center gap-2 py-2 rounded-xl bg-[#222] hover:bg-[#333]">
            Giriş Yap
            <AiOutlineLogin size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
