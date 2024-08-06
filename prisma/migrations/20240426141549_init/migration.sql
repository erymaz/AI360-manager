-- CreateTable
CREATE TABLE `360organizations` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `industry_id` VARCHAR(100) NULL,
    `country_id` VARCHAR(100) NULL,
    `locale_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `waipify_organization_id` VARCHAR(100) NULL,
    `creator_id` VARCHAR(100) NULL,
    `is_superadmin` BOOLEAN NULL DEFAULT false,
    `is_supervisor` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `ai_industry_standards_to_provider` (
    `id` VARCHAR(100) NOT NULL,
    `provider_id` VARCHAR(100) NOT NULL,
    `industry_standard_id` VARCHAR(100) NOT NULL,
    `updated_date` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`, `provider_id`, `industry_standard_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `capabilities` (
    `id` VARCHAR(100) NOT NULL,
    `model_id` VARCHAR(100) NULL,
    `name` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `capability_to_model` (
    `id` VARCHAR(100) NOT NULL,
    `model_id` VARCHAR(100) NULL,
    `capability_id` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `organization_creator_id` VARCHAR(100) NULL,
    `has_user_friendly_ui` BOOLEAN NULL,
    `has_apis` BOOLEAN NULL,
    `has_grpc` BOOLEAN NULL,
    `has_extension` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `cases_to_industry` (
    `id` VARCHAR(100) NOT NULL,
    `case_id` VARCHAR(100) NULL,
    `industry_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `cases` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `industry_id` VARCHAR(100) NULL,
    `country_id` VARCHAR(100) NULL,
    `region_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL,
    `organization_creator_id` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `original_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `filial_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `entries` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `case_id` VARCHAR(100) NULL,
    `subcase_id` VARCHAR(100) NULL,
    `provider_id` VARCHAR(100) NULL,
    `task_id` VARCHAR(100) NULL,
    `locale_id` VARCHAR(100) NULL,
    `winner_solution_id` VARCHAR(100) NULL,
    `planned` VARCHAR(100) NULL,
    `department_id` VARCHAR(100) NULL,
    `status_id` VARCHAR(100) NULL,
    `author_id` VARCHAR(100) NULL,
    `report_id` VARCHAR(100) NULL,
    `objective_id` VARCHAR(100) NULL,
    `business_impact` FLOAT NULL,
    `feasibility_number` FLOAT NULL,
    `is_draft` BOOLEAN NULL,
    `winner_solution_is_active` BOOLEAN NULL DEFAULT false,
    `winner_solution_is_custom` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL,
    `use_case_key` VARCHAR(100) NULL,
    `subcase_key` VARCHAR(100) NULL,
    `task_key` VARCHAR(100) NULL,
    `creator_organization_id` VARCHAR(100) NULL,
    `time_to_impact` VARCHAR(100) NULL,
    `assessment` VARCHAR(1000) NULL,
    `goal` VARCHAR(100) NULL,
    `is_winner` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `business_impact_baseline` (
    `id` VARCHAR(100) NOT NULL,
    `baseline_value` VARCHAR(100) NULL,
    `comparison_period` VARCHAR(100) NULL,
    `task_to_metric_id` VARCHAR(100) NULL,
    `after_ai_value` VARCHAR(100) NULL,
    `entry_business_impact_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `business_impact` (
    `id` VARCHAR(100) NOT NULL,
    `entry_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `repeats_yearly` VARCHAR(50) NULL,
    `time_per_outcomes` VARCHAR(50) NULL,
    `time_per_outcomes_after_ai` VARCHAR(50) NULL,
    `reduced_process_time_from` VARCHAR(50) NULL,
    `reduced_process_time_to` VARCHAR(50) NULL,
    `employee_hourly_rate` VARCHAR(50) NULL,
    `total_cost_yearly` VARCHAR(50) NULL,
    `total_cost_yearly_after_ai` VARCHAR(50) NULL,
    `can_perform_other_tasks` BOOLEAN NULL DEFAULT false,
    `has_high_replacement_cost` BOOLEAN NULL DEFAULT false,
    `has_direct_impact` BOOLEAN NULL DEFAULT false,
    `open_new_revenue_stream` BOOLEAN NULL DEFAULT false,
    `revenue_increase_with_ai` VARCHAR(50) NULL,
    `comments` VARCHAR(200) NULL,
    `is_not_quantifiable` BOOLEAN NULL,
    `estimated_value` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `entry_metric_values` (
    `id` VARCHAR(100) NOT NULL,
    `entry_id` VARCHAR(100) NULL,
    `value_difference` VARCHAR(100) NULL,
    `type` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `logic_comment` VARCHAR(100) NULL,
    `is_not_quantifiable` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `entry_to_initiatives` (
    `id` VARCHAR(100) NOT NULL,
    `entry_id` VARCHAR(100) NULL,
    `initiative_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `entry_to_objectives` (
    `id` VARCHAR(100) NOT NULL,
    `entry_id` VARCHAR(100) NULL,
    `objective_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `feasibility_criteria` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `weight_multiplicative` FLOAT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `360organization_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `filials` (
    `id` VARCHAR(100) NOT NULL,
    `360organization_id` VARCHAR(100) NULL,
    `name` VARCHAR(100) NULL,
    `address` VARCHAR(100) NULL,
    `address_number` VARCHAR(100) NULL,
    `zip_code` VARCHAR(100) NULL,
    `country_id` VARCHAR(100) NULL,
    `deletable` BOOLEAN NULL DEFAULT false,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `industries` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `industry_standards` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `institution_name` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `history_version` VARCHAR(100) NULL,
    `updated_date` TIMESTAMP(0) NULL,
    `type` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `initiatives` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `business_impact` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `start_time` TIMESTAMP(0) NULL,
    `end_time` TIMESTAMP(0) NULL,
    `period` VARCHAR(100) NULL,
    `objective_id` VARCHAR(100) NULL,
    `filial_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `locale` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `metric_to_metric_units` (
    `id` VARCHAR(100) NOT NULL,
    `metric_id` VARCHAR(100) NULL,
    `metric_unit_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `metric_units` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `metric_unit` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `country_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `metrics` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `360organization_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `is_business_impact` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `models` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `provider_id` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `organization_creator_id` VARCHAR(100) NULL,
    `documentation_url` VARCHAR(2048) NULL,
    `features` VARCHAR(191) NULL,
    `benefits` VARCHAR(191) NULL,
    `main_capability_name` VARCHAR(100) NULL,
    `has_text_generation` BOOLEAN NULL,
    `has_function_calling` BOOLEAN NULL,
    `has_embeddings` BOOLEAN NULL,
    `has_fine_tunnings` BOOLEAN NULL,
    `has_image_generation` BOOLEAN NULL,
    `has_vision` BOOLEAN NULL,
    `has_text_to_speech` BOOLEAN NULL,
    `has_speech_to_text` BOOLEAN NULL,
    `has_moderation` BOOLEAN NULL,
    `version` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `organization_objectives` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `business_impact` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `start_time` TIMESTAMP(0) NULL,
    `end_time` TIMESTAMP(0) NULL,
    `period` VARCHAR(100) NULL,
    `360organization_id` VARCHAR(100) NULL,
    `filial_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `providers` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `logo` VARCHAR(1000) NULL,
    `type` VARCHAR(100) NULL,
    `is_internal` BOOLEAN NULL,
    `description` VARCHAR(800) NULL,
    `headquarters_city_id` VARCHAR(100) NULL,
    `headquarters_country_id` VARCHAR(100) NULL,
    `headquarters_address_line` VARCHAR(100) NULL,
    `headquarters_address_number` VARCHAR(100) NULL,
    `headquarters_zip_code` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `organzation_creator_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `rai_audits_to_provider` (
    `id` VARCHAR(100) NOT NULL,
    `provider_id` VARCHAR(100) NOT NULL,
    `rai_crtification_id` VARCHAR(100) NOT NULL,
    `validity_date` TIMESTAMP(0) NULL,
    `auditing_entity` VARCHAR(100) NULL,

    PRIMARY KEY (`id`, `provider_id`, `rai_crtification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `rai_certifications` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `instituation_name` VARCHAR(100) NULL,
    `type` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `rai_practices` (
    `id` VARCHAR(100) NOT NULL,
    `provider_id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `type` VARCHAR(100) NULL,
    `updated_date` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `url` VARCHAR(100) NULL,

    PRIMARY KEY (`id`, `provider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `report_changes` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `report_to_currency` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `report_to_locale` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `report_updates` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `reports` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `preview_url` VARCHAR(100) NULL,
    `slug` VARCHAR(100) NULL,
    `360organization_id` VARCHAR(100) NULL,
    `filial_id` VARCHAR(100) NULL,
    `time_zone` TIMESTAMP(0) NULL,
    `default_currency_code` VARCHAR(100) NULL,
    `default_locale` VARCHAR(100) NULL,
    `user_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(100) NOT NULL,
    `solution_id` VARCHAR(100) NULL,
    `feasibility_criteria_id` VARCHAR(100) NULL,
    `score` FLOAT NULL,
    `comment` VARCHAR(4000) NULL,
    `author_id` VARCHAR(100) NULL,
    `reviewer_organization_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `model_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `solution_to_industries` (
    `id` VARCHAR(100) NOT NULL,
    `solution_id` VARCHAR(100) NOT NULL,
    `industry_id` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`, `solution_id`, `industry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `solution_to_model` (
    `id` VARCHAR(100) NOT NULL,
    `solution_id` VARCHAR(100) NOT NULL,
    `model_id` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`, `solution_id`, `model_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `solutions` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `provider_id` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `organization_creator_id` VARCHAR(100) NULL,
    `documentation_url` VARCHAR(2048) NULL,
    `features` VARCHAR(191) NULL,
    `benefits` VARCHAR(191) NULL,
    `has_api` BOOLEAN NULL,
    `has_user_friendly_ui` BOOLEAN NULL,
    `has_grpc` BOOLEAN NULL,
    `has_extension` BOOLEAN NULL,
    `is_platform` BOOLEAN NULL,
    `has_incumbent_integration` BOOLEAN NULL,
    `is_available` BOOLEAN NULL DEFAULT false,
    `model_id` VARCHAR(100) NULL,
    `version` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `statuses` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `hex_colour_value` VARCHAR(100) NULL,
    `360organization_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `subcases` (
    `id` VARCHAR(100) NOT NULL,
    `case_id` VARCHAR(100) NULL,
    `name` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `organization_creator_id` VARCHAR(100) NULL,
    `country_id` VARCHAR(100) NULL,
    `region_id` INTEGER NULL,
    `author_id` VARCHAR(100) NULL,
    `original_id` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `supervisions` (
    `id` VARCHAR(100) NOT NULL,
    `supervisor_id` VARCHAR(100) NULL,
    `supervised_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `task_to_metrics` (
    `id` VARCHAR(100) NOT NULL,
    `task_id` VARCHAR(100) NULL,
    `metric_id` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `task_to_model` (
    `id` VARCHAR(100) NOT NULL,
    `task_id` VARCHAR(100) NULL,
    `model_id` VARCHAR(100) NULL,
    `model_capabilities` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `development_description` VARCHAR(100) NULL,
    `suggested` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `task_to_model_reviews` (
    `id` VARCHAR(100) NOT NULL,
    `task_to_model_id` VARCHAR(100) NULL,
    `feasibility_criteria_id` VARCHAR(100) NULL,
    `reviewer_organization_id` VARCHAR(100) NULL,
    `entry_id` VARCHAR(100) NULL,
    `score` FLOAT NULL,
    `comment` VARCHAR(4000) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `task_to_solution` (
    `id` VARCHAR(100) NOT NULL,
    `task_id` VARCHAR(100) NULL,
    `entry_id` VARCHAR(100) NULL,
    `solution_id` VARCHAR(100) NULL,
    `feasibility_number` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `needs_allocation` BOOLEAN NULL DEFAULT false,
    `impact_starts` VARCHAR(191) NULL,
    `suggested` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `task_to_solution_reviews` (
    `id` VARCHAR(100) NOT NULL,
    `task_to_solution_id` VARCHAR(100) NULL,
    `feasibility_criteria_id` VARCHAR(100) NULL,
    `reviewer_organization_id` VARCHAR(100) NULL,
    `entry_id` VARCHAR(100) NULL,
    `score` DECIMAL(5, 1) NOT NULL,
    `comment` VARCHAR(4000) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` VARCHAR(100) NOT NULL,
    `subcase_id` VARCHAR(100) NULL,
    `name` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `organization_creator_id` VARCHAR(100) NULL,
    `case_id` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `original_id` VARCHAR(100) NULL,
    `risk` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `updated_rai_policies` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `description` VARCHAR(100) NULL,
    `history_version` VARCHAR(100) NULL,
    `file` VARCHAR(100) NULL,
    `updated_date` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `country` (
    `id` VARCHAR(100) NOT NULL,
    `de` VARCHAR(100) NOT NULL,
    `es` VARCHAR(100) NULL,
    `en` VARCHAR(100) NULL,
    `flag` VARCHAR(100) NULL,
    `iso2` VARCHAR(100) NULL,
    `iso3` VARCHAR(100) NULL,
    `updated_date` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `period` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `updated_date` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
