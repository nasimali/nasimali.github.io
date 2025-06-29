const COOKIE_NAME = 'consentNMADEV_cookie';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export function getConsentCookie(): 'true' | 'false' | undefined {
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match?.split('=')[1] as 'true' | 'false' | undefined;
}

export function setConsentCookie(value: boolean) {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/`;
}
