// src/components/forms/ArticleForm.jsx
import React, { useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';

export default function ArticleForm({ onSummarizeArticle }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [formError, setFormError] = useState('');

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (parsing) {
      return; // wait until file parsing completes
    }
    const trimmed = (text || '').trim();
    if (!trimmed) {
      setFormError('No content found. Paste text or upload a supported file.');
      return;
    }
    setFormError('');
    onSummarizeArticle(trimmed);
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);

    const name = uploadedFile.name.toLowerCase();
    const type = uploadedFile.type;

    try {
      setParsing(true);
      if (name.endsWith('.pdf') || type === 'application/pdf') {
        // PDF parsing using pdfjs with CDN worker and fallback handling
        GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.js';
        const arrayBuffer = await uploadedFile.arrayBuffer();
        let parsed = '';
        try {
          const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
          let fullText = '';
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const strings = (content.items || []).map((item) => item.str || '').filter(Boolean);
            fullText += strings.join(' ').replace(/\s{2,}/g, ' ') + '\n';
          }
          parsed = fullText.trim();
        } catch (pdfErr) {
          // Fall back: try to decode as text (may not work for most PDFs)
          try {
            const decoder = new TextDecoder('utf-8');
            parsed = decoder.decode(new Uint8Array(arrayBuffer)).slice(0, 5000); // safety cap
          } catch {}
        }
        setText(parsed);
        setFormError(parsed ? '' : 'Could not extract text from this PDF. It may be image-based.');
        return;
      }

      if (name.endsWith('.docx') || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        // Load mammoth from CDN at runtime to avoid bundler resolution issues
        const loadMammothFromCdn = () => new Promise((resolve, reject) => {
          if (window.mammoth) return resolve(window.mammoth);
          const existing = document.querySelector('script[data-mammoth]');
          if (existing) {
            existing.addEventListener('load', () => resolve(window.mammoth));
            existing.addEventListener('error', reject);
            return;
          }
          const s = document.createElement('script');
          s.src = 'https://unpkg.com/mammoth/mammoth.browser.min.js';
          s.async = true;
          s.setAttribute('data-mammoth', 'true');
          s.onload = () => resolve(window.mammoth);
          s.onerror = reject;
          document.head.appendChild(s);
        });
        const mammothLib = await loadMammothFromCdn();
        const result = await mammothLib.extractRawText({ arrayBuffer });
        setText((result && result.value ? result.value : '').trim());
        return;
      }

      // Fallback text-like formats
      const reader = new FileReader();
      reader.onload = (event) => {
        let fileText = event.target.result || '';
        if (name.endsWith('.html') || name.endsWith('.htm')) {
          const div = document.createElement('div');
          div.innerHTML = fileText;
          fileText = div.textContent || div.innerText || '';
        }
        setText(fileText);
        setParsing(false);
      };
      reader.readAsText(uploadedFile);
    } catch (err) {
      console.error('File parse error:', err);
      // Keep the text empty to allow manual paste
    } finally {
      // For FileReader we already unset parsing in onload; for sync branches this turns it off here
      if (name.endsWith('.pdf') || name.endsWith('.docx') || type === 'application/pdf' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setParsing(false);
      }
    }
  };

  return (
    <form onSubmit={handleTextSubmit} className="space-y-4 w-full max-w-4xl mx-auto mb-0">
      <textarea
        rows="6"
        placeholder="Paste your article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base resize-y"
      />
      {formError && (
        <div className="text-red-600 text-sm">{formError}</div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <input
          type="file"
          accept=".txt,.md,.markdown,.csv,.json,.html,.htm,.log,.xml,.pdf,.docx"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base flex-1 sm:flex-none"
        />
        <button
          type="submit"
          disabled={parsing}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 rounded-md transition-all text-sm sm:text-base font-medium whitespace-nowrap w-full sm:w-auto"
        >
          <span className="group-hover:hidden">Summarize Article</span>
          <span className="hidden group-hover:inline">Just takes a few seconds!</span>
        </button>
      </div>
    </form>
  );
}