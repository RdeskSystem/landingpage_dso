import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/site-content";

export function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Kontak cepat" className="fixed bottom-5 right-5 z-40">
      <a
        href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi DSO melalui WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#1ca66a] text-white shadow-[0_12px_30px_rgba(28,166,106,0.35)] transition hover:-translate-y-1 hover:bg-[#168b59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1ca66a]"
      >
        <WhatsAppIcon size={24} />
      </a>
    </aside>
  );
}
