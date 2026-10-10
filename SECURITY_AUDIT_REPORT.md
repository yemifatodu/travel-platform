# 🛡️ Cybersecurity Audit Report: Travel Platform
**Date:** September 26, 2026
**Status:** Completed
**Scope:** Full repository audit (Next.js Frontend, Supabase Backend, MERN Hotel Source)

---

## 📊 Executive Summary
The project demonstrates a strong baseline of security practices, including the use of `helmet`, `express-rate-limit`, and encrypted database connections. However, several high-severity vulnerabilities were identified in the API layer that expose the project to **financial risk** (API cost abuse) and **data access risks** (RLS bypass).

### Risk Profile
*   **Critical/High Risks**: 4 (Immediate action required)
*   **Medium Risks**: 5 (Scheduled action required)
*   **Low Risks**: 3 (Best practice improvements)

---

## 🔴 High Severity Findings (Immediate Action)

### 1. Service Role RLS Bypass
*   **Location**: `app/api/ai-itinerary/route.ts`
*   **Finding**: The route uses `SUPABASE_SERVICE_ROLE_KEY` to query user data. 
*   **Risk**: The service role bypasses all Row Level Security (RLS). If there is any logic error in the `.eq('user_id', user.id)` filter, a user could potentially read or modify another user's bookings or usage data.
*   **Recommendation**: Replace the service-role client with a standard authenticated client.

### 2. Unprotected eSIM Proxy
*   **Location**: `app/api/esim-proxy/route.ts`
*   **Finding**: The proxy route lacks any authentication check (`supabase.auth.getUser()`).
*   **Risk**: Anyone with the endpoint URL can make requests to your eSIM provider using your paid API keys, leading to financial loss and service disruption.
*   **Recommendation**: Add mandatory authentication to the route.

### 3. AI Resource Exhaustion (Financial Risk)
*   **Location**: `app/api/recommendations/`, `app/api/budget-estimate/`, `app/api/price-prediction/`
*   **Finding**: These AI-powered routes have no authentication.
*   **Risk**: Malicious actors can spam these endpoints to drain your OpenAI API credits.
*   **Recommendation**: Wrap these routes in an authentication guard.

### 4. Guest Limit Spoofing
*   **Location**: `app/api/ai-itinerary/route.ts`
*   **Finding**: Guest limits rely on a client-provided `guest_session` ID.
*   **Risk**: Attackers can randomize the session ID for every request, bypassing the guest prompt limit and inflating API costs.
*   **Recommendation**: Implement server-side session cookies or signed JWTs for guest tracking.

---

## 🟡 Medium Severity Findings

### 1. SSRF Vulnerability (Server-Side Request Forgery)
*   **Location**: `app/api/esim-proxy/route.ts`
*   **Finding**: The `path` parameter is appended to the base URL without validation.
*   **Risk**: An attacker could attempt to hit internal endpoints or unauthorized paths on the provider's host.
*   **Recommendation**: Implement a whitelist of allowed paths.

### 2. XSS (Cross-Site Scripting)
*   **Location**: `app/visa-requirements/page.tsx`, `app/blog/[slug]/page.tsx`
*   **Finding**: Use of `dangerouslySetInnerHTML` without sanitization.
*   **Risk**: If content is sourced from a CMS or user-input, malicious scripts can be executed in the browser.
*   **Recommendation**: Use `dompurify` to sanitize HTML before rendering.

### 3. Prompt Injection
*   **Location**: `app/api/ai-itinerary/route.ts`
*   **Finding**: User inputs are interpolated directly into LLM prompts.
*   **Risk**: Users can "trick" the AI into ignoring instructions or leaking system information.
*   **Recommendation**: Use a structured prompt template with input validation.

### 4. Permissive CORS Policy
*   **Location**: `hotel-source/.../index.ts`
*   **Finding**: CORS logic uses `.includes("vercel.app")`.
*   **Risk**: Any attacker hosting a site on Vercel (e.g., `attacker.vercel.app`) can bypass the CORS restriction.
*   **Recommendation**: Use a strict array of authorized domains.

---

## 🔵 Low Severity Findings

*   **Error Leakage**: `app/api/ai-itinerary/route.ts` returns raw `String(err)` to the client. (Risk: Leaks stack traces/schema).
*   **Outdated Dependencies**: Next.js version is slightly outdated. (Risk: Missing minor security patches).
*   **Documentation Secrets**: Placeholder secrets found in `docs/`. (Risk: Confusion/Poor practice).

---

## 🛠️ Remediation Roadmap

| Phase | Focus | Priority |
| :--- | :--- | :--- |
| **Phase 1** | **Lockdown**: Auth for Proxy, AI routes, and Guest tracking. | 🚨 **Immediate** |
| **Phase 2** | **Hardening**: RLS fix, XSS sanitization, and CORS tightening. | 📅 **Next 7 Days** |
| **Phase 3** | **Polishing**: Prompt guarding, Error cleanup, and Dependency updates. | 📉 **Next 30 Days** |
