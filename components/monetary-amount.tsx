import BigNumber from "bignumber.js";

export const MonetaryAmount = ({
  centCost,
}: {
  centCost: number;
}) => {
  const finalCost = new BigNumber(centCost).dividedBy(100).toFixed(2) + " €";

  return (<span>{finalCost}</span>);
};
