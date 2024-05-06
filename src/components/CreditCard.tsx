import CreateTransaction from "./CreateTransaction";

const CreditCard = () => {
  return (
    <div className="block w-full py-10">
      <div className="container">
        <div className="max-w-[600px] w-full border rounded-3xl bg-gradient-to-r from-zinc-800 to-zinc-600 text-white md:p-8 p-4 mx-auto">
          <h1 className="font-bold md:text-lg text-sm uppercase text-center">
            Your Credit Card
          </h1>
          <p className="md:text-5xl text-2xl font-bold text-center my-2 select-none">
            $10,000
          </p>
          <div className="block bg-zinc-500 rounded-xl p-4 bg-opacity-50 mt-10 space-y-2">
            <h3 className="font-medium text-sm md:text-base">
              Ogabek Yuldoshev
            </h3>
            <div className="flex justify-between text-sm md:text-base items-end">
              <span>0000 0000 0000 0000</span>
              <CreateTransaction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
