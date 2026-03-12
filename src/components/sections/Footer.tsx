import Link from "next/link"
import VeloraLogoHorizontal from "@/components/brand/VeloraLogoHorizontal"

const navigation = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" }
  ],
  Company: [
    { label: "Process", href: "/process" },
    { label: "FAQ", href: "/faq" },
    { label: "Start Project", href: "/start-project" },
    { label: "Contact", href: "/contact" }
  ]
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-neutral-950 px-6 pb-10 pt-16 text-white">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-xl">
            <VeloraLogoHorizontal variant="dark" showWordmark={true} wordmarkInline={true} iconSize={28} className="inline-flex" />
            <p className="mt-5 text-white/60 leading-7">
              Premium websites for modern brands that want stronger trust,
              sharper positioning and better conversion.
            </p>
            <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/55">
              Design. Structure. Conversion.
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {Object.entries(navigation).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">
                  {title}
                </h3>
                <div className="mt-5 flex flex-col gap-3">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/65 transition hover:text-white hover:underline underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/40">
          © {new Date().getFullYear()} Velora Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
