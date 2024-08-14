-- CreateTable
CREATE TABLE "discount_code" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "discountValue" DECIMAL(10,2) NOT NULL,
    "maxUsageCount" INTEGER NOT NULL DEFAULT 0,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "validFrom" TIMESTAMP(6) NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "discount_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_discount_code" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "discount_code_id" INTEGER NOT NULL,
    "grabbedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_discount_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discount_code_code_key" ON "discount_code"("code");

-- CreateIndex
CREATE UNIQUE INDEX "member_discount_code_member_id_discount_code_id_key" ON "member_discount_code"("member_id", "discount_code_id");

-- AddForeignKey
ALTER TABLE "member_discount_code" ADD CONSTRAINT "fk_member_discount_code_member" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member_discount_code" ADD CONSTRAINT "fk_member_discount_code_discount_code" FOREIGN KEY ("discount_code_id") REFERENCES "discount_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
