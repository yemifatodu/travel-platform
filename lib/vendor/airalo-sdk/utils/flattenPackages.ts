import { AiraloPackage, FlattenedPackage } from '../interfaces';

/**
 * GET /v2/packages returns country -> operator -> package. Most UIs want a
 * flat list of purchasable packages to render as cards, so this walks the
 * tree and produces one row per orderable package.
 *
 * @param countries - The `data` array from the packages response
 * @param currency - Which currency to read from each package's `prices` map (falls back to the default `price` field if omitted or missing)
 */
export function flattenPackages(countries: AiraloPackage[], currency = 'USD'): FlattenedPackage[] {
    const result: FlattenedPackage[] = [];

    for (const country of countries || []) {
        for (const operator of country.operators || []) {
            for (const pkg of operator.packages || []) {
                const priceForCurrency = pkg.prices?.[currency]?.recommended_retail_price ?? pkg.prices?.[currency]?.net_price;

                result.push({
                    package_id: pkg.id,
                    country_title: country.title,
                    country_code: country.country_code,
                    operator_title: operator.title,
                    title: pkg.title,
                    data: pkg.data,
                    day: pkg.day,
                    is_unlimited: pkg.is_unlimited,
                    price: priceForCurrency ?? pkg.price,
                    currency,
                });
            }
        }
    }

    return result;
}
