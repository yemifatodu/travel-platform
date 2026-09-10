/**
 * A single purchasable data package offered by an operator.
 * Its `id` (a string slug, e.g. "kallur-digital-7days-1gb") is what you pass
 * as package_id when creating an order.
 */
export interface AiraloOperatorPackage {
	id: string;
	type: string;
	price: number;
	net_price: number;
	amount: number;
	day: number;
	is_unlimited: boolean;
	title: string;
	data: string;
	voice?: string | null;
	text?: string | null;
	prices?: Record<string, { net_price: number; recommended_retail_price?: number }>;
	short_info?: string | null;
	qr_installation?: string;
	manual_installation?: string;
	is_fair_usage_policy?: boolean;
	fair_usage_policy?: string | null;
}

/** An operator (network) offering one or more packages for a country. */
export interface AiraloOperator {
	id: number;
	title: string;
	type: string;
	plan_type?: string;
	is_roaming?: boolean;
	esim_type?: string;
	info?: string[];
	image?: { width: number; height: number; url: string } | null;
	coverages?: Array<{ name: string; networks: Array<{ name: string; types: string[] }> }>;
	apn?: { ios?: Record<string, string>; android?: Record<string, string> };
	packages: AiraloOperatorPackage[];
}

/** Country/region grouping returned by GET /v2/packages. */
export interface AiraloPackage {
	slug: string;
	country_code: string;
	title: string;
	image?: { width: number; height: number; url: string };
	min_price?: { net_price?: Record<string, number>; recommended_retail_price?: Record<string, number> };
	operators: AiraloOperator[];
}

/**
 * Flattened package convenient for rendering a plan picker — built client-side
 * from AiraloPackage[] via `flattenPackages()`, not returned directly by the API.
 */
export interface FlattenedPackage {
	package_id: string;
	country_title: string;
	country_code: string;
	operator_title: string;
	title: string;
	data: string;
	day: number;
	is_unlimited: boolean;
	price: number;
	currency: string;
}

export interface AiraloPackageListParams {
	type?: 'global' | 'local' | 'regional';
	country?: string;
	limit?: number;
	page?: number;
}
