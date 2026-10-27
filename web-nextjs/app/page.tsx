'use client';

import { useState } from 'react';

const translations = {
  ja: {
    langSwitch: 'English',
    subtitle: 'テキストをMarkdownとして保存するか、ファイルをMarkItDownで変換します。',
    macAppTitle: '📱 macOSアプリも利用可能',
    macAppDesc: 'メニューバーから簡単にファイルを変換できるmacOSアプリもご利用いただけます。',
    downloadBtn: 'GitHub Releasesからダウンロード',
    warning: '⚠️ 注意: このアプリはApple Developer IDで署名されていません。初回起動時にセキュリティ警告が表示される場合があります。その場合は「システム設定」→「プライバシーとセキュリティ」から許可してください。',
    textSectionTitle: '📄 テキスト変換',
    textPlaceholder: '文章を貼り付けてください...',
    textSubmit: 'Markdownをダウンロード',
    fileSectionTitle: '📁 ファイル変換',
    fileSubmit: '変換してダウンロード',
    errorText: 'テキストを入力してください',
    errorFile: 'ファイルを選択してください',
    errorPrefix: 'エラー: ',
    errorConvert: '変換に失敗しました'
  },
  en: {
    langSwitch: '日本語',
    subtitle: 'Save text as Markdown or convert files using MarkItDown.',
    macAppTitle: '📱 macOS App Also Available',
    macAppDesc: 'A macOS app that makes it easy to convert files from the menu bar.',
    downloadBtn: 'Download from GitHub Releases',
    warning: '⚠️ Note: This app is not signed with an Apple Developer ID. You may see a security warning on first launch. If so, please allow it via "System Settings" → "Privacy & Security".',
    textSectionTitle: '📄 Text Conversion',
    textPlaceholder: 'Paste your text here...',
    textSubmit: 'Download Markdown',
    fileSectionTitle: '📁 File Conversion',
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
      const response = await fetch('/api/convert', {
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
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-2xl relative">
        <button
          onClick={handleLanguageSwitch}
          className="absolute top-5 right-5 bg-white border-2 border-gray-200 rounded-lg px-4 py-2 cursor-pointer text-sm font-semibold text-[#667eea] hover:border-[#667eea] hover:shadow-lg transition-all"
        >
          {t.langSwitch}
        </button>
        
        <h1 className="text-4xl mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          📝 MarkItDown
        </h1>
        <p className="text-gray-600 mb-8">{t.subtitle}</p>
        
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl mb-8 border-l-4 border-[#667eea]">
          <h3 className="text-xl mb-3 text-gray-800">{t.macAppTitle}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{t.macAppDesc}</p>
          <a
            href="https://github.com/rt18formula1/MarkItDown-GUI/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            {t.downloadBtn}
          </a>
          <div className="text-sm text-orange-700 bg-orange-50 p-2.5 rounded-lg mt-3">
            {t.warning}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h2 className="text-2xl mb-4 text-gray-800">{t.textSectionTitle}</h2>
          <form onSubmit={handleTextSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.textPlaceholder}
              className="w-full min-h-[200px] p-4 border-2 border-gray-200 rounded-lg font-sans text-sm resize-y focus:outline-none focus:border-[#667eea] transition-colors"
            />
            <button
              type="submit"
              className="mt-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {t.textSubmit}
            </button>
          </form>
          {textError && (
            <div className="text-red-700 mt-3 p-3 bg-red-50 rounded-lg text-sm">
              {textError}
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl mb-4 text-gray-800">{t.fileSectionTitle}</h2>
          <form onSubmit={handleFileSubmit}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white"
              required
            />
            <button
              type="submit"
              className="mt-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {t.fileSubmit}
            </button>
          </form>
          {fileError && (
            <div className="text-red-700 mt-3 p-3 bg-red-50 rounded-lg text-sm">
              {fileError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
