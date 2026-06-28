import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { motion } from "framer-motion";
import { sectionVariants } from "../../config/animations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";



function Footer() {
  const [ip, setIp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ipRes = await fetch("https://www.cloudflare.com/cdn-cgi/trace", { signal: AbortSignal.timeout(3000) });
        if (!ipRes.ok) throw new Error("Blocked");
        const dataText = await ipRes.text();
        const ipMatch = dataText.match(/ip=(.+)/);
        setIp(ipMatch ? ipMatch[1] : "Private");
      } catch (err) {
        setIp("Protected");
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      await Promise.allSettled([fetchIP()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <motion.footer
      className="p-5 rounded-[32px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-xl"
      variants={sectionVariants}
    >
      {/* Left Section - Credits */}
      <div className="flex-1 flex items-center justify-center md:justify-start order-2 md:order-1">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
          <span>{new Date().getFullYear()} © Ji_han</span>
          <span className="hidden md:inline text-slate-300 dark:text-slate-700 mx-1">•</span>
          <span className="flex items-center gap-1.5">
            Made with
            <FontAwesomeIcon icon={faHeart} className="text-red-400 text-xs animate-pulse" />
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              React
            </a>
            +
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
            >
              Tailwind
            </a>
          </span>
        </p>
      </div>

      {/* Center Section - Inspired by */}
      <div className="flex items-center justify-center order-1 md:order-2">
        <Tippy animation="scale" content="ji_han_jo ✨">
          <a
            className="flex items-center px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-all font-medium h-[32px]"
            href="https://www.instagram.com/ji_han_jo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My instagram &nbsp;<span className="font-bold text-slate-500 dark:text-slate-400">han</span>
          </a>
        </Tippy>
      </div>

      {/* Right Section - Stats Badges */}
      <div className="flex-1 flex items-center justify-center md:justify-end gap-2.5 flex-wrap order-3">
        {/* IP Badge */}
        <Tippy content="Your IP Address" animation="scale">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 rounded-full cursor-default hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm h-[32px]">
            <FontAwesomeIcon icon={faGlobe} className="text-slate-400 dark:text-slate-500 text-[10px]" />
            {isLoading ? (
              <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded h-3 w-20"></div>
            ) : (
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-tight">{ip}</span>
            )}
          </div>
        </Tippy>
      </div>
    </motion.footer>
  );
}

export default Footer;
