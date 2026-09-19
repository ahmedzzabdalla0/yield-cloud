import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export function Logo() {
  return (
    <Link href="/yield-calculator" className="flex items-center gap-2.5">
      <Image
        src="/assets/svgs/logo.svg"
        alt="غيمة العائد"
        width={36}
        height={36}
        priority
      />
      <div className="flex flex-col leading-none">
        <span className="text-heading-sm text-foreground">غيمة العائد</span>
        <span className="text-caption-xs text-muted-foreground tracking-widest">
          YIELD CLOUD
        </span>
      </div>
    </Link>
  );
}
