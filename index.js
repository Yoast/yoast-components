/*
 * Composites imports.
 */
// Composites/OnboardingWizard imports.
import { default as OnboardingWizard } from "./composites/OnboardingWizard/OnboardingWizard";
import { default as MessageBox } from "./composites/OnboardingWizard/MessageBox";
import { default as LoadingIndicator } from "./composites/OnboardingWizard/LoadingIndicator";
// Composites/AngoliaSearch imports.
import { default as AlgoliaSearcher } from "./composites/AlgoliaSearch/AlgoliaSearcher";
// Composites/Plugin imports.
import { default as ScoreAssessment } from "./composites/Plugin/Shared/components/ScoreAssessments";
import { default as Collapsible } from "./composites/Plugin/Shared/components/Collapsible";
import { default as LanguageNotice } from "./composites/Plugin/Shared/components/LanguageNotice";
import { default as YoastButton } from "./composites/Plugin/Shared/components/YoastButton";
import { default as YoastModal } from "./composites/Plugin/Shared/components/YoastModal";
import { default as SvgIcon } from "./composites/Plugin/Shared/components/SvgIcon";
import { default as SynonymsInput } from "./composites/Plugin/Shared/components/SynonymsInput";
import { default as Collabsible } from ".//composites/Plugin/shared/components/Collapsible";
import { default as ContentAnalysis } from "./composites/Plugin/ContentAnalysis/components/ContentAnalysis";
import { default as HelpCenter } from "./composites/Plugin/HelpCenter/HelpCenter.js";
import { default as Synonyms } from "./composites/Plugin/Synonyms/actions/synonyms";
// Composites/LinkSuggestions imports.
import { default as LinkSuggestions } from "./composites/LinkSuggestions/LinkSuggestions";
// Composites/KeywordSuggestions imports.
import { default as KeywordSuggestions } from "./composites/KeywordSuggestions/KeywordSuggestions";
// Composites/basic imports.
import { default as Loader } from "./yoast-components/composites/basic/Loader";

export {
	OnboardingWizard,
	AlgoliaSearcher,
	HelpCenter,
	MessageBox,
	LinkSuggestions,
	KeywordSuggestions,
	LanguageNotice,
	ContentAnalysis,
	Collapsible,
	SynonymsInput,
	LoadingIndicator,
	ScoreAssessment,
	YoastButton,
	YoastModal,
	SvgIcon,
	Loader,
	Synonyms,
	Collabsible,
};

export * from "./composites/Plugin/SnippetPreview";
export * from "./composites/Plugin/SnippetEditor";
export * from "./composites/Plugin/Synonyms/";
export * from "./composites/Plugin/ContentAnalysis";
export * from "./forms";
export * from "./redux";
export StyledSection from "./forms/StyledSection";
export { default as colors } from "./style-guide/colors.json";
export { default as utils } from "./utils";
export { getRtlStyle } from "./utils/helpers/styled-components";
export { localize } from "./utils/i18n";
export { setTranslations } from "./utils/i18n";
export { translate } from "./utils/i18n";
export { default as OnboardingWizardHelper } from "./composites/OnboardingWizard/helpers/";
export * from "./composites/Plugin/DashboardWidget";

