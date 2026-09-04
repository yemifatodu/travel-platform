-- Same recurring gap as rooms/hotels/booking_items/reviews/ratings: both
-- tables were created without RLS ever being turned on, so any existing
-- policies are dormant and the tables are currently fully open to the anon
-- key for reads AND writes.

ALTER TABLE public.tours_activities ENABLE ROW LEVEL SECURITY;
-- "Public read tours" policy already exists in schema.sql — this just
-- activates it.

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Coupons are validated server-side inside the checkout API routes (using
-- the service-role client), never fetched as a public list — a customer
-- should never be able to browse all valid codes. This SELECT policy is
-- defense-in-depth for that server-side path, not something the client
-- reads directly. No INSERT/UPDATE/DELETE policy is added: coupon
-- management stays a service-role-only / manual operation, never
-- customer-facing.
CREATE POLICY "Service reads active coupons"
  ON public.coupons
  FOR SELECT
  USING (is_active = TRUE);

-- Atomic increment for coupon redemption — called from the booking webhooks
-- on successful payment. A plain read-then-write from the app would race
-- under concurrent redemptions of the same code; this does it in one
-- statement instead.
CREATE OR REPLACE FUNCTION public.increment_coupon_uses(coupon_code_input TEXT)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER SET search_path = public
AS $$
  UPDATE public.coupons
  SET uses_count = uses_count + 1
  WHERE code = coupon_code_input;
$$;
