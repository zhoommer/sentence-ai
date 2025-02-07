const TextInput: React.FC = () => {
  return (
    <>
      <input
        type="text"
        name="word"
        id="word"
        className="rounded-lg bg-[#222] p-2 focus:outline-none"
        placeholder="Kelime giriniz"
      />
    </>
  );
};

export default TextInput;
