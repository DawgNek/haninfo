import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faCircleCheck,
    faCopy,
    faHandHoldingHeart,
    faQrcode,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import useSEO from "../../hooks/useSEO";
import { pageVariants, sectionVariants, itemVariants } from "../../config/animations";

const BANK_CONFIG = {
    bankId: "MoMo", // Ngân hàng MBBank
    accountNo: "0979617388", // Thay bằng số tài khoản của bạn
    accountName: "Nguyen Thi Hong Chi", // Thay bằng tên của bạn
    template: "compact2" // compact, qr_only, compact2, vqr2
};

const SUPPLY_MENU = [
    { label: "Mì tôm", amount: 15000, icon: "🍜" },
    { label: "Trà Sữa", amount: 25000, icon: "🧋" },
    { label: "Bánh Ngọt", amount: 45000, icon: "🍗" },
    { label: "Mì Ly Cứu Đói", amount: 69000, icon: "🧁" },
    { label: "Cà Phê Thức Khuya", amount: 99000, icon: "☕" },
    { label: "Gà Rán Nạp Năng Lượng", amount: 149000, icon: "🍗" },
    { label: "Buffet Cuối Tuần", amount: 299000, icon: "🍱" },
    { label: "Nuôi Full Ngày", amount: 500000, icon: "🚀" },
];

const MEME_MESSAGES = [
    "Ăn ngon ngủ kỹ để có sức đi chơi nhé! ✨",
    "Tiếp tế cho cơn đói bất tận của mình 🍜",
    "Gói mì này chứa đầy tình yêu thương 💖",
    "Một miếng khi đói bằng một gói khi no 🍱",
    "Donate vì sự nghiệp ăn vặt xuyên lục địa 🍬",
    "Số tiền này để đổi lấy cái bụng no nê 🍖"
];

const QUICK_AMOUNTS = [20000, 36000, 50000, 100000, 200000, 500000, 1000000];

