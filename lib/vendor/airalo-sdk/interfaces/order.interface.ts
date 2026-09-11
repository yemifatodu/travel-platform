import { AiraloSIM } from './sim.interface';

export type AiraloOrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface AiraloOrderListParams {
	include?: string;
	createdAt?: string;
	orderStatus?: AiraloOrderStatus;
	description?: string;
	limit?: number;
	page?: number;
}

export interface AiraloOrder {
	id: number;
	user_id: number;
	status: AiraloOrderStatus;
	total: number;
	currency: string;
	description?: string;
	created_at: string;
	updated_at: string;
	sims?: AiraloSIM[];
}

export interface AiraloOrderCreateParams {
	package_id: string;
	quantity: number;
	type?: 'sim';
	description?: string;
	brand_settings_name?: string;
	webhook_url?: string;
	/** If set, Airalo emails the eSIM directly to this address (requires sharing_option) */
	to_email?: string;
	/** Required when to_email is set. Any of: "link", "pdf" */
	sharing_option?: Array<'link' | 'pdf'>;
	/** Optional CC recipients, used with to_email */
	copy_address?: string[];
}

export interface AiraloOrderAsyncParams extends AiraloOrderCreateParams {
	callback_url: string;
}

export interface AiraloTopupOrderParams {
	iccid: string;
	package_id: string;
	description?: string;
}

export interface AiraloOrderStatusResponse {
	slug: string;
	name: string;
}
