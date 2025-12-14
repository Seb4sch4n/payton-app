const { useState, useEffect, useRef } = React;

// --- 1. CONFIGURATION ---
const SUPABASE_URL = "https://hlrnriiifbptpdebugup.supabase.co"; 
// ⚠️ IMPORTANT: PASTE YOUR SUPABASE KEY BELOW (Inside the quotes)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhscm5yaWlpZmJwdHBkZWJ1Z3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzYwNTQsImV4cCI6MjA3OTI1MjA1NH0.vFwcvQC6VRZjAARAPo5yNDJX45L-Y6ixBbs0LQsNs4A"; 

// --- TRANSLATIONS DICTIONARY ---
const TRANSLATIONS = {
    es: {
        app_title: "Payton",
        app_subtitle: "Suscripciones descentralizadas en TON.",
        connect_wallet: "Conectar Wallet",
        go_dashboard: "Ir al Dashboard",
        explore_creators: "Explorar Creadores",
        my_panel: "Mi Panel",
        welcome_user: "¡Bienvenido {name}!",
        subscriber_account: "Cuenta de Suscriptor",
        search_creators_btn: "Buscar creadores",
        become_creator_tooltip: "Convertirme en Creador",
        balance_total: "Balance Total",
        withdraw: "Retirar",
        sub_price: "Precio Suscripción",
        status: "Estado",
        active: "Activo",
        logout: "Cerrar Sesión",
        withdraw_funds: "Retirar Fondos",
        available_withdraw: "Disponible para retiro",
        amount_withdraw: "CANTIDAD A RETIRAR",
        withdraw_info: "ℹ️ Los fondos serán enviados a tu billetera conectada:",
        cancel: "Cancelar",
        confirm_withdraw: "Confirmar Retiro",
        stats: "Estadísticas",
        growth_weekly: "Crecimiento Semanal",
        new_subs: "Nuevos Subs",
        withdrawals: "Retiros",
        channel_detail: "Detalle del Canal",
        about_channel: "Acerca del canal",
        monthly_price: "Precio Mensual",
        subscribe_now: "Suscribirse Ahora",
        explore_title: "Explorar",
        search_placeholder: "Buscar canal...",
        no_results: "No se encontraron resultados.",
        view_btn: "Ver",
        new_channel: "Nuevo Canal",
        channel_name_label: "NOMBRE DEL CANAL",
        channel_name_placeholder: "Ej: Crypto News VIP",
        price_label: "PRECIO (TON)",
        desc_label: "DESCRIPCIÓN",
        desc_placeholder: "¿Qué ofreces a tus suscriptores?",
        register_publish: "Registrar y Publicar",
        error_title: "Error",
        missing_key_title: "Access Key Missing",
        missing_key_desc: "Paste your ANON_KEY in app.js to continue.",
        alert_withdraw_success: "¡Retiro exitoso! Se han enviado {amount} TON a tu billetera.",
        alert_withdraw_confirm: "¿Estás seguro que deseas retirar {amount} TON a tu billetera vinculada?",
        error_invalid_amount: "Por favor ingresa un monto válido mayor a 0.",
        error_insufficient_funds: "Saldo insuficiente para realizar este retiro.",
        simulated_payment: "Iniciando pago de {amount} TON...",
        sub_active: "Suscriptores Activos"
    },
    en: {
        app_title: "Payton",
        app_subtitle: "Decentralized subscriptions on TON.",
        connect_wallet: "Connect Wallet",
        go_dashboard: "Go to Dashboard",
        explore_creators: "Explore Creators",
        my_panel: "My Dashboard",
        welcome_user: "Welcome {name}!",
        subscriber_account: "Subscriber Account",
        search_creators_btn: "Find Creators",
        become_creator_tooltip: "Become a Creator",
        balance_total: "Total Balance",
        withdraw: "Withdraw",
        sub_price: "Subscription Price",
        status: "Status",
        active: "Active",
        logout: "Log Out",
        withdraw_funds: "Withdraw Funds",
        available_withdraw: "Available for withdrawal",
        amount_withdraw: "AMOUNT TO WITHDRAW",
        withdraw_info: "ℹ️ Funds will be sent to your connected wallet:",
        cancel: "Cancel",
        confirm_withdraw: "Confirm Withdrawal",
        stats: "Statistics",
        growth_weekly: "Weekly Growth",
        new_subs: "New Subs",
        withdrawals: "Withdrawals",
        channel_detail: "Channel Details",
        about_channel: "About the channel",
        monthly_price: "Monthly Price",
        subscribe_now: "Subscribe Now",
        explore_title: "Explore",
        search_placeholder: "Search channel...",
        no_results: "No results found.",
        view_btn: "View",
        new_channel: "New Channel",
        channel_name_label: "CHANNEL NAME",
        channel_name_placeholder: "Ex: Crypto News VIP",
        price_label: "PRICE (TON)",
        desc_label: "DESCRIPTION",
        desc_placeholder: "What do you offer your subscribers?",
        register_publish: "Register & Publish",
        error_title: "Error",
        missing_key_title: "Access Key Missing",
        missing_key_desc: "Paste your ANON_KEY in app.js to continue.",
        alert_withdraw_success: "Withdrawal successful! {amount} TON sent to your wallet.",
        alert_withdraw_confirm: "Are you sure you want to withdraw {amount} TON to your linked wallet?",
        error_invalid_amount: "Please enter a valid amount greater than 0.",
        error_insufficient_funds: "Insufficient funds for this withdrawal.",
        simulated_payment: "Starting payment of {amount} TON...",
        sub_active: "Active Subscribers"
    },
    ru: {
        app_title: "Payton",
        app_subtitle: "Децентрализованные подписки на TON.",
        connect_wallet: "Подключить кошелек",
        go_dashboard: "Перейти в панель",
        explore_creators: "Обзор авторов",
        my_panel: "Моя панель",
        welcome_user: "Добро пожаловать, {name}!",
        subscriber_account: "Аккаунт подписчика",
        search_creators_btn: "Найти авторов",
        become_creator_tooltip: "Стать автором",
        balance_total: "Общий баланс",
        withdraw: "Вывести",
        sub_price: "Цена подписки",
        status: "Статус",
        active: "Активен",
        logout: "Выйти",
        withdraw_funds: "Вывод средств",
        available_withdraw: "Доступно для вывода",
        amount_withdraw: "СУММА ВЫВОДА",
        withdraw_info: "ℹ️ Средства будут отправлены на подключенный кошелек:",
        cancel: "Отмена",
        confirm_withdraw: "Подтвердить",
        stats: "Статистика",
        growth_weekly: "Рост за неделю",
        new_subs: "Новые",
        withdrawals: "Выводы",
        channel_detail: "Детали канала",
        about_channel: "О канале",
        monthly_price: "Цена в месяц",
        subscribe_now: "Подписаться",
        explore_title: "Обзор",
        search_placeholder: "Поиск канала...",
        no_results: "Результатов не найдено.",
        view_btn: "См",
        new_channel: "Новый канал",
        channel_name_label: "НАЗВАНИЕ КАНАЛА",
        channel_name_placeholder: "Прим: Crypto News VIP",
        price_label: "ЦЕНА (TON)",
        desc_label: "ОПИСАНИЕ",
        desc_placeholder: "Что вы предлагаете подписчикам?",
        register_publish: "Создать и опубликовать",
        error_title: "Ошибка",
        missing_key_title: "Отсутствует ключ доступа",
        missing_key_desc: "Вставьте ваш ANON_KEY в app.js для продолжения.",
        alert_withdraw_success: "Вывод успешен! {amount} TON отправлены на кошелек.",
        alert_withdraw_confirm: "Вы уверены, что хотите вывести {amount} TON на привязанный кошелек?",
        error_invalid_amount: "Пожалуйста, введите корректную сумму больше 0.",
        error_insufficient_funds: "Недостаточно средств для вывода.",
        simulated_payment: "Инициирован платеж {amount} TON...",
        sub_active: "Активные подписчики"
    }
};

