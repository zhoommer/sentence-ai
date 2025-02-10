import { AiFillNotification } from "react-icons/ai";

interface IFaqProp {
  questions: { title: string; text: string }[];
}

const Faq: React.FC<IFaqProp> = ({ questions }) => {
  return (
    <>
      <div className="mt-20">
        <h3 className="text-2xl font-bold mb-8 text-center">
          Sıkça Sorulan Sorular
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {questions.map((question, index) => (
            <div key={index}>
              <h4 className="font-bold mb-2 flex items-center">
                <AiFillNotification className="text-blue-500" />
                <span className="ms-2">{question.title}</span>
              </h4>
              <p className="text-zinc-400 ms-6">{question.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
