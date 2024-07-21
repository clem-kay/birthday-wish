/*
  Warnings:

  - Added the required column `name` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wish" ADD COLUMN     "name" TEXT NOT NULL;