// --- SUPABASE CLIENT MANAGEMENT ---
let supabaseInstance = null;

const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;
    if (!window.supabase) return null;
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
            supabaseInstance = window.supabase.createClient(SUPABASE_URL.trim(), SUPABASE_ANON_KEY.trim());
            return supabaseInstance;
        } catch (e) {
            console.error("Error creating client:", e);
            return null;
        }
    }
    return null;
};

// --- UI COMPONENTS ---

const Icon = ({ name, size = 20, color = "currentColor" }) => {
    const [svg, setSvg] = useState(null);
    useEffect(() => {
        if (window.lucide && window.lucide.icons[name]) {
            setSvg(window.lucide.icons[name].toSvg({ width: size, height: size, stroke: color, "stroke-width": 2, class: "inline-block" }));
        }
    }, [name, size, color]);
    return svg ? <span dangerouslySetInnerHTML={{ __html: svg }} /> : <span className="w-5 h-5 inline-block bg-slate-700/50 rounded animate-pulse" />;
};

const AppLogo = ({ className = "h-8 w-auto" }) => (
    <img 
        src="Payton.png" 
        alt="Payton Logo" 
        className={`object-contain ${className}`}
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} 
    />
);
const LogoFallback = () => (<span className="hidden text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">PAYTON</span>);

