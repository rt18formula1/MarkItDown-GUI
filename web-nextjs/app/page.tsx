'use client';

import { useState } from 'react';

const translations = {
  ja: {
    langSwitch: 'English',
    title: 'MarkItDown',
    subtitle: 'テキストをMarkdownとして保存するか、ファイルを変換します。',
    macAppTitle: 'macOSアプリ',
    macAppDesc: 'メニューバーから簡単にファイルを変換できるアプリ',
    downloadBtn: 'GitHub Releasesからダウンロード',
    warning: 'このアプリはApple Developer IDで署名されていません。初回起動時にセキュリティ警告が表示される場合があります。',
    textSectionTitle: 'テキスト変換',
    textPlaceholder: '文章を貼り付けてください...',
    textSubmit: 'Markdownをダウンロード',
    fileSectionTitle: 'ファイル変換',
    fileSubmit: '変換してダウンロード',
    errorText: 'テキストを入力してください',
    errorFile: 'ファイルを選択してください',
    errorPrefix: 'エラー: ',
    errorConvert: '変換に失敗しました'
  },
  en: {
    langSwitch: '日本語',
    title: 'MarkItDown',
    subtitle: 'Save text as Markdown or convert files.',
    macAppTitle: 'macOS App',
    macAppDesc: 'A menu bar app for easy file conversion',
    downloadBtn: 'Download from GitHub Releases',
    warning: 'This app is not signed with an Apple Developer ID. You may see a security warning on first launch.',
    textSectionTitle: 'Text Conversion',
    textPlaceholder: 'Paste your text here...',
    textSubmit: 'Download Markdown',
    fileSectionTitle: 'File Conversion',
    fileSubmit: 'Convert and Download',
    errorText: 'Please enter text',
    errorFile: 'Please select a file',
    errorPrefix: 'Error: ',
    errorConvert: 'Conversion failed'
  }
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
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
      setTextError(t.errorPrefix + (err as Error).message);
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFileError('');
    
    if (!file) {
      setFileError(t.errorFile);
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'https://markitdown-api.onrender.com/file', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || t.errorConvert);
      }
      
      const markdown = await response.text();
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.[^/.]+$/, '') + '.md';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setFileError(t.errorPrefix + (err as Error).message);
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

        <section className="p-6 bg-white border border-gray-200 mb-12">
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

        <section className="p-6 bg-white border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t.fileSectionTitle}</h2>
          <form onSubmit={handleFileSubmit}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-4 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors"
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {t.fileSubmit}
            </button>
          </form>
          {fileError && (
            <div className="mt-4 text-sm text-red-600">
              {fileError}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
