function Pattern(props: { name: string; conversation: string[][] }) {
  const { name, conversation } = props;
  return (
    <div className="w-[48%] flex flex-col rounded-md bg-gray-200 p-4">
      <h1 className="text-[24px] mb-4">{name}</h1>
      {conversation.map(([key, value]) => (
        <div key={key} className="flex items-baseline gap-4">
          <p className="basis-28 bg-gray-400 rounded-md p-1 text-center mb-4 font-bold">
            {key}
          </p>
          <p className="text-[18px]">{value}</p>
        </div>
      ))}
    </div>
  );
}

export { Pattern };
