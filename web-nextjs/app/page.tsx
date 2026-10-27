'use client';

import { useState } from 'react';

const translations = {
  ja: {
    langSwitch: 'English',
    title: 'MarkItDown',
    subtitle: 'テキストをMarkdownとして保存します。',
    macAppTitle: 'macOSアプリ',
    macAppDesc: 'メニューバーから簡単にファイルを変換できるアプリ',
    downloadBtn: 'GitHub Releasesからダウンロード',
    warning: 'このアプリはApple Developer IDで署名されていません。初回起動時にセキュリティ警告が表示される場合があります。',
    textSectionTitle: 'テキスト変換',
    textPlaceholder: '文章を貼り付けてください...',
    textSubmit: 'Markdownをダウンロード',
    errorText: 'テキストを入力してください'
  },
  en: {
    langSwitch: '日本語',
    title: 'MarkItDown',
    subtitle: 'Save text as Markdown.',
    macAppTitle: 'macOS App',
    macAppDesc: 'A menu bar app for easy file conversion',
    downloadBtn: 'Download from GitHub Releases',
    warning: 'This app is not signed with an Apple Developer ID. You may see a security warning on first launch.',
    textSectionTitle: 'Text Conversion',
    textPlaceholder: 'Paste your text here...',
    textSubmit: 'Download Markdown',
    errorText: 'Please enter text'
  }
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const t = translations[currentLang];

  const handleLanguageSwitch = () => {
    setCurrentLang(currentLang === 'ja' ? 'en' : 'ja');
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTextError('');
    
    if (!text.trim()) {
      setTextError(t.errorText);
      return;
    }
    
    try {
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pasted-text.md';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setTextError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <button
            onClick={handleLanguageSwitch}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.langSwitch}
          </button>
        </header>

        <section className="mb-12 p-6 bg-white border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-2">{t.macAppTitle}</h2>
          <p className="text-gray-600 mb-4">{t.macAppDesc}</p>
          <a
            href="https://github.com/rt18formula1/MarkItDown-GUI/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-gray-900 hover:text-gray-600 transition-colors"
          >
            {t.downloadBtn} →
          </a>
          <p className="text-xs text-gray-500 mt-4">{t.warning}</p>
        </section>

        <section className="p-6 bg-white border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.textSectionTitle}</h2>
          <form onSubmit={handleTextSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.textPlaceholder}
              className="w-full min-h-[200px] p-4 border border-gray-300 font-mono text-sm resize-y focus:outline-none focus:border-gray-900 transition-colors"
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {t.textSubmit}
            </button>
          </form>
          {textError && (
            <div className="mt-4 text-sm text-red-600">
              {textError}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
