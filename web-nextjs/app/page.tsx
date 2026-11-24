'use client';

import { useEffect, useRef, useState } from 'react';

const BOOTH_URL = 'https://meteor-cs.booth.pm/items/9057523';
const GITHUB_URL = 'https://github.com/rt18formula1/MarkItDown-GUI';

type Lang = 'ja' | 'en';

const translations = {
  ja: {
    langSwitch: 'English',
    navFeatures: '機能',
    navHowItWorks: '使い方',
    navBuy: '購入',
    heroBadge: 'macOS向けユーティリティ',
    heroTitle: 'ファイルを、AIの言葉へ。',
    heroSubtitle: 'PDF・Word・Excel・PowerPointをMarkdownに変換する、メニューバー常駐の小さなツール。',
    heroTagline: 'ターミナル不要。ドラッグ＆ドロップするだけ。AIに読み込ませる前の、もう一段の整理を。',
    heroCta: 'BOOTHで購入する（500円）',
    heroSecondary: 'GitHubを見る',
    heroPriceNote: 'ワンコイン以下・買い切り・永久利用',
    problemTitle: 'AIに資料を読み込むたびに、',
    problemText: '無駄なトークン消費やファイル形式の問題が発生します。Markdown形式に変換して情報を整理することで、AIに渡すデータを扱いやすくし、トークン消費の最適化を目指せます。',
    solutionTitle: 'ターミナルは、もう必要ありません。',
    solutionText: 'Microsoftのオープンソースツール「MarkItDown」は便利ですが、本来の利用にはPython環境の準備やターミナルでのコマンド操作が必要です。MarkItDown-GUIなら、そんな手間は必要ありません。',
    featuresTitle: 'AI時代の新しいファイル活用',
    featuresSubtitle: '日常的な資料整理から、AI活用の前処理まで。',
    features: [
      { title: 'トークン消費の最適化', desc: 'Markdown形式に変換することで、AIに読み込ませる資料を扱いやすく整理します。' },
      { title: 'メニューバー常駐', desc: 'macOSの画面上部からいつでも呼び出せる、手軽なユーティリティ。' },
      { title: 'シンプルな操作性', desc: 'ファイルをドラッグ＆ドロップするだけで変換。コマンドは一切不要です。' },
      { title: '変換結果をすぐ確認', desc: 'Markdownのプレビュー機能を搭載。変換結果をその場で確認できます。' },
      { title: 'ワンクリックでコピー', desc: '変換したテキストをそのままAIツールへ。クリップボードへ即コピー。' },
      { title: 'ローカルで手軽に利用', desc: '日常的な資料整理やAI活用の前処理に。すべて手元で完結します。' },
    ],
    howTitle: '使い方は、3ステップ。',
    howSteps: [
      { num: '01', title: 'ファイルをドラッグ', desc: '変換したいPDFやOfficeファイルを、アプリのウィンドウにドラッグ＆ドロップします。' },
      { num: '02', title: '自動でMarkdownに変換', desc: 'Microsoft MarkItDownエンジンがファイルを解析し、整理されたMarkdownに変換します。' },
      { num: '03', title: 'コピーしてAIへ', desc: '変換結果をプレビューで確認し、ワンクリックでコピー。そのままAIツールに貼り付けます。' },
    ],
    audienceTitle: '初心者から上級者まで、',
    audienceText: 'ターミナルやコマンド操作をできるだけ避けたい方、Pythonの環境構築に時間をかけたくない方、毎回のコマンド実行を省略したい方、ChatGPTやClaudeなどに大量の資料を読み込ませる方、PDFやOfficeファイルをMarkdownに変換したい方、AIを活用したリサーチ・開発・情報整理を行う方、自分専用のAIナレッジベースを構築したい方に。',
    closing: 'ターミナルを使いこなす人にも、使わない人にも。余計な操作に時間をかけず、AIをもっと有効に活用しましょう。',
    basicInfoTitle: '基本情報',
    productName: '商品名',
    os: '対応OS',
    format: '販売形式',
    price: '価格',
    license: 'ライセンス',
    productNameVal: 'MarkItDown-GUI',
    osVal: 'macOS',
    formatVal: 'ダウンロード販売',
    priceVal: '500円（買い切り）',
    licenseVal: 'Microsoft MarkItDownを利用',
    noteTitle: 'ご購入前に',
    notes: [
      '本商品はmacOS向けアプリケーションです',
      'Windows・Linuxには対応していません',
      '変換結果は元ファイルの構造や内容によって異なります',
      'AIへの入力時のトークン消費量は、ファイル内容や使用するAIモデルによって異なります。Markdownへの変換によって必ず削減されることを保証するものではありません',
    ],
    ctaTitle: 'ファイル変換に時間をかける時代は、',
    ctaSubtitle: 'もう終わりにしよう。ターミナルを開く時間も、コマンドを調べる時間も、もっと有効に使えるはず。メニューバーから、いつでもすぐに。',
    ctaButton: 'BOOTHで購入する',
    footer: 'MarkItDown-GUI — AIをもっと効率的に使うための、小さなユーティリティ。',
    footerLinks: 'BOOTH / GitHub',
  },
  en: {
    langSwitch: '日本語',
    navFeatures: 'Features',
    navHowItWorks: 'How it works',
    navBuy: 'Buy',
    heroBadge: 'macOS utility',
    heroTitle: 'Files, translated for AI.',
    heroSubtitle: 'Convert PDF, Word, Excel, PowerPoint to Markdown — a small menu-bar tool for macOS.',
    heroTagline: 'No terminal. Just drag and drop. One extra step of tidiness before feeding documents to AI.',
    heroCta: 'Purchase on BOOTH (500 JPY)',
    heroSecondary: 'View GitHub',
    heroPriceNote: 'Under one coin · one-time purchase · yours forever',
    problemTitle: 'Every time you feed documents to AI,',
    problemText: 'You face unnecessary token consumption and file format issues. By converting to Markdown and organizing information, you can make data more manageable for AI and optimize token consumption.',
    solutionTitle: 'No more terminal needed.',
    solutionText: "Microsoft's open-source tool \"MarkItDown\" is useful, but normally requires Python environment setup and terminal command operations. With MarkItDown-GUI, you don't need that hassle.",
    featuresTitle: 'A new way to handle files in the AI era',
    featuresSubtitle: 'From daily document organization to AI preprocessing.',
    features: [
      { title: 'Optimize token consumption', desc: 'Convert to Markdown to organize documents for AI and make them easier to handle.' },
      { title: 'Menu bar resident', desc: 'Access anytime from the macOS menu bar — a handy little utility.' },
      { title: 'Simple operation', desc: 'Just drag and drop files to convert. No commands required.' },
      { title: 'Preview results', desc: 'Built-in Markdown preview. Confirm conversion results on the spot.' },
      { title: 'One-click copy', desc: 'Send converted text straight to AI tools. Copy to clipboard instantly.' },
      { title: 'Local and easy', desc: 'For daily document organization and AI preprocessing. All on your machine.' },
    ],
    howTitle: "Three steps. That's it.",
    howSteps: [
      { num: '01', title: 'Drag a file', desc: 'Drop the PDF or Office file you want to convert into the app window.' },
      { num: '02', title: 'Auto-convert to Markdown', desc: 'The Microsoft MarkItDown engine parses your file and produces clean Markdown.' },
      { num: '03', title: 'Copy to AI', desc: 'Preview the result, copy with one click, and paste straight into your AI tool.' },
    ],
    audienceTitle: 'For beginners and experts alike,',
    audienceText: "Those who want to avoid terminal and command operations, don't want to spend time on Python setup, want to skip repeated command execution, feed large documents to ChatGPT/Claude, convert PDF/Office files to Markdown, conduct AI-powered research/development/information organization, or build a personal AI knowledge base.",
    closing: 'For both terminal experts and beginners. Don\'t waste time on unnecessary operations — use AI more effectively.',
    basicInfoTitle: 'Basic Information',
    productName: 'Product',
    os: 'OS',
    format: 'Format',
    price: 'Price',
    license: 'License',
    productNameVal: 'MarkItDown-GUI',
    osVal: 'macOS',
    formatVal: 'Digital download',
    priceVal: '500 JPY (one-time)',
    licenseVal: 'Uses Microsoft MarkItDown',
    noteTitle: 'Before Purchase',
    notes: [
      'This product is a macOS application',
      'Not compatible with Windows/Linux',
      'Conversion results vary by file structure and content',
      'AI token consumption depends on file content and AI model used. Markdown conversion does not guarantee reduction',
    ],
    ctaTitle: 'The era of wasting time on file conversion?',
    ctaSubtitle: "Let's end it. The time you spend opening a terminal or looking up commands could be better spent. From the menu bar, anytime. A small utility for more efficient AI usage.",
    ctaButton: 'Purchase on BOOTH',
    footer: 'MarkItDown-GUI — a small utility for more efficient AI usage.',
    footerLinks: 'BOOTH / GitHub',
  },
} as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" />
      <path
        d="M11 12h10M11 16h7M11 20h4"
        stroke="#fafaf9"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function FeatureGlyph({ index }: { index: number }) {
  const common = "w-6 h-6";
  switch (index) {
    case 0:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />
        </svg>
      );
    case 1:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="4" rx="1" />
          <path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
          <path d="M10 12h4" />
        </svg>
      );
    case 2:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 3:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 4:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
  }
}

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Lang>('ja');
  const [scrolled, setScrolled] = useState(false);
  const t = translations[currentLang];
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLanguageSwitch = () => void setCurrentLang(currentLang === 'ja' ? 'en' : 'ja');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 grain">
      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-stone-50/85 backdrop-blur-md border-b border-stone-200/70'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#top" className="flex items-center gap-2 text-stone-900 font-semibold tracking-tight">
            <Logo className="w-6 h-6 text-amber-600" />
            <span>MarkItDown-GUI</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="#features" className="hidden sm:inline text-sm text-stone-600 hover:text-stone-900 transition-colors">
              {t.navFeatures}
            </a>
            <a href="#how" className="hidden sm:inline text-sm text-stone-600 hover:text-stone-900 transition-colors">
              {t.navHowItWorks}
            </a>
            <button
              onClick={handleLanguageSwitch}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              {t.langSwitch}
            </button>
            <a
              href={BOOTH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-stone-50 text-sm font-medium rounded-full hover:bg-stone-800 transition-colors"
            >
              {t.navBuy}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 0%, rgba(245,158,11,0.10) 0%, rgba(245,158,11,0) 60%), radial-gradient(40% 40% at 80% 20%, rgba(120,113,108,0.08) 0%, rgba(120,113,108,0) 70%)',
          }}
        />
        <div className="max-w-5xl mx-auto px-6 pt-36 pb-24 md:pt-44 md:pb-32 hero-fade">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-stone-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {t.heroBadge}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-stone-900 mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl text-stone-600 mb-4 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </p>
          <p className="text-base md:text-lg text-stone-500 mb-10 max-w-xl leading-relaxed">
            {t.heroTagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <a
              href={BOOTH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 text-stone-50 font-medium rounded-full hover:bg-stone-800 transition-all hover:shadow-lg hover:shadow-stone-900/10"
            >
              {t.heroCta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-stone-300 text-stone-900 font-medium rounded-full hover:border-stone-900 hover:bg-stone-100/50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17 5 18 5.3 18 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
              </svg>
              {t.heroSecondary}
            </a>
          </div>
          <p className="mt-5 text-xs text-stone-400">{t.heroPriceNote}</p>
        </div>
      </header>

      {/* Problem / Solution */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="reveal bg-stone-100/70 border border-stone-200 p-8 md:p-10 rounded-3xl">
            <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-4 leading-snug">
              {t.problemTitle}
            </h3>
            <p className="text-stone-600 leading-relaxed">{t.problemText}</p>
          </div>
          <div className="reveal bg-stone-900 text-stone-50 p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <div
              className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)' }}
            />
            <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-snug relative">
              {t.solutionTitle}
            </h3>
            <p className="text-stone-300 leading-relaxed relative">{t.solutionText}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="reveal text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-stone-500 text-lg">{t.featuresSubtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="reveal group bg-white border border-stone-200 p-7 rounded-2xl hover:border-stone-300 hover:shadow-md hover:shadow-stone-900/5 transition-all duration-300"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-700 mb-5 group-hover:bg-amber-100 transition-colors">
                <FeatureGlyph index={index} />
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">{feature.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="reveal relative rounded-3xl overflow-hidden border border-stone-200 shadow-2xl shadow-stone-900/10">
          <img src="/screenshot-1.png" alt="MarkItDown-GUI screenshot" className="w-full block" />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="reveal text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900">
            {t.howTitle}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {t.howSteps.map((step, index) => (
            <div key={index} className="reveal relative">
              <div className="text-5xl font-bold text-stone-200 mb-4 tracking-tight">{step.num}</div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{step.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
              {index < t.howSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-4 text-stone-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="reveal bg-gradient-to-br from-stone-100 to-stone-50 border border-stone-200 p-10 md:p-14 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-5 leading-snug">
            {t.audienceTitle}
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">{t.audienceText}</p>
          <p className="text-stone-700 font-medium leading-relaxed border-l-2 border-amber-500 pl-5">
            {t.closing}
          </p>
        </div>
      </section>

      {/* Basic info + notes */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="reveal bg-white border border-stone-200 p-8 md:p-10 rounded-3xl">
            <h2 className="text-lg font-semibold text-stone-900 mb-6">{t.basicInfoTitle}</h2>
            <dl className="space-y-4">
              {[
                [t.productName, t.productNameVal],
                [t.os, t.osVal],
                [t.format, t.formatVal],
                [t.price, t.priceVal],
                [t.license, t.licenseVal],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 text-sm border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                  <dt className="text-stone-500">{k}</dt>
                  <dd className="text-stone-900 font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal bg-amber-50/60 border border-amber-200/70 p-8 md:p-10 rounded-3xl">
            <h2 className="text-lg font-semibold text-stone-900 mb-6">{t.noteTitle}</h2>
            <ul className="space-y-3 text-sm text-stone-600">
              {t.notes.map((note, index) => (
                <li key={index} className="flex gap-2.5 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="reveal bg-stone-900 text-stone-50 p-12 md:p-16 rounded-3xl text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(50% 60% at 50% 100%, rgba(245,158,11,0.25) 0%, transparent 70%)',
            }}
          />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 relative leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-stone-300 max-w-xl mx-auto mb-9 leading-relaxed relative">
            {t.ctaSubtitle}
          </p>
          <a
            href={BOOTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-stone-900 font-semibold rounded-full hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/20"
          >
            {t.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 mt-10">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-stone-900 font-semibold">
            <Logo className="w-5 h-5 text-amber-600" />
            <span className="text-sm">{t.footer}</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a href={BOOTH_URL} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-900 transition-colors">
              BOOTH
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-900 transition-colors">
              GitHub
            </a>
            <button onClick={handleLanguageSwitch} className="text-stone-500 hover:text-stone-900 transition-colors">
              {t.langSwitch}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
