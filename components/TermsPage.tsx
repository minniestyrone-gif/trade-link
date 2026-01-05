import React from 'react';
import { ArrowLeft, ShieldAlert, Scale, FileText, UserCheck, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  const sections = [
    {
      title: "1. Scope of Service",
      icon: FileText,
      content: "Trade Link operates as a digital intermediary platform ('Subserver') connecting independent service professionals ('Tradespeople') with clients. Trade Link does not provide trade services directly and is not an employer of the professionals listed on the platform."
    },
    {
      title: "2. Verification Disclaimer",
      icon: UserCheck,
      content: "While Trade Link performs basic identity and certification checks on professionals, we do not guarantee the absolute quality, safety, or legality of the work performed. Users are encouraged to verify specific licenses and insurance for complex projects."
    },
    {
      title: "3. User Obligations",
      icon: Scale,
      content: "Users agree to provide accurate information when requesting services and to maintain a professional environment for tradespeople. Harassment, non-payment, or fraudulent requests will result in immediate account termination."
    },
    {
      title: "4. Limitation of Liability",
      icon: ShieldAlert,
      content: "Trade Link shall not be liable for any damages, losses, or disputes arising from the direct interaction between users and professionals. All service agreements, warranties, and payment terms are strictly between the client and the tradesperson."
    },
    {
      title: "5. Dispute Resolution",
      icon: AlertTriangle,
      content: "In the event of a conflict, Trade Link may offer mediation services at its discretion but is not legally obligated to resolve disputes. Users agree to resolve legal conflicts through binding arbitration rather than court proceedings where applicable."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-neutral-950 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-cyan-500 font-medium hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Terms & Conditions</h1>
          <p className="text-gray-500 max-w-lg">
            Last Updated: October 2024. Please read these terms carefully before using our elite network.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <section.icon size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-600 text-xs uppercase tracking-[0.2em] mb-6">
            By using Trade Link, you acknowledge and agree to these policies.
          </p>
          <Button onClick={onBack} variant="outline" className="px-10">
            Accept and Return
          </Button>
        </div>

      </div>
    </div>
  );
};