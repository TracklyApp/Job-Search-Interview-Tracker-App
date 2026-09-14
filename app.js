(() => {
  'use strict';

  const STORAGE_KEY = 'jobtrack_state_v1';
  const THEME_KEY = 'jobtrack_theme';
  const DEMO_LIMIT = 20;
  const ACTIVATION_HASH = '2fc306dad52ecd9aac81643782c19f67d98cfb7863a2585177a25bf87ccdd74e';
  const STATUSES = ['Saved', 'Applied', 'Screening', 'Interview', 'Final Interview', 'Offer', 'Hired', 'Rejected', 'Withdrawn'];
  const PIPELINE_STATUSES = ['Saved', 'Applied', 'Screening', 'Interview', 'Final Interview', 'Offer'];

  const pageMeta = {
    dashboard: ['Dashboard', 'Your job search at a glance.'],
    applications: ['Applications', 'Track every opportunity and next step.'],
    pipeline: ['Pipeline', 'See where each application stands.'],
    interviews: ['Interviews', 'Prepare well and stay ahead of every conversation.'],
    followups: ['Follow-ups', 'Keep recruiter replies and thank-you notes on time.'],
    companies: ['Companies', 'Keep your company research in one place.'],
    contacts: ['Contacts', 'Build a lightweight networking CRM.'],
    offers: ['Offers', 'Compare compensation and overall fit.'],
    analytics: ['Analytics', 'Understand what is working in your job search.'],
    settings: ['Settings', 'Activation, backup and appearance.']
  };

  const now = new Date();
  const isoToday = toISODate(now);
  const addDays = (days) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    return toISODate(d);
  };

  const sampleState = {
    schemaVersion: 2,
    activated: false,
    demoOps: 0,
    applications: [
      { id:'a1', role:'Product Operations Specialist', company:'Northstar Labs', status:'Interview', priority:'High', workStyle:'Remote', location:'Remote — Europe', salaryMin:52000, salaryMax:68000, currency:'EUR', source:'LinkedIn', appliedDate:addDays(-8), nextStepDate:addDays(1), jobUrl:'', scoreRole:5, scoreSalary:4, scoreRemote:5, scoreGrowth:4, scoreBenefits:4, scoreCompany:5, notes:'Strong role fit. Prepare examples about process improvement and cross-functional work.', isDemo:true, createdAt:Date.now()-800000 },
      { id:'a2', role:'Customer Success Manager', company:'Brightpath', status:'Screening', priority:'High', workStyle:'Hybrid', location:'Bucharest, Romania', salaryMin:42000, salaryMax:52000, currency:'EUR', source:'Referral', appliedDate:addDays(-5), nextStepDate:addDays(2), jobUrl:'', scoreRole:4, scoreSalary:4, scoreRemote:3, scoreGrowth:5, scoreBenefits:4, scoreCompany:4, notes:'Referral from former colleague. Emphasize retention and account growth examples.', isDemo:true, createdAt:Date.now()-700000 },
      { id:'a3', role:'Project Coordinator', company:'Atlas Studio', status:'Applied', priority:'Medium', workStyle:'Remote', location:'Remote', salaryMin:38000, salaryMax:48000, currency:'EUR', source:'Company website', appliedDate:addDays(-10), nextStepDate:addDays(0), jobUrl:'', scoreRole:4, scoreSalary:3, scoreRemote:5, scoreGrowth:4, scoreBenefits:3, scoreCompany:4, notes:'Follow up if no response after 10 days.', isDemo:true, createdAt:Date.now()-600000 },
      { id:'a4', role:'Operations Analyst', company:'Cedar & Co.', status:'Final Interview', priority:'High', workStyle:'Hybrid', location:'Cluj-Napoca, Romania', salaryMin:50000, salaryMax:62000, currency:'EUR', source:'Recruiter', appliedDate:addDays(-16), nextStepDate:addDays(3), jobUrl:'', scoreRole:5, scoreSalary:5, scoreRemote:3, scoreGrowth:5, scoreBenefits:4, scoreCompany:4, notes:'Final panel. Prepare one example on metrics, one on solving ambiguity.', isDemo:true, createdAt:Date.now()-500000 },
      { id:'a5', role:'Community Manager', company:'Horizon Works', status:'Saved', priority:'Low', workStyle:'Remote', location:'Remote', salaryMin:35000, salaryMax:44000, currency:'EUR', source:'Indeed', appliedDate:'', nextStepDate:addDays(4), jobUrl:'', scoreRole:3, scoreSalary:3, scoreRemote:5, scoreGrowth:3, scoreBenefits:3, scoreCompany:3, notes:'Review description before applying.', isDemo:true, createdAt:Date.now()-400000 },
      { id:'a6', role:'Implementation Specialist', company:'Fieldnote', status:'Offer', priority:'High', workStyle:'Remote', location:'Remote — EU', salaryMin:56000, salaryMax:65000, currency:'EUR', source:'Networking', appliedDate:addDays(-24), nextStepDate:addDays(2), jobUrl:'', scoreRole:5, scoreSalary:5, scoreRemote:5, scoreGrowth:4, scoreBenefits:4, scoreCompany:5, notes:'Offer received. Compare with Cedar & Co. if final interview converts.', isDemo:true, createdAt:Date.now()-300000 },
      { id:'a7', role:'UX Researcher', company:'NovaPulse', status:'Screening', priority:'High', workStyle:'Remote', location:'Berlin / Remote EU', salaryMin:58000, salaryMax:72000, currency:'EUR', source:'LinkedIn', appliedDate:addDays(-4), nextStepDate:addDays(1), jobUrl:'', scoreRole:5, scoreSalary:4, scoreRemote:5, scoreGrowth:5, scoreBenefits:4, scoreCompany:5, notes:'Recruiter screen scheduled. Prepare research impact examples and stakeholder stories.', isDemo:true, createdAt:Date.now()-280000 },
      { id:'a8', role:'Marketing Operations Specialist', company:'Greenhouse Cloud', status:'Applied', priority:'Medium', workStyle:'Hybrid', location:'Amsterdam, Netherlands', salaryMin:48000, salaryMax:59000, currency:'EUR', source:'Company website', appliedDate:addDays(-6), nextStepDate:addDays(2), jobUrl:'', scoreRole:4, scoreSalary:4, scoreRemote:3, scoreGrowth:4, scoreBenefits:5, scoreCompany:4, notes:'Good tools fit. Highlight CRM automation, reporting and campaign operations.', isDemo:true, createdAt:Date.now()-260000 },
      { id:'a9', role:'Data Coordinator', company:'Orbital Health', status:'Rejected', priority:'Medium', workStyle:'Remote', location:'Remote — Europe', salaryMin:40000, salaryMax:47000, currency:'EUR', source:'Indeed', appliedDate:addDays(-21), nextStepDate:'', jobUrl:'', scoreRole:4, scoreSalary:3, scoreRemote:5, scoreGrowth:3, scoreBenefits:4, scoreCompany:3, notes:'Closed after first review. Keep as a reference for similar healthcare roles.', isDemo:true, createdAt:Date.now()-240000 },
      { id:'a10', role:'Learning & Development Specialist', company:'Fathom People', status:'Saved', priority:'Medium', workStyle:'Remote', location:'Remote', salaryMin:44000, salaryMax:54000, currency:'EUR', source:'LinkedIn', appliedDate:'', nextStepDate:addDays(3), jobUrl:'', scoreRole:5, scoreSalary:3, scoreRemote:5, scoreGrowth:4, scoreBenefits:4, scoreCompany:4, notes:'Tailor CV toward facilitation, onboarding and learning program ownership.', isDemo:true, createdAt:Date.now()-220000 },
      { id:'a11', role:'Account Manager', company:'Vela Systems', status:'Interview', priority:'High', workStyle:'Hybrid', location:'Bucharest, Romania', salaryMin:46000, salaryMax:58000, currency:'EUR', source:'Recruiter', appliedDate:addDays(-9), nextStepDate:addDays(2), jobUrl:'', scoreRole:5, scoreSalary:4, scoreRemote:3, scoreGrowth:5, scoreBenefits:4, scoreCompany:4, notes:'Second round. Prepare retention, upsell and difficult-client examples.', isDemo:true, createdAt:Date.now()-200000 },
      { id:'a12', role:'Business Operations Associate', company:'LunarGrid', status:'Applied', priority:'High', workStyle:'Remote', location:'Remote — EMEA', salaryMin:50000, salaryMax:61000, currency:'EUR', source:'Referral', appliedDate:addDays(-2), nextStepDate:addDays(5), jobUrl:'', scoreRole:5, scoreSalary:4, scoreRemote:5, scoreGrowth:5, scoreBenefits:4, scoreCompany:5, notes:'Warm referral. Strong match for process, analytics and cross-functional coordination.', isDemo:true, createdAt:Date.now()-180000 },
      { id:'a13', role:'Client Onboarding Manager', company:'Paperkite', status:'Final Interview', priority:'High', workStyle:'Remote', location:'Remote — EU', salaryMin:54000, salaryMax:66000, currency:'EUR', source:'Networking', appliedDate:addDays(-18), nextStepDate:addDays(1), jobUrl:'', scoreRole:5, scoreSalary:5, scoreRemote:5, scoreGrowth:4, scoreBenefits:4, scoreCompany:5, notes:'Final conversation with VP Customer. Focus on onboarding time-to-value and handoff process.', isDemo:true, createdAt:Date.now()-160000 },
      { id:'a14', role:'Customer Support Lead', company:'EmberStack', status:'Withdrawn', priority:'Low', workStyle:'Remote', location:'Remote', salaryMin:42000, salaryMax:50000, currency:'EUR', source:'Indeed', appliedDate:addDays(-14), nextStepDate:'', jobUrl:'', scoreRole:3, scoreSalary:3, scoreRemote:5, scoreGrowth:2, scoreBenefits:3, scoreCompany:3, notes:'Withdrew after learning the schedule required frequent weekend coverage.', isDemo:true, createdAt:Date.now()-140000 },
      { id:'a15', role:'Program Manager', company:'Everline', status:'Hired', priority:'High', workStyle:'Hybrid', location:'Vienna, Austria', salaryMin:62000, salaryMax:74000, currency:'EUR', source:'Referral', appliedDate:addDays(-45), nextStepDate:'', jobUrl:'', scoreRole:5, scoreSalary:5, scoreRemote:3, scoreGrowth:5, scoreBenefits:5, scoreCompany:5, notes:'Accepted role — useful completed example showing the full pipeline through Hired.', isDemo:true, createdAt:Date.now()-120000 },
      { id:'a16', role:'Partnerships Coordinator', company:'Daybreak Media', status:'Offer', priority:'High', workStyle:'Remote', location:'Remote — Europe', salaryMin:49000, salaryMax:57000, currency:'EUR', source:'LinkedIn', appliedDate:addDays(-20), nextStepDate:addDays(4), jobUrl:'', scoreRole:4, scoreSalary:4, scoreRemote:5, scoreGrowth:5, scoreBenefits:4, scoreCompany:4, notes:'Offer received. Compare flexibility, growth path and total compensation.', isDemo:true, createdAt:Date.now()-100000 }
    ],
    interviews: [
      { id:'i1', applicationId:'a1', type:'Hiring Manager', format:'Video', date:addDays(1), time:'11:00', interviewer:'Maya Chen', location:'Google Meet', prepNotes:'Prepare examples for prioritization, process improvement and stakeholder communication.', questions:'How is success measured in the first 90 days?\nWhat is the biggest operational bottleneck today?', isDemo:true },
      { id:'i2', applicationId:'a4', type:'Final Interview', format:'Video', date:addDays(3), time:'15:30', interviewer:'Panel interview', location:'Teams', prepNotes:'Review metrics case study and STAR examples.', questions:'What would make someone exceptional in this role after six months?', isDemo:true },
      { id:'i3', applicationId:'a11', type:'Hiring Manager', format:'Video', date:addDays(2), time:'10:00', interviewer:'Andrei Pop', location:'Google Meet', prepNotes:'Prepare one retention story, one expansion story and a difficult stakeholder example.', questions:'What does a healthy account portfolio look like here?', isDemo:true },
      { id:'i4', applicationId:'a13', type:'Final Interview', format:'Video', date:addDays(1), time:'16:00', interviewer:'VP Customer', location:'Zoom', prepNotes:'Bring a concise 30-60-90 day onboarding improvement idea.', questions:'Where do customers most often lose momentum during onboarding?', isDemo:true },
      { id:'i5', applicationId:'a7', type:'Recruiter Screen', format:'Video', date:addDays(1), time:'09:30', interviewer:'Sara Klein', location:'Meet', prepNotes:'Clarify research scope, team structure and hiring timeline.', questions:'How is research involved in product decisions?', isDemo:true }
    ],
    followups: [
      { id:'f1', applicationId:'a3', type:'Application check-in', dueDate:addDays(0), notes:'Send a short, professional follow-up to recruiting.', completed:false, isDemo:true },
      { id:'f2', applicationId:'a1', type:'Thank-you note', dueDate:addDays(2), notes:'Draft after the hiring manager interview.', completed:false, isDemo:true },
      { id:'f3', applicationId:'a6', type:'Offer follow-up', dueDate:addDays(2), notes:'Ask final questions about learning budget and start date.', completed:false, isDemo:true },
      { id:'f4', applicationId:'a8', type:'Application check-in', dueDate:addDays(1), notes:'Follow up if the application is still quiet.', completed:false, isDemo:true },
      { id:'f5', applicationId:'a11', type:'Interview preparation', dueDate:addDays(1), notes:'Review account growth metrics and customer examples.', completed:false, isDemo:true },
      { id:'f6', applicationId:'a13', type:'Final interview prep', dueDate:addDays(0), notes:'Finish 30-60-90 day onboarding notes.', completed:false, isDemo:true },
      { id:'f7', applicationId:'a12', type:'Referral thank-you', dueDate:addDays(2), notes:'Send a short update to the person who referred you.', completed:false, isDemo:true }
    ],
    companies: [
      { id:'c1', name:'Northstar Labs', industry:'B2B SaaS', website:'', size:'200–500', culture:'5', benefits:'Remote-first, learning budget, 25 days PTO', notes:'Strong async culture. Product-led company. Recent expansion in Europe.', isDemo:true },
      { id:'c2', name:'Cedar & Co.', industry:'Business services', website:'', size:'500–1,000', culture:'4', benefits:'Hybrid, private health, annual bonus', notes:'Stable team, structured promotion path, strong analytics function.', isDemo:true },
      { id:'c3', name:'Paperkite', industry:'Customer onboarding SaaS', website:'', size:'100–200', culture:'5', benefits:'Remote EU, wellness budget, learning allowance', notes:'Fast-growing customer team with strong focus on time-to-value.', isDemo:true },
      { id:'c4', name:'LunarGrid', industry:'Operations software', website:'', size:'50–100', culture:'5', benefits:'Remote EMEA, equipment budget, 28 days PTO', notes:'Small operations team, high ownership and strong async culture.', isDemo:true },
      { id:'c5', name:'Vela Systems', industry:'B2B technology', website:'', size:'200–500', culture:'4', benefits:'Hybrid, private medical, performance bonus', notes:'Customer expansion is a key growth priority this year.', isDemo:true }
    ],
    contacts: [
      { id:'n1', name:'Elena Martin', role:'Senior Recruiter', company:'Cedar & Co.', email:'', url:'', lastContact:addDays(-2), notes:'Introduced the Operations Analyst role. Responsive recruiter.', isDemo:true },
      { id:'n2', name:'Daniel Brooks', role:'Former colleague / referral', company:'Brightpath', email:'', url:'', lastContact:addDays(-6), notes:'Provided referral for Customer Success Manager position.', isDemo:true },
      { id:'n3', name:'Sara Klein', role:'Talent Partner', company:'NovaPulse', email:'', url:'', lastContact:addDays(-1), notes:'Recruiter screen booked for UX Researcher role.', isDemo:true },
      { id:'n4', name:'Mihai Ionescu', role:'Referral contact', company:'LunarGrid', email:'', url:'', lastContact:addDays(-3), notes:'Warm referral into Business Operations team.', isDemo:true }
    ],
    offers: [
      { id:'o1', applicationId:'a6', salary:61000, currency:'EUR', bonus:'8% annual bonus', pto:'26 days', workStyle:'Remote', deadline:addDays(5), score:'9', benefits:'Private health, learning budget, home-office allowance', notes:'Strong flexibility and role fit.', isDemo:true },
      { id:'o2', applicationId:'a16', salary:55000, currency:'EUR', bonus:'5% annual bonus', pto:'25 days', workStyle:'Remote', deadline:addDays(4), score:'8', benefits:'Remote stipend, private health, annual learning budget', notes:'Good growth path; slightly lower compensation than Fieldnote.', isDemo:true }
    ]
  };

  let state = loadState();
  let currentView = 'dashboard';
  let confirmAction = null;
  let searchTerm = '';
  let deferredInstallPrompt = null;

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', init);

  function init() {
    populateStatusOptions();
    applyTheme(localStorage.getItem(THEME_KEY) || 'light');
    bindNavigation();
    bindModals();
    bindForms();
    bindToolbar();
    bindSettings();
    bindDelegatedActions();
    setupInstallApp();
    registerServiceWorker();
    renderAll();
  }

  function loadState() {
    try {
      if (typeof localStorage === 'undefined') return structuredClone(sampleState);
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return structuredClone(sampleState);
      return migrateState(parsed);
    } catch (err) {
      console.warn('Could not read saved state. Starting clean sample state.', err);
      return structuredClone(sampleState);
    }
  }

  function migrateState(saved) {
    const merged = {
      ...structuredClone(sampleState),
      ...saved,
      schemaVersion: 2,
      applications: Array.isArray(saved.applications) ? structuredClone(saved.applications) : [],
      interviews: Array.isArray(saved.interviews) ? structuredClone(saved.interviews) : [],
      followups: Array.isArray(saved.followups) ? structuredClone(saved.followups) : [],
      companies: Array.isArray(saved.companies) ? structuredClone(saved.companies) : [],
      contacts: Array.isArray(saved.contacts) ? structuredClone(saved.contacts) : [],
      offers: Array.isArray(saved.offers) ? structuredClone(saved.offers) : []
    };
    merged.demoOps = Math.max(0, Number(merged.demoOps) || 0);
    merged.activated = Boolean(merged.activated);
    merged.demoCleared = Boolean(saved.demoCleared);
    if (!merged.demoCleared) {
      ['applications','interviews','followups','companies','contacts','offers'].forEach(key => {
        const existingIds = new Set(merged[key].map(item => item.id));
        sampleState[key].forEach(item => { if (!existingIds.has(item.id)) merged[key].push(structuredClone(item)); });
      });
    }
    return merged;
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function canMutate(label='change') {
    if (state.activated) return true;
    if (state.demoOps >= DEMO_LIMIT) {
      toast(`Demo limit reached. Activate the full app to ${label}.`, 'error');
      openModal('activateModal');
      return false;
    }
    return true;
  }

  function commitMutation(message='Saved') {
    if (!state.activated) state.demoOps = Math.min(DEMO_LIMIT, state.demoOps + 1);
    persist();
    renderAll();
    toast(message, 'success');
  }

  function populateStatusOptions() {
    const statusSelect = $('#applicationStatusSelect');
    const filter = $('#applicationStatusFilter');
    statusSelect.innerHTML = STATUSES.map(s => `<option>${escapeHTML(s)}</option>`).join('');
    filter.innerHTML = '<option value="">All statuses</option>' + STATUSES.map(s => `<option>${escapeHTML(s)}</option>`).join('');
  }

  function bindNavigation() {
    $$('.nav-item').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.view)));
    $$('[data-nav]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.nav)));
    $('#menuBtn').addEventListener('click', openSidebar);
    $('#sidebarOverlay').addEventListener('click', closeSidebar);
  }

  function navigate(view) {
    currentView = view;
    $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${view}`));
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    const [title, sub] = pageMeta[view] || ['JobTrack', ''];
    $('#pageTitle').textContent = title;
    $('#pageSubtitle').textContent = sub;
    closeSidebar();
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  function openSidebar() { $('#sidebar').classList.add('open'); $('#sidebarOverlay').classList.add('show'); }
  function closeSidebar() { $('#sidebar').classList.remove('open'); $('#sidebarOverlay').classList.remove('show'); }

  function bindModals() {
    $$('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => {
      prepareModal(btn.dataset.openModal);
      openModal(btn.dataset.openModal);
    }));
    $$('.modal-close').forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal').id)));
    $$('.modal').forEach(modal => modal.addEventListener('mousedown', (e) => {
      if (e.target === modal) closeModal(modal.id);
    }));
    $('#activateBtnSide').addEventListener('click', () => openModal('activateModal'));
    $('#activateBtnSettings').addEventListener('click', () => openModal('activateModal'));
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (id === 'confirmModal') confirmAction = null;
  }

  function prepareModal(id, record=null) {
    refreshApplicationSelects();
    if (id === 'applicationModal') {
      const form = $('#applicationForm');
      form.reset();
      form.elements.id.value = '';
      form.elements.status.value = 'Saved';
      form.elements.priority.value = 'Medium';
      form.elements.workStyle.value = 'Remote';
      form.elements.currency.value = 'EUR';
      form.elements.source.value = 'LinkedIn';
      ['scoreRole','scoreSalary','scoreRemote','scoreGrowth','scoreCompany'].forEach(name => form.elements[name].value = 4);
      form.elements.scoreBenefits.value = 3;
      form.elements.appliedDate.value = isoToday;
      $('#applicationModalTitle').textContent = 'Add application';
      if (record) {
        fillForm(form, record);
        $('#applicationModalTitle').textContent = 'Edit application';
      }
      updateMatchPreview();
    }
    if (id === 'interviewModal') {
      const form = $('#interviewForm'); form.reset(); form.elements.id.value=''; form.elements.date.value=isoToday;
      if (record) fillForm(form, record);
    }
    if (id === 'followupModal') {
      const form = $('#followupForm'); form.reset(); form.elements.id.value=''; form.elements.dueDate.value=isoToday;
      if (record) fillForm(form, record);
    }
    if (id === 'companyModal') { const form=$('#companyForm'); form.reset(); form.elements.id.value=''; if(record) fillForm(form, record); }
    if (id === 'contactModal') { const form=$('#contactForm'); form.reset(); form.elements.id.value=''; if(record) fillForm(form, record); }
    if (id === 'offerModal') { const form=$('#offerForm'); form.reset(); form.elements.id.value=''; form.elements.currency.value='EUR'; form.elements.score.value='8'; if(record) fillForm(form, record); }
  }

  function fillForm(form, record) {
    Object.entries(record).forEach(([key, value]) => {
      if (form.elements[key] && value !== undefined && value !== null) form.elements[key].value = value;
    });
  }

  function bindForms() {
    $('#applicationForm').addEventListener('submit', handleApplicationSubmit);
    $('#interviewForm').addEventListener('submit', e => handleGenericSubmit(e, 'interviews', 'interviewModal', 'Interview saved'));
    $('#followupForm').addEventListener('submit', e => handleGenericSubmit(e, 'followups', 'followupModal', 'Follow-up saved', { completed:false }));
    $('#companyForm').addEventListener('submit', e => handleGenericSubmit(e, 'companies', 'companyModal', 'Company research saved'));
    $('#contactForm').addEventListener('submit', e => handleGenericSubmit(e, 'contacts', 'contactModal', 'Contact saved'));
    $('#offerForm').addEventListener('submit', handleOfferSubmit);
    $$('.score-input').forEach(input => input.addEventListener('input', updateMatchPreview));
    $('#activationForm').addEventListener('submit', handleActivation);
  }

  function handleApplicationSubmit(e) {
    e.preventDefault();
    if (!canMutate('save this application')) return;
    const data = formObject(e.currentTarget);
    const id = data.id || uid('a');
    const record = {
      ...data,
      id,
      salaryMin: numOrBlank(data.salaryMin),
      salaryMax: numOrBlank(data.salaryMax),
      scoreRole: Number(data.scoreRole), scoreSalary:Number(data.scoreSalary), scoreRemote:Number(data.scoreRemote),
      scoreGrowth:Number(data.scoreGrowth), scoreBenefits:Number(data.scoreBenefits), scoreCompany:Number(data.scoreCompany),
      isDemo:false,
      createdAt: state.applications.find(x => x.id===id)?.createdAt || Date.now()
    };
    upsert(state.applications, record);
    closeModal('applicationModal');
    commitMutation(data.id ? 'Application updated' : 'Application added');
  }

  function handleGenericSubmit(e, collectionName, modalId, message, defaults={}) {
    e.preventDefault();
    if (!canMutate('save this record')) return;
    const data = { ...defaults, ...formObject(e.currentTarget) };
    const existingPrefix = { interviews:'i', followups:'f', companies:'c', contacts:'n' }[collectionName] || 'r';
    data.id = data.id || uid(existingPrefix);
    data.isDemo = false;
    if (collectionName === 'followups') data.completed = state.followups.find(x => x.id===data.id)?.completed || false;
    upsert(state[collectionName], data);
    closeModal(modalId);
    commitMutation(message);
  }

  function handleOfferSubmit(e) {
    e.preventDefault();
    if (!canMutate('save this offer')) return;
    const data = formObject(e.currentTarget);
    data.id = data.id || uid('o');
    data.salary = numOrBlank(data.salary);
    data.score = Number(data.score || 0);
    data.isDemo = false;
    upsert(state.offers, data);
    const app = state.applications.find(a => a.id === data.applicationId);
    if (app && !['Hired','Rejected','Withdrawn'].includes(app.status)) app.status = 'Offer';
    closeModal('offerModal');
    commitMutation('Offer saved');
  }

  async function handleActivation(e) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get('code') || '').trim().toUpperCase();
    const hash = await sha256(code);
    if (hash === ACTIVATION_HASH) {
      state.activated = true;
      persist();
      renderAll();
      e.currentTarget.reset();
      $('#activationError').textContent = '';
      closeModal('activateModal');
      toast('Full app activated', 'success');
    } else {
      $('#activationError').textContent = 'That activation code was not recognized. Please check it and try again.';
    }
  }

  function bindToolbar() {
    $('#quickAddBtn').addEventListener('click', () => { prepareModal('applicationModal'); openModal('applicationModal'); });
    $('#themeBtn').addEventListener('click', toggleTheme);
    $('#themeBtnSettings').addEventListener('click', toggleTheme);
    $('#installAppBtn').addEventListener('click', installApp);
    $('#installAppBtnSettings').addEventListener('click', installApp);
    $('#globalSearch').addEventListener('input', e => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderApplications(); renderCompanies(); renderContacts(); renderInterviews();
    });
    $('#applicationStatusFilter').addEventListener('change', renderApplications);
    $('#applicationPriorityFilter').addEventListener('change', renderApplications);
  }

  function bindSettings() {
    $('#exportBackupBtn').addEventListener('click', exportBackup);
    $('#importBackupInput').addEventListener('change', importBackup);
    $('#clearDemoBtn').addEventListener('click', () => confirmDialog(
      'Clear sample data?',
      'This removes only fictional demo records. Your own records will stay untouched.',
      () => {
        ['applications','interviews','followups','companies','contacts','offers'].forEach(key => {
          state[key] = state[key].filter(x => !x.isDemo);
        });
        state.demoCleared = true;
        persist(); renderAll(); toast('Sample data cleared', 'success');
      },
      'Clear sample data'
    ));
  }

  function bindDelegatedActions() {
    document.addEventListener('click', e => {
      const edit = e.target.closest('[data-edit]');
      const del = e.target.closest('[data-delete]');
      const complete = e.target.closest('[data-complete-followup]');
      if (edit) editRecord(edit.dataset.type, edit.dataset.edit);
      if (del) deleteRecord(del.dataset.type, del.dataset.delete);
      if (complete) toggleFollowup(complete.dataset.completeFollowup);
    });
    document.addEventListener('change', e => {
      if (e.target.matches('[data-pipeline-status]')) changePipelineStatus(e.target.dataset.pipelineStatus, e.target.value);
    });
    $('#confirmActionBtn').addEventListener('click', () => {
      const fn = confirmAction;
      closeModal('confirmModal');
      if (typeof fn === 'function') fn();
    });
  }

  function editRecord(type, id) {
    const map = {
      application:['applications','applicationModal'], interview:['interviews','interviewModal'], followup:['followups','followupModal'],
      company:['companies','companyModal'], contact:['contacts','contactModal'], offer:['offers','offerModal']
    };
    const cfg = map[type]; if (!cfg) return;
    const record = state[cfg[0]].find(x => x.id===id); if (!record) return;
    prepareModal(cfg[1], record); openModal(cfg[1]);
  }

  function deleteRecord(type, id) {
    const map = { application:'applications', interview:'interviews', followup:'followups', company:'companies', contact:'contacts', offer:'offers' };
    const key = map[type]; if (!key) return;
    confirmDialog('Delete record?', 'This record will be permanently removed from this browser.', () => {
      if (!canMutate('delete this record')) return;
      state[key] = state[key].filter(x => x.id !== id);
      if (type === 'application') {
        state.interviews = state.interviews.filter(x => x.applicationId !== id);
        state.followups = state.followups.filter(x => x.applicationId !== id);
        state.offers = state.offers.filter(x => x.applicationId !== id);
      }
      commitMutation('Record deleted');
    });
  }

  function toggleFollowup(id) {
    if (!canMutate('update this follow-up')) return;
    const item = state.followups.find(x => x.id===id); if (!item) return;
    item.completed = !item.completed;
    commitMutation(item.completed ? 'Follow-up completed' : 'Follow-up reopened');
  }

  function changePipelineStatus(id, status) {
    if (!canMutate('change application status')) { renderPipeline(); return; }
    const app = state.applications.find(x => x.id===id); if (!app) return;
    app.status = status;
    commitMutation(`Moved to ${status}`);
  }

  function renderAll() {
    refreshApplicationSelects();
    renderDemo();
    renderDashboard();
    renderApplications();
    renderPipeline();
    renderInterviews();
    renderFollowups();
    renderCompanies();
    renderContacts();
    renderOffers();
    renderAnalytics();
    renderSettings();
  }

  function renderDemo() {
    const card = $('#demoCard');
    if (state.activated) {
      card.innerHTML = '<div class="demo-row"><span>License</span><strong>Full access</strong></div><div class="progress"><span style="width:100%"></span></div><div style="font-size:10px;opacity:.75;line-height:1.5">Activated on this browser. Demo limits are removed.</div>';
    } else {
      const count = Math.min(DEMO_LIMIT, state.demoOps || 0);
      $('#demoCounter').textContent = `Demo ${count} / ${DEMO_LIMIT}`;
      $('#demoProgress').style.width = `${(count/DEMO_LIMIT)*100}%`;
    }
  }

  function renderDashboard() {
    const apps = state.applications;
    const active = apps.filter(a => !['Rejected','Withdrawn','Hired'].includes(a.status));
    const interviewStageCount = apps.filter(a => ['Interview','Final Interview'].includes(a.status)).length;
    const offers = apps.filter(a => a.status==='Offer').length;
    const openFollowups = state.followups.filter(f => !f.completed);
    const followupsDue = openFollowups.filter(f => f.dueDate && f.dueDate <= isoToday).length;
    const overdueFollowups = openFollowups.filter(f => f.dueDate && f.dueDate < isoToday).length;
    const avgMatch = active.length ? Math.round(active.reduce((sum,a)=>sum+matchScore(a),0)/active.length) : 0;
    const recentApps = apps.filter(a => a.appliedDate && a.appliedDate >= addDays(-6) && a.appliedDate <= isoToday).length;
    const nextWeekInterviews = state.interviews.filter(i => i.date >= isoToday && i.date <= addDays(7)).length;
    const highMatchActive = active.filter(a => matchScore(a) >= 80).length;
    const reachedInterview = apps.filter(a => ['Interview','Final Interview','Offer','Hired'].includes(a.status)).length;
    const interviewRate = apps.length ? Math.round(reachedInterview / apps.length * 100) : 0;

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'GOOD MORNING' : hour < 18 ? 'GOOD AFTERNOON' : 'GOOD EVENING';
    $('#dashboardGreeting').textContent = greeting;
    const momentum = Math.max(0, Math.min(100, 28 + Math.min(28,recentApps*7) + Math.min(24,nextWeekInterviews*8) + Math.min(20,offers*10) - Math.min(20,overdueFollowups*5)));
    $('#momentumScore').textContent = momentum;
    $('#momentumRing').style.setProperty('--momentum', momentum);
    $('#momentumHeadline').textContent = momentum >= 80 ? 'Excellent momentum' : momentum >= 60 ? 'Strong momentum' : momentum >= 40 ? 'Keep building' : 'Restart your rhythm';
    $('#momentumDetail').textContent = `${recentApps} application${recentApps===1?'':'s'} this week · ${nextWeekInterviews} upcoming interview${nextWeekInterviews===1?'':'s'} · ${offers} offer${offers===1?'':'s'}`;

    const stats = [
      ['Applications', apps.length, 'Total tracked'], ['Active', active.length, 'In progress'], ['Interviews', interviewStageCount, 'Current stages'],
      ['Offers', offers, offers ? 'Decision time' : 'Keep moving'], ['Follow-ups due', followupsDue, followupsDue ? 'Need attention' : 'All clear'], ['Avg. match', `${avgMatch}%`, highMatchActive ? `${highMatchActive} strong fits` : 'Active roles']
    ];
    $('#dashboardStats').innerHTML = stats.map(([label,val,small],idx) => `<div class="stat-card stat-accent-${idx}"><span>${label}</span><strong>${val}</strong><small>${small}</small></div>`).join('');

    const todayItems = [];
    state.followups.filter(f=>!f.completed && f.dueDate && f.dueDate<=addDays(2)).forEach(f => {
      const app=getApp(f.applicationId); todayItems.push({ kind:'followup', id:f.id, date:f.dueDate, title:f.type, meta:app?`${app.role} · ${app.company}`:'General follow-up' });
    });
    state.interviews.filter(i=>i.date && i.date>=isoToday && i.date<=addDays(3)).forEach(i=>{
      const app=getApp(i.applicationId); todayItems.push({kind:'interview',id:i.id,date:i.date,title:`${i.type} interview`,meta:app?`${app.role} · ${app.company}`:'Interview'});
    });
    active.filter(a=>a.status==='Saved' && a.nextStepDate && a.nextStepDate<=addDays(2)).forEach(a=>todayItems.push({kind:'application',id:a.id,date:a.nextStepDate,title:'Review & apply',meta:`${a.role} · ${a.company}`}));
    todayItems.sort((a,b)=>a.date.localeCompare(b.date));
    $('#todayCount').textContent = `${todayItems.length} item${todayItems.length===1?'':'s'}`;
    $('#todayList').innerHTML = todayItems.length ? todayItems.slice(0,7).map(item=>{
      const cls=item.date<isoToday?'overdue':item.date===isoToday?'today':'';
      const icon=item.kind==='interview'?'◆':item.kind==='application'?'↗':'✓';
      return `<div class="task-item focus-task"><div class="task-main"><span class="task-icon ${cls}">${icon}</span><div><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.meta)} · ${humanDate(item.date)}</small></div></div>${item.kind==='followup'?`<button class="mini-btn" data-complete-followup="${item.id}">Done</button>`:''}</div>`;
    }).join('') : emptyMini('Nothing urgent. Your next steps are clear.');

    const healthRows = [
      ['Application activity', recentApps >= 3 ? 'Excellent' : recentApps >= 1 ? 'Good' : 'Needs activity', recentApps >= 3 ? 'good' : recentApps >= 1 ? 'warn' : 'bad'],
      ['Follow-up consistency', overdueFollowups === 0 ? 'Excellent' : overdueFollowups <= 2 ? 'Needs attention' : 'At risk', overdueFollowups === 0 ? 'good' : overdueFollowups <= 2 ? 'warn' : 'bad'],
      ['Pipeline strength', highMatchActive >= 3 ? 'Strong' : highMatchActive >= 1 ? 'Building' : 'Low', highMatchActive >= 3 ? 'good' : highMatchActive >= 1 ? 'warn' : 'bad'],
      ['Interview conversion', `${interviewRate}%`, interviewRate >= 25 ? 'good' : interviewRate >= 12 ? 'warn' : 'bad']
    ];
    const healthPoints = healthRows.reduce((sum,row)=>sum+(row[2]==='good'?25:row[2]==='warn'?15:7),0);
    $('#healthScore').textContent = `${healthPoints}/100`;
    $('#healthList').innerHTML = healthRows.map(([label,value,tone])=>`<div class="health-row"><span>${escapeHTML(label)}</span><strong class="health-${tone}"><i></i>${escapeHTML(value)}</strong></div>`).join('');
    let suggestion = 'Keep your strongest opportunities moving with one clear next action each.';
    if (overdueFollowups > 0) suggestion = `Follow up on ${overdueFollowups} overdue application${overdueFollowups===1?'':'s'} before adding more roles.`;
    else if (state.interviews.some(i=>i.date===addDays(1))) suggestion = 'Prepare tomorrow’s interviews now: review STAR stories, role fit and your questions to ask.';
    else {
      const savedStrong = active.find(a=>a.status==='Saved' && matchScore(a)>=80);
      const quietApplied = active.find(a=>a.status==='Applied' && a.appliedDate && a.appliedDate<=addDays(-7));
      if (savedStrong) suggestion = `Prioritize ${savedStrong.role} at ${savedStrong.company} — it is a ${matchScore(savedStrong)}% match and still saved.`;
      else if (quietApplied) suggestion = `Check in on ${quietApplied.role} at ${quietApplied.company}; it has been open for more than a week.`;
    }
    $('#smartSuggestion').textContent = suggestion;

    const max = Math.max(1, ...PIPELINE_STATUSES.map(st => apps.filter(a=>a.status===st).length));
    $('#pipelineMini').innerHTML = PIPELINE_STATUSES.map(st=>{
      const count=apps.filter(a=>a.status===st).length; return `<div class="pipeline-line"><span>${escapeHTML(st)}</span><div class="pipeline-track"><div class="pipeline-fill pipeline-${statusClass(st)}" style="width:${(count/max)*100}%"></div></div><strong>${count}</strong></div>`;
    }).join('');

    const upcoming = state.interviews.filter(i=>i.date>=isoToday).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,5);
    $('#upcomingInterviews').innerHTML = upcoming.length ? upcoming.map(i=>{
      const app=getApp(i.applicationId);
      return `<div class="runway-item"><div class="runway-date"><strong>${humanDay(i.date)}</strong><span>${humanMonth(i.date)}</span></div><div class="runway-main"><strong>${escapeHTML(i.type)}</strong><small>${app?escapeHTML(app.role+' · '+app.company):'Unknown application'} · ${escapeHTML(i.time||'Time TBD')}</small></div><span class="status-badge status-${statusClass(app?.status||'Interview')}">${escapeHTML(i.format||'Interview')}</span></div>`;
    }).join('') : emptyMini('No upcoming interviews.');

    const top = active.map(a=>({...a,_match:matchScore(a)})).sort((a,b)=>b._match-a._match).slice(0,5);
    $('#topMatches').innerHTML = top.length ? top.map(a=>`<div class="clean-item opportunity-item"><div class="clean-main"><div class="company-avatar">${escapeHTML((a.company||'?').trim().charAt(0).toUpperCase())}</div><div><strong>${escapeHTML(a.role)}</strong><small>${escapeHTML(a.company)} · ${escapeHTML(a.workStyle||'')} ${a.nextStepDate?'· '+humanDate(a.nextStepDate):''}</small></div></div><div class="opportunity-score">${matchBadge(a._match)}<span class="status-dot status-dot-${statusClass(a.status)}"></span></div></div>`).join('') : emptyMini('Add opportunities to see your best matches.');
  }

  function renderApplications() {
    let apps = [...state.applications];
    const status = $('#applicationStatusFilter')?.value || '';
    const priority = $('#applicationPriorityFilter')?.value || '';
    if (status) apps = apps.filter(a=>a.status===status);
    if (priority) apps = apps.filter(a=>a.priority===priority);
    if (searchTerm) apps = apps.filter(a => [a.role,a.company,a.location,a.notes,a.source].some(v=>String(v||'').toLowerCase().includes(searchTerm)));
    apps.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
    const body=$('#applicationsTable');
    body.innerHTML=apps.map(a=>`<tr>
      <td class="role-cell"><strong>${escapeHTML(a.role)}</strong><small>${escapeHTML(a.workStyle||'')} ${a.location?'· '+escapeHTML(a.location):''}</small></td>
      <td>${escapeHTML(a.company)}</td><td><span class="status-badge status-${statusClass(a.status)}">${escapeHTML(a.status)}</span></td>
      <td><span class="priority-badge priority-${escapeHTML(a.priority)}">${escapeHTML(a.priority)}</span></td>
      <td>${matchBadge(matchScore(a))}</td><td>${a.appliedDate?humanDate(a.appliedDate):'—'}</td><td>${a.nextStepDate?humanDate(a.nextStepDate):'—'}</td>
      <td><div class="row-actions"><button class="mini-btn" data-edit="${a.id}" data-type="application">Edit</button><button class="mini-btn" data-delete="${a.id}" data-type="application">Delete</button></div></td>
    </tr>`).join('');
    $('#applicationsEmpty').classList.toggle('hidden', apps.length>0);
  }

  function renderPipeline() {
    const board=$('#pipelineBoard');
    board.innerHTML=PIPELINE_STATUSES.map(status=>{
      const apps=state.applications.filter(a=>a.status===status);
      return `<section class="kanban-col kanban-${statusClass(status)}"><div class="kanban-head"><strong>${escapeHTML(status)}</strong><span class="kanban-count">${apps.length}</span></div><div class="kanban-stack">${apps.map(a=>`<div class="kanban-card"><div class="kanban-company-row"><div class="company-avatar small">${escapeHTML((a.company||'?').trim().charAt(0).toUpperCase())}</div><span class="priority-dot priority-dot-${escapeHTML(a.priority||'Medium')}"></span></div><h4>${escapeHTML(a.role)}</h4><p>${escapeHTML(a.company)} · ${escapeHTML(a.workStyle||'')}</p><div class="kanban-next">${a.nextStepDate?`Next: ${humanDate(a.nextStepDate)}`:'No next date set'}</div><div class="kanban-meta">${matchBadge(matchScore(a))}<select class="kanban-select" data-pipeline-status="${a.id}">${STATUSES.map(s=>`<option ${s===a.status?'selected':''}>${escapeHTML(s)}</option>`).join('')}</select></div></div>`).join('') || '<div class="empty-state" style="padding:20px 6px">No roles</div>'}</div></section>`;
    }).join('');
  }

  function renderInterviews() {
    let items=[...state.interviews];
    if(searchTerm) items=items.filter(i=>{ const a=getApp(i.applicationId); return [i.type,i.interviewer,i.prepNotes,a?.role,a?.company].some(v=>String(v||'').toLowerCase().includes(searchTerm)); });
    items.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
    $('#interviewsGrid').innerHTML=items.map(i=>{
      const a=getApp(i.applicationId); return `<div class="info-card"><div class="info-card-top"><div><h3>${escapeHTML(i.type)}</h3><p>${a?escapeHTML(a.role+' · '+a.company):'Unknown application'}</p></div><span class="pill">${humanDate(i.date)}</span></div><div class="meta-grid"><div class="meta-box"><span>Time</span><strong>${escapeHTML(i.time||'Not set')}</strong></div><div class="meta-box"><span>Format</span><strong>${escapeHTML(i.format||'—')}</strong></div><div class="meta-box"><span>Interviewer</span><strong>${escapeHTML(i.interviewer||'—')}</strong></div><div class="meta-box"><span>Location</span><strong>${escapeHTML(i.location||'—')}</strong></div></div>${i.prepNotes?`<div class="note-box"><p><strong style="color:var(--text)">Prep:</strong> ${nl2br(i.prepNotes)}</p></div>`:''}<div class="card-actions"><button class="mini-btn" data-edit="${i.id}" data-type="interview">Edit</button><button class="mini-btn" data-delete="${i.id}" data-type="interview">Delete</button></div></div>`;
    }).join('');
    $('#interviewsEmpty').classList.toggle('hidden', items.length>0);
  }

  function renderFollowups() {
    const items=[...state.followups].sort((a,b)=>(a.completed-b.completed)||String(a.dueDate).localeCompare(String(b.dueDate)));
    $('#followupsList').innerHTML=items.map(f=>{
      const app=getApp(f.applicationId); const cls=f.dueDate<isoToday&&!f.completed?'overdue':f.dueDate===isoToday&&!f.completed?'today':'';
      return `<div class="task-item" style="opacity:${f.completed?'.58':'1'}"><div class="task-main"><span class="task-dot ${cls}"></span><div><strong style="${f.completed?'text-decoration:line-through':''}">${escapeHTML(f.type)}</strong><small>${app?escapeHTML(app.role+' · '+app.company):'General'} · ${humanDate(f.dueDate)}${f.notes?' · '+escapeHTML(f.notes):''}</small></div></div><div class="task-actions"><button class="mini-btn" data-complete-followup="${f.id}">${f.completed?'Reopen':'Done'}</button><button class="mini-btn" data-edit="${f.id}" data-type="followup">Edit</button><button class="mini-btn" data-delete="${f.id}" data-type="followup">Delete</button></div></div>`;
    }).join('');
    $('#followupsEmpty').classList.toggle('hidden', items.length>0);
  }

  function renderCompanies() {
    let items=[...state.companies];
    if(searchTerm) items=items.filter(c=>[c.name,c.industry,c.notes,c.benefits].some(v=>String(v||'').toLowerCase().includes(searchTerm)));
    $('#companiesGrid').innerHTML=items.map(c=>`<div class="info-card"><div class="info-card-top"><div><h3>${escapeHTML(c.name)}</h3><p>${escapeHTML(c.industry||'Industry not set')} · ${escapeHTML(c.size||'Size not set')}</p></div><span class="pill">Culture ${escapeHTML(c.culture||'—')}/5</span></div><div class="note-box"><p><strong style="color:var(--text)">Benefits:</strong> ${escapeHTML(c.benefits||'Not added')}</p><p>${nl2br(c.notes||'No research notes yet.')}</p></div><div class="card-actions"><button class="mini-btn" data-edit="${c.id}" data-type="company">Edit</button><button class="mini-btn" data-delete="${c.id}" data-type="company">Delete</button></div></div>`).join('');
    $('#companiesEmpty').classList.toggle('hidden', items.length>0);
  }

  function renderContacts() {
    let items=[...state.contacts];
    if(searchTerm) items=items.filter(c=>[c.name,c.role,c.company,c.notes,c.email].some(v=>String(v||'').toLowerCase().includes(searchTerm)));
    $('#contactsGrid').innerHTML=items.map(c=>`<div class="info-card"><div class="info-card-top"><div><h3>${escapeHTML(c.name)}</h3><p>${escapeHTML(c.role||'Contact')} ${c.company?'· '+escapeHTML(c.company):''}</p></div></div><div class="meta-grid"><div class="meta-box"><span>Last contact</span><strong>${c.lastContact?humanDate(c.lastContact):'—'}</strong></div><div class="meta-box"><span>Email</span><strong>${escapeHTML(c.email||'—')}</strong></div></div>${c.notes?`<div class="note-box"><p>${nl2br(c.notes)}</p></div>`:''}<div class="card-actions"><button class="mini-btn" data-edit="${c.id}" data-type="contact">Edit</button><button class="mini-btn" data-delete="${c.id}" data-type="contact">Delete</button></div></div>`).join('');
    $('#contactsEmpty').classList.toggle('hidden', items.length>0);
  }

  function renderOffers() {
    const items=[...state.offers].sort((a,b)=>Number(b.score||0)-Number(a.score||0));
    const bestId=items[0]?.id;
    $('#offersCompare').innerHTML=items.map(o=>{
      const a=getApp(o.applicationId); return `<div class="offer-card ${o.id===bestId&&items.length>1?'best':''}">${o.id===bestId&&items.length>1?'<div class="best-ribbon">BEST FIT</div>':''}<span class="eyebrow">${escapeHTML(a?.company||'OFFER')}</span><h3>${escapeHTML(a?.role||'Unknown role')}</h3><div class="offer-salary">${formatMoney(o.salary,o.currency)}</div><p class="section-help">${escapeHTML(o.workStyle||'')} ${o.bonus?'· '+escapeHTML(o.bonus):''}</p><div class="meta-grid"><div class="meta-box"><span>PTO</span><strong>${escapeHTML(o.pto||'—')}</strong></div><div class="meta-box"><span>Decision</span><strong>${o.deadline?humanDate(o.deadline):'—'}</strong></div></div><div class="offer-score"><div class="score-ring" style="--score:${Number(o.score||0)}"><strong>${Number(o.score||0)}/10</strong></div><div><strong style="font-size:10px">Overall fit</strong><p class="section-help">${escapeHTML(o.benefits||'Benefits not added')}</p></div></div><div class="card-actions"><button class="mini-btn" data-edit="${o.id}" data-type="offer">Edit</button><button class="mini-btn" data-delete="${o.id}" data-type="offer">Delete</button></div></div>`;
    }).join('');
    $('#offersEmpty').classList.toggle('hidden', items.length>0);
  }

  function renderAnalytics() {
    const apps=state.applications; const total=apps.length;
    const reachedInterview=apps.filter(a=>['Interview','Final Interview','Offer','Hired'].includes(a.status)).length;
    const reachedOffer=apps.filter(a=>['Offer','Hired'].includes(a.status)).length;
    const active=apps.filter(a=>!['Rejected','Withdrawn','Hired'].includes(a.status));
    const avg=active.length?Math.round(active.reduce((s,a)=>s+matchScore(a),0)/active.length):0;
    $('#metricApplications').textContent=total; $('#metricInterviewRate').textContent=total?`${Math.round(reachedInterview/total*100)}%`:'0%'; $('#metricOfferRate').textContent=total?`${Math.round(reachedOffer/total*100)}%`:'0%'; $('#metricMatch').textContent=`${avg}%`;
    const counts=STATUSES.map(s=>[s,apps.filter(a=>a.status===s).length]).filter(x=>x[1]>0); const max=Math.max(1,...counts.map(x=>x[1]));
    $('#analyticsStatus').innerHTML=counts.length?counts.map(([s,c])=>barRow(s,c,(c/max)*100)).join(''):emptyMini('No status data yet.');
    const sourceMap={}; apps.forEach(a=>sourceMap[a.source||'Other']=(sourceMap[a.source||'Other']||0)+1); const sources=Object.entries(sourceMap).sort((a,b)=>b[1]-a[1]); const maxS=Math.max(1,...sources.map(x=>x[1]));
    $('#analyticsSources').innerHTML=sources.length?sources.map(([s,c])=>barRow(s,c,(c/maxS)*100)).join(''):emptyMini('No source data yet.');
  }

  function renderSettings() {
    $('#activationStatusText').textContent = state.activated ? 'Full access is active on this browser. Demo limits are removed.' : `You are using the demo. ${Math.max(0,DEMO_LIMIT-state.demoOps)} of ${DEMO_LIMIT} changes remain.`;
    $('#activateBtnSettings').classList.toggle('hidden', state.activated);
    updateInstallUI();
  }

  function refreshApplicationSelects() {
    ['interviewApplicationSelect','followupApplicationSelect','offerApplicationSelect'].forEach(id=>{
      const el=$(`#${id}`); if(!el) return; const previous=el.value;
      el.innerHTML = (id==='followupApplicationSelect'?'<option value="">General / no application</option>':'<option value="">Select an application</option>') + state.applications.map(a=>`<option value="${a.id}">${escapeHTML(a.role)} — ${escapeHTML(a.company)}</option>`).join('');
      if([...el.options].some(o=>o.value===previous)) el.value=previous;
    });
  }

  function updateMatchPreview() {
    const form=$('#applicationForm'); const values=['scoreRole','scoreSalary','scoreRemote','scoreGrowth','scoreBenefits','scoreCompany'].map(n=>Number(form.elements[n].value||0));
    const pct=Math.round(values.reduce((a,b)=>a+b,0)/(values.length*5)*100); $('#matchPreview').textContent=`${pct}%`;
  }

  function matchScore(a) {
    const vals=['scoreRole','scoreSalary','scoreRemote','scoreGrowth','scoreBenefits','scoreCompany'].map(k=>Number(a[k]||0));
    const total=vals.reduce((x,y)=>x+y,0); return vals.length?Math.round(total/(vals.length*5)*100):0;
  }

  function matchBadge(score) {
    const cls=score>=80?'match-high':score>=60?'match-med':'match-low';
    return `<span class="match-badge ${cls}">${score}%</span>`;
  }

  function formObject(form) { return Object.fromEntries(new FormData(form).entries()); }
  function upsert(arr, record) { const i=arr.findIndex(x=>x.id===record.id); if(i>=0) arr[i]={...arr[i],...record}; else arr.unshift(record); }
  function uid(prefix='r') { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`; }
  function numOrBlank(v) { return v===''||v===null||v===undefined?'':Number(v); }
  function getApp(id) { return state.applications.find(a=>a.id===id); }

  function confirmDialog(title,text,action,button='Delete') {
    $('#confirmTitle').textContent=title; $('#confirmText').textContent=text; $('#confirmActionBtn').textContent=button; confirmAction=action; openModal('confirmModal');
  }

  function toggleTheme() {
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark'; applyTheme(next); localStorage.setItem(THEME_KEY,next);
  }
  function applyTheme(theme) { document.documentElement.dataset.theme=theme==='dark'?'dark':'light'; }

  function statusClass(value) { return String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }

  function humanDay(value) {
    if (!value) return '—';
    const [y,m,d]=String(value).split('-').map(Number); const dt=new Date(y,m-1,d);
    return String(dt.getDate()).padStart(2,'0');
  }

  function humanMonth(value) {
    if (!value) return '';
    const [y,m,d]=String(value).split('-').map(Number); const dt=new Date(y,m-1,d);
    return dt.toLocaleDateString(undefined,{month:'short'}).toUpperCase();
  }

  function setupInstallApp() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredInstallPrompt = event;
      updateInstallUI();
    });
    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      updateInstallUI();
      toast('JobTrack installed successfully', 'success');
    });
    updateInstallUI();
  }

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  function updateInstallUI() {
    const installed = isStandalone();
    const buttons = [$('#installAppBtn'), $('#installAppBtnSettings')].filter(Boolean);
    buttons.forEach(btn => {
      btn.disabled = installed;
      btn.textContent = installed ? '✓ App Installed' : '↧ Install App';
      btn.classList.toggle('installed', installed);
    });
    const hint = $('#installHint');
    if (!hint) return;
    if (installed) hint.textContent = 'JobTrack is installed and can run like a standalone app.';
    else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) hint.textContent = 'On iPhone/iPad: Safari → Share → Add to Home Screen.';
    else if (location.protocol === 'file:') hint.textContent = 'Install becomes available when the app is opened from HTTPS or localhost.';
    else hint.textContent = deferredInstallPrompt ? 'Ready to install on this device.' : 'If no prompt appears, use your browser menu → Install app / Add to Home Screen.';
  }

  async function installApp() {
    if (isStandalone()) { toast('JobTrack is already installed.', 'success'); return; }
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      updateInstallUI();
      if (choice.outcome === 'accepted') toast('Installation started', 'success');
      return;
    }
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      toast('Safari: tap Share → Add to Home Screen.', 'success');
      return;
    }
    if (location.protocol === 'file:') {
      toast('Install works after publishing on HTTPS (for example GitHub Pages) or localhost.', 'error');
      return;
    }
    toast('Use your browser menu and choose Install app / Add to Home Screen.', 'success');
  }

  function exportBackup() {
    const backup={ schemaVersion:2, exportedAt:new Date().toISOString(), data:{ applications:state.applications, interviews:state.interviews, followups:state.followups, companies:state.companies, contacts:state.contacts, offers:state.offers } };
    const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`jobtrack-backup-${isoToday}.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); toast('Backup exported','success');
  }

  function importBackup(e) {
    const file=e.target.files?.[0]; e.target.value=''; if(!file) return;
    if(!state.activated){ toast('Restore is available after full activation.','error'); openModal('activateModal'); return; }
    const reader=new FileReader(); reader.onload=()=>{
      try{
        const parsed=JSON.parse(reader.result); const data=parsed.data||parsed;
        if(!Array.isArray(data.applications)) throw new Error('Invalid backup');
        ['applications','interviews','followups','companies','contacts','offers'].forEach(k=>state[k]=Array.isArray(data[k])?data[k]:[]);
        persist(); renderAll(); toast('Backup restored','success');
      }catch(err){ toast('Could not restore this backup file.','error'); }
    }; reader.readAsText(file);
  }

  function toast(message,type='') {
    const el=document.createElement('div'); el.className=`toast ${type}`; el.textContent=message; $('#toastWrap').appendChild(el); setTimeout(()=>el.remove(),2800);
  }

  function humanDate(value) {
    if(!value) return '—'; const [y,m,d]=String(value).split('-').map(Number); const dt=new Date(y,m-1,d); if(Number.isNaN(dt.getTime())) return value;
    if(value===isoToday) return 'Today'; if(value===addDays(1)) return 'Tomorrow'; if(value===addDays(-1)) return 'Yesterday';
    return dt.toLocaleDateString(undefined,{month:'short',day:'numeric',year:dt.getFullYear()!==now.getFullYear()?'numeric':undefined});
  }

  function toISODate(d) { const local=new Date(d.getTime()-d.getTimezoneOffset()*60000); return local.toISOString().slice(0,10); }
  function formatMoney(value,currency='EUR') { if(value===''||value===null||value===undefined) return 'Salary not set'; try{return new Intl.NumberFormat(undefined,{style:'currency',currency:currency||'EUR',maximumFractionDigits:0}).format(Number(value));}catch{return `${value} ${currency}`;} }
  function emptyMini(text){ return `<div class="empty-state" style="padding:18px 8px">${escapeHTML(text)}</div>`; }
  function barRow(label,count,width){ return `<div class="bar-item"><span>${escapeHTML(label)}</span><div class="bar-track"><span style="width:${Math.max(4,width)}%"></span></div><strong>${count}</strong></div>`; }
  function escapeHTML(value){ return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function nl2br(value){ return escapeHTML(value).replace(/\n/g,'<br>'); }
  async function sha256(text){ const bytes=new TextEncoder().encode(text); const hash=await crypto.subtle.digest('SHA-256',bytes); return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join(''); }

  function registerServiceWorker(){ if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{})); } }

  if (typeof globalThis !== 'undefined') {
    globalThis.__JobTrackQA = {
      DEMO_LIMIT, ACTIVATION_HASH, STATUSES, PIPELINE_STATUSES, sampleState, migrateState, matchScore, upsert, numOrBlank, statusClass
    };
  }
})();
