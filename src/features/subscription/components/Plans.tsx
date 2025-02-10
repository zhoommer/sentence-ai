import { PLAN_FEATURES } from "../types";
import { AiOutlineCheck } from "react-icons/ai";
import Button from "@/components/ui/button";

interface IPlanProps {
  plan: "Ücretsiz" | "Basic" | "Premium";
}

const Plans: React.FC<IPlanProps> = ({ plan }) => {
  function planFeatures() {
    switch (plan) {
      case (plan = "Ücretsiz"):
        return PLAN_FEATURES.free;
      case (plan = "Basic"):
        return PLAN_FEATURES.basic;
      case (plan = "Premium"):
        return PLAN_FEATURES.premium;
      default:
        return PLAN_FEATURES.free;
    }
  }

  return (
    <>
      <div className="bg-[#111] p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-colors relative">
        {/* Popüler Badge */}
        {plan === "Basic" && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              {plan}
            </span>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">{plan}</h3>
          <p className="text-sm text-zinc-400 mb-4">
            {planFeatures().description}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">₺{planFeatures().price}</span>
            <span className="text-zinc-400">/ay</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {planFeatures().features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <AiOutlineCheck className="text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full"
          variant={plan === "Basic" ? "primary" : "secondary"}
        >
          Planı Seç
        </Button>
      </div>
    </>
  );
};

export default Plans;
