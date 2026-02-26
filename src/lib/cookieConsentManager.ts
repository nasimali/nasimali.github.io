const COOKIE_NAME = 'consentNMADEV_cookie';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

export function getConsentCookie(): 'true' | 'false' | undefined {
  const pair = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (!pair) {
    return undefined;
  }

  const value = pair.split('=')[1];
  return value === 'true' || value === 'false' ? value : undefined;
}

export function setConsentCookie(value: boolean) {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; samesite=lax`;
}
