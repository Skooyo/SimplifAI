import { addOrdertoOrderBook } from "@/lib/db_actions/user-actions"

const addOrderTest = () => {

  const addOrdertoBook = async () => {
    await addOrdertoOrderBook({userID: "0xc17aeA1c1D9dE8aF1cE61bafCF83914c69F38C10", newOrder: {
      tradeMin: 1,
      tradeMax: 2,
      orderType: "BUY",
      quantity: 3,
      transactionCount: 3,
      lastTimeStampSinceTransaction: new Date()
    }})
  }

  const handleClick = () => {
    const updatedUser = addOrdertoBook();
    console.log("i added order to db")
  }

  return (
    <button
    className="p-4 bg-red-400"
    onClick={handleClick}>
      hello
    </button>
  )
}

export default addOrderTest;