'use client';

import { useState } from 'react';

const translations = {
  ja: {
    langSwitch: 'English',
    title: 'MarkItDown',
    subtitle: 'メニューバーから簡単にファイルをMarkdownに変換',
    description: 'MarkItDownはMicrosoftのMarkItDownを活用したmacOSメニューバーアプリケーションです。PDF、Word、Excel、PowerPointなどのファイルをドラッグ＆ドロップで簡単にMarkdownに変換できます。',
    features: [
      'メニューバーから素早くアクセス',
      'ドラッグ＆ドロップでファイル変換',
      'PDF、Word、Excel、PowerPointに対応',
      '変換結果をクリップボードにコピー'
    ],
    downloadBtn: 'GitHub Releasesからダウンロード',
    warning: 'このアプリはApple Developer IDで署名されていません。初回起動時にセキュリティ警告が表示される場合があります。',
    repoBtn: 'GitHubリポジトリを見る'
  },
  en: {
    langSwitch: '日本語',
    title: 'MarkItDown',
    subtitle: 'Convert files to Markdown from your menu bar',
    description: 'MarkItDown is a macOS menu bar application powered by Microsoft\'s MarkItDown. Easily convert PDF, Word, Excel, PowerPoint, and other files to Markdown with drag and drop.',
    features: [
      'Quick access from menu bar',
      'Drag and drop file conversion',
      'Supports PDF, Word, Excel, PowerPoint',
      'Copy conversion result to clipboard'
    ],
    downloadBtn: 'Download from GitHub Releases',
    warning: 'This app is not signed with an Apple Developer ID. You may see a security warning on first launch.',
    repoBtn: 'View GitHub Repository'
  }
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const t = translations[currentLang];

  const handleLanguageSwitch = () => void setCurrentLang(currentLang === 'ja' ? 'en' : 'ja');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-3">{t.title}</h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
          </div>
          <button
            onClick={handleLanguageSwitch}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.langSwitch}
          </button>
        </header>

        <section className="mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-12">{t.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {t.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-900 mr-3">•</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/rt18formula1/MarkItDown-GUI/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors text-center"
            >
              {t.downloadBtn}
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

          <p className="text-xs text-gray-500 mt-6">{t.warning}</p>
        </section>

        <footer className="text-sm text-gray-500 pt-8 border-t border-gray-200">
          <p>Powered by Microsoft MarkItDown</p>
        </footer>
      </div>
    </div>
  );
}