// Language Selector (Dropdown)
const LanguageSelector = ({ currentLang, setLang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const languages = [{ code: 'es', label: 'ES 🇪🇸' }, { code: 'en', label: 'EN 🇺🇸' }, { code: 'ru', label: 'RU 🇷🇺' }];
    const currentLabel = languages.find(l => l.code === currentLang)?.label.split(' ')[0] || 'EN';

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 bg-slate-800/80 hover:bg-slate-700 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700/50 transition-all active:scale-95"
            >
                <Icon name="Globe" size={14} /> 
                <span className="mx-1">{currentLabel}</span>
                <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={12} />
            </button>

            {isOpen && (
                <>
                    <div className="absolute right-0 top-full mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                        {languages.map(l => (
                            <button 
                                key={l.code}
                                onClick={() => { setLang(l.code); setIsOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors hover:bg-slate-700 flex items-center justify-between ${currentLang === l.code ? 'text-sky-400 bg-slate-700/30' : 'text-slate-300'}`}
                            >
                                {l.label}
                                {currentLang === l.code && <Icon name="Check" size={12} />}
                            </button>
                        ))}
                    </div>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                </>
            )}
        </div>
    );
};

const Header = ({ title, onBack, rightAction, showLangSelector, currentLang, setLang }) => (
    <header className="relative flex items-center justify-between py-4 mb-6 border-b border-slate-700/50 mx-[-16px] px-4 bg-slate-900/50 h-16 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3 flex-1 min-w-0">
            {onBack && (
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white flex-shrink-0">
                    <Icon name="ArrowLeft" size={24} />
                </button>
            )}
            <div className="flex items-center gap-2">
                <AppLogo className="h-6 w-auto" />
                <LogoFallback />
                {!onBack && <h1 className="text-lg font-bold tracking-tight text-white truncate hidden sm:block">Payton</h1>}
            </div>
            {onBack && <h1 className="text-lg font-bold tracking-tight text-white truncate ml-2">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
            {showLangSelector && <LanguageSelector currentLang={currentLang} setLang={setLang} />}
            {rightAction}
        </div>
    </header>
);

const Button = ({ onClick, children, loading, variant = "primary", disabled }) => {
    const baseClass = "w-full font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    const variants = {
        primary: "bg-sky-500 hover:bg-sky-400 text-slate-900 shadow-lg shadow-sky-500/20",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600",
        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
        success: "bg-green-500 hover:bg-green-400 text-slate-900 shadow-lg shadow-green-500/20"
    };
    return (
        <button 
            onClick={onClick} 
            disabled={disabled || loading} 
            className={`${baseClass} ${variants[variant] || variants.primary}`}
        >
            {loading && <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>}
            {children}
        </button>
    );
};

const StatsChart = ({ langLabel }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();
            const ctx = chartRef.current.getContext('2d');
            const labels = ['1', '2', '3', '4', '5', '6', '7'];
            const data = [10, 15, 8, 12, 20, 25, 35];

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: langLabel,
                        data: data,
                        borderColor: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#38bdf8'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#334155', borderDash: [5, 5] }, beginAtZero: true },
                        x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { display: false } }
                    }
                }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, [langLabel]); 

    return <div className="h-64 w-full"><canvas ref={chartRef}></canvas></div>;
};

// --- MAIN APP COMPONENT ---
const App = () => {
    const [view, setView] = useState('main');
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [creators, setCreators] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [telegramName, setTelegramName] = useState('User');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCreator, setActiveCreator] = useState(null);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [lang, setLang] = useState('en'); // Default to English

    const t = (key) => TRANSLATIONS[lang][key] || key;
    const tArgs = (key, args) => {
        let text = TRANSLATIONS[lang][key] || key;
        for (const arg in args) text = text.replace(`{${arg}}`, args[arg]);
        return text;
    };

    if (!SUPABASE_ANON_KEY) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center bg-slate-950">
                <div className="glass-panel p-8 rounded-2xl border-yellow-500/30 bg-yellow-900/10 max-w-sm w-full">
                    <div className="flex justify-center mb-4 text-yellow-400"><Icon name="Key" size={48} /></div>
                    <h2 className="text-xl font-bold text-yellow-400 mb-2">{t('missing_key_title')}</h2>
                    <p className="text-slate-300 text-sm mb-6">{t('missing_key_desc')}</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const client = getSupabase();
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user && user.first_name) setTelegramName(user.first_name);
            
            if (user && user.language_code) {
                if (user.language_code.startsWith('ru')) setLang('ru');
                else if (user.language_code.startsWith('es')) setLang('es');
                // Otherwise keep 'en' as default
            }
        }

        if (!client) return;

        client.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchProfile(session.user.id);
        });
        
        const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchProfile(session.user.id);
            else setProfile(null);
        });
        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId) => {
        const client = getSupabase();
        if (!client) return;
        const { data } = await client.from('profiles').select('*').eq('id', userId).single();
        if (data) setProfile(data);
    };

    const handleConnectWallet = async () => {
        setLoading(true); setErrorMsg(null);
        try {
            const client = getSupabase();
            if (!client) throw new Error("Supabase error");

            let storedCreds = JSON.parse(localStorage.getItem('ton_dapp_creds'));
            if (!storedCreds) {
                const randomId = 'u' + Math.random().toString(36).substring(2, 10);
                storedCreds = {
                    email: `user_${randomId}@gmail.com`, 
                    password: `pass_${Math.random().toString(36)}`
                };
                localStorage.setItem('ton_dapp_creds', JSON.stringify(storedCreds));
            }

            let user = null;
            const { data: signUpData, error: signUpError } = await client.auth.signUp({
                email: storedCreds.email,
                password: storedCreds.password
            });

            if (signUpError) {
                if (signUpError.message && signUpError.message.toLowerCase().includes('registered')) {
                        const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
                        email: storedCreds.email,
                        password: storedCreds.password
                    });
                    if (signInError) throw signInError;
                    user = signInData.user;
                } else {
                    const randomId = 'u' + Math.random().toString(36).substring(2, 10);
                    const newCreds = { email: `user_${randomId}@gmail.com`, password: `pass_${Math.random().toString(36)}` };
                    const { data: retryData, error: retryError } = await client.auth.signUp(newCreds);
                    if (retryError) throw retryError;
                    localStorage.setItem('ton_dapp_creds', JSON.stringify(newCreds));
                    user = retryData.user;
                }
            } else {
                user = signUpData.user;
                if (user && !signUpData.session) throw new Error("Disable 'Confirm Email' in Supabase.");
            }

            if (!user) throw new Error("Auth failed.");
            
            const mockWallet = 'EQ' + user.id.replace(/-/g, '').substring(0, 8).toUpperCase();
            await client.from('profiles').upsert({
                id: user.id,
                wallet_address: mockWallet,
                updated_at: new Date()
            }, { onConflict: 'id' });

            await fetchProfile(user.id);
            setView('dashboard');

        } catch (e) {
            console.error(e);
            setErrorMsg(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault(); setLoading(true);
        const fd = new FormData(e.target);
        const client = getSupabase();
        try {
            const { error } = await client.from('profiles').update({
                is_creator: true,
                display_name: fd.get('name'),
                description: fd.get('desc'),
                subscription_price: parseFloat(fd.get('price')),
            }).eq('id', session.user.id);
            if (error) throw error;
            await fetchProfile(session.user.id);
            setView('dashboard');
        } catch(e) { setErrorMsg(e.message); }
        setLoading(false);
    };

    const handleWithdrawal = async () => {
        const amount = parseFloat(withdrawAmount);
        if (!amount || amount <= 0) return setErrorMsg(t('error_invalid_amount'));
        if (amount > profile.balance) return setErrorMsg(t('error_insufficient_funds'));
        
        if (!window.confirm(tArgs('alert_withdraw_confirm', {amount}))) return;

        setLoading(true);
        const client = getSupabase();
        try {
            const newBalance = profile.balance - amount;
            const { error } = await client.from('profiles').update({ balance: newBalance }).eq('id', session.user.id);
            if (error) throw error;
            alert(tArgs('alert_withdraw_success', {amount}));
            await fetchProfile(session.user.id);
            setWithdrawAmount('');
            setView('dashboard');
        } catch (e) {
            console.error(e);
            setErrorMsg("Error: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCreators = async () => {
        setLoading(true);
        const client = getSupabase();
        if (client) {
            const { data } = await client.from('profiles').select('*').eq('is_creator', true);
            setCreators(data || []);
        }
        setLoading(false);
    };

    const renderView = () => {
        switch(view) {
            case 'main':
                return (
                    <div className="flex flex-col items-center justify-center py-10 space-y-8 animate-fade-in">
                        <div className="relative flex flex-col items-center">
                            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
                            <AppLogo className="w-32 h-auto relative z-10 drop-shadow-2xl" />
                            <LogoFallback />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-slate-400 max-w-xs mx-auto text-lg">{t('app_subtitle')}</p>
                        </div>
                        <div className="w-full space-y-3 px-4">
                            <div className="flex justify-center mb-4"><LanguageSelector currentLang={lang} setLang={setLang} /></div>
                            {session ? (
                                <Button onClick={() => setView('dashboard')}>{t('go_dashboard')}</Button>
                            ) : (
                                <Button onClick={handleConnectWallet} loading={loading}>
                                    <Icon name="Wallet" size={18} /> {t('connect_wallet')}
                                </Button>
                            )}
                            <Button onClick={() => { fetchCreators(); setView('explore'); }} variant="secondary">
                                {t('explore_creators')}
                            </Button>
                        </div>
                    </div>
                );

            case 'dashboard':
                if (!profile) return <div className="p-10 text-center"><span className="animate-spin h-8 w-8 border-2 border-sky-500 rounded-full inline-block"></span></div>;
                return (
                    <div className="animate-fade-in">
                        <Header 
                            title={t('my_panel')} 
                            onBack={() => setView('main')} 
                            showLangSelector={true}
                            currentLang={lang}
                            setLang={setLang}
                            rightAction={!profile.is_creator && (
                                <button onClick={() => setView('register')} className="w-10 h-10 bg-sky-500 hover:bg-sky-400 text-slate-900 rounded-md font-bold text-xl flex items-center justify-center shadow-lg active:scale-95 transition-all" title={t('become_creator_tooltip')}>C</button>
                            )}
                        />
                        <div className="space-y-6">
                            <div className="text-center animate-fade-in">
                                <h2 className="text-2xl font-bold text-white">{tArgs('welcome_user', {name: telegramName})}</h2>
                            </div>

                            {!profile.is_creator ? (
                                <div className="glass-panel p-6 rounded-2xl text-center space-y-4">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                                        <Icon name="User" size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{t('subscriber_account')}</h3>
                                        <p className="text-slate-400 text-sm font-mono mt-1">{profile.wallet_address}</p>
                                    </div>
                                    <Button onClick={() => { fetchCreators(); setView('explore'); }} variant="secondary">{t('search_creators_btn')}</Button>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10"><Icon name="Coins" size={100} /></div>
                                        <p className="text-sky-100 text-xs font-bold uppercase tracking-wider mb-1">{t('balance_total')}</p>
                                        <h3 className="text-4xl font-bold mb-4">{profile.balance || 0} TON</h3>
                                        <div className="flex gap-2">
                                            <button onClick={() => setView('withdraw')} className="flex-1 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg text-sm font-bold transition-colors">{t('withdraw')}</button>
                                            <button onClick={() => setView('stats')} className="bg-black/20 hover:bg-black/30 py-2 px-4 rounded-lg transition-colors"><Icon name="BarChart3" size={20} /></button>
                                        </div>
                                    </div>
                                    <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-xs">{t('sub_price')}</p>
                                            <p className="text-xl font-bold">{profile.subscription_price} TON</p>
                                        </div>
                                        <div className="h-8 w-px bg-slate-700"></div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-xs">{t('status')}</p>
                                            <p className="text-green-400 font-bold text-sm flex items-center gap-1 justify-end"><Icon name="Activity" size={14} /> {t('active')}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            <Button onClick={() => getSupabase().auth.signOut().then(() => setView('main'))} variant="danger">{t('logout')}</Button>
                        </div>
                    </div>
                );

            case 'withdraw':
                return (
                    <div className="animate-fade-in">
                        <Header title={t('withdraw_funds')} onBack={() => { setErrorMsg(null); setView('dashboard'); }} />
                        <div className="space-y-6">
                            <div className="glass-panel p-6 rounded-2xl text-center">
                                <p className="text-slate-400 text-sm uppercase mb-1">{t('available_withdraw')}</p>
                                <h2 className="text-4xl font-bold text-white">{profile.balance || 0} TON</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 ml-1 mb-1 block">{t('amount_withdraw')}</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            placeholder="0.0" 
                                            className="w-full input-base rounded-xl p-4 text-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all pr-16" 
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">TON</span>
                                    </div>
                                </div>
                                
                                <div className="text-xs text-slate-400 p-3 bg-slate-800/50 rounded-lg">
                                    <p>{t('withdraw_info')}</p>
                                    <p className="font-mono text-sky-400 mt-1 break-all">{profile.wallet_address}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <Button onClick={() => { setErrorMsg(null); setView('dashboard'); }} variant="secondary">{t('cancel')}</Button>
                                    <Button onClick={handleWithdrawal} loading={loading} variant="success">{t('confirm_withdraw')}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'stats':
                return (
                    <div className="animate-fade-in">
                        <Header title={t('stats')} onBack={() => setView('dashboard')} />
                        <div className="glass-panel p-4 rounded-2xl mb-4">
                            <h3 className="text-sm text-slate-400 mb-4 font-bold uppercase">{t('growth_weekly')}</h3>
                            <StatsChart langLabel={t('sub_active')} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-panel p-4 rounded-xl">
                                <p className="text-xs text-slate-400">{t('new_subs')}</p>
                                <p className="text-2xl font-bold text-green-400">+12</p>
                            </div>
                            <div className="glass-panel p-4 rounded-xl">
                                <p className="text-xs text-slate-400">{t('withdrawals')}</p>
                                <p className="text-2xl font-bold text-red-400">-50 TON</p>
                            </div>
                        </div>
                    </div>
                );

            case 'creator_detail':
                if (!activeCreator) return null;
                return (
                    <div className="animate-fade-in pb-20">
                        <Header title={t('channel_detail')} onBack={() => setView('explore')} />
                        <div className="text-center space-y-6 px-4">
                            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl ring-4 ring-slate-800">
                                {activeCreator.display_name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{activeCreator.display_name}</h2>
                                <p className="text-sky-400 font-mono text-sm mt-1">
                                    {activeCreator.wallet_address?.substring(0,6)}...{activeCreator.wallet_address?.slice(-4)}
                                </p>
                            </div>
                            <div className="glass-panel p-6 rounded-2xl text-left">
                                <h3 className="text-sm font-bold text-slate-400 uppercase mb-2">{t('about_channel')}</h3>
                                <p className="text-slate-200 leading-relaxed">{activeCreator.description || 'Sin descripción disponible.'}</p>
                            </div>
                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur border-t border-slate-800">
                                <div className="max-w-md mx-auto flex items-center gap-4">
                                    <div className="text-left">
                                        <p className="text-xs text-slate-400">{t('monthly_price')}</p>
                                        <p className="text-xl font-bold text-white">{activeCreator.subscription_price} TON</p>
                                    </div>
                                    <Button onClick={() => alert(tArgs('simulated_payment', {amount: activeCreator.subscription_price}))}>{t('subscribe_now')}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'explore':
                const filteredCreators = creators.filter(c => 
                    c.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
                );

                return (
                    <div className="animate-fade-in">
                        <Header 
                            title={t('explore_title')} 
                            onBack={() => setView(session ? 'dashboard' : 'main')} 
                        />
                        
                        <div className="relative mb-6">
                            <span className="absolute left-4 top-3 text-slate-400"><Icon name="Search" size={20} /></span>
                            <input 
                                type="text" 
                                placeholder={t('search_placeholder')} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full input-base rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 placeholder-slate-500"
                            />
                        </div>

                        {loading ? (
                            <div className="text-center py-10"><span className="animate-spin h-8 w-8 border-2 border-sky-500 rounded-full inline-block"></span></div>
                        ) : (
                            <div className="space-y-3">
                                {filteredCreators.length === 0 ? (
                                    <div className="text-center py-10 text-slate-500">
                                        <Icon name="Ghost" size={40} className="mx-auto mb-2 opacity-50" />
                                        <p>{t('no_results')}</p>
                                    </div>
                                ) : filteredCreators.map(c => (
                                    <div key={c.id} className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg">
                                            {c.display_name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h3 className="font-bold text-white truncate">{c.display_name}</h3>
                                            <p className="text-xs text-slate-400 truncate">{c.description || 'Sin descripción'}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className="block text-sky-400 font-bold">{c.subscription_price} TON</span>
                                            <button 
                                                onClick={() => { setActiveCreator(c); setView('creator_detail'); }}
                                                className="text-xs bg-sky-500/10 text-sky-400 px-3 py-1.5 rounded-full mt-1 hover:bg-sky-500/20 transition-colors font-medium"
                                            >
                                                {t('view_btn')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'register':
                return (
                    <div className="animate-fade-in">
                        <Header title={t('new_channel')} onBack={() => setView('dashboard')} />
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1 mb-1 block">{t('channel_name_label')}</label>
                                <input name="name" placeholder={t('channel_name_placeholder')} required className="w-full input-base rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1 mb-1 block">{t('price_label')}</label>
                                <input name="price" type="number" step="0.1" placeholder="5.0" required className="w-full input-base rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 ml-1 mb-1 block">{t('desc_label')}</label>
                                <textarea name="desc" placeholder={t('desc_placeholder')} className="w-full input-base rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all" rows="3"></textarea>
                            </div>
                            <div className="pt-4">
                                <Button loading={loading}>{t('register_publish')}</Button>
                            </div>
                        </form>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen max-w-md mx-auto bg-slate-900 pb-safe shadow-2xl overflow-hidden relative font-sans">
            {errorMsg && (
                <div className="absolute top-4 left-4 right-4 z-50 animate-fade-in">
                    <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 p-4 rounded-xl flex items-start gap-3 text-red-200 shadow-xl">
                        <Icon name="AlertCircle" className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-grow text-sm"><p className="font-bold text-red-400">{t('error_title')}</p><p>{errorMsg}</p></div>
                        <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white"><Icon name="X" size={16} /></button>
                    </div>
                </div>
            )}
            <div className="p-4">{renderView()}</div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
    </script>
</body>
</html>