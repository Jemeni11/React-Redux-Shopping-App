import CapitalizeString from "./CapitalizeString";

export const categoryNameFromParamsName = (categoryArr, categoryItem) => {
  return categoryArr[0][categoryArr[1].indexOf(categoryItem)];
};
export const inventoryForThisCategory = (inventory, cNFPN_Arr, cNFPN_Item) => {
  return inventory.filter(
    (inventoryItem) =>
      CapitalizeString(inventoryItem.category) ===
      categoryNameFromParamsName(cNFPN_Arr, cNFPN_Item)
  );
};