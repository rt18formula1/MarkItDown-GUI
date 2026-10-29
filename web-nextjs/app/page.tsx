'use client';

import { useState } from 'react';

const translations = {
  ja: {
    langSwitch: 'English',
    title: 'MarkItDown-GUI',
    subtitle: 'AI時代、ファイルの扱い方をもっとスマートに。',
    tagline: 'そのファイル、AIに読み込ませる前にMarkdownに変換しませんか？',
    description: 'PDF、Word、Excel、PowerPointなど、さまざまな形式のファイルをMarkdownに変換できるmacOS向けデスクトップアプリ「MarkItDown-GUI」です。',
    problem: 'AIに資料を読み込ませるたびに発生する、無駄なトークン消費やファイル形式の問題。Markdown形式に変換して情報を整理することで、AIに渡すデータを扱いやすくし、トークン消費の最適化を目指せます。',
    solution: 'Microsoftのオープンソースツール「MarkItDown」は便利ですが、本来の利用にはPython環境の準備やターミナルでのコマンド操作が必要です。MarkItDown-GUIなら、そんな手間は必要ありません。',
    features: [
      'トークン消費の最適化：Markdown形式に変換することで、AIに読み込ませる資料を扱いやすく整理',
      'メニューバー常駐：macOSの画面上部からいつでも呼び出せる、手軽なユーティリティ',
      'シンプルな操作性：ファイルをドラッグ＆ドロップするだけで変換',
      '変換結果をすぐ確認：Markdownのプレビュー機能を搭載',
      'ワンクリックでコピー：変換したテキストをそのままAIツールへ',
      'ローカルで手軽に利用：日常的な資料整理やAI活用の前処理に'
    ],
    audience: 'ターミナルやコマンド操作をできるだけ避けたい方、Pythonの環境構築に時間をかけたくない方、毎回のコマンド実行を省略したい方、ChatGPTやClaudeなどに大量の資料を読み込ませる方、PDFやOfficeファイルをMarkdownに変換したい方、AIを活用したリサーチ・開発・情報整理を行う方、自分専用のAIナレッジベースを構築したい方',
    closing: 'ターミナルを使いこなす人にも、使わない人にも。余計な操作に時間をかけず、AIをもっと有効に活用しましょう。',
    purchaseBtn: 'BOOTHで購入する（100円）',
    repoBtn: 'GitHubリポジトリを見る',
    basicInfo: '基本情報',
    productName: '商品名：MarkItDown-GUI',
    os: '対応OS：macOS',
    format: '販売形式：ダウンロード販売',
    price: '価格：100円',
    license: 'ライセンス：Microsoft MarkItDownを利用',
    note: 'ご購入前に',
    notes: [
      '本商品はmacOS向けアプリケーションです',
      'Windows・Linuxには対応していません',
      '変換結果は元ファイルの構造や内容によって異なります',
      'AIへの入力時のトークン消費量は、ファイル内容や使用するAIモデルによって異なります。Markdownへの変換によって必ず削減されることを保証するものではありません'
    ],
    footer: 'ファイル変換に時間をかける時代は、もう終わりにしよう。ターミナルを開く時間も、コマンドを調べる時間も、もっと有効に使えるはず。メニューバーから、いつでもすぐに。AIをもっと効率的に使うための、小さなユーティリティです。'
  },
  en: {
    langSwitch: '日本語',
    title: 'MarkItDown-GUI',
    subtitle: 'Handle files smarter in the AI era.',
    tagline: 'Convert your files to Markdown before feeding them to AI?',
    description: 'MarkItDown-GUI is a macOS desktop application that converts various file formats including PDF, Word, Excel, PowerPoint to Markdown.',
    problem: 'Every time you feed documents to AI, you face unnecessary token consumption and file format issues. By converting to Markdown and organizing information, you can make data more manageable for AI and optimize token consumption.',
    solution: 'Microsoft\'s open-source tool "MarkItDown" is useful, but normally requires Python environment setup and terminal command operations. With MarkItDown-GUI, you don\'t need that hassle.',
    features: [
      'Optimize token consumption: Convert to Markdown to organize documents for AI',
      'Menu bar resident: Access anytime from macOS menu bar',
      'Simple operation: Just drag and drop files to convert',
      'Preview results: Built-in Markdown preview',
      'One-click copy: Send converted text directly to AI tools',
      'Local and easy: For daily document organization and AI preprocessing'
    ],
    audience: 'Those who want to avoid terminal and command operations, don\'t want to spend time on Python environment setup, want to skip command execution, feed large documents to ChatGPT/Claude, convert PDF/Office files to Markdown, conduct AI-powered research/development/information organization, build personal AI knowledge bases',
    closing: 'For both terminal experts and beginners. Don\'t waste time on unnecessary operations—use AI more effectively.',
    purchaseBtn: 'Purchase on BOOTH (100 JPY)',
    repoBtn: 'View GitHub Repository',
    basicInfo: 'Basic Information',
    productName: 'Product: MarkItDown-GUI',
    os: 'OS: macOS',
    format: 'Format: Digital download',
    price: 'Price: 100 JPY',
    license: 'License: Uses Microsoft MarkItDown',
    note: 'Before Purchase',
    notes: [
      'This product is a macOS application',
      'Not compatible with Windows/Linux',
      'Conversion results vary by file structure and content',
      'AI token consumption depends on file content and AI model used. Markdown conversion does not guarantee reduction'
    ],
    footer: 'End the era of wasting time on file conversion. Use your terminal and command research time more effectively. Access anytime from the menu bar. A small utility for more efficient AI usage.'
  }
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const t = translations[currentLang];

  const handleLanguageSwitch = () => void setCurrentLang(currentLang === 'ja' ? 'en' : 'ja');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-xl text-gray-600 mb-3">{t.subtitle}</p>
            <p className="text-lg text-gray-700">{t.tagline}</p>
          </div>
          <button
            onClick={handleLanguageSwitch}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.langSwitch}
          </button>
        </header>

        <section className="mb-12">
          <p className="text-base text-gray-700 leading-relaxed mb-8">{t.description}</p>
          
          <div className="bg-white p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{t.problem}</h3>
          </div>

          <div className="bg-white p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{t.solution}</h3>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">AI時代の新しいファイル活用</h2>
          <ul className="space-y-3 mb-12">
            {t.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-900 mr-3">•</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-100 p-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">初心者から上級者まで</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t.audience}</p>
            <p className="text-gray-700">{t.closing}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://meteor-cs.booth.pm/items/9057523"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors text-center"
            >
              {t.purchaseBtn}
            </a>
            <a
              href="https://github.com/rt18formula1/MarkItDown-GUI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-gray-300 text-gray-900 text-sm font-medium hover:border-gray-900 transition-colors text-center"
            >
              {t.repoBtn}
            </a>
          </div>

          <div className="bg-white p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.basicInfo}</h2>
            <ul className="space-y-2 text-gray-700">
              <li>{t.productName}</li>
              <li>{t.os}</li>
              <li>{t.format}</li>
              <li>{t.price}</li>
              <li>{t.license}</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-6 border border-orange-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t.note}</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {t.notes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="text-sm text-gray-500 pt-8 border-t border-gray-200">
          <p>{t.footer}</p>
        </footer>
      </div>
    </div>
  );
}
