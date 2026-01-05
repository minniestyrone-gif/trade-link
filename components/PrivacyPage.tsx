import React from 'react';
import { ArrowLeft, Lock, Eye, Database, Globe, Bell } from 'lucide-react';
import { Button } from './ui/Button';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: "We collect information you provide directly to us, such as when you create an account, request a trade service, or communicate with a professional through our platform. This includes names, contact details, and project descriptions."
    },
    {
      title: "2. How We Use Your Data",
      icon: Eye,
      content: "Data is used primarily to connect clients with tradespeople. We also use information to improve our services, process payments (via secure third parties), and protect the security of our network."
    },
    {
      title: "3. Data Sharing",
      icon: Globe,
      content: "Your contact information is only shared with a professional once you explicitly request a quote or call. We do not sell your personal data to third-party advertisers."
    },
    {
      title: "4. Security Protocols",
      icon: Lock,
      content: "Trade Link employs industry-standard encryption to protect your data. While no method is 100% secure, we continuously monitor our infrastructure for vulnerabilities."
    },
    {
      title: "5. Notifications",
      icon: Bell,
      content: "We may send you service-related emails or mobile notifications. You can opt out of marketing communications at any time through your account settings."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-neutral-950 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-cyan-500 font-medium hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 max-w-lg">
            Your trust is our foundation. Learn how we handle and protect your information at Trade Link.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <section.icon size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="text-center pt-8 border-t border-white/10">
          <Button onClick={onBack} variant="primary" className="px-10">
            Got it, Thanks
          </Button>
        </div>
      </div>
    </div>
  );
};