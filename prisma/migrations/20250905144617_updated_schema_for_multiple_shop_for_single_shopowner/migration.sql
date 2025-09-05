/*
  Warnings:

  - A unique constraint covering the columns `[ownerName,shopName,contactId]` on the table `ShopOwner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Contact_email_key";

-- DropIndex
DROP INDEX "public"."Contact_phone_key";

-- DropIndex
DROP INDEX "public"."ShopOwner_contactId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ShopOwner_ownerName_shopName_contactId_key" ON "public"."ShopOwner"("ownerName", "shopName", "contactId");
