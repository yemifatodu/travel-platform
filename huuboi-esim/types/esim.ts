export interface ESIMPlan {
  id: string;
  title: string;
  country_code: string;
  country_name: string;
  data_amount: string;
  validity_days: number;
  retail_price: number;
  currency: string;
}

export interface OrderResponse {
  success: boolean;
  data: {
    id: string;
    status: string;
    esim_iccid?: string;
    activation_code?: string;
    esim_qr_code?: string;
  };
}