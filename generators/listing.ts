import {GetServerSidePropsContext} from "next";
import {clerkClient, getAuth} from "@clerk/nextjs/server";

const prodGenerators = [
    "cold_emails_v2",
    "emails_v2",
    "google_ad_descriptions",
    "google_ad_titles",
    "home_for_rent",
    "landing_pages",
    "landing_page_headlines",
    "linkedin_posts_v2",
    "location",
    "new_builds_project",
    "office_space_for_rent",
    "plot_listing",
    "prefab_houses",
    "real_estate",
    "real_estate_social_media",
    "real_estate_video",
    "review_responses",
    "translations",
    "youtube_descriptions_v2",
];

const betaGenerators = [
    "bikes",
    "neutral_video",
    "social_media",
    "google_ads",
    "facebook_ads",
    "linkedin_ad_headlines",
    "linkedin_ad_descriptions",
    "linkedin_ads",
    "linkedin_posts",
    "product_descriptions",
    "amazon_product_descriptions",
    "amazon_product_titles",
    "amazon_product_features",
    "amazon_ad_headlines",
    "blog_ideas",
    "blog_intros",
    "blog_outlines",
    "feature_to_benefits",
    "content_rephrase",
    "sentence_expand",
    "content_shorten",
    "listicle_ideas",
    "emails",
    "growth_ideas",
    "startup_ideas",
    "pas",
    "aida",
    "meta_home",
    "meta_blog",
    "meta_prod",
    "youtube_titles",
    "youtube_ideas",
    "youtube_outlines",
    "youtube_descriptions",
    "youtube_intros",
    "keyword_extract",
    "product_names",
    "analogies",
    "short_press_releases",
    "company_bios",
    "company_vision",
    "company_mission",
    "personal_bios",
    "summary",
    "quora_answers",
    "paragraph_writer",
    "conclusion_writer",
    "instagram_captions",
    "tiktok_scripts",
    "tweets",
    "twitter_threads",
    "tiktok_hooks",
    "story_generation",
    "question_generation",
    "youtube_hooks",
    "lyrics_generator",
    "define_this",
    "youtube_intros_v2",
    "google_ad_titles_v2",
    "google_ad_descriptions_v2",
    "bulletpoint_answers",
    "rewrite_with_keywords",
    "ans_my_ques",
    "call_to_action",
    "app_notifications",
    "pros_and_cons",
    "active_voice",
    "instant_article_writer",
    "review_generator",
    "subject_lines",
    "tone_changer",
    "instagram_hashtags",
    "women_clothing",
    "images",
    "images_stablediffusion",
];

export const loadAiGenerators = async (ctx?: GetServerSidePropsContext) => {

    let role: any = "";
    if (ctx?.req) {
        const {userId} = getAuth(ctx?.req);
        if (userId) {
            const user = await clerkClient.users.getUser(userId);
            role = user.publicMetadata.organizationRole;
        }
    }

    const isBeta =
        !ctx || (ctx && role === "beta");

    const generators = isBeta
        ? [...prodGenerators, ...betaGenerators]
        : prodGenerators;

    const aiGenerators = await Promise.all(
        generators.map(async (name) => {
            try {
                const generatorModule = await import(`@/generators/${name}/main`);
                return generatorModule.metaData();
            } catch (error) {
            }
        }),
    );
    return aiGenerators.filter(Boolean);
};