function Support() {
    useSEO({
        title: "Cứu đói - Dự án TIẾP TẾ CHO CHIẾC BỤNG ĐÓI",
        description: "Góp phần giúp han có tiền mua nhiều mì cay ăn hơn.",
        keywords: "support, donate, nuôi tôi, vietqr, han",
        url: "puppyz4nx.is-a.dev/support"
    });

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Generate QR URL based on VietQR API
    const generateQR = useCallback(() => {
        setIsGenerating(true);
        const description = encodeURIComponent(message || "Cứu đói cho han");
        const url = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${amount}&addInfo=${description}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;

        // Simulate a brief loading for aesthetic feel
        setTimeout(() => {
            setQrUrl(url);
            setIsGenerating(false);
        }, 500);
    }, [amount, message]);

    useEffect(() => {
        generateQR();
    }, [generateQR]);

    const handleCopyAccount = () => {
        navigator.clipboard.writeText(BANK_CONFIG.accountNo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Format number for display
    const formatAmount = (val) => {
        if (!val) return "";
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        setAmount(rawValue);
    };

    const generateRandomMessage = () => {
        const randomMsg = MEME_MESSAGES[Math.floor(Math.random() * MEME_MESSAGES.length)];
        setMessage(randomMsg);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen pb-20 px-4 md:px-8 relative overflow-hidden text-[#242424] dark:text-[#c4c1c1]"
        >
            {/* Title Section */}
            <motion.div
                className="mb-12 flex items-center gap-3 text-3xl font-extrabold"
                variants={itemVariants}
            >
                <div className="bg-neutral-800 dark:bg-white h-[36px] w-2 rounded"></div>
                <h2 className="text-[#242424] dark:text-[#c4c1c1]">Dự án nuôi han</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Info & Form */}
                <motion.div variants={sectionVariants} className="space-y-6">
                    <div className="p-6 rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-[#242424] dark:text-[#c4c1c1]">
                                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-[#242424] dark:text-[#c4c1c1]" />
                                Hành Trình Minh Bạch Của Sự Tin Tưởng
                            </h3>
                            <p className="text-[#242424] dark:text-[#c4c1c1] leading-relaxed text-sm mb-8">
                                Meow~ 🐱,Đây là khu vực tiếp tế dành cho chủ nhân của website này.<br /><br/>
                                Mỗi sự ủng hộ của cậu sẽ được chuyển hóa thành cà phê, đồ ăn và động lực để mình tiếp tục học tập, sáng tạo và chăm sóc góc nhỏ này mỗi ngày. 🌷<br /><br />
                                Dù chỉ là một lời động viên hay một khoản ủng hộ nho nhỏ, mình cũng sẽ trân trọng thật nhiều.<br /><br/>
                                Cảm ơn cậu đã ghé qua và chúc cậu có một ngày thật vui vẻ nha! ✨
                            </p>

                            <div className="space-y-4">
                                {/* Amount Input */}
                                <div>
                                    <label className="block text-xs font-bold text-[#242424]/60 dark:text-[#c4c1c1]/60 mb-3 ml-1 uppercase tracking-wider">Thực đơn tiếp tế</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                        {SUPPLY_MENU.map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => setAmount(item.amount.toString())}
                                                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${amount === item.amount.toString()
                                                    ? "bg-white/15 dark:bg-white border-slate-900 dark:border-white text-[#242424] dark:text-slate-900 shadow-lg"
                                                    : "bg-white/5 border-white/10 backdrop-blur-xl border-slate-200 dark:border-slate-700 text-[#242424]/80 dark:text-[#c4c1c1]/80 hover:border-slate-800 dark:hover:border-slate-300"
                                                    }`}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="text-[10px] font-black uppercase">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Quick numeric amounts */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {QUICK_AMOUNTS.map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => setAmount(amt.toString())}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${amount === amt.toString()
                                                    ? "bg-white/15 dark:bg-white border-slate-900 dark:border-white text-[#242424] dark:text-slate-900 shadow-md"
                                                    : "bg-slate-50 dark:bg-white/15 border-slate-200 dark:border-[#363636] text-[#242424]/70 dark:text-[#c4c1c1]/70 hover:border-slate-400"
                                                    }`}
                                            >
                                                {new Intl.NumberFormat('vi-VN').format(amt)}đ
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        value={formatAmount(amount)}
                                        onChange={handleAmountChange}
                                        placeholder="Nhập số tiền tùy chỉnh..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-slate-700 text-[#242424] dark:text-[#c4c1c1] outline-none transition-all placeholder:text-[#242424]/40 dark:placeholder:text-[#c4c1c1]/40 text-sm"
                                    />
                                </div>

                                {/* Message Input */}
                                <div>
                                    <div className="flex justify-between items-end mb-2 ml-1">
                                        <label className="text-xs font-bold text-[#242424]/60 dark:text-[#c4c1c1]/60 uppercase tracking-wider">Lời nhắn</label>
                                        <button
                                            onClick={generateRandomMessage}
                                            className="text-[10px] font-bold text-[#242424]/50 dark:text-[#c4c1c1]/50 hover:text-[#242424] dark:hover:text-[#c4c1c1] transition uppercase underline underline-offset-4"
                                        >
                                            Gợi ý lời nhắn?
                                        </button>
                                    </div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Để lại lời nhắn cho mình nhé..."
                                        rows="3"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-[#242424] dark:text-[#c4c1c1] outline-none transition-all placeholder:text-[#242424]/40 dark:placeholder:text-[#c4c1c1]/40 resize-none text-sm"
                                    />
                                </div>

                                <button
                                    onClick={generateQR}
                                    disabled={isGenerating}
                                    className="w-full py-2.5 mt-2 bg-white/15 dark:bg-white text-[#242424] dark:text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:text-white transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faQrcode} className={`${isGenerating ? 'animate-spin' : ''}`} />
                                    <span>CẬP NHẬT MÃ QR</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="p-6 rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/15 dark:bg-white text-[#242424] dark:text-slate-900 flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-[#242424]/60 dark:text-[#c4c1c1]/60">Số tài khoản</p>
                                <p className="text-[#242424] dark:text-[#c4c1c1] tracking-wider">{BANK_CONFIG.accountNo}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCopyAccount}
                            className={`p-3 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-[#242424]/60 dark:text-[#c4c1c1]/60 hover:text-[#242424] dark:hover:text-white'}`}
                        >
                            <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} />
                        </button>
                    </div>
                </motion.div>

                {/* Right: QR Display */}
                <motion.div variants={sectionVariants} className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative group max-w-sm w-full">
                        <div className="relative p-6 rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition overflow-hidden">
                            <div className="absolute top-4 right-4 z-10">
                                <div className="w-8 h-8 rounded-full bg-white/15 dark:bg-white flex items-center justify-center text-[#242424] dark:text-slate-900 text-xs shadow-lg">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                            </div>

                            {/* QR Image Container */}
                            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white flex items-center justify-center relative border border-slate-200 dark:border-slate-700">
                                <AnimatePresence mode="wait">
                                    {isGenerating ? (
                                        <motion.div
                                            key="loader"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }} 
                                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-sm z-10"
                                        >
                                            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 dark:border-t-white rounded-full animate-spin"></div>
                                            <span className="text-[10px] font-bold tracking-widest text-[#242424]/40 dark:text-[#c4c1c1]/40 uppercase">Generating...</span>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>

                                <img
                                    src={qrUrl}
                                    alt="VietQR Support"
                                    className={`w-full h-full object-contain transition-all duration-700 ${isGenerating ? 'scale-90 blur-sm opacity-50' : 'scale-100 blur-0 opacity-100'}`}
                                />
                            </div>

                            <div className="mt-5 text-center">
                                <p className="text-[#242424] dark:text-[#c4c1c1] font-bold text-sm">Quét mã để ủng hộ</p>
                                <div className="mt-3 flex items-center justify-center gap-2">
                                    <span className="px-2 py-1 bg-white dark:bg-white/15 rounded text-[10px] font-bold text-[#242424]/60 dark:text-[#c4c1c1]/60 border border-slate-200 dark:border-slate-600">VPBANK</span>
                                    <span className="px-2 py-1 bg-white dark:bg-white/15 rounded text-[10px] font-bold text-[#242424]/60 dark:text-[#c4c1c1]/60 border border-slate-200 dark:border-slate-600">VIETQR.IO</span>
                                </div>
                            </div>
                        </div>

                        {/* Safety badge */}
                        <div className="mt-8 flex items-center gap-3 justify-center text-[#242424]/50 dark:text-[#c4c1c1]/50">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                            <span className="text-xs font-medium">Giao dịch an toàn & trực tiếp</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Quote */}
            <motion.div
                variants={itemVariants}
                className="mt-20 text-center max-w-xl mx-auto"
            >
                <p className="text-[#242424]/60 dark:text-[#c4c1c1]/60 italic text-sm">
                    🌷 "Một miếng khi đói bằng một gói khi no. Cảm ơn cậu vì đã tiếp thêm năng lượng để mình không bị đói bụng, đói ý tưởng và cũng không đói động lực nữa nha! 💖"
                </p>
            </motion.div>
        </motion.div>
    );
}

export default Support;