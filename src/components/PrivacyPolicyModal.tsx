/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      {/* Backdrop click close */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-4xl rounded-2xl bg-[#14120E] text-ivory shadow-2xl border border-oak/30 p-6 md:p-10 z-10 max-h-[90vh] flex flex-col"
        id="privacy-modal-card"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 text-ivory-dim/60 hover:text-oak hover:bg-white/5 rounded-full transition-all duration-300 z-20 cursor-pointer border border-transparent hover:border-oak/20"
          aria-label="Close Privacy Policy"
          id="close-privacy-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-line/30 flex-shrink-0" id="privacy-header">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-oak block mb-1">Information Security</span>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-ivory uppercase tracking-tight flex items-center gap-3">
            <span className="p-1.5 bg-oak/10 text-oak rounded-lg border border-oak/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </span>
            Privacy Policy
          </h2>
          <p className="text-xs text-ivory-dim/50 mt-1.5">
            Furniture Holz • Committed to Your Privacy
          </p>
        </div>

        {/* Scrollable Content Container */}
        <div 
          className="overflow-y-auto pr-2 md:pr-4 space-y-6 text-sm text-ivory-dim/80 leading-relaxed font-sans max-h-[65vh] scrollbar-thin scrollbar-thumb-oak/20 scrollbar-track-transparent"
          id="privacy-content-scroll"
        >
          <p>
            This privacy policy sets out how <strong className="text-ivory font-semibold">Furniture Holz</strong> uses and protects any information that you give to Furniture Holz when you use this website.
          </p>

          <p>
            Furniture Holz is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
          </p>

          <p>
            Furniture Holz may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
          </p>

          <div className="space-y-3 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">What we collect</h3>
            <p>We may collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-ivory-dim/90">
              <li>Name and payment details</li>
              <li>Contact information including email address</li>
              <li>Demographic information such as postcode, preferences and interests</li>
              <li>Other information relevant to customer surveys and/or offers</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">What we do with the information we gather</h3>
            <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-ivory-dim/90">
              <li>To process your order and obtain payment</li>
              <li>Internal record keeping</li>
              <li>We may use the information to improve our products and services</li>
              <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided</li>
              <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">Security</h3>
            <p>
              We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">How we use cookies</h3>
            <p>
              A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
            </p>
            <p>
              We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
            </p>
            <p>
              Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
            </p>
            <p>
              You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">Links to other websites</h3>
            <p>
              Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">Data aggregation, analytics and profile creation</h3>
            <p>
              We may analyse your browsing behaviour to draw inferences and create profiles about your personal preferences and behaviours. We may then use such information for the purposes described below:
            </p>
            <div className="pl-4 border-l border-oak/30 space-y-3 text-ivory-dim/90">
              <p className="font-semibold text-ivory">Behavioural advertising and cross platform targeting</p>
              <div>
                <p className="font-bold text-oak text-[11px] uppercase font-mono">(a) Served by us</p>
                <p className="pl-2 mt-1">We may use your information (including profile data) to serve you with advertising, which is relevant to you, on our websites and the websites of third parties.</p>
              </div>
              <div>
                <p className="font-bold text-oak text-[11px] uppercase font-mono">(b) Served by third parties on our websites</p>
                <p className="pl-2 mt-1">Advertisers or other third parties using our website may also engage in behavioural advertising and use cookies and web beacons in the manner described above. We do not control these advertisers or other parties’ use of cookies or web beacons or what they do with the information they collect.</p>
              </div>
              <div>
                <p className="font-bold text-oak text-[11px] uppercase font-mono">(c) Served by third parties on third party websites</p>
                <p className="pl-2 mt-1">We may provide your personal information (including profile data) to third parties who may then use it in combination with personal information that they have collected from you to serve you with relevant advertising on third party websites.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-line/20">
            <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono text-xs">Controlling your personal information</h3>
            <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-ivory-dim/90">
              <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
              <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us</li>
              <li>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</li>
              <li>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to us.</li>
              <li>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect.</li>
            </ul>
          </div>
        </div>

        {/* Footer inside Modal */}
        <div className="mt-6 pt-4 border-t border-line/30 flex justify-between items-center text-[10px] text-ivory-dim/50 font-mono flex-shrink-0" id="privacy-footer">
          <span>© FURNITURE HOLZ ATELIER</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-oak/10 hover:bg-oak text-oak hover:text-charcoal rounded border border-oak/30 hover:border-transparent transition-all duration-300 font-sans font-semibold uppercase tracking-wider text-[10px] cursor-pointer"
            id="privacy-understand-btn"
          >
            Understood & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
