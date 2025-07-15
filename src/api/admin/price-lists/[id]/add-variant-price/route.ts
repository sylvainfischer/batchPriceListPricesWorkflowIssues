import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { batchPriceListPricesWorkflow } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params // price list ID
  const { variant_id, amount, currency_code } = req.body

  const pricingModuleService = req.scope.resolve(Modules.PRICING)
  const priceList = await pricingModuleService.retrievePriceList(id)
  if (!priceList) {
    return res.status(404).json({ message: "Price list not found" })
  }

  const { result } = await batchPriceListPricesWorkflow(req.scope).run({
    input: {
      data: {
        id,
        create: [
          {
            variant_id,
            amount,
            currency_code,
          },
        ],
        update: [],
        delete: [],
      },
    },
  })

  res.status(200).json({ created: result.created })
}