/*
  Warnings:

  - You are about to drop the column `discountValue` on the `discount_code` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `discount_code` table. All the data in the column will be lost.
  - You are about to drop the column `maxUsageCount` on the `discount_code` table. All the data in the column will be lost.
  - You are about to drop the column `usageCount` on the `discount_code` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `discount_code` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `discount_code` table. All the data in the column will be lost.
  - You are about to drop the column `grabbedAt` on the `member_discount_code` table. All the data in the column will be lost.
  - Added the required column `discount_value` to the `discount_code` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_from` to the `discount_code` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_until` to the `discount_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discount_code" DROP COLUMN "discountValue",
DROP COLUMN "isActive",
DROP COLUMN "maxUsageCount",
DROP COLUMN "usageCount",
DROP COLUMN "validFrom",
DROP COLUMN "validUntil",
ADD COLUMN     "discount_value" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "max_usage_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usage_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "valid_from" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "valid_until" TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE "member_discount_code" DROP COLUMN "grabbedAt",
ADD COLUMN     "grabbed_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
