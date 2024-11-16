const processArguments = (response: any) => {
    const functionName = response.function.name;
    const args = JSON.parse(response.function.arguments);
    let processedArgs = null;
    if (functionName == "transfer_tokens") {
        processedArgs = {
            specifiedToken: args.specifiedToken,
            specifiedAmount: args.specifiedAmount,
            transferTo: args.transferTo,
        }
    }

    if (functionName == "swap_tokens" || functionName == "buy_tokens") {
        processedArgs = {
            tokenToBuy: args.tokenToBuy,
            tokenToSell: args.tokenToSell,
            specifiedAmount: args.specifiedAmount,
            specifiedToken: args.specifiedToken,
        }
    }

    if (functionName == "settingAI") {
        processedArgs = {
            tokenToBuy: args.tokenToBuy,
            tokenToSell: args.tokenToSell,
            specifiedAmount: args.specifiedAmount,
            specifiedToken: args.specifiedToken,
            buyMax: args.buyMax ? args.buyMax : null,
            buyMin: args.buyMin ? args.buyMin : null,
            sellMax: args.sellMax ? args.sellMax : null,
            sellMin: args.sellMin ? args.sellMin : null,
        }
    }

    return {
        function: functionName,
        arguments: processedArgs,
    };
}

export default processArguments;
