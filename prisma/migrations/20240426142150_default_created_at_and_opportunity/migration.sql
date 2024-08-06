/*
  Warnings:

  - Made the column `created_at` on table `360organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `business_impact` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `business_impact_baseline` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `capabilities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `capability_to_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `cases` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `cases_to_industry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `country` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `departments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `entry_metric_values` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `entry_to_initiatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `entry_to_objectives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `feasibility_criteria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `industries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `initiatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `locale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `metric_to_metric_units` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `metric_units` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `metrics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `models` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `organization_objectives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `period` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `providers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `rai_practices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `report_changes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `report_to_currency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `report_to_locale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `report_updates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `solution_to_industries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `solution_to_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `solutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `statuses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `supervisions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `task_to_metrics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `task_to_model` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `task_to_model_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `task_to_solution` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `task_to_solution_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `updated_rai_policies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `360organizations` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `business_impact` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `business_impact_baseline` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `capabilities` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `capability_to_model` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `cases` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `cases_to_industry` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `country` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `departments` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `entries` ADD COLUMN `business_area_id` VARCHAR(191) NULL,
    ADD COLUMN `opportunity_id` VARCHAR(191) NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `entry_metric_values` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `entry_to_initiatives` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `entry_to_objectives` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `feasibility_criteria` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `industries` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `initiatives` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `locale` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `metric_to_metric_units` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `metric_units` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `metrics` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `models` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `organization_objectives` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `period` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `providers` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `rai_practices` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `report_changes` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `report_to_currency` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `report_to_locale` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `report_updates` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `reviews` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `solution_to_industries` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `solution_to_model` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `solutions` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `statuses` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `supervisions` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `task_to_metrics` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `task_to_model` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `task_to_model_reviews` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `task_to_solution` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `task_to_solution_reviews` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `tasks` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `updated_rai_policies` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `business_areas` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `organization_creator_id` VARCHAR(100) NOT NULL,
    `industry_id` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `opportunities` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `industry_id` VARCHAR(191) NOT NULL,
    `business_area_id` VARCHAR(191) NOT NULL,
    `country_id` VARCHAR(100) NULL,
    `region_id` VARCHAR(100) NULL,
    `organization_creator_id` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `opportunity_to_case` (
    `id` VARCHAR(100) NOT NULL,
    `case_id` VARCHAR(191) NOT NULL,
    `opportunity_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
