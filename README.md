
# How to Reproduce the Bug

This guide explains how to reproduce the performance issue on the custom MedusaJS API endpoint.

## Steps

1. **Start the project**

   Launch the project as you would for any standard MedusaJS setup.

2. **Seed the database**

   Run the following command:

   ```bash
   yarn seed
   ```

   > **Note:**  
   > The seeding process takes some time.  
   > It creates **10,000 products** (each with a variant) and a price list containing **10,000 prices**.

3. **Start the MedusaJS server**

   Start your MedusaJS server as usual.

4. **Call the custom API**

   Make a POST request to the following endpoint:

   ```
   /admin/price-lists/:idPriceList/add-variant-price
   ```

   with the following JSON body:

   ```json
   {
     "variant_id": "variant_01K07Y11347ZTXJJ4AMAKQ0N6C",
     "amount": "100",
     "currency_code": "eur"
   }
   ```

   > ⚠️ **Important:**  
   > Replace `"variant_id"` with an actual variant ID from your database.

   You can use a tool like **Postman** to send the request.

5. **Expected result**

   In my tests, the request took **27 seconds** to execute.  
   (This is the performance issue to investigate.)