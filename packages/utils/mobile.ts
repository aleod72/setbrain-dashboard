import MobileDetect from 'mobile-detect';
import { headers } from 'next/headers';

export function isMobile() {
    const userAgent = headers().get('user-agent');

    return Boolean(new MobileDetect(userAgent || '').mobile());
}
