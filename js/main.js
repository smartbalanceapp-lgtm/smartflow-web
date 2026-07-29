/* ==========================================================================
   SmartFlow — main.js
   Tema claro/oscuro + selector de idioma (detecta navegador, permite
   override manual, persiste en localStorage). Sin dependencias.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_THEME = 'sf_theme';
  var STORAGE_LANG = 'sf_lang';
  var SUPPORTED_LANGS = ['es', 'ca', 'en'];
  var DEFAULT_LANG = 'es';

  /* ---------------------------------------------------------------------
     Tema claro / oscuro
     --------------------------------------------------------------------- */
  function getPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_THEME);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function initTheme() {
    applyTheme(getPreferredTheme());

    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_THEME, next);
        applyTheme(next);
      });
    }

    // Si el usuario no ha fijado preferencia manual, sigue al sistema en vivo
    if (!localStorage.getItem(STORAGE_THEME) && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  /* ---------------------------------------------------------------------
     Idioma
     --------------------------------------------------------------------- */
  var translations = {
    es: {
      'nav.contact': 'Contacto',
      'nav.features': 'Funciones',
      'nav.why': 'Por qué',
      'nav.screens': 'Capturas',
      'nav.premium': 'Premium',
      'nav.how': 'Cómo funciona',
      'theme.toggle': 'Cambiar tema',
      'lang.toggle': 'Cambiar idioma',
      'hero.eyebrow': 'Finanzas personales · 100% local',
      'hero.title': 'El dinero fluye, tú lo controlas',
      'hero.sub': 'SmartFlow no te pide las claves de tu banco, tus tarjetas ni tu bróker de inversión. Tú decides qué apuntas, y tus datos se quedan en tu móvil. Sin anuncios, sin venta de datos.',
      'hero.cta': 'Próximamente en Google Play',
      'hero.note': 'Android · En prueba cerrada ahora mismo — el lanzamiento público llega pronto.',

      'features.eyebrow': 'Todo lo que hace SmartFlow',
      'features.title': 'Una app, todo tu dinero',
      'features.sub': 'Movimientos, presupuesto, cuentas, inversión, inmuebles y patrimonio — sin cambiar de app.',
      'feature.dashboard.title': 'Dashboard claro',
      'feature.dashboard.desc': 'Resumen del mes, gráfica de tendencia y comparativa por categoría de un vistazo.',
      'feature.rule.title': 'Regla 50/30/20',
      'feature.rule.desc': 'Presupuesto configurable con avisos automáticos al 80%, 100% y 120%.',
      'feature.accounts.title': 'Multicuentas',
      'feature.accounts.desc': 'Saldo calculado en vivo a partir de tus movimientos reales, nunca un número que se desincroniza.',
      'feature.voice.title': 'Voz avanzada',
      'feature.voice.desc': '"El 3 de agosto gasté 20 euros en el súper, sácalo de mi cuenta BBVA" — y la app rellena fecha, importe, categoría y cuenta sola. En los 3 idiomas.',
      'feature.investing.title': 'Inversión completa',
      'feature.investing.desc': 'Fondos indexados, acciones, cripto, pensiones y renta fija: ventas parciales, dividendos, precio medio y ganancia real.',
      'feature.property.title': 'Inmuebles, tratados como se merecen',
      'feature.property.desc': 'La mayoría de apps de finanzas meten "vivienda" como una categoría de gasto más. SmartFlow lleva cada inmueble como una ficha completa:',
      'feature.property.li1': 'Gastos por categoría en cada inmueble: IBI, comunidad, seguro, mantenimiento...',
      'feature.property.li2': 'Categorías recurrentes que se proponen solas cada mes — tú solo confirmas.',
      'feature.property.li3': 'Hipoteca con tabla de amortización real (interés y capital mes a mes), no una estimación genérica.',
      'feature.property.li4': 'Calibración contra el recibo real del banco cuando los números no cuadran exactos.',
      'feature.property.li5': 'Todo conectado a tu patrimonio neto en tiempo real, sin recalcular nada a mano.',
      'feature.networth.title': 'Patrimonio neto que se actualiza solo',
      'feature.networth.desc': 'Cuentas, inversión, inmuebles y deudas, todo sumado en vivo — sin recalcular nada a mano.',
      'feature.goals.title': 'Objetivos y ahorro',
      'feature.goals.desc': 'Metas de ahorro y fondo de emergencia, con seguimiento visual del progreso.',
      'feature.security.title': 'Seguridad de verdad',
      'feature.security.desc': 'Bloqueo por PIN o biometría, base de datos cifrada en tu móvil, copia de seguridad en JSON.',
      'feature.widget.title': 'Widget de inicio',
      'feature.widget.desc': 'Registra un gasto o un ingreso por voz sin ni siquiera abrir la app.',

      'how.eyebrow': 'Sin conectar tu banco',
      'how.title': 'Automático de verdad, sin darle tus claves a nadie',
      'how.sub': 'No conectar tu banco no significa apuntarlo todo a mano. SmartFlow hace la parte pesada por ti.',
      'how.step1.title': 'Añade en segundos',
      'how.step1.desc': 'Por voz, en los 3 idiomas: "Gasté 20 euros en el súper con la BBVA" — y la app rellena fecha, importe, categoría y cuenta sola.',
      'how.step2.title': 'Se repite solo',
      'how.step2.desc': 'Nómina, alquiler, hipoteca, aportaciones a fondos... lo recurrente se propone cada mes en ingresos, ahorro, gastos e inversión. Tú solo confirmas.',
      'how.step3.title': 'Todo se calcula',
      'how.step3.desc': 'Presupuesto, patrimonio y rentabilidad se actualizan en el momento — sin hojas de cálculo ni recalcular nada a mano.',

      'why.eyebrow': 'Por qué SmartFlow',
      'why.title': 'Tus datos, tus decisiones',
      'why.nobank.title': 'Sin conectar tu banco',
      'why.nobank.desc': 'SmartFlow nunca te pide las claves de tu banco, el número de tu tarjeta ni acceso a tu bróker de inversión. Apuntas tú lo que quieras, cuando quieras.',
      'why.local.title': '100% local',
      'why.local.desc': 'Lo que apuntas se guarda en el almacenamiento de tu propio móvil. No hay servidor donde vivan tus datos financieros — ni los vemos, ni los podemos vender aunque quisiéramos.',
      'why.noads.title': 'Sin anuncios, sin venta de datos',
      'why.noads.desc': 'No hay publicidad ni terceros analizando tus finanzas. El modelo de negocio es una app que pagas por usar, no una que te vende a ti.',
      'why.trilingual.title': 'Trilingüe de verdad',
      'why.trilingual.desc': 'Español, catalán e inglés revisados frase a frase — casi mil claves de texto, no traducción automática.',
      'why.free.title': 'Gratis en el lanzamiento',
      'why.free.desc': 'Todo lo de arriba, sin coste. El Pack Premium llegará más adelante como algo extra, no como un candado a lo que ya tienes.',

      'screens.eyebrow': 'Así se ve por dentro',
      'screens.title': 'Diseñada para mirarla cada día',
      'screens.dashboard': 'Dashboard',
      'screens.expenses': 'Gastos por categoría',
      'screens.comparison': 'Comparativa mensual',
      'screens.networth': 'Patrimonio neto',
      'screens.investing': 'Fondos y acciones',
      'screens.property': 'Inmuebles',
      'screens.savings': 'Ahorro',
      'screens.profile': 'Perfil',

      'premium.badge': 'Próximamente',
      'premium.title': 'Un Pack Premium está en camino',
      'premium.desc': 'Un asistente con IA que conoce tus números para ayudarte a decidir mejor, además de otras funciones para ahorrarte trabajo. Todavía sin fecha — y la versión gratuita seguirá siendo gratis.',

      'footer.tagline': 'Parte de la saga SmartBalance',
      'footer.privacy': 'Privacidad',

      'legal.back': '← Volver a SmartFlow',
      'legal.title': 'Política de privacidad',
      'legal.updated': 'Última actualización: 29 de julio de 2026',
      'legal.intro.title': '1. Resumen',
      'legal.intro.body': 'SmartFlow es una app de finanzas personales <strong>local-first</strong>: tus movimientos, cuentas, inversiones y todo lo demás se guardan en el almacenamiento de tu propio dispositivo. No tenemos un servidor donde vivan tus datos financieros, no los vemos y no los vendemos.',
      'legal.responsible.title': '2. Responsable',
      'legal.responsible.body': 'SmartFlow es una app desarrollada de forma independiente por SmartBalance. Para cualquier consulta sobre privacidad puedes escribir a <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.',
      'legal.data.title': '3. Qué datos trata la app',
      'legal.data.body': 'Toda la información financiera que introduces (movimientos, cuentas, inversiones, inmuebles, objetivos) se almacena únicamente en la base de datos local del dispositivo. No se envía automáticamente a ningún servidor. En concreto:',
      'legal.data.li1': 'La copia de seguridad/restauración en JSON la generas y guardas tú, donde tú decidas (por ejemplo, tu propio Google Drive) — nosotros no tenemos acceso a ese fichero.',
      'legal.data.li2': 'El bloqueo por PIN o biometría usa los sistemas de seguridad del propio sistema operativo Android; SmartFlow no recibe ni almacena tu huella o tu cara, solo el resultado (autorizado o no).',
      'legal.data.li3': 'La entrada por voz se procesa en el propio dispositivo para convertir el habla en texto.',
      'legal.data.li4': 'Si desinstalas la app o borras sus datos, esa información desaparece — no queda copia en ningún otro sitio nuestro.',
      'legal.permissions.title': '4. Permisos que solicita la app',
      'legal.permissions.body': 'SmartFlow pide únicamente los permisos necesarios para las funciones que ofrece: micrófono (para la entrada por voz), almacenamiento (para importar/exportar Excel y hacer copias de seguridad) y notificaciones (para avisos de presupuesto y recordatorios). Ninguno de estos permisos se usa para rastrear tu actividad ni se comparte con terceros.',
      'legal.thirdparty.title': '5. Terceros, anuncios y analítica',
      'legal.thirdparty.body': 'SmartFlow no incluye publicidad ni SDKs de terceros para analítica o seguimiento. No compartimos, vendemos ni cedemos tus datos financieros a nadie.',
      'legal.premium.title': '6. Futuras funciones con IA (Pack Premium)',
      'legal.premium.body': 'Estamos preparando funciones opcionales de pago que usarán inteligencia artificial (por ejemplo, un asistente financiero). Cuando esas funciones estén disponibles, solo se activarán si tú lo decides expresamente, y actualizaremos esta política para explicar exactamente qué datos se procesan y cómo, antes de que puedas activarlas.',
      'legal.rights.title': '7. Tus derechos',
      'legal.rights.body': 'Como tus datos financieros viven en tu propio dispositivo, tienes control directo sobre ellos en todo momento: puedes exportarlos, editarlos o borrarlos desde la propia app, sin necesidad de pedírnoslo. Si tienes cualquier otra duda sobre tus datos, puedes escribirnos a <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.',
      'legal.changes.title': '8. Cambios en esta política',
      'legal.changes.body': 'Si actualizamos esta política, cambiaremos la fecha de "última actualización" en la parte superior de esta página. Los cambios importantes (como la llegada del Pack Premium) se anunciarán también dentro de la propia app.',
      'legal.contact.title': '9. Contacto',
      'legal.contact.body': 'Para cualquier pregunta sobre esta política o sobre SmartFlow en general: <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.'
    },
    ca: {
      'nav.contact': 'Contacte',
      'nav.features': 'Funcions',
      'nav.why': 'Per què',
      'nav.screens': 'Captures',
      'nav.premium': 'Premium',
      'nav.how': 'Com funciona',
      'theme.toggle': 'Canviar tema',
      'lang.toggle': 'Canviar idioma',
      'hero.eyebrow': 'Finances personals · 100% local',
      'hero.title': 'Els diners flueixen, tu els controles',
      'hero.sub': 'SmartFlow no et demana les claus del teu banc, les teves targetes ni el teu bròker d\'inversió. Tu decideixes què apuntes, i les teves dades es queden al teu mòbil. Sense anuncis, sense venda de dades.',
      'hero.cta': 'Properament a Google Play',
      'hero.note': 'Android · En prova tancada ara mateix — el llançament públic arriba aviat.',

      'features.eyebrow': 'Tot el que fa SmartFlow',
      'features.title': 'Una app, tots els teus diners',
      'features.sub': 'Moviments, pressupost, comptes, inversió, immobles i patrimoni — sense canviar d\'app.',
      'feature.dashboard.title': 'Tauler clar',
      'feature.dashboard.desc': 'Resum del mes, gràfica de tendència i comparativa per categoria d\'una ullada.',
      'feature.rule.title': 'Regla 50/30/20',
      'feature.rule.desc': 'Pressupost configurable amb avisos automàtics al 80%, 100% i 120%.',
      'feature.accounts.title': 'Multicomptes',
      'feature.accounts.desc': 'Saldo calculat en viu a partir dels teus moviments reals, mai un número que es desincronitza.',
      'feature.voice.title': 'Veu avançada',
      'feature.voice.desc': '"El 3 d\'agost vaig gastar 20 euros al súper, treu-ho del meu compte BBVA" — i l\'app omple data, import, categoria i compte sola. En els 3 idiomes.',
      'feature.investing.title': 'Inversió completa',
      'feature.investing.desc': 'Fons indexats, accions, cripto, plans de pensions i renda fixa: vendes parcials, dividends, preu mitjà i guany real.',
      'feature.property.title': 'Immobles, tractats com es mereixen',
      'feature.property.desc': 'La majoria d\'apps de finances posen "habitatge" com una categoria de despesa més. SmartFlow porta cada immoble com una fitxa completa:',
      'feature.property.li1': 'Despeses per categoria a cada immoble: IBI, comunitat, assegurança, manteniment...',
      'feature.property.li2': 'Categories recurrents que es proposen soles cada mes — tu només confirmes.',
      'feature.property.li3': 'Hipoteca amb taula d\'amortització real (interès i capital mes a mes), no una estimació genèrica.',
      'feature.property.li4': 'Calibratge contra el rebut real del banc quan els números no quadren exactes.',
      'feature.property.li5': 'Tot connectat al teu patrimoni net en temps real, sense recalcular res a mà.',
      'feature.networth.title': 'Patrimoni net que s\'actualitza sol',
      'feature.networth.desc': 'Comptes, inversió, immobles i deutes, tot sumat en viu — sense recalcular res a mà.',
      'feature.goals.title': 'Objectius i estalvi',
      'feature.goals.desc': 'Metes d\'estalvi i fons d\'emergència, amb seguiment visual del progrés.',
      'feature.security.title': 'Seguretat de veritat',
      'feature.security.desc': 'Bloqueig per PIN o biometria, base de dades xifrada al teu mòbil, còpia de seguretat en JSON.',
      'feature.widget.title': 'Widget d\'inici',
      'feature.widget.desc': 'Registra una despesa o un ingrés per veu sense ni obrir l\'app.',

      'how.eyebrow': 'Sense connectar el teu banc',
      'how.title': 'Automàtic de veritat, sense donar les teves claus a ningú',
      'how.sub': 'No connectar el teu banc no vol dir apuntar-ho tot a mà. SmartFlow fa la part feixuga per tu.',
      'how.step1.title': 'Afegeix en segons',
      'how.step1.desc': 'Per veu, en els 3 idiomes: "Vaig gastar 20 euros al súper amb la BBVA" — i l\'app omple data, import, categoria i compte sola.',
      'how.step2.title': 'Es repeteix sol',
      'how.step2.desc': 'Nòmina, lloguer, hipoteca, aportacions a fons... el que és recurrent es proposa cada mes en ingressos, estalvi, despeses i inversió. Tu només confirmes.',
      'how.step3.title': 'Tot es calcula',
      'how.step3.desc': 'Pressupost, patrimoni i rendibilitat s\'actualitzen a l\'instant — sense fulls de càlcul ni recalcular res a mà.',

      'why.eyebrow': 'Per què SmartFlow',
      'why.title': 'Les teves dades, les teves decisions',
      'why.nobank.title': 'Sense connectar el teu banc',
      'why.nobank.desc': 'SmartFlow mai et demana les claus del teu banc, el número de la teva targeta ni accés al teu bròker d\'inversió. Apuntes tu el que vulguis, quan vulguis.',
      'why.local.title': '100% local',
      'why.local.desc': 'El que apuntes es desa a l\'emmagatzematge del teu propi mòbil. No hi ha cap servidor on visquin les teves dades financeres — ni les veiem, ni les podem vendre encara que volguéssim.',
      'why.noads.title': 'Sense anuncis, sense venda de dades',
      'why.noads.desc': 'No hi ha publicitat ni tercers analitzant les teves finances. El model de negoci és una app que pagues per utilitzar, no una que et ven a tu.',
      'why.trilingual.title': 'Trilingüe de veritat',
      'why.trilingual.desc': 'Espanyol, català i anglès revisats frase a frase — gairebé mil claus de text, no traducció automàtica.',
      'why.free.title': 'Gratis en el llançament',
      'why.free.desc': 'Tot això, sense cost. El Pack Premium arribarà més endavant com un extra, no com un cadenat al que ja tens.',

      'screens.eyebrow': 'Així es veu per dins',
      'screens.title': 'Dissenyada per mirar-la cada dia',
      'screens.dashboard': 'Tauler',
      'screens.expenses': 'Despeses per categoria',
      'screens.comparison': 'Comparativa mensual',
      'screens.networth': 'Patrimoni net',
      'screens.investing': 'Fons i accions',
      'screens.property': 'Immobles',
      'screens.savings': 'Estalvi',
      'screens.profile': 'Perfil',

      'premium.badge': 'Properament',
      'premium.title': 'Un Pack Premium està en camí',
      'premium.desc': 'Un assistent amb IA que coneix les teves xifres per ajudar-te a decidir millor, a més d\'altres funcions per estalviar-te feina. Encara sense data — i la versió gratuïta seguirà sent gratuïta.',

      'footer.tagline': 'Part de la saga SmartBalance',
      'footer.privacy': 'Privacitat',

      'legal.back': '← Torna a SmartFlow',
      'legal.title': 'Política de privacitat',
      'legal.updated': 'Última actualització: 29 de juliol de 2026',
      'legal.intro.title': '1. Resum',
      'legal.intro.body': 'SmartFlow és una app de finances personals <strong>local-first</strong>: els teus moviments, comptes, inversions i tota la resta es guarden a l\'emmagatzematge del teu propi dispositiu. No tenim cap servidor on visquin les teves dades financeres, no les veiem i no les venem.',
      'legal.responsible.title': '2. Responsable',
      'legal.responsible.body': 'SmartFlow és una app desenvolupada de forma independent per SmartBalance. Per a qualsevol consulta sobre privacitat pots escriure a <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.',
      'legal.data.title': '3. Quines dades tracta l\'app',
      'legal.data.body': 'Tota la informació financera que introdueixes (moviments, comptes, inversions, immobles, objectius) es desa únicament a la base de dades local del dispositiu. No s\'envia automàticament a cap servidor. En concret:',
      'legal.data.li1': 'La còpia de seguretat/restauració en JSON la generes i la desa tu, on tu decideixis (per exemple, el teu propi Google Drive) — nosaltres no tenim accés a aquest fitxer.',
      'legal.data.li2': 'El bloqueig per PIN o biometria fa servir els sistemes de seguretat del mateix sistema operatiu Android; SmartFlow no rep ni desa la teva empremta o la teva cara, només el resultat (autoritzat o no).',
      'legal.data.li3': 'L\'entrada per veu es processa al mateix dispositiu per convertir la parla en text.',
      'legal.data.li4': 'Si desinstal·les l\'app o n\'esborres les dades, aquesta informació desapareix — no en queda cap còpia enlloc més nostre.',
      'legal.permissions.title': '4. Permisos que sol·licita l\'app',
      'legal.permissions.body': 'SmartFlow demana només els permisos necessaris per a les funcions que ofereix: micròfon (per a l\'entrada per veu), emmagatzematge (per importar/exportar Excel i fer còpies de seguretat) i notificacions (per a avisos de pressupost i recordatoris). Cap d\'aquests permisos s\'utilitza per rastrejar la teva activitat ni es comparteix amb tercers.',
      'legal.thirdparty.title': '5. Tercers, anuncis i analítica',
      'legal.thirdparty.body': 'SmartFlow no inclou publicitat ni SDKs de tercers per a analítica o seguiment. No compartim, venem ni cedim les teves dades financeres a ningú.',
      'legal.premium.title': '6. Futures funcions amb IA (Pack Premium)',
      'legal.premium.body': 'Estem preparant funcions opcionals de pagament que faran servir intel·ligència artificial (per exemple, un assistent financer). Quan aquestes funcions estiguin disponibles, només s\'activaran si tu ho decideixes expressament, i actualitzarem aquesta política per explicar exactament quines dades es processen i com, abans que les puguis activar.',
      'legal.rights.title': '7. Els teus drets',
      'legal.rights.body': 'Com que les teves dades financeres viuen al teu propi dispositiu, en tens control directe en tot moment: pots exportar-les, editar-les o esborrar-les des de la mateixa app, sense necessitat de demanar-nos-ho. Si tens qualsevol altre dubte sobre les teves dades, pots escriure\'ns a <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.',
      'legal.changes.title': '8. Canvis en aquesta política',
      'legal.changes.body': 'Si actualitzem aquesta política, canviarem la data d\'"última actualització" a la part superior d\'aquesta pàgina. Els canvis importants (com l\'arribada del Pack Premium) també s\'anunciaran dins de la mateixa app.',
      'legal.contact.title': '9. Contacte',
      'legal.contact.body': 'Per a qualsevol pregunta sobre aquesta política o sobre SmartFlow en general: <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.'
    },
    en: {
      'nav.contact': 'Contact',
      'nav.features': 'Features',
      'nav.why': 'Why',
      'nav.screens': 'Screenshots',
      'nav.premium': 'Premium',
      'nav.how': 'How it works',
      'theme.toggle': 'Toggle theme',
      'lang.toggle': 'Change language',
      'hero.eyebrow': 'Personal finance · 100% local',
      'hero.title': 'Your money flows, you\'re in control',
      'hero.sub': 'SmartFlow never asks for your bank credentials, your card numbers, or access to your broker. You decide what to log, and your data stays on your phone. No ads, no data selling.',
      'hero.cta': 'Coming soon to Google Play',
      'hero.note': 'Android · Currently in closed testing — public launch is coming soon.',

      'features.eyebrow': 'Everything SmartFlow does',
      'features.title': 'One app, all your money',
      'features.sub': 'Transactions, budget, accounts, investing, properties and net worth — without switching apps.',
      'feature.dashboard.title': 'Clear dashboard',
      'feature.dashboard.desc': 'Monthly summary, trend chart and category comparison at a glance.',
      'feature.rule.title': '50/30/20 rule',
      'feature.rule.desc': 'Configurable budget with automatic alerts at 80%, 100% and 120%.',
      'feature.accounts.title': 'Multiple accounts',
      'feature.accounts.desc': 'Balance calculated live from your real transactions, never a number that drifts out of sync.',
      'feature.voice.title': 'Advanced voice input',
      'feature.voice.desc': '"On August 3rd I spent 20 euros at the supermarket, take it from my BBVA account" — the app fills in the date, amount, category and account by itself. In all 3 languages.',
      'feature.investing.title': 'Full investing module',
      'feature.investing.desc': 'Index funds, stocks, crypto, pensions and fixed income: partial sales, dividends, average price and realized gains.',
      'feature.property.title': 'Properties, done properly',
      'feature.property.desc': 'Most finance apps treat "housing" as just another expense category. SmartFlow gives each property a full profile:',
      'feature.property.li1': 'Expenses by category per property: property tax, community fees, insurance, maintenance...',
      'feature.property.li2': 'Recurring categories that suggest themselves each month — you just confirm.',
      'feature.property.li3': 'Mortgage with a real amortization table (interest and principal, month by month), not a generic estimate.',
      'feature.property.li4': 'Calibration against your actual bank statement when the numbers don\'t match exactly.',
      'feature.property.li5': 'Everything linked to your net worth in real time, no manual recalculating.',
      'feature.networth.title': 'Net worth that updates itself',
      'feature.networth.desc': 'Accounts, investments, properties and debts, all added up live — no manual recalculating.',
      'feature.goals.title': 'Goals & savings',
      'feature.goals.desc': 'Savings goals and an emergency fund, with visual progress tracking.',
      'feature.security.title': 'Real security',
      'feature.security.desc': 'PIN or biometric lock, database encrypted on your phone, JSON backup and restore.',
      'feature.widget.title': 'Home screen widget',
      'feature.widget.desc': 'Log an expense or income by voice without even opening the app.',

      'how.eyebrow': 'No bank connection',
      'how.title': 'Genuinely automatic, without handing your credentials to anyone',
      'how.sub': 'Not connecting your bank doesn\'t mean logging everything by hand. SmartFlow does the heavy lifting for you.',
      'how.step1.title': 'Add it in seconds',
      'how.step1.desc': 'By voice, in all 3 languages: "I spent 20 euros at the supermarket with my BBVA card" — and the app fills in the date, amount, category and account by itself.',
      'how.step2.title': 'It repeats itself',
      'how.step2.desc': 'Salary, rent, mortgage, fund contributions... recurring items are suggested every month across income, savings, expenses and investing. You just confirm.',
      'how.step3.title': 'It all adds up',
      'how.step3.desc': 'Budget, net worth and returns update instantly — no spreadsheets, no manual recalculating.',

      'why.eyebrow': 'Why SmartFlow',
      'why.title': 'Your data, your decisions',
      'why.nobank.title': 'No bank connection',
      'why.nobank.desc': 'SmartFlow never asks for your bank credentials, your card number, or access to your broker. You log what you want, whenever you want.',
      'why.local.title': '100% local',
      'why.local.desc': 'What you log is stored on your own phone\'s storage. There\'s no server where your financial data lives — we don\'t see it, and we couldn\'t sell it even if we wanted to.',
      'why.noads.title': 'No ads, no data selling',
      'why.noads.desc': 'No advertising, no third parties analyzing your finances. The business model is an app you pay to use, not one that sells you.',
      'why.trilingual.title': 'Genuinely trilingual',
      'why.trilingual.desc': 'Spanish, Catalan and English reviewed sentence by sentence — nearly a thousand text keys, not machine translation.',
      'why.free.title': 'Free at launch',
      'why.free.desc': 'Everything above, at no cost. The Premium Pack will arrive later as an extra, not a lock on what you already have.',

      'screens.eyebrow': 'A look inside',
      'screens.title': 'Built to check every day',
      'screens.dashboard': 'Dashboard',
      'screens.expenses': 'Expenses by category',
      'screens.comparison': 'Monthly comparison',
      'screens.networth': 'Net worth',
      'screens.investing': 'Funds & stocks',
      'screens.property': 'Properties',
      'screens.savings': 'Savings',
      'screens.profile': 'Profile',

      'premium.badge': 'Coming soon',
      'premium.title': 'A Premium Pack is on its way',
      'premium.desc': 'An AI assistant that knows your numbers to help you decide better, plus other features to save you work. No date yet — and the free version will stay free.',

      'footer.tagline': 'Part of the SmartBalance saga',
      'footer.privacy': 'Privacy',

      'legal.back': '← Back to SmartFlow',
      'legal.title': 'Privacy Policy',
      'legal.updated': 'Last updated: July 29, 2026',
      'legal.intro.title': '1. Summary',
      'legal.intro.body': 'SmartFlow is a <strong>local-first</strong> personal finance app: your transactions, accounts, investments and everything else are stored on your own device\'s storage. We don\'t have a server where your financial data lives, we don\'t see it, and we don\'t sell it.',
      'legal.responsible.title': '2. Who\'s responsible',
      'legal.responsible.body': 'SmartFlow is an app developed independently by SmartBalance. For any privacy question, you can write to <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.',
      'legal.data.title': '3. What data the app handles',
      'legal.data.body': 'All the financial information you enter (transactions, accounts, investments, properties, goals) is stored only in the device\'s local database. It is not automatically sent to any server. Specifically:',
      'legal.data.li1': 'The JSON backup/restore file is generated and saved by you, wherever you decide (e.g. your own Google Drive) — we have no access to that file.',
      'legal.data.li2': 'PIN or biometric lock uses Android\'s own operating system security; SmartFlow never receives or stores your fingerprint or face, only the result (authorized or not).',
      'legal.data.li3': 'Voice input is processed on the device itself to convert speech into text.',
      'legal.data.li4': 'If you uninstall the app or clear its data, that information disappears — no copy remains anywhere on our end.',
      'legal.permissions.title': '4. Permissions the app requests',
      'legal.permissions.body': 'SmartFlow only requests the permissions needed for the features it offers: microphone (for voice input), storage (for Excel import/export and backups), and notifications (for budget alerts and reminders). None of these permissions are used to track your activity or shared with third parties.',
      'legal.thirdparty.title': '5. Third parties, ads and analytics',
      'legal.thirdparty.body': 'SmartFlow includes no advertising and no third-party SDKs for analytics or tracking. We don\'t share, sell, or hand over your financial data to anyone.',
      'legal.premium.title': '6. Future AI features (Premium Pack)',
      'legal.premium.body': 'We\'re preparing optional paid features that will use artificial intelligence (for example, a financial assistant). Once those features are available, they will only be activated if you explicitly choose to, and we will update this policy to explain exactly what data is processed and how, before you can turn them on.',
      'legal.rights.title': '7. Your rights',
      'legal.rights.body': 'Since your financial data lives on your own device, you have direct control over it at all times: you can export it, edit it, or delete it from within the app itself, without needing to ask us. If you have any other questions about your data, you can write to us at <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.',
      'legal.changes.title': '8. Changes to this policy',
      'legal.changes.body': 'If we update this policy, we\'ll change the "last updated" date at the top of this page. Significant changes (like the arrival of the Premium Pack) will also be announced inside the app itself.',
      'legal.contact.title': '9. Contact',
      'legal.contact.body': 'For any question about this policy or about SmartFlow in general: <a href="mailto:smartbalanceapp@gmail.com">smartbalanceapp@gmail.com</a>.'
    }
  };

  function getPreferredLang() {
    var stored = localStorage.getItem(STORAGE_LANG);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.indexOf(nav) !== -1 ? nav : DEFAULT_LANG;
  }

  function applyLang(lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];
    root.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      // innerHTML a propósito: algunas claves (ej. párrafos legales) llevan
      // enlaces mailto embebidos. El diccionario es contenido propio, no
      // entrada de usuario, así que no hay riesgo de inyección.
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });

    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function initLang() {
    var lang = getPreferredLang();
    applyLang(lang);

    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chosen = btn.getAttribute('data-lang');
        localStorage.setItem(STORAGE_LANG, chosen);
        applyLang(chosen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLang();
  });
})();
