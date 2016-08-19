import MailchimpSignup from '../components/custom_components/MailchimpSignup';
import PublishingEntity from "../components/custom_components/PublishingEntity";
import PostTypeVisibility from "../components/custom_components/PostTypeVisibility";
import ConnectGoogleSearchConsole from "../components/custom_components/ConnectGoogleSearchConsole";

let configuration = {
	"endpoint": "http://127.0.0.1:8882/onboarding?wp_nonce=nonce",
	"customComponents": {
		MailchimpSignup, PublishingEntity, PostTypeVisibility, ConnectGoogleSearchConsole,
	},
	"fields": {
		"upsellConfigurationService": {
			"component": "HTML",
			"properties": {
				"html": "You can now have Yoast configure Yoast SEO for you.",
			},
		},
		"mailchimpSignup": {
			"component": "MailchimpSignup",
			"properties": {
				"label": "If you would like us to keep you up-to-date regarding Yoast SEO and other plugins by Yoast, subscribe to our newsletter:",
			},
			"data": "",
		},
		"environment": {
			"component": "Choice",
			"properties": {
				"label": "Please specify the environment {site_url} is running in.",
				"choices": {
					"production": {
						"label": "Production - live site.",
					},
				},
			},
			"data": "",
			"default": "production",
		},
		"siteType": {
			"component": "Choice",
			"properties": {
				"label": "What type of site is {site_url}?",
				"choices": {
					"blog": {
						"label": "Blog",
					},
					"shop": {
						"label": "Shop",
					},
					"news": {
						"label": "News site",
					},
					"smallBusiness": {
						"label": "Small business site",
					},
					"corporateOther": {
						"label": "Other corporate site",
					},
					"personalOther": {
						"label": "Other personal site",
					},
				},
			},
			"data": "",
		},
		"publishingEntity": {
			"component": "PublishingEntity",
			"data": {
				"publishingEntityType": "{publishing_entity_type}",
			},
			"defaults": {
				"publishingEntityType": "",
			},
		},
	},
	"steps": {
		"intro": {
			"title": "Intro",
			"fields": [ "upsellConfigurationService", "mailchimpSignup" ],
		},
		"environment": {
			"title": "Environment",
			"fields": [ "environment" ],
		},
		"siteType": {
			"title": "Site type",
			"fields": [ "siteType" ],
		},
		"publishingEntity": {
			"title": "Company or person",
			"fields": [ "publishingEntity" ],
		},
	},
};

export default configuration;
