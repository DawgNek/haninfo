import PropTypes from "prop-types";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import background from "../../assets/video/kuroha.mp4";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../config/animations";


function DefaultLayout({ children }) {
  return (
    <div className="min-h-dvh relative">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src={background} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-white/20 dark:from-transparent dark:via-slate-950/30 dark:to-slate-950/70 -z-10 transition-colors duration-500" />

      {/* Nội dung */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto p-2 md:p-5 space-y-2 md:space-y-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Header />
        <Navbar />

        <motion.div
          className="p-5 rounded-[32px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-xl"
          variants={itemVariants}
        >
          {children}
        </motion.div>

        <Footer />
      </motion.div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
