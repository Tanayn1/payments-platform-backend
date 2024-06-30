-- CreateTable
CREATE TABLE "paymentForms" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "testmode" BOOLEAN NOT NULL,
    "trialPeriod" INTEGER,
    "cancelUrl" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "productNames" JSONB[],
    "successUrl" TEXT NOT NULL,
    "priceIds" TEXT[],
    "productIds" TEXT[],
    "collectBilling" BOOLEAN NOT NULL,
    "collectPhone" BOOLEAN NOT NULL,

    CONSTRAINT "paymentForms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentForms_id_key" ON "paymentForms"("id");
