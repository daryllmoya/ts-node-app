interface ParsedAddress {
  addressLine1: string;
  locality: string;
  postCode: string;
  state: string;
  country: string;
}

export const parseAddressData = (data: any[]): string => {
  const parsedAddresses: string[] = [];

  for (const item of data) {
    if (
      item.requestBody &&
      item.requestBody.inputAddress &&
      item.requestBody.inputAddress.addressLine1 &&
      item.requestBody.inputAddress.locality &&
      item.requestBody.inputAddress.postCode &&
      item.requestBody.inputAddress.state &&
      item.requestBody.inputAddress.country
    ) {
      const parsedAddress: ParsedAddress = {
        addressLine1: item.requestBody.inputAddress.addressLine1,
        locality: item.requestBody.inputAddress.locality,
        postCode: item.requestBody.inputAddress.postCode,
        state: item.requestBody.inputAddress.state,
        country: item.requestBody.inputAddress.country,
      };

      const formattedAddress = Object.values(parsedAddress).join(",");
      parsedAddresses.push(formattedAddress);
    }
  }

  return parsedAddresses.join("\n");
};
