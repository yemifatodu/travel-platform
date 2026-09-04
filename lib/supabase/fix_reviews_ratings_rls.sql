-- Fix: reviews and ratings were never RLS-enabled at all — same class of gap
-- as rooms/hotels/booking_items found earlier this session, just the inverse
-- direction: instead of blocking reads the app needs, this left both tables
-- fully open to any anon-key write, since Postgres ignores policies entirely
-- when RLS is off for a table. reviews already had SELECT/INSERT policies
-- defined in schema.sql that were silently inert; ratings had none at all.

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read ratings"
  ON public.ratings
  FOR SELECT
  USING (true);

CREATE POLICY "Users insert own rating"
  ON public.ratings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Keep hotels.avg_rating / hotels.review_count in sync automatically instead
-- of relying on the app to recalculate correctly on every write.
CREATE OR REPLACE FUNCTION public.recalculate_hotel_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  target_hotel_id UUID;
BEGIN
  target_hotel_id := COALESCE(NEW.entity_id, OLD.entity_id);

  UPDATE public.hotels
  SET
    avg_rating = (
      SELECT ROUND(AVG(overall)::numeric, 2)
      FROM public.ratings
      WHERE entity_type = 'hotel' AND entity_id = target_hotel_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.ratings
      WHERE entity_type = 'hotel' AND entity_id = target_hotel_id
    )
  WHERE id = target_hotel_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_rating_change ON public.ratings;
CREATE TRIGGER on_rating_change
  AFTER INSERT OR UPDATE OR DELETE ON public.ratings
  FOR EACH ROW EXECUTE FUNCTION public.recalculate_hotel_rating();
