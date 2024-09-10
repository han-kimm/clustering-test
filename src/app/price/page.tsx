const PricePage = () => {
  const audioToTextPrice = 58.1;
  const chatGPTPrice = 20;
  const exchangeRate = 1300;
  const dailyCost = audioToTextPrice + chatGPTPrice;
  const monthlyCost = dailyCost * 30;
  const gpuCost = 1;
  const gpuDailyCost = gpuCost + chatGPTPrice / 2;
  const gpuMonthlyCost = gpuDailyCost * 30;

  return (
    <div className="w-full h-full flex items-center flex-col bg-white text-black">
      <h1 className="text-[36px]">Estimated Pricing</h1>
      <span className="mb-6">5000 calls / day</span>
      <div className="flex gap-20">
        <div className="border border-white p-2">
          <h2 className="text-[30px] border-b p-2 mb-4">Realtime API Call</h2>
          <p className="text-[24px]">Audio to Text</p>
          <p className="text-[18px]">${audioToTextPrice}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩{Math.floor(audioToTextPrice * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">ChatGPT-4o</p>
          <p className="text-[18px]">${chatGPTPrice}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩{Math.floor(chatGPTPrice * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">Total</p>
          <p className="text-[18px]">${dailyCost}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩{Math.floor(dailyCost * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">Estimated Monthly Cost</p>
          <p className="text-[18px]">${monthlyCost}</p>
          <p className="text-[24px] border border-black rounded-md bg-black text-white pl-2">
            ₩{Math.floor(monthlyCost * exchangeRate).toLocaleString("kr")}
          </p>
        </div>
        <div className="border border-white p-2">
          <h2 className="text-[30px] border-b p-2 mb-4">Batch API Call</h2>
          <p className="text-[24px]">Audio to Text</p>
          <p className="text-[18px]">${audioToTextPrice / 2}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩
            {Math.floor((audioToTextPrice / 2) * exchangeRate).toLocaleString(
              "kr"
            )}
          </p>
          <p className="text-[24px]">ChatGPT-4o</p>
          <p className="text-[18px]">${chatGPTPrice / 2}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩
            {Math.floor((chatGPTPrice / 2) * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">Total</p>
          <p className="text-[18px]">${dailyCost / 2}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩{Math.floor((dailyCost / 2) * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">Estimated Monthly Cost</p>
          <p className="text-[18px]">${monthlyCost / 2}</p>
          <p className="text-[24px] border border-black rounded-md bg-black text-white pl-2">
            ₩{Math.floor((monthlyCost / 2) * exchangeRate).toLocaleString("kr")}
          </p>
        </div>
        <div className="border border-white p-2">
          <h2 className="text-[30px] border-b p-2 mb-4">
            GPU server + Batch API Call
          </h2>
          <p className="text-[24px]">Audio to Text</p>
          <p className="text-[18px]">${gpuCost}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩{Math.floor(gpuCost * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">ChatGPT-4o</p>
          <p className="text-[18px]">${chatGPTPrice / 2}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩
            {Math.floor((chatGPTPrice / 2) * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">Total</p>
          <p className="text-[18px]">${gpuDailyCost}</p>
          <p className="text-[18px] border border-black rounded-md bg-black text-white pl-2 mb-12">
            ₩{Math.floor(gpuDailyCost * exchangeRate).toLocaleString("kr")}
          </p>
          <p className="text-[24px]">Estimated Monthly Cost</p>
          <p className="text-[18px]">${gpuMonthlyCost}</p>
          <p className="text-[24px] border border-black rounded-md bg-black text-white pl-2">
            ₩{Math.floor(gpuMonthlyCost * exchangeRate).toLocaleString("kr")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricePage;
