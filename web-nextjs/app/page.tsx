'use client';

import { useState } from 'react';

const IconBolt = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconMenu = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} />
  </svg>
);

const IconEye = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconCopy = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconHome = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const translations = {
  ja: {
    langSwitch: 'English',
    heroTitle: 'MarkItDown-GUI',
    heroSubtitle: 'AI時代、ファイルの扱い方をもっとスマートに。',
    heroTagline: 'そのファイル、AIに読み込ませる前にMarkdownに変換しませんか？',
    heroCta: 'BOOTHで購入する（100円）',
    heroSecondary: 'GitHubを見る',
    description: 'PDF、Word、Excel、PowerPointなど、さまざまな形式のファイルをMarkdownに変換できるmacOS向けデスクトップアプリ「MarkItDown-GUI」です。',
    problemTitle: 'AIに資料を読み込むたびに',
    problemText: '無駄なトークン消費やファイル形式の問題が発生します。Markdown形式に変換して情報を整理することで、AIに渡すデータを扱いやすくし、トークン消費の最適化を目指せます。',
    solutionTitle: 'ターミナルはもう必要ありません',
    solutionText: 'Microsoftのオープンソースツール「MarkItDown」は便利ですが、本来の利用にはPython環境の準備やターミナルでのコマンド操作が必要です。MarkItDown-GUIなら、そんな手間は必要ありません。',
    featuresTitle: 'AI時代の新しいファイル活用',
    features: [
      { icon: <IconBolt />, title: 'トークン消費の最適化', desc: 'Markdown形式に変換することで、AIに読み込ませる資料を扱いやすく整理' },
      { icon: <IconMenu />, title: 'メニューバー常駐', desc: 'macOSの画面上部からいつでも呼び出せる、手軽なユーティリティ' },
      { icon: <IconTarget />, title: 'シンプルな操作性', desc: 'ファイルをドラッグ＆ドロップするだけで変換' },
      { icon: <IconEye />, title: '変換結果をすぐ確認', desc: 'Markdownのプレビュー機能を搭載' },
      { icon: <IconCopy />, title: 'ワンクリックでコピー', desc: '変換したテキストをそのままAIツールへ' },
      { icon: <IconHome />, title: 'ローカルで手軽に利用', desc: '日常的な資料整理やAI活用の前処理に' }
    ],
    audienceTitle: '初心者から上級者まで',
    audienceText: 'ターミナルやコマンド操作をできるだけ避けたい方、Pythonの環境構築に時間をかけたくない方、毎回のコマンド実行を省略したい方、ChatGPTやClaudeなどに大量の資料を読み込ませる方、PDFやOfficeファイルをMarkdownに変換したい方、AIを活用したリサーチ・開発・情報整理を行う方、自分専用のAIナレッジベースを構築したい方',
    closing: 'ターミナルを使いこなす人にも、使わない人にも。余計な操作に時間をかけず、AIをもっと有効に活用しましょう。',
    basicInfoTitle: '基本情報',
    productName: '商品名：MarkItDown-GUI',
    os: '対応OS：macOS',
    format: '販売形式：ダウンロード販売',
    price: '価格：100円',
    license: 'ライセンス：Microsoft MarkItDownを利用',
    noteTitle: 'ご購入前に',
    notes: [
      '本商品はmacOS向けアプリケーションです',
      'Windows・Linuxには対応していません',
      '変換結果は元ファイルの構造や内容によって異なります',
      'AIへの入力時のトークン消費量は、ファイル内容や使用するAIモデルによって異なります。Markdownへの変換によって必ず削減されることを保証するものではありません'
    ],
    footer: 'ファイル変換に時間をかける時代は、もう終わりにしよう。ターミナルを開く時間も、コマンドを調べる時間も、もっと有効に使えるはず。メニューバーから、いつでもすぐに。AIをもっと効率的に使うための、小さなユーティリティです。',
    screenshotsTitle: '使用体験'
  },
  en: {
    langSwitch: '日本語',
    heroTitle: 'MarkItDown-GUI',
    heroSubtitle: 'Handle files smarter in the AI era.',
    heroTagline: 'Convert your files to Markdown before feeding them to AI?',
    heroCta: 'Purchase on BOOTH (100 JPY)',
    heroSecondary: 'View GitHub',
    description: 'MarkItDown-GUI is a macOS desktop application that converts various file formats including PDF, Word, Excel, PowerPoint to Markdown.',
    problemTitle: 'Every time you feed documents to AI',
    problemText: 'You face unnecessary token consumption and file format issues. By converting to Markdown and organizing information, you can make data more manageable for AI and optimize token consumption.',
    solutionTitle: 'No more terminal needed',
    solutionText: 'Microsoft\'s open-source tool "MarkItDown" is useful, but normally requires Python environment setup and terminal command operations. With MarkItDown-GUI, you don\'t need that hassle.',
    featuresTitle: 'New file handling in the AI era',
    features: [
      { icon: <IconBolt />, title: 'Optimize token consumption', desc: 'Convert to Markdown to organize documents for AI' },
      { icon: <IconMenu />, title: 'Menu bar resident', desc: 'Access anytime from macOS menu bar' },
      { icon: <IconTarget />, title: 'Simple operation', desc: 'Just drag and drop files to convert' },
      { icon: <IconEye />, title: 'Preview results', desc: 'Built-in Markdown preview' },
      { icon: <IconCopy />, title: 'One-click copy', desc: 'Send converted text directly to AI tools' },
      { icon: <IconHome />, title: 'Local and easy', desc: 'For daily document organization and AI preprocessing' }
    ],
    audienceTitle: 'For beginners and experts',
    audienceText: 'Those who want to avoid terminal and command operations, don\'t want to spend time on Python environment setup, want to skip command execution, feed large documents to ChatGPT/Claude, convert PDF/Office files to Markdown, conduct AI-powered research/development/information organization, build personal AI knowledge bases',
    closing: 'For both terminal experts and beginners. Don\'t waste time on unnecessary operations—use AI more effectively.',
    basicInfoTitle: 'Basic Information',
    productName: 'Product: MarkItDown-GUI',
    os: 'OS: macOS',
    format: 'Format: Digital download',
    price: 'Price: 100 JPY',
    license: 'License: Uses Microsoft MarkItDown',
    noteTitle: 'Before Purchase',
    notes: [
      'This product is a macOS application',
      'Not compatible with Windows/Linux',
      'Conversion results vary by file structure and content',
      'AI token consumption depends on file content and AI model used. Markdown conversion does not guarantee reduction'
    ],
    footer: 'End the era of wasting time on file conversion. Use your terminal and command research time more effectively. Access anytime from the menu bar. A small utility for more efficient AI usage.',
    screenshotsTitle: 'Screenshots'
  }
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const t = translations[currentLang];

  const handleLanguageSwitch = () => void setCurrentLang(currentLang === 'ja' ? 'en' : 'ja');

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-gray-900">MarkItDown-GUI</span>
          <button
            onClick={handleLanguageSwitch}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.langSwitch}
          </button>
        </div>
      </nav>

      <main className="pt-24">
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            {t.heroSubtitle}
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            {t.heroTagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://meteor-cs.booth.pm/items/9057523"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-lg"
            >
              {t.heroCta}
            </a>
            <a
              href="https://github.com/rt18formula1/MarkItDown-GUI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-gray-300 text-gray-900 font-medium hover:border-gray-900 transition-colors rounded-lg"
            >
              {t.heroSecondary}
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.problemTitle}</h3>
              <p className="text-gray-700 leading-relaxed">{t.problemText}</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.solutionTitle}</h3>
              <p className="text-gray-700 leading-relaxed">{t.solutionText}</p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.featuresTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl hover:border-gray-300 transition-colors">
                <div className="text-gray-900 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.screenshotsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img src="/screenshot-1.png" alt="Screenshot 1" className="w-full" />
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img src="/screenshot-2.png" alt="Screenshot 2" className="w-full" />
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img src="/screenshot-3.png" alt="Screenshot 3" className="w-full" />
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-gray-900 text-white p-12 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">{t.audienceTitle}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{t.audienceText}</p>
            <p className="text-gray-300">{t.closing}</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.basicInfoTitle}</h2>
              <ul className="space-y-3 text-gray-700">
                <li>{t.productName}</li>
                <li>{t.os}</li>
                <li>{t.format}</li>
                <li>{t.price}</li>
                <li>{t.license}</li>
              </ul>
            </div>
            <div className="bg-orange-50 border border-orange-200 p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.noteTitle}</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                {t.notes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-sm text-gray-500 text-center">{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
