/**
 * Exam Paper Maker - Professional UI + Voice for options
 */
(function () {
  'use strict';

  // ========== PROTECTION ==========
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); return false; });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && [73, 74, 67, 105, 106, 99].includes(e.keyCode)) { e.preventDefault(); return false; }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) { e.preventDefault(); return false; }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) { e.preventDefault(); return false; }
  }, true);
  document.addEventListener('dragstart', function (e) { e.preventDefault(); return false; });
  if (window.top !== window.self) { window.top.location = window.self.location; }
  setInterval(function () { try { console.clear(); } catch (e) {} }, 3000);

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadCSS(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  var style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Devanagari', sans-serif;
      background: #f1f5f9;
      min-height: 100vh;
      color: #0f172a;
    }
    .hindi-text { font-family: 'Noto Sans Devanagari', Mangal, system-ui, sans-serif; }
    input, select, textarea, button { font-family: inherit; }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.15s ease;
      cursor: pointer;
      border: none;
    }
    .btn:active { transform: scale(0.98); }
    .btn-primary {
      background: #2563eb;
      color: white;
    }
    .btn-primary:hover { background: #1d4ed8; }
    .btn-success {
      background: #059669;
      color: white;
    }
    .btn-success:hover { background: #047857; }
    .btn-secondary {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
    }
    .btn-secondary:hover { background: #e2e8f0; }
    .btn-danger {
      background: #ef4444;
      color: white;
    }
    .btn-danger:hover { background: #dc2626; }
    .btn-ghost {
      background: transparent;
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.1); }
    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: #475569;
      margin-bottom: 6px;
    }
    .form-input {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      background: #fff;
      color: #0f172a;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .form-input::placeholder { color: #94a3b8; }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 20px;
    }
    .section-num {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
    }
    @media print {
      body * { visibility: hidden; }
      #print-area, #print-area * { visibility: visible; }
      #print-area { position: absolute; left: 0; top: 0; width: 100%; }
      .no-print { display: none !important; }
    }
  `;
  document.head.appendChild(style);
  loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

  Promise.all([
    loadScript('https://cdn.tailwindcss.com'),
    loadScript('https://unpkg.com/react@18/umd/react.production.min.js'),
    loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js'),
    loadScript('https://unpkg.com/@babel/standalone/babel.min.js'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
  ]).then(function () {
    var appCode = document.createElement('script');
    appCode.type = 'text/babel';
    appCode.textContent = APP_CODE;
    document.body.appendChild(appCode);
  }).catch(function () {
    document.getElementById('root').innerHTML = '<div style="padding:60px;text-align:center;font-family:Inter,sans-serif;"><h2 style="color:#0f172a;">Failed to load</h2><p style="color:#64748b;">Please check your internet connection and refresh.</p></div>';
  });

  var APP_CODE = `
const { useState, useRef, useEffect } = React;

const SUBJECTS = ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit', 'EVS', 'General Knowledge', 'Other'];
const QUESTION_TYPES = [
  { value: 'mcq', label: 'Multiple Choice', labelHi: 'बहुविकल्पीय' },
  { value: 'short', label: 'Short Answer', labelHi: 'लघु उत्तरीय' },
  { value: 'long', label: 'Long Answer', labelHi: 'दीर्घ उत्तरीय' },
  { value: 'fill', label: 'Fill in the Blanks', labelHi: 'रिक्त स्थान भरें' },
  { value: 'truefalse', label: 'True / False', labelHi: 'सत्य / असत्य' },
];

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function App() {
  const [meta, setMeta] = useState({
    schoolName: '',
    title: 'Examination Paper',
    subject: 'Hindi',
    className: '',
    duration: '3 Hours',
    totalMarks: 100,
    instructions: '1. All questions are compulsory.\\n2. Read the questions carefully before answering.\\n3. Write answers in neat handwriting.',
    date: new Date().toISOString().slice(0, 10),
  });

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState({
    type: 'mcq',
    text: '',
    marks: 1,
    options: [
      { id: generateId(), text: '' },
      { id: generateId(), text: '' },
      { id: generateId(), text: '' },
      { id: generateId(), text: '' },
    ],
  });

  const [isListening, setIsListening] = useState(false);
  const [listeningTarget, setListeningTarget] = useState(null); // 'question' | number (option index)
  const [voiceLang, setVoiceLang] = useState('hi-IN');
  const [showPreview, setShowPreview] = useState(false);
  const [savedPapers, setSavedPapers] = useState([]);
  const recognitionRef = useRef(null);
  const previewRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('exam-papers');
    if (saved) {
      try { setSavedPapers(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = voiceLang;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript && targetRef.current !== null) {
        const target = targetRef.current;
        if (target === 'question') {
          setCurrentQ(prev => ({ ...prev, text: (prev.text || '') + finalTranscript + ' ' }));
        } else if (typeof target === 'number') {
          setCurrentQ(prev => {
            const opts = [...(prev.options || [])];
            if (opts[target]) {
              opts[target] = { ...opts[target], text: (opts[target].text || '') + finalTranscript + ' ' };
            }
            return { ...prev, options: opts };
          });
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setListeningTarget(null);
      targetRef.current = null;
    };
    recognition.onend = () => {
      setIsListening(false);
      setListeningTarget(null);
      targetRef.current = null;
    };
    recognitionRef.current = recognition;
  }, [voiceLang]);

  const startVoice = (target) => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setListeningTarget(null);
      targetRef.current = null;
      return;
    }
    targetRef.current = target;
    setListeningTarget(target);
    recognitionRef.current.lang = voiceLang;
    recognitionRef.current.start();
    setIsListening(true);
  };

  const addQuestion = () => {
    if (!currentQ.text || !currentQ.text.trim()) {
      alert('Please enter question text');
      return;
    }
    const newQ = {
      id: generateId(),
      type: currentQ.type,
      text: currentQ.text.trim(),
      marks: currentQ.marks || 1,
      options: currentQ.type === 'mcq' ? (currentQ.options || []).filter(o => o.text.trim()) : undefined,
    };
    setQuestions(prev => [...prev, newQ]);
    setCurrentQ({
      type: 'mcq',
      text: '',
      marks: 1,
      options: [
        { id: generateId(), text: '' },
        { id: generateId(), text: '' },
        { id: generateId(), text: '' },
        { id: generateId(), text: '' },
      ],
    });
  };

  const removeQuestion = (id) => setQuestions(prev => prev.filter(q => q.id !== id));

  const updateOption = (idx, text) => {
    setCurrentQ(prev => {
      const opts = [...(prev.options || [])];
      opts[idx] = { ...opts[idx], text };
      return { ...prev, options: opts };
    });
  };

  const calculatedMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  const savePaper = () => {
    if (!meta.schoolName || !meta.className || questions.length === 0) {
      alert('Please fill School Name, Class and add at least one question.');
      return;
    }
    const paper = {
      id: generateId(),
      meta: { ...meta, totalMarks: calculatedMarks || meta.totalMarks },
      questions: [...questions],
    };
    const updated = [paper, ...savedPapers].slice(0, 20);
    setSavedPapers(updated);
    localStorage.setItem('exam-papers', JSON.stringify(updated));
    alert('Paper saved successfully!');
  };

  const loadPaper = (id) => {
    const paper = savedPapers.find(p => p.id === id);
    if (paper) {
      setMeta(paper.meta);
      setQuestions(paper.questions);
      setShowPreview(false);
    }
  };

  const deleteSaved = (id) => {
    const updated = savedPapers.filter(p => p.id !== id);
    setSavedPapers(updated);
    localStorage.setItem('exam-papers', JSON.stringify(updated));
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }
    const fileName = (meta.subject + '_' + meta.className + '_' + (meta.date || 'paper') + '.pdf').replace(/\\s+/g, '_');
    pdf.save(fileName);
  };

  const isHindi = meta.subject === 'Hindi' || meta.subject === 'Sanskrit';

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="bg-slate-900 text-white no-print" style={{borderBottom: '1px solid #1e293b'}}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-lg">📝</div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Exam Paper Maker</h1>
              <p className="text-slate-400 text-xs">Professional tool for teachers</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPreview(!showPreview)} className="btn btn-ghost px-4 py-2 text-sm">
              {showPreview ? '← Edit' : 'Preview'}
            </button>
            {showPreview && (
              <>
                <button onClick={downloadPDF} className="btn btn-success px-4 py-2 text-sm">Download PDF</button>
                <button onClick={() => window.print()} className="btn px-4 py-2 text-sm" style={{background:'#d97706',color:'#fff'}}>Print</button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {!showPreview ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">

              {/* Paper Details */}
              <section className="card p-6">
                <div className="section-title">
                  <span className="section-num" style={{background:'#dbeafe',color:'#1d4ed8'}}>1</span>
                  Paper Details
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">School Name *</label>
                    <input className="form-input" value={meta.schoolName} onChange={e => setMeta({...meta, schoolName: e.target.value})} placeholder="e.g. Delhi Public School" />
                  </div>
                  <div>
                    <label className="form-label">Subject *</label>
                    <select className="form-input" value={meta.subject} onChange={e => setMeta({...meta, subject: e.target.value})}>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Class / Grade *</label>
                    <input className="form-input" value={meta.className} onChange={e => setMeta({...meta, className: e.target.value})} placeholder="e.g. Class 10" />
                  </div>
                  <div>
                    <label className="form-label">Exam Title</label>
                    <input className="form-input" value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} placeholder="Mid-Term Examination" />
                  </div>
                  <div>
                    <label className="form-label">Duration</label>
                    <input className="form-input" value={meta.duration} onChange={e => setMeta({...meta, duration: e.target.value})} />
                  </div>
                  <div>
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" value={meta.date} onChange={e => setMeta({...meta, date: e.target.value})} />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="form-label">General Instructions</label>
                  <textarea className="form-input" style={{minHeight:80}} value={meta.instructions} onChange={e => setMeta({...meta, instructions: e.target.value})} />
                </div>
              </section>

              {/* Add Question */}
              <section className="card p-6">
                <div className="section-title">
                  <span className="section-num" style={{background:'#d1fae5',color:'#047857'}}>2</span>
                  Add Question
                </div>

                <div className="flex flex-wrap gap-4 mb-5">
                  <div>
                    <label className="form-label">Type</label>
                    <select className="form-input" style={{width:'auto',minWidth:180}} value={currentQ.type} onChange={e => setCurrentQ({...currentQ, type: e.target.value})}>
                      {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label} ({t.labelHi})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Marks</label>
                    <input type="number" min="1" max="50" className="form-input" style={{width:80}} value={currentQ.marks} onChange={e => setCurrentQ({...currentQ, marks: Number(e.target.value) || 1})} />
                  </div>
                  <div>
                    <label className="form-label">Voice Language</label>
                    <select className="form-input" style={{width:'auto'}} value={voiceLang} onChange={e => setVoiceLang(e.target.value)}>
                      <option value="hi-IN">हिन्दी</option>
                      <option value="en-IN">English</option>
                    </select>
                  </div>
                </div>

                {/* Question text + voice */}
                <div>
                  <label className="form-label">Question Text *</label>
                  <div className="relative">
                    <textarea
                      className={'form-input ' + (isHindi ? 'hindi-text text-base' : '')}
                      style={{minHeight:100, paddingRight:100}}
                      value={currentQ.text || ''}
                      onChange={e => setCurrentQ({...currentQ, text: e.target.value})}
                      placeholder={voiceLang === 'hi-IN' ? 'प्रश्न यहाँ लिखें या माइक दबाकर बोलें...' : 'Type question or click mic to speak...'}
                    />
                    <button
                      type="button"
                      onClick={() => startVoice('question')}
                      className="btn absolute right-2 top-2 px-3 py-1.5 text-xs"
                      style={{
                        background: (isListening && listeningTarget === 'question') ? '#ef4444' : '#2563eb',
                        color: '#fff',
                        animation: (isListening && listeningTarget === 'question') ? 'pulse 1s infinite' : 'none'
                      }}
                    >
                      {(isListening && listeningTarget === 'question') ? '⏹ Stop' : '🎤 Voice'}
                    </button>
                  </div>
                  {isListening && listeningTarget === 'question' && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">● Listening for question... ({voiceLang === 'hi-IN' ? 'हिन्दी' : 'English'})</p>
                  )}
                </div>

                {/* MCQ Options with voice */}
                {currentQ.type === 'mcq' && (
                  <div className="mt-5">
                    <label className="form-label">Options <span className="text-slate-400 font-normal">(type or use voice for each)</span></label>
                    <div className="space-y-2.5">
                      {(currentQ.options || []).map((opt, idx) => (
                        <div key={opt.id} className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{background:'#f1f5f9',color:'#475569'}}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <input
                            className={'form-input flex-1 ' + (isHindi ? 'hindi-text' : '')}
                            value={opt.text}
                            onChange={e => updateOption(idx, e.target.value)}
                            placeholder={'Option ' + String.fromCharCode(65 + idx)}
                          />
                          <button
                            type="button"
                            onClick={() => startVoice(idx)}
                            className="btn px-2.5 py-2 text-xs flex-shrink-0"
                            style={{
                              background: (isListening && listeningTarget === idx) ? '#ef4444' : '#64748b',
                              color: '#fff',
                              minWidth: 70
                            }}
                            title="Voice input for this option"
                          >
                            {(isListening && listeningTarget === idx) ? '⏹' : '🎤'}
                          </button>
                        </div>
                      ))}
                    </div>
                    {isListening && typeof listeningTarget === 'number' && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">● Listening for Option {String.fromCharCode(65 + listeningTarget)}... ({voiceLang === 'hi-IN' ? 'हिन्दी' : 'English'})</p>
                    )}
                  </div>
                )}

                <button onClick={addQuestion} className="btn btn-primary mt-6 px-6 py-2.5 text-sm">
                  + Add Question
                </button>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <section className="card p-5 sticky top-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-slate-800">Questions</h2>
                  <span className="badge" style={{background:'#dbeafe',color:'#1d4ed8'}}>{questions.length} Q · {calculatedMarks} M</span>
                </div>

                {questions.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-3xl mb-2 opacity-40">📋</div>
                    <p className="text-slate-400 text-sm">No questions yet</p>
                  </div>
                ) : (
                  <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {questions.map((q, i) => (
                      <li key={q.id} className="rounded-lg p-3 text-sm" style={{background:'#f8fafc',border:'1px solid #e2e8f0'}}>
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-slate-700">Q{i+1}.</span>{' '}
                            <span className={(isHindi ? 'hindi-text ' : '') + 'text-slate-600'}>
                              {q.text.length > 65 ? q.text.slice(0,65)+'…' : q.text}
                            </span>
                            <div className="mt-1 text-xs text-slate-400">
                              {QUESTION_TYPES.find(t => t.value === q.type)?.label} · {q.marks} mark{q.marks > 1 ? 's' : ''}
                            </div>
                          </div>
                          <button onClick={() => removeQuestion(q.id)} className="text-slate-300 hover:text-red-500 text-sm leading-none pt-0.5">✕</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 space-y-2">
                  <button onClick={savePaper} className="btn btn-success w-full py-2.5 text-sm">Save Paper</button>
                  <button onClick={() => setShowPreview(true)} disabled={questions.length === 0} className="btn w-full py-2.5 text-sm" style={{background: questions.length === 0 ? '#e2e8f0' : '#4f46e5', color: questions.length === 0 ? '#94a3b8' : '#fff', cursor: questions.length === 0 ? 'not-allowed' : 'pointer'}}>
                    Preview & Export
                  </button>
                </div>
              </section>

              {savedPapers.length > 0 && (
                <section className="card p-5">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Recent Papers</h3>
                  <ul className="space-y-1.5">
                    {savedPapers.slice(0,5).map(p => (
                      <li key={p.id} className="flex items-center justify-between text-sm rounded-lg px-3 py-2" style={{background:'#f8fafc'}}>
                        <button onClick={() => loadPaper(p.id)} className="text-left text-blue-600 hover:underline truncate flex-1 font-medium">
                          {p.meta.subject} · {p.meta.className}
                        </button>
                        <button onClick={() => deleteSaved(p.id)} className="text-slate-300 hover:text-red-500 ml-2 text-xs">Delete</button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        ) : (
          /* Preview */
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 no-print">
              <button onClick={() => setShowPreview(false)} className="btn btn-secondary px-4 py-2 text-sm">← Back to Edit</button>
              <button onClick={downloadPDF} className="btn btn-success px-4 py-2 text-sm">Download PDF</button>
              <button onClick={() => window.print()} className="btn px-4 py-2 text-sm" style={{background:'#d97706',color:'#fff'}}>Print</button>
            </div>

            <div id="print-area" ref={previewRef} className="bg-white mx-auto" style={{maxWidth:720, padding:'48px 56px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', borderRadius:8, fontFamily: isHindi ? '"Noto Sans Devanagari", Mangal, system-ui' : 'Inter, system-ui'}}>
              <div className="text-center" style={{borderBottom:'2px solid #0f172a', paddingBottom:20, marginBottom:28}}>
                <h1 style={{fontSize:22, fontWeight:700, letterSpacing:'0.03em', textTransform:'uppercase', margin:0}}>{meta.schoolName || 'School Name'}</h1>
                <h2 style={{fontSize:16, fontWeight:600, margin:'8px 0 0', color:'#334155'}}>{meta.title}</h2>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px 24px', marginTop:14, fontSize:13, color:'#475569'}}>
                  <span><strong>Subject:</strong> {meta.subject}</span>
                  <span><strong>Class:</strong> {meta.className}</span>
                  <span><strong>Duration:</strong> {meta.duration}</span>
                  <span><strong>Max Marks:</strong> {calculatedMarks || meta.totalMarks}</span>
                  {meta.date && <span><strong>Date:</strong> {meta.date}</span>}
                </div>
              </div>

              {meta.instructions && (
                <div style={{marginBottom:28, fontSize:13}}>
                  <p style={{fontWeight:600, marginBottom:6}}>General Instructions:</p>
                  <div style={{whiteSpace:'pre-line', color:'#475569', paddingLeft:12, borderLeft:'3px solid #cbd5e1'}}>{meta.instructions}</div>
                </div>
              )}

              <div style={{display:'flex', flexDirection:'column', gap:24}}>
                {questions.map((q, idx) => (
                  <div key={q.id}>
                    <div style={{display:'flex', gap:8}}>
                      <span style={{fontWeight:600, flexShrink:0}}>Q{idx+1}.</span>
                      <div style={{flex:1}}>
                        <p style={{fontWeight:500, margin:0, lineHeight:1.5}}>
                          {q.text}{' '}
                          <span style={{color:'#64748b', fontWeight:400, fontSize:13}}>[{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]</span>
                        </p>
                        {q.type === 'mcq' && q.options && (
                          <div style={{marginTop:10, marginLeft:4}}>
                            {q.options.map((opt, oi) => (
                              <p key={opt.id} style={{fontSize:14, margin:'4px 0', color:'#334155'}}>({String.fromCharCode(97+oi)}) {opt.text}</p>
                            ))}
                          </div>
                        )}
                        {q.type === 'truefalse' && <p style={{marginTop:8, marginLeft:4, fontSize:13, color:'#64748b'}}>(True / False)</p>}
                        {(q.type === 'short' || q.type === 'long' || q.type === 'fill') && (
                          <div style={{marginTop:12, borderBottom:'1px dashed #cbd5e1', height: q.type === 'long' ? 80 : 32}}></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:48, paddingTop:20, borderTop:'1px solid #e2e8f0', textAlign:'center', fontSize:13, color:'#94a3b8'}}>
                <p style={{margin:0}}>*** All the Best ***</p>
                <p style={{margin:'6px 0 0'}}>Total Questions: {questions.length} &nbsp;|&nbsp; Total Marks: {calculatedMarks}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`;
})();
