-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "radius" DECIMAL(65,30) NOT NULL,
    "risk_level" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_id_key" ON "Event"("event_id");
