/* ==========================================================================
   SmartFlow — main.js
   Idioma (es/ca/en), tema claro/oscuro, menú móvil, navegación activa,
   revelado al hacer scroll y carrusel de capturas. Sin dependencias.
   ==========================================================================

   ¿YA ESTÁ PUBLICADA EN GOOGLE PLAY?
   Mientras la app esté en pruebas internas, deja LAUNCHED en false: los
   botones dirán "Próximamente en Google Play" y no enlazarán a ningún sitio.
   El día que la promociones a producción, cambia esta única línea a true.
   ========================================================================== */
var LAUNCHED = false;

(function () {
  'use strict';

  var root = document.documentElement;
  var KEY_THEME = 'sf_theme';
  var KEY_LANG = 'sf_lang';
  var LANGS = ['es', 'ca', 'en'];
  var FALLBACK = 'es';
  var CURRENT_LANG = FALLBACK;
  var PLAY_URL = 'https://play.google.com/store/apps/details?id=com.manel.smartflow';

  root.classList.remove('no-js');

  /* =======================================================================
     Diccionarios
     ======================================================================= */
  var T = {};

  T.es = {
    'a11y.skip': 'Saltar al contenido',
    'a11y.theme': 'Cambiar entre tema claro y oscuro',
    'a11y.menu': 'Abrir el menú',
    'a11y.prev': 'Captura anterior',
    'a11y.next': 'Captura siguiente',

    'nav.how': 'Cómo funciona',
    'nav.features': 'Funciones',
    'nav.flux': 'Flux',
    'nav.pricing': 'Precios',
    'nav.screens': 'Capturas',
    'nav.privacy': 'Privacidad',

    'hero.eyebrow': 'Finanzas personales · Android',
    'hero.title': 'El dinero fluye, tú lo controlas',
    'hero.sub': 'SmartFlow no te pide las claves de tu banco, tus tarjetas ni tu bróker. Tú decides qué apuntas — y casi nada hay que apuntarlo a mano.',
    'hero.cta': 'Descargar en Google Play',
    'hero.ctaSoon': 'Próximamente en Google Play',
    'hero.cta2': 'Ver qué incluye gratis',
    'hero.trust1': 'Sin conectar tu banco',
    'hero.trust2': 'Sin anuncios',
    'hero.trust3': 'Español, catalán e inglés',

    'chip.networth': 'Patrimonio neto',
    'hero.flux': '¡Hola! Soy Flux',
    'mood.eyebrow': 'Flux tiene cara',
    'mood.title': 'Sabes cómo va el mes antes de leer un número',
    'mood.sub': 'Flux vive en tu dashboard y cambia de humor según cómo llevas el presupuesto. Pruébalo aquí mismo.',
    'mood.budget': 'Presupuesto del mes',
    'mood.slider': 'Muévelo y mira qué le pasa a Flux',
    'mood.legend': 'Estados de Flux',
    'mood.note': 'Las frases son las mismas que verás en la app, palabra por palabra, en los tres idiomas.',
    'mood.great': 'Este mes vas genial',
    'mood.good': 'Este mes vas bien',
    'mood.watch': 'Controla un poco el gasto',
    'mood.careful': 'Cuidado, casi sin margen',
    'mood.over': 'Te has pasado del presupuesto',
    'mood.tag.great': 'Genial',
    'mood.tag.good': 'Bien',
    'mood.tag.watch': 'Ojo',
    'mood.tag.careful': 'Al límite',
    'mood.tag.over': 'Pasado',
    'alt.flux.hero': 'Flux, la mascota de SmartFlow, saludando con los brazos en alto',
    'alt.flux.great': 'Flux con los brazos en alto y los ojos brillantes',
    'alt.flux.good': 'Flux sonriendo tranquilo',
    'alt.flux.watch': 'Flux serio, vigilando el gasto',
    'alt.flux.careful': 'Flux preocupado, con una gota de sudor',
    'alt.flux.over': 'Flux enfadado, con los brazos cruzados',

    'strip.1': '3 idiomas revisados a mano',
    'strip.2': '32 divisas',
    'strip.3': '4 widgets de pantalla de inicio',
    'strip.4': 'Hipotecas con amortización real',
    'strip.5': '0 anuncios',
    'strip.6': 'Copia de seguridad tuya, en JSON',

    'how.eyebrow': 'Sin conectar tu banco',
    'how.title': 'Automático de verdad, sin darle tus claves a nadie',
    'how.sub': 'No conectar el banco no significa apuntarlo todo a mano. La app hace la parte pesada; tú confirmas.',
    'how.step1.title': 'Lo dices y ya está',
    'how.step1.desc': '«El 3 de agosto gasté 20 euros en el súper con la BBVA.» La app rellena fecha, importe, categoría y cuenta sola, en los tres idiomas. También desde el widget, sin abrirla.',
    'how.step1.art': '«Gasté 20 € en el súper con la BBVA»',
    'how.step1.chip1': 'Alimentación',
    'how.step1.chip2': 'BBVA Principal',
    'how.step2.title': 'Lo que se repite, se repite solo',
    'how.step2.desc': 'Nómina, alquiler, hipoteca, aportaciones a fondos, el IBI de cada inmueble. Se proponen cada mes en ingresos, ahorro, gastos e inversión — en automático o pidiéndote confirmación.',
    'how.step2.art1': 'Nómina',
    'how.step2.art2': 'Hipoteca Piso Badalona',
    'how.step2.art3': 'Fondo indexado',
    'how.step3.title': 'Todo se recalcula solo',
    'how.step3.desc': 'Presupuesto, patrimonio neto, rentabilidad de cada inmueble y de cada posición. Sin hojas de cálculo y sin volver a sumar nada a mano.',
    'how.step3.art': 'Patrimonio neto',

    'features.eyebrow': 'Todo tu dinero',
    'features.title': 'Una sola app para lo que otras reparten en cinco',
    'features.sub': 'Movimientos, presupuesto, cuentas, inversión, inmuebles y patrimonio. Sin cambiar de pantalla y sin exportar nada.',

    'feature.property.title': 'Inmuebles, tratados como se merecen',
    'feature.property.desc': 'La mayoría de apps meten «vivienda» como una categoría de gasto más. Aquí cada inmueble es una ficha completa:',
    'feature.property.li1': 'Ingresos y gastos mes a mes: IBI, comunidad, seguro, mantenimiento, derrama.',
    'feature.property.li2': 'Hipoteca con tabla de amortización real, cambios de tipo y calibración contra el recibo del banco.',
    'feature.property.li3': 'Rentabilidad de verdad: Yield on Cost, Cash-on-Cash y ROE, no «se revaloriza un 3%».',
    'feature.property.li4': 'Todo enlazado a tu patrimonio neto en el momento.',
    'feature.rule.title': 'Presupuesto 50/30/20',
    'feature.rule.desc': 'Configurable, con límites por categoría y por subcategoría, y avisos al 80%, 100% y 120% antes de que te pases.',
    'feature.investing.title': 'Inversión completa',
    'feature.investing.desc': 'Fondos, acciones, cripto, pensiones y renta fija: ventas parciales, dividendos, precio medio, ganancia realizada y CAGR.',
    'feature.accounts.title': 'Cuentas con saldo en vivo',
    'feature.accounts.desc': 'El saldo sale de tus movimientos reales, no de un número que escribiste una vez y se quedó desfasado.',
    'feature.voice.title': 'Entrada por voz con fecha y cuenta',
    'feature.voice.desc': 'No solo el importe: entiende «el martes pasado», «sácalo de la BBVA» y la categoría, hablando normal en los tres idiomas.',
    'feature.excel.title': 'Importación de Excel',
    'feature.excel.desc': 'Trae el histórico que ya tienes en una hoja. La app aprende cómo categorizas y deja de preguntarte.',
    'feature.goals.title': 'Objetivos y fondo de emergencia',
    'feature.goals.desc': 'Con fecha, progreso y enlace a una categoría concreta. El fondo de emergencia se propone solo a partir de tu gasto real.',
    'feature.networth.title': 'Patrimonio neto que se actualiza solo',
    'feature.networth.desc': 'Cuentas, inversión, inmuebles y deudas sumados en vivo, con histórico y objetivo anual.',
    'feature.security.title': 'Seguridad que no se cobra aparte',
    'feature.security.desc': 'Bloqueo biométrico o por PIN y base de datos cifrada en el móvil. Están en la versión gratis y ahí se quedan.',
    'feature.widget.title': 'Cuatro widgets',
    'feature.widget.desc': 'Del grande con el resumen del mes al de un solo toque para apuntar un gasto por voz sin abrir la app. En las tres paletas.',
    'feature.stories.title': 'Historias del mes y del año',
    'feature.stories.desc': 'Tu año en cifras, contado en pantallas que se pasan como una historia. Gratis, porque es lo más compartible que tiene la app.',

    'flux.eyebrow': 'Pack Premium',
    'flux.title': 'Flux conoce tus cifras. Por eso sus respuestas sirven.',
    'flux.sub': 'Un asistente al que puedes preguntarle por tu dinero de verdad, no por finanzas en general. Sabe cuánto ingresas, qué te cuesta cada inmueble y cuánto llevas ahorrado este mes.',
    'flux.f1.t': 'Previsión del mes que viene',
    'flux.f1.d': 'Con tus recurrentes y tu histórico: qué va a entrar, qué va a salir y con cuánto te vas a quedar.',
    'flux.f2.t': 'Informe fiscal en PDF',
    'flux.f2.d': 'Inmuebles año a año con amortización y la reducción por alquiler de vivienda, más el resto de inversiones.',
    'flux.f3.t': 'Analizador de compra',
    'flux.f3.d': 'Antes de firmar: qué rentabilidad tendría ese piso con tus números, no con los del anuncio.',
    'flux.f4.t': 'Avisos antes de que pase',
    'flux.f4.d': '«A este ritmo te pasas de Alimentación el día 22.» El cálculo es gratis; el aviso explicado, Premium.',
    'flux.f5.t': 'Tickets y Excel',
    'flux.f5.d': 'Foto del ticket y ya está apuntado. Y al importar una hoja, las categorías se rellenan solas.',
    'flux.free': '¿Sin suscripción? Cada mes tienes un resumen de tu Historia escrito por Flux con tus cifras reales, gratis. Para que lo veas funcionar antes de decidir.',
    'flux.chat.status': 'Con tus datos de septiembre',
    'flux.chat.q': '¿Puedo permitirme cambiar de coche este año?',
    'flux.chat.a': 'Con tu ritmo actual ahorras 1.500 € al mes y cierras el año en 18.000 €. Si mantienes el fondo de emergencia en 9.400 €, te quedan 8.600 € para la entrada sin tocar la inversión. El margen está en Ocio: llevas tres meses un 26% por encima de tu propio límite.',
    'flux.chat.foot': '40 consultas al mes · Se renuevan cada mes',

    'pricing.eyebrow': 'Gratis y Premium',
    'pricing.title': 'La versión gratis no es una versión recortada',
    'pricing.sub': 'Nunca hemos quitado una función de la capa gratuita. Lo que se paga es Flux, el informe fiscal, la previsión completa y la cantidad a partir de cierto punto.',
    'plan.free.name': 'Gratis',
    'plan.free.price': '0 €',
    'plan.free.tag': 'Para siempre, sin cuenta ni registro',
    'plan.free.1': 'Movimientos, categorías, traspasos y entrada por voz',
    'plan.free.2': 'Presupuesto 50/30/20 con avisos',
    'plan.free.3': 'Recurrentes en ingresos, gastos, ahorro e inversión',
    'plan.free.4': 'Objetivos, fondo de emergencia e Historias',
    'plan.free.5': 'Inmuebles con hipoteca real y métricas de rentabilidad',
    'plan.free.6': 'Cifrado, biometría, copia de seguridad y exportación',
    'plan.free.7': 'Los 4 widgets, 3 paletas, 3 idiomas y 32 divisas',
    'plan.free.8': 'Hasta 2 inmuebles, 3 posiciones y 2 cuentas activas',
    'plan.free.9': '1 resumen mensual escrito por Flux al mes',
    'plan.premium.ribbon': '15 días de prueba',
    'plan.premium.name': 'Pack Premium',
    'plan.premium.amount': '4,99 €',
    'plan.premium.per': '/mes',
    'plan.premium.tag': 'O 39,99 € al año — dos meses menos',
    'plan.premium.0': 'Todo lo de la versión gratis, sin límites de cantidad',
    'plan.premium.1': 'Chat con Flux, con memoria de la conversación',
    'plan.premium.2': 'Previsión mensual completa',
    'plan.premium.3': 'Informe fiscal en PDF, año a año',
    'plan.premium.4': 'Analizador de inmueble antes de comprar',
    'plan.premium.5': 'Simulador «qué pasaría si» y objetivos del año que viene',
    'plan.premium.6': 'Resumen mensual y anual redactados por Flux',
    'plan.premium.7': 'Escaneo de tickets y categorización automática del Excel',
    'plan.premium.8': 'Avatar caricaturizado',
    'plan.premium.9': '40 consultas de IA al mes',
    'plan.premium.cta': 'Probar 15 días',
    'pricing.note': 'La prueba de 15 días está en el plan mensual y se cancela desde Google Play cuando quieras. Si dejas Premium, no se borra nada: lo que ya tenías sigue ahí y se puede seguir editando.',

    'screens.eyebrow': 'Así se ve por dentro',
    'screens.title': 'Diseñada para mirarla cada día',
    'screens.sub': 'Tres paletas, claro y oscuro, y los números en tipografía tabular para que las columnas cuadren de verdad.',
    'screens.dashboard': 'Dashboard',
    'screens.expenses': 'Gastos por categoría',
    'screens.comparison': 'Comparativa mensual',
    'screens.networth': 'Patrimonio neto',
    'screens.investing': 'Fondos y acciones',
    'screens.property': 'Inmuebles',
    'screens.savings': 'Ahorro',
    'screens.profile': 'Perfil',

    'alt.dashboard': 'Pantalla principal de SmartFlow con el resumen del mes y el patrimonio neto',
    'alt.property': 'Ficha de un inmueble con ingresos, gastos, cashflow e hipoteca',
    'alt.expenses': 'Gráfico de gastos por categoría del año',
    'alt.comparison': 'Comparativa de gasto mes a mes por categoría',
    'alt.networth': 'Evolución del patrimonio neto',
    'alt.investing': 'Cartera de fondos y acciones con su reparto',
    'alt.savings': 'Objetivos de ahorro y fondo de emergencia',
    'alt.profile': 'Ajustes de apariencia, idioma y moneda',

    'why.eyebrow': 'Tus datos',
    'why.title': 'Local por defecto, y te decimos exactamente qué sale',
    'why.sub': 'Tus movimientos, cuentas, inmuebles e inversiones viven en la base de datos cifrada de tu móvil. No hay servidor donde estén guardados.',
    'why.nobank.title': 'Nunca te pedimos las claves del banco',
    'why.nobank.desc': 'Ni las de tu banco, ni el número de tu tarjeta, ni acceso a tu bróker. La sincronización bancaria está descartada, no aparcada: sería incompatible con todo lo demás.',
    'why.local.title': 'Todo se guarda en tu móvil',
    'why.local.desc': 'Base de datos cifrada en el dispositivo y copia de seguridad en JSON que generas y guardas tú, donde tú quieras. Si desinstalas la app, desaparece — no queda copia en ningún sitio nuestro.',
    'why.ai.title': 'Y cuando usas Flux, te lo decimos',
    'why.ai.desc': 'Las funciones con IA sí envían cifras a un proveedor para poder responder. Solo cuando las usas, solo lo necesario, y está detallado sin rodeos en la política de privacidad — incluido lo que se envía de más.',
    'why.noads.title': 'Sin anuncios y sin vender nada',
    'why.noads.desc': 'No hay publicidad ni terceros analizando tus finanzas. El modelo es una app que se paga por usar, no una que te vende a ti.',
    'why.trilingual.title': 'Trilingüe de verdad',
    'why.trilingual.desc': 'Español, catalán e inglés revisados frase a frase — cerca de mil quinientas claves de texto, no traducción automática. La voz también entiende los tres.',
    'why.keep.title': 'Lo que ya has metido no se toca',
    'why.keep.desc': 'Los límites del plan gratis solo aparecen al añadir algo nuevo. Si ya tenías cinco inmuebles, los cinco siguen visibles y editables. Y cobrar por el cifrado o la copia de seguridad no va a pasar nunca.',
    'why.readpolicy': 'Leer la política de privacidad completa →',

    'faq.eyebrow': 'Dudas razonables',
    'faq.title': 'Lo que preguntaría yo',
    'faq.q1': 'Si no conecta con el banco, ¿no acabaré apuntándolo todo a mano?',
    'faq.a1': 'No. Lo recurrente se propone cada mes solo, el histórico entra por Excel, lo del día a día se dice hablando o se hace foto del ticket, y el widget apunta un gasto sin abrir la app. Lo que queda a mano es confirmar.',
    'faq.q2': '¿Qué pasa si dejo de pagar Premium?',
    'faq.a2': 'No se borra nada. Todo lo que hayas metido sigue visible y editable, incluso por encima de los límites del plan gratis. Lo que se cierra son las funciones de Flux, el informe fiscal y la previsión completa.',
    'faq.q3': '¿Hay que crear una cuenta?',
    'faq.a3': 'No. No hay registro, ni correo, ni contraseña. Para el Pack Premium se usa un identificador anónimo que puedes ver y copiar desde los ajustes de la app.',
    'faq.q4': '¿Y si cambio de móvil?',
    'faq.a4': 'Exportas la copia de seguridad en JSON desde el móvil viejo y la restauras en el nuevo. El fichero es tuyo: lo guardas donde quieras y nosotros no tenemos acceso a él.',
    'faq.q5': '¿Está en iPhone?',
    'faq.a5': 'Todavía no. SmartFlow es una app de Android, y lo será durante un tiempo.',
    'faq.q6': '¿Quién hay detrás?',
    'faq.a6': 'Una persona. SmartFlow es parte de la saga SmartBalance y se desarrolla de forma independiente, sin inversores que quieran rentabilizar tus datos.',

    'closer.title': 'Empieza gratis. Sin cuenta, sin tarjeta, sin dar las claves de nada.',
    'closer.note': 'Android 8 o superior',

    'footer.tagline': 'Parte de la saga SmartBalance',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos de uso',
    'footer.delete': 'Eliminar tus datos',
    'footer.contact': 'Contacto'
  };

  T.ca = {
    'a11y.skip': 'Vés al contingut',
    'a11y.theme': 'Canviar entre tema clar i fosc',
    'a11y.menu': 'Obrir el menú',
    'a11y.prev': 'Captura anterior',
    'a11y.next': 'Captura següent',

    'nav.how': 'Com funciona',
    'nav.features': 'Funcions',
    'nav.flux': 'Flux',
    'nav.pricing': 'Preus',
    'nav.screens': 'Captures',
    'nav.privacy': 'Privacitat',

    'hero.eyebrow': 'Finances personals · Android',
    'hero.title': 'Els diners flueixen, tu els controles',
    'hero.sub': 'SmartFlow no et demana les claus del teu banc, les teves targetes ni el teu bròker. Tu decideixes què apuntes — i gairebé res s’ha d’apuntar a mà.',
    'hero.cta': 'Descarregar a Google Play',
    'hero.ctaSoon': 'Properament a Google Play',
    'hero.cta2': 'Veure què inclou de franc',
    'hero.trust1': 'Sense connectar el teu banc',
    'hero.trust2': 'Sense anuncis',
    'hero.trust3': 'Català, castellà i anglès',

    'chip.networth': 'Patrimoni net',
    'hero.flux': 'Hola! Sóc en Flux',
    'mood.eyebrow': 'En Flux té cara',
    'mood.title': 'Saps com va el mes abans de llegir cap número',
    'mood.sub': 'En Flux viu al teu tauler i canvia d’humor segons com portes el pressupost. Prova-ho aquí mateix.',
    'mood.budget': 'Pressupost del mes',
    'mood.slider': 'Mou-lo i mira què li passa a en Flux',
    'mood.legend': 'Estats d’en Flux',
    'mood.note': 'Les frases són les mateixes que veuràs a l’app, paraula per paraula, en els tres idiomes.',
    'mood.great': 'Aquest mes vas genial',
    'mood.good': 'Aquest mes vas bé',
    'mood.watch': 'Vigila una mica la despesa',
    'mood.careful': 'Compte, quasi sense marge',
    'mood.over': 'T’has passat del pressupost',
    'mood.tag.great': 'Genial',
    'mood.tag.good': 'Bé',
    'mood.tag.watch': 'Ull',
    'mood.tag.careful': 'Al límit',
    'mood.tag.over': 'Passat',
    'alt.flux.hero': 'En Flux, la mascota de SmartFlow, saludant amb els braços enlaire',
    'alt.flux.great': 'En Flux amb els braços enlaire i els ulls brillants',
    'alt.flux.good': 'En Flux somrient tranquil',
    'alt.flux.watch': 'En Flux seriós, vigilant la despesa',
    'alt.flux.careful': 'En Flux preocupat, amb una gota de suor',
    'alt.flux.over': 'En Flux enfadat, amb els braços creuats',

    'strip.1': '3 idiomes revisats a mà',
    'strip.2': '32 divises',
    'strip.3': '4 widgets de pantalla d’inici',
    'strip.4': 'Hipoteques amb amortització real',
    'strip.5': '0 anuncis',
    'strip.6': 'Còpia de seguretat teva, en JSON',

    'how.eyebrow': 'Sense connectar el teu banc',
    'how.title': 'Automàtic de veritat, sense donar les teves claus a ningú',
    'how.sub': 'No connectar el banc no vol dir apuntar-ho tot a mà. L’app fa la part feixuga; tu confirmes.',
    'how.step1.title': 'Ho dius i ja està',
    'how.step1.desc': '«El 3 d’agost vaig gastar 20 euros al súper amb la BBVA.» L’app omple data, import, categoria i compte sola, en els tres idiomes. També des del widget, sense obrir-la.',
    'how.step1.art': '«Vaig gastar 20 € al súper amb la BBVA»',
    'how.step1.chip1': 'Alimentació',
    'how.step1.chip2': 'BBVA Principal',
    'how.step2.title': 'El que es repeteix, es repeteix sol',
    'how.step2.desc': 'Nòmina, lloguer, hipoteca, aportacions a fons, l’IBI de cada immoble. Es proposen cada mes en ingressos, estalvi, despeses i inversió — en automàtic o demanant-te confirmació.',
    'how.step2.art1': 'Nòmina',
    'how.step2.art2': 'Hipoteca Pis Badalona',
    'how.step2.art3': 'Fons indexat',
    'how.step3.title': 'Tot es recalcula sol',
    'how.step3.desc': 'Pressupost, patrimoni net, rendibilitat de cada immoble i de cada posició. Sense fulls de càlcul i sense tornar a sumar res a mà.',
    'how.step3.art': 'Patrimoni net',

    'features.eyebrow': 'Tots els teus diners',
    'features.title': 'Una sola app per al que altres reparteixen en cinc',
    'features.sub': 'Moviments, pressupost, comptes, inversió, immobles i patrimoni. Sense canviar de pantalla i sense exportar res.',

    'feature.property.title': 'Immobles, tractats com es mereixen',
    'feature.property.desc': 'La majoria d’apps posen «habitatge» com una categoria de despesa més. Aquí cada immoble és una fitxa completa:',
    'feature.property.li1': 'Ingressos i despeses mes a mes: IBI, comunitat, assegurança, manteniment, derrama.',
    'feature.property.li2': 'Hipoteca amb taula d’amortització real, canvis de tipus i calibratge contra el rebut del banc.',
    'feature.property.li3': 'Rendibilitat de veritat: Yield on Cost, Cash-on-Cash i ROE, no «es revalora un 3%».',
    'feature.property.li4': 'Tot enllaçat al teu patrimoni net a l’instant.',
    'feature.rule.title': 'Pressupost 50/30/20',
    'feature.rule.desc': 'Configurable, amb límits per categoria i per subcategoria, i avisos al 80%, 100% i 120% abans que te’n passis.',
    'feature.investing.title': 'Inversió completa',
    'feature.investing.desc': 'Fons, accions, cripto, plans de pensions i renda fixa: vendes parcials, dividends, preu mitjà, guany realitzat i CAGR.',
    'feature.accounts.title': 'Comptes amb saldo en viu',
    'feature.accounts.desc': 'El saldo surt dels teus moviments reals, no d’un número que vas escriure una vegada i es va quedar desfasat.',
    'feature.voice.title': 'Entrada per veu amb data i compte',
    'feature.voice.desc': 'No només l’import: entén «el dimarts passat», «treu-ho de la BBVA» i la categoria, parlant normal en els tres idiomes.',
    'feature.excel.title': 'Importació d’Excel',
    'feature.excel.desc': 'Porta l’històric que ja tens en un full. L’app aprèn com categoritzes i deixa de preguntar-t’ho.',
    'feature.goals.title': 'Objectius i fons d’emergència',
    'feature.goals.desc': 'Amb data, progrés i enllaç a una categoria concreta. El fons d’emergència es proposa sol a partir de la teva despesa real.',
    'feature.networth.title': 'Patrimoni net que s’actualitza sol',
    'feature.networth.desc': 'Comptes, inversió, immobles i deutes sumats en viu, amb històric i objectiu anual.',
    'feature.security.title': 'Seguretat que no es cobra a part',
    'feature.security.desc': 'Bloqueig biomètric o per PIN i base de dades xifrada al mòbil. Són a la versió gratuïta i allà es queden.',
    'feature.widget.title': 'Quatre widgets',
    'feature.widget.desc': 'Del gran amb el resum del mes al d’un sol toc per apuntar una despesa per veu sense obrir l’app. En les tres paletes.',
    'feature.stories.title': 'Històries del mes i de l’any',
    'feature.stories.desc': 'El teu any en xifres, explicat en pantalles que es passen com una història. Gratis, perquè és el més compartible que té l’app.',

    'flux.eyebrow': 'Pack Premium',
    'flux.title': 'Flux coneix les teves xifres. Per això les seves respostes serveixen.',
    'flux.sub': 'Un assistent a qui pots preguntar pels teus diners de veritat, no per finances en general. Sap quant ingresses, què et costa cada immoble i quant portes estalviat aquest mes.',
    'flux.f1.t': 'Previsió del mes que ve',
    'flux.f1.d': 'Amb els teus recurrents i el teu històric: què entrarà, què sortirà i amb quant et quedaràs.',
    'flux.f2.t': 'Informe fiscal en PDF',
    'flux.f2.d': 'Immobles any a any amb amortització i la reducció per lloguer d’habitatge, més la resta d’inversions.',
    'flux.f3.t': 'Analitzador de compra',
    'flux.f3.d': 'Abans de signar: quina rendibilitat tindria aquell pis amb els teus números, no amb els de l’anunci.',
    'flux.f4.t': 'Avisos abans que passi',
    'flux.f4.d': '«A aquest ritme et passes d’Alimentació el dia 22.» El càlcul és gratis; l’avís explicat, Premium.',
    'flux.f5.t': 'Tiquets i Excel',
    'flux.f5.d': 'Foto del tiquet i ja està apuntat. I en importar un full, les categories s’omplen soles.',
    'flux.free': 'Sense subscripció? Cada mes tens un resum de la teva Història escrit per Flux amb les teves xifres reals, gratis. Perquè el vegis funcionar abans de decidir.',
    'flux.chat.status': 'Amb les teves dades de setembre',
    'flux.chat.q': 'Em puc permetre canviar de cotxe aquest any?',
    'flux.chat.a': 'Amb el teu ritme actual estalvies 1.500 € al mes i tanques l’any amb 18.000 €. Si mantens el fons d’emergència en 9.400 €, et queden 8.600 € per a l’entrada sense tocar la inversió. El marge és a Oci: portes tres mesos un 26% per sobre del teu propi límit.',
    'flux.chat.foot': '40 consultes al mes · Es renoven cada mes',

    'pricing.eyebrow': 'Gratis i Premium',
    'pricing.title': 'La versió gratuïta no és una versió retallada',
    'pricing.sub': 'Mai hem tret cap funció de la capa gratuïta. El que es paga és Flux, l’informe fiscal, la previsió completa i la quantitat a partir d’un cert punt.',
    'plan.free.name': 'Gratis',
    'plan.free.price': '0 €',
    'plan.free.tag': 'Per sempre, sense compte ni registre',
    'plan.free.1': 'Moviments, categories, traspassos i entrada per veu',
    'plan.free.2': 'Pressupost 50/30/20 amb avisos',
    'plan.free.3': 'Recurrents en ingressos, despeses, estalvi i inversió',
    'plan.free.4': 'Objectius, fons d’emergència i Històries',
    'plan.free.5': 'Immobles amb hipoteca real i mètriques de rendibilitat',
    'plan.free.6': 'Xifratge, biometria, còpia de seguretat i exportació',
    'plan.free.7': 'Els 4 widgets, 3 paletes, 3 idiomes i 32 divises',
    'plan.free.8': 'Fins a 2 immobles, 3 posicions i 2 comptes actius',
    'plan.free.9': '1 resum mensual escrit per Flux al mes',
    'plan.premium.ribbon': '15 dies de prova',
    'plan.premium.name': 'Pack Premium',
    'plan.premium.amount': '4,99 €',
    'plan.premium.per': '/mes',
    'plan.premium.tag': 'O 39,99 € l’any — dos mesos menys',
    'plan.premium.0': 'Tot el de la versió gratuïta, sense límits de quantitat',
    'plan.premium.1': 'Xat amb Flux, amb memòria de la conversa',
    'plan.premium.2': 'Previsió mensual completa',
    'plan.premium.3': 'Informe fiscal en PDF, any a any',
    'plan.premium.4': 'Analitzador d’immoble abans de comprar',
    'plan.premium.5': 'Simulador «què passaria si» i objectius de l’any que ve',
    'plan.premium.6': 'Resum mensual i anual redactats per Flux',
    'plan.premium.7': 'Escaneig de tiquets i categorització automàtica de l’Excel',
    'plan.premium.8': 'Avatar caricaturitzat',
    'plan.premium.9': '40 consultes d’IA al mes',
    'plan.premium.cta': 'Provar 15 dies',
    'pricing.note': 'La prova de 15 dies és al pla mensual i es cancel·la des de Google Play quan vulguis. Si deixes Premium, no s’esborra res: el que ja tenies segueix allà i es pot continuar editant.',

    'screens.eyebrow': 'Així es veu per dins',
    'screens.title': 'Dissenyada per mirar-la cada dia',
    'screens.sub': 'Tres paletes, clar i fosc, i els números en tipografia tabular perquè les columnes quadrin de veritat.',
    'screens.dashboard': 'Tauler',
    'screens.expenses': 'Despeses per categoria',
    'screens.comparison': 'Comparativa mensual',
    'screens.networth': 'Patrimoni net',
    'screens.investing': 'Fons i accions',
    'screens.property': 'Immobles',
    'screens.savings': 'Estalvi',
    'screens.profile': 'Perfil',

    'alt.dashboard': 'Pantalla principal de SmartFlow amb el resum del mes i el patrimoni net',
    'alt.property': 'Fitxa d’un immoble amb ingressos, despeses, cashflow i hipoteca',
    'alt.expenses': 'Gràfic de despeses per categoria de l’any',
    'alt.comparison': 'Comparativa de despesa mes a mes per categoria',
    'alt.networth': 'Evolució del patrimoni net',
    'alt.investing': 'Cartera de fons i accions amb el seu repartiment',
    'alt.savings': 'Objectius d’estalvi i fons d’emergència',
    'alt.profile': 'Configuració d’aparença, idioma i moneda',

    'why.eyebrow': 'Les teves dades',
    'why.title': 'Local per defecte, i et diem exactament què surt',
    'why.sub': 'Els teus moviments, comptes, immobles i inversions viuen a la base de dades xifrada del teu mòbil. No hi ha cap servidor on estiguin desats.',
    'why.nobank.title': 'Mai et demanem les claus del banc',
    'why.nobank.desc': 'Ni les del teu banc, ni el número de la teva targeta, ni accés al teu bròker. La sincronització bancària està descartada, no aparcada: seria incompatible amb tota la resta.',
    'why.local.title': 'Tot es desa al teu mòbil',
    'why.local.desc': 'Base de dades xifrada al dispositiu i còpia de seguretat en JSON que generes i desa tu, on tu vulguis. Si desinstal·les l’app, desapareix — no en queda cap còpia enlloc nostre.',
    'why.ai.title': 'I quan fas servir Flux, t’ho diem',
    'why.ai.desc': 'Les funcions amb IA sí que envien xifres a un proveïdor per poder respondre. Només quan les fas servir, només el necessari, i està detallat sense embuts a la política de privacitat — inclòs el que s’envia de més.',
    'why.noads.title': 'Sense anuncis i sense vendre res',
    'why.noads.desc': 'No hi ha publicitat ni tercers analitzant les teves finances. El model és una app que es paga per utilitzar, no una que et ven a tu.',
    'why.trilingual.title': 'Trilingüe de veritat',
    'why.trilingual.desc': 'Català, castellà i anglès revisats frase a frase — prop de mil cinc-centes claus de text, no traducció automàtica. La veu també entén els tres.',
    'why.keep.title': 'El que ja has posat no es toca',
    'why.keep.desc': 'Els límits del pla gratuït només apareixen en afegir alguna cosa nova. Si ja tenies cinc immobles, els cinc segueixen visibles i editables. I cobrar pel xifratge o la còpia de seguretat no passarà mai.',
    'why.readpolicy': 'Llegir la política de privacitat completa →',

    'faq.eyebrow': 'Dubtes raonables',
    'faq.title': 'El que preguntaria jo',
    'faq.q1': 'Si no connecta amb el banc, no acabaré apuntant-ho tot a mà?',
    'faq.a1': 'No. El que és recurrent es proposa cada mes sol, l’històric entra per Excel, el del dia a dia es diu parlant o es fa foto del tiquet, i el widget apunta una despesa sense obrir l’app. El que queda a mà és confirmar.',
    'faq.q2': 'Què passa si deixo de pagar Premium?',
    'faq.a2': 'No s’esborra res. Tot el que hagis posat segueix visible i editable, fins i tot per sobre dels límits del pla gratuït. El que es tanca són les funcions de Flux, l’informe fiscal i la previsió completa.',
    'faq.q3': 'Cal crear un compte?',
    'faq.a3': 'No. No hi ha registre, ni correu, ni contrasenya. Per al Pack Premium es fa servir un identificador anònim que pots veure i copiar des de la configuració de l’app.',
    'faq.q4': 'I si canvio de mòbil?',
    'faq.a4': 'Exportes la còpia de seguretat en JSON des del mòbil vell i la restaures al nou. El fitxer és teu: el guardes on vulguis i nosaltres no hi tenim accés.',
    'faq.q5': 'Està a l’iPhone?',
    'faq.a5': 'Encara no. SmartFlow és una app d’Android, i ho serà durant un temps.',
    'faq.q6': 'Qui hi ha al darrere?',
    'faq.a6': 'Una persona. SmartFlow forma part de la saga SmartBalance i es desenvolupa de manera independent, sense inversors que vulguin rendibilitzar les teves dades.',

    'closer.title': 'Comença gratis. Sense compte, sense targeta, sense donar les claus de res.',
    'closer.note': 'Android 8 o superior',

    'footer.tagline': 'Part de la saga SmartBalance',
    'footer.privacy': 'Privacitat',
    'footer.terms': 'Termes d’ús',
    'footer.delete': 'Eliminar les teves dades',
    'footer.contact': 'Contacte'
  };

  T.en = {
    'a11y.skip': 'Skip to content',
    'a11y.theme': 'Switch between light and dark theme',
    'a11y.menu': 'Open menu',
    'a11y.prev': 'Previous screenshot',
    'a11y.next': 'Next screenshot',

    'nav.how': 'How it works',
    'nav.features': 'Features',
    'nav.flux': 'Flux',
    'nav.pricing': 'Pricing',
    'nav.screens': 'Screenshots',
    'nav.privacy': 'Privacy',

    'hero.eyebrow': 'Personal finance · Android',
    'hero.title': 'Your money flows, you’re in control',
    'hero.sub': 'SmartFlow never asks for your bank credentials, your cards or your broker. You decide what to log — and almost none of it has to be logged by hand.',
    'hero.cta': 'Get it on Google Play',
    'hero.ctaSoon': 'Coming soon to Google Play',
    'hero.cta2': 'See what’s free',
    'hero.trust1': 'No bank connection',
    'hero.trust2': 'No ads',
    'hero.trust3': 'Spanish, Catalan and English',

    'chip.networth': 'Net worth',
    'hero.flux': 'Hi! I’m Flux',
    'mood.eyebrow': 'Flux has a face',
    'mood.title': 'You know how the month is going before you read a single number',
    'mood.sub': 'Flux lives on your dashboard and changes mood depending on how your budget is holding up. Try it right here.',
    'mood.budget': 'This month’s budget',
    'mood.slider': 'Drag it and watch what happens to Flux',
    'mood.legend': 'Flux states',
    'mood.note': 'These are the exact phrases you’ll see in the app, word for word, in all three languages.',
    'mood.great': 'You’re doing great this month',
    'mood.good': 'You’re doing well this month',
    'mood.watch': 'Watch your spending a bit',
    'mood.careful': 'Careful, you’re almost out of budget',
    'mood.over': 'You’ve gone over budget',
    'mood.tag.great': 'Great',
    'mood.tag.good': 'Good',
    'mood.tag.watch': 'Watch',
    'mood.tag.careful': 'Tight',
    'mood.tag.over': 'Over',
    'alt.flux.hero': 'Flux, the SmartFlow mascot, waving with both arms up',
    'alt.flux.great': 'Flux with both arms up and sparkling eyes',
    'alt.flux.good': 'Flux smiling calmly',
    'alt.flux.watch': 'Flux looking serious, keeping an eye on spending',
    'alt.flux.careful': 'Flux worried, with a bead of sweat',
    'alt.flux.over': 'Flux angry, with arms crossed',

    'strip.1': '3 languages, reviewed by hand',
    'strip.2': '32 currencies',
    'strip.3': '4 home screen widgets',
    'strip.4': 'Mortgages with real amortization',
    'strip.5': '0 ads',
    'strip.6': 'Your own backup, in JSON',

    'how.eyebrow': 'No bank connection',
    'how.title': 'Genuinely automatic, without handing your credentials to anyone',
    'how.sub': 'Not connecting your bank doesn’t mean logging everything by hand. The app does the heavy lifting; you confirm.',
    'how.step1.title': 'Just say it',
    'how.step1.desc': '"On August 3rd I spent 20 euros at the supermarket with my BBVA card." The app fills in the date, amount, category and account by itself, in all three languages. From the widget too, without opening it.',
    'how.step1.art': '"I spent €20 at the supermarket with BBVA"',
    'how.step1.chip1': 'Groceries',
    'how.step1.chip2': 'BBVA Main',
    'how.step2.title': 'What repeats, repeats itself',
    'how.step2.desc': 'Salary, rent, mortgage, fund contributions, the property tax on each place you own. They’re proposed every month across income, savings, expenses and investing — automatically, or asking you to confirm.',
    'how.step2.art1': 'Salary',
    'how.step2.art2': 'Badalona flat mortgage',
    'how.step2.art3': 'Index fund',
    'how.step3.title': 'Everything recalculates itself',
    'how.step3.desc': 'Budget, net worth, and the return on each property and each position. No spreadsheets, and nothing to add up again by hand.',
    'how.step3.art': 'Net worth',

    'features.eyebrow': 'All your money',
    'features.title': 'One app for what others split across five',
    'features.sub': 'Transactions, budget, accounts, investing, properties and net worth. Without switching screens or exporting anything.',

    'feature.property.title': 'Properties, done properly',
    'feature.property.desc': 'Most apps file "housing" as just another expense category. Here each property gets a full profile:',
    'feature.property.li1': 'Income and expenses month by month: property tax, service charges, insurance, maintenance, special levies.',
    'feature.property.li2': 'Mortgage with a real amortization table, rate changes, and calibration against your actual bank statement.',
    'feature.property.li3': 'Real returns: Yield on Cost, Cash-on-Cash and ROE — not "it appreciates 3% a year".',
    'feature.property.li4': 'All of it wired into your net worth, instantly.',
    'feature.rule.title': '50/30/20 budget',
    'feature.rule.desc': 'Configurable, with limits per category and per subcategory, and alerts at 80%, 100% and 120% before you go over.',
    'feature.investing.title': 'Full investing module',
    'feature.investing.desc': 'Funds, stocks, crypto, pensions and fixed income: partial sales, dividends, average price, realized gains and CAGR.',
    'feature.accounts.title': 'Accounts with a live balance',
    'feature.accounts.desc': 'The balance comes from your real transactions, not from a number you typed once and never updated.',
    'feature.voice.title': 'Voice input with date and account',
    'feature.voice.desc': 'Not just the amount: it understands "last Tuesday", "take it from BBVA" and the category, speaking normally in all three languages.',
    'feature.excel.title': 'Excel import',
    'feature.excel.desc': 'Bring in the history you already keep in a spreadsheet. The app learns how you categorize and stops asking.',
    'feature.goals.title': 'Goals and emergency fund',
    'feature.goals.desc': 'With a date, progress, and a link to a specific category. The emergency fund suggests its own target from your real spending.',
    'feature.networth.title': 'Net worth that updates itself',
    'feature.networth.desc': 'Accounts, investments, properties and debts added up live, with history and an annual target.',
    'feature.security.title': 'Security that isn’t charged separately',
    'feature.security.desc': 'Biometric or PIN lock and a database encrypted on your phone. They’re in the free version and they’re staying there.',
    'feature.widget.title': 'Four widgets',
    'feature.widget.desc': 'From the large one with the monthly summary to the single-tap one that logs an expense by voice without opening the app. In all three palettes.',
    'feature.stories.title': 'Monthly and yearly Stories',
    'feature.stories.desc': 'Your year in numbers, told across screens you swipe like a story. Free, because it’s the most shareable thing the app has.',

    'flux.eyebrow': 'Premium Pack',
    'flux.title': 'Flux knows your numbers. That’s why its answers are useful.',
    'flux.sub': 'An assistant you can ask about your actual money, not about personal finance in general. It knows what you earn, what each property costs you, and how much you’ve saved this month.',
    'flux.f1.t': 'Next month’s forecast',
    'flux.f1.d': 'From your recurring items and your history: what’s coming in, what’s going out, and what you’ll be left with.',
    'flux.f2.t': 'Tax report as a PDF',
    'flux.f2.d': 'Properties year by year with depreciation and the residential letting reduction, plus the rest of your investments.',
    'flux.f3.t': 'Purchase analyzer',
    'flux.f3.d': 'Before you sign: what that flat would actually return with your numbers, not the ones in the listing.',
    'flux.f4.t': 'Warnings before it happens',
    'flux.f4.d': '"At this rate you’ll blow the Groceries budget on the 22nd." The calculation is free; the explained warning is Premium.',
    'flux.f5.t': 'Receipts and Excel',
    'flux.f5.d': 'Photograph the receipt and it’s logged. And when you import a spreadsheet, the categories fill themselves in.',
    'flux.free': 'No subscription? Every month you get one summary of your Story written by Flux from your real numbers, free. So you can watch it work before deciding.',
    'flux.chat.status': 'Using your September data',
    'flux.chat.q': 'Can I afford to change cars this year?',
    'flux.chat.a': 'At your current rate you save €1,500 a month and finish the year at €18,000. If you keep the emergency fund at €9,400, that leaves €8,600 for the deposit without touching your investments. The slack is in Leisure: you’ve been 26% over your own limit for three months.',
    'flux.chat.foot': '40 queries a month · Renewed monthly',

    'pricing.eyebrow': 'Free and Premium',
    'pricing.title': 'The free version isn’t a cut-down version',
    'pricing.sub': 'We have never removed a feature from the free tier. What you pay for is Flux, the tax report, the full forecast, and quantity past a certain point.',
    'plan.free.name': 'Free',
    'plan.free.price': '€0',
    'plan.free.tag': 'Forever, with no account and no sign-up',
    'plan.free.1': 'Transactions, categories, transfers and voice input',
    'plan.free.2': '50/30/20 budget with alerts',
    'plan.free.3': 'Recurring items across income, expenses, savings and investing',
    'plan.free.4': 'Goals, emergency fund and Stories',
    'plan.free.5': 'Properties with real mortgages and return metrics',
    'plan.free.6': 'Encryption, biometrics, backup and export',
    'plan.free.7': 'All 4 widgets, 3 palettes, 3 languages and 32 currencies',
    'plan.free.8': 'Up to 2 properties, 3 positions and 2 active accounts',
    'plan.free.9': '1 monthly summary written by Flux each month',
    'plan.premium.ribbon': '15-day trial',
    'plan.premium.name': 'Premium Pack',
    'plan.premium.amount': '\u20AC4.99',
    'plan.premium.per': '/month',
    'plan.premium.tag': 'Or €39.99 a year — two months off',
    'plan.premium.0': 'Everything in the free version, with no quantity limits',
    'plan.premium.1': 'Chat with Flux, with memory of the conversation',
    'plan.premium.2': 'Full monthly forecast',
    'plan.premium.3': 'Tax report as a PDF, year by year',
    'plan.premium.4': 'Property analyzer before you buy',
    'plan.premium.5': '"What if" simulator and next year’s goals',
    'plan.premium.6': 'Monthly and yearly summaries written by Flux',
    'plan.premium.7': 'Receipt scanning and automatic Excel categorization',
    'plan.premium.8': 'Cartoon avatar',
    'plan.premium.9': '40 AI queries a month',
    'plan.premium.cta': 'Start the 15-day trial',
    'pricing.note': 'The 15-day trial is on the monthly plan and can be cancelled from Google Play whenever you want. If you drop Premium, nothing is deleted: what you already had stays there and stays editable.',

    'screens.eyebrow': 'A look inside',
    'screens.title': 'Built to check every day',
    'screens.sub': 'Three palettes, light and dark, and tabular figures so the columns actually line up.',
    'screens.dashboard': 'Dashboard',
    'screens.expenses': 'Expenses by category',
    'screens.comparison': 'Monthly comparison',
    'screens.networth': 'Net worth',
    'screens.investing': 'Funds and stocks',
    'screens.property': 'Properties',
    'screens.savings': 'Savings',
    'screens.profile': 'Profile',

    'alt.dashboard': 'SmartFlow home screen showing the monthly summary and net worth',
    'alt.property': 'Property profile with income, expenses, cashflow and mortgage',
    'alt.expenses': 'Chart of the year’s expenses by category',
    'alt.comparison': 'Month-by-month spending comparison by category',
    'alt.networth': 'Net worth over time',
    'alt.investing': 'Fund and stock portfolio with its allocation',
    'alt.savings': 'Savings goals and emergency fund',
    'alt.profile': 'Appearance, language and currency settings',

    'why.eyebrow': 'Your data',
    'why.title': 'Local by default — and we tell you exactly what leaves',
    'why.sub': 'Your transactions, accounts, properties and investments live in the encrypted database on your phone. There is no server where they are stored.',
    'why.nobank.title': 'We never ask for your bank credentials',
    'why.nobank.desc': 'Not your bank login, not your card number, not access to your broker. Bank syncing is ruled out, not postponed: it would be incompatible with everything else here.',
    'why.local.title': 'Everything is stored on your phone',
    'why.local.desc': 'An encrypted database on the device, and a JSON backup that you generate and keep wherever you like. Uninstall the app and it’s gone — no copy is left anywhere on our side.',
    'why.ai.title': 'And when you use Flux, we say so',
    'why.ai.desc': 'The AI features do send figures to a provider in order to answer. Only when you use them, only what is needed, and it is spelled out without hedging in the privacy policy — including what gets sent beyond the strict minimum.',
    'why.noads.title': 'No ads, nothing sold',
    'why.noads.desc': 'No advertising and no third parties analyzing your finances. The model is an app you pay to use, not one that sells you.',
    'why.trilingual.title': 'Genuinely trilingual',
    'why.trilingual.desc': 'Spanish, Catalan and English reviewed sentence by sentence — around fifteen hundred text keys, not machine translation. Voice input understands all three too.',
    'why.keep.title': 'What you’ve already entered stays put',
    'why.keep.desc': 'The free-tier limits only show up when you add something new. If you already had five properties, all five stay visible and editable. And charging for encryption or backups is never going to happen.',
    'why.readpolicy': 'Read the full privacy policy →',

    'faq.eyebrow': 'Fair questions',
    'faq.title': 'What I’d ask',
    'faq.q1': 'If it doesn’t connect to my bank, won’t I end up logging everything by hand?',
    'faq.a1': 'No. Recurring items propose themselves each month, your history comes in from Excel, day-to-day things are said out loud or photographed from the receipt, and the widget logs an expense without opening the app. What’s left by hand is confirming.',
    'faq.q2': 'What happens if I stop paying for Premium?',
    'faq.a2': 'Nothing is deleted. Everything you entered stays visible and editable, even beyond the free-tier limits. What closes is the Flux features, the tax report and the full forecast.',
    'faq.q3': 'Do I have to create an account?',
    'faq.a3': 'No. No sign-up, no email, no password. The Premium Pack uses an anonymous identifier that you can view and copy from the app’s settings.',
    'faq.q4': 'What if I change phones?',
    'faq.a4': 'You export the JSON backup from the old phone and restore it on the new one. The file is yours: you keep it wherever you like and we have no access to it.',
    'faq.q5': 'Is there an iPhone version?',
    'faq.a5': 'Not yet. SmartFlow is an Android app, and will be for a while.',
    'faq.q6': 'Who is behind it?',
    'faq.a6': 'One person. SmartFlow is part of the SmartBalance family and is developed independently, with no investors looking to monetize your data.',

    'closer.title': 'Start free. No account, no card, no credentials for anything.',
    'closer.note': 'Android 8 or later',

    'footer.tagline': 'Part of the SmartBalance family',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Use',
    'footer.delete': 'Delete your data',
    'footer.contact': 'Contact'
  };

  var META = {
    es: {
      title: 'SmartFlow — El dinero fluye, tú lo controlas',
      desc: 'App de finanzas personales para Android: movimientos por voz, presupuesto 50/30/20, inmuebles con hipoteca real, inversión y patrimonio neto. Sin conectar tu banco, sin anuncios.'
    },
    ca: {
      title: 'SmartFlow — Els diners flueixen, tu els controles',
      desc: 'App de finances personals per a Android: moviments per veu, pressupost 50/30/20, immobles amb hipoteca real, inversió i patrimoni net. Sense connectar el teu banc, sense anuncis.'
    },
    en: {
      title: 'SmartFlow — Your money flows, you’re in control',
      desc: 'Personal finance app for Android: voice input, 50/30/20 budget, properties with real mortgages, investing and net worth. No bank connection, no ads.'
    }
  };

  /* =======================================================================
     Utilidades
     ======================================================================= */
  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* modo privado */ }
  }

  /* =======================================================================
     Tema
     ======================================================================= */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    each('[data-theme-toggle]', function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#06150F' : '#10B981');
  }

  function initTheme() {
    var stored = read(KEY_THEME);
    var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var initial = (stored === 'light' || stored === 'dark')
      ? stored
      : (mq && mq.matches ? 'dark' : 'light');
    applyTheme(initial);

    each('[data-theme-toggle]', function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        save(KEY_THEME, next);
        applyTheme(next);
      });
    });

    // Sigue al sistema mientras el usuario no haya elegido a mano
    if (!stored && mq && mq.addEventListener) {
      mq.addEventListener('change', function (e) {
        if (!read(KEY_THEME)) applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  /* =======================================================================
     Idioma
     ======================================================================= */
  function preferredLang() {
    var stored = read(KEY_LANG);
    if (stored && LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || FALLBACK).slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : FALLBACK;
  }

  function applyLang(lang) {
    var dict = T[lang] || T[FALLBACK];
    var base = T[FALLBACK];
    CURRENT_LANG = T[lang] ? lang : FALLBACK;
    root.setAttribute('lang', lang);

    each('[data-i18n]', function (el) {
      var key = el.getAttribute('data-i18n');
      var value = dict[key] !== undefined ? dict[key] : base[key];
      if (value !== undefined) el.textContent = value;
    });
    each('[data-i18n-aria]', function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var value = dict[key] !== undefined ? dict[key] : base[key];
      if (value !== undefined) el.setAttribute('aria-label', value);
    });
    each('[data-i18n-alt]', function (el) {
      var key = el.getAttribute('data-i18n-alt');
      var value = dict[key] !== undefined ? dict[key] : base[key];
      if (value !== undefined) el.setAttribute('alt', value);
    });
    each('.lang-switch button', function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    var meta = META[lang] || META[FALLBACK];
    document.title = meta.title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', meta.desc);
    var og = document.querySelector('meta[property="og:description"]');
    if (og) og.setAttribute('content', meta.desc);
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute('content', meta.title);

    applyStoreState(lang);
    if (moodRefresh) moodRefresh();
  }

  function initLang() {
    applyLang(preferredLang());
    each('.lang-switch button', function (btn) {
      btn.addEventListener('click', function () {
        var chosen = btn.getAttribute('data-lang');
        save(KEY_LANG, chosen);
        applyLang(chosen);
      });
    });
  }

  /* =======================================================================
     Botones de Google Play (ver LAUNCHED arriba)
     ======================================================================= */
  function applyStoreState(lang) {
    var dict = T[lang] || T[FALLBACK];
    each('[data-store-link]', function (a) {
      if (LAUNCHED) {
        a.setAttribute('href', PLAY_URL);
        a.removeAttribute('aria-disabled');
        a.removeAttribute('tabindex');
      } else {
        a.setAttribute('href', '#precios');
        a.setAttribute('aria-disabled', 'true');
      }
    });
    if (!LAUNCHED) {
      each('[data-store-label]', function (el) {
        el.textContent = dict['hero.ctaSoon'] || T[FALLBACK]['hero.ctaSoon'];
      });
    }
  }

  /* =======================================================================
     Menú móvil
     ======================================================================= */
  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function close() {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      menu.hidden = open;
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    each('#mobile-menu a', function (a) { a.addEventListener('click', close); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) close();
    });
  }

  /* =======================================================================
     Cabecera pegada + sección activa en el menú
     ======================================================================= */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    document.body.prepend(sentinel);

    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  function initActiveNav() {
    if (!('IntersectionObserver' in window)) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!links.length) return;

    var byId = {};
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) { byId[id] = a; sections.push(el); }
    });

    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = null;
      sections.forEach(function (s) { if (visible[s.id] && !current) current = s.id; });
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* =======================================================================
     Revelado al entrar en pantalla
     ======================================================================= */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    var reduce = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      // Escalonado por grupo: los hermanos entran uno detrás de otro
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (e, i) {
        e.target.style.setProperty('--reveal-delay', Math.min(i, 6) * 65 + 'ms');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });

    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* =======================================================================
     Estados de Flux
     -----------------------------------------------------------------------
     Los tramos van en % de presupuesto gastado. Si alguno no cuadra con el
     de la app, se cambia AQUÍ y en ningún otro sitio.
     ======================================================================= */
  var MOOD_LEVELS = [
    {key: 'great', upTo: 49},
    {key: 'good', upTo: 74},
    {key: 'watch', upTo: 89},
    {key: 'careful', upTo: 100},
    {key: 'over', upTo: Infinity},
  ];

  var moodRefresh = null;

  function initMood() {
    var box = document.querySelector('[data-mood]');
    if (!box) return;

    var range = box.querySelector('[data-mood-range]');
    var pctEl = box.querySelector('[data-mood-pct]');
    var barEl = box.querySelector('[data-mood-bar]');
    var phraseEl = box.querySelector('[data-mood-phrase]');
    var faces = {};
    var ready = {};

    // Si todavía no existe el PNG de algún estado, ese estado desaparece de
    // la leyenda y su tramo lo cubre el vecino. Así se puede subir la web
    // antes que las imágenes sin que quede ningún icono roto.
    function markMissing(key) {
      if (ready[key] === false) return;
      ready[key] = false;
      var btn = box.querySelector('[data-mood-key="' + key + '"]');
      if (btn) btn.classList.add('is-missing');
      apply();
    }

    Array.prototype.forEach.call(box.querySelectorAll('[data-mood-face]'), function (img) {
      var key = img.getAttribute('data-mood-face');
      faces[key] = img;
      ready[key] = true;
      img.addEventListener('error', function () { markMissing(key); });
      if (img.complete && img.naturalWidth === 0) markMissing(key);
    });

    function levelFor(pct) {
      var i = 0;
      while (i < MOOD_LEVELS.length - 1 && pct > MOOD_LEVELS[i].upTo) i++;
      if (ready[MOOD_LEVELS[i].key]) return MOOD_LEVELS[i].key;
      for (var d = 1; d < MOOD_LEVELS.length; d++) {
        var down = MOOD_LEVELS[i - d];
        if (down && ready[down.key]) return down.key;
        var up = MOOD_LEVELS[i + d];
        if (up && ready[up.key]) return up.key;
      }
      return null;
    }

    function apply() {
      var pct = parseInt(range.value, 10);
      if (isNaN(pct)) pct = 0;
      var key = levelFor(pct);

      pctEl.textContent = pct;
      barEl.style.width = Math.min(pct, 100) + '%';
      box.setAttribute('data-level', key || '');

      Object.keys(faces).forEach(function (k) {
        faces[k].classList.toggle('is-on', k === key);
      });

      var dict = T[CURRENT_LANG] || T[FALLBACK];
      if (key) phraseEl.textContent = dict['mood.' + key] || T[FALLBACK]['mood.' + key];

      Array.prototype.forEach.call(box.querySelectorAll('[data-mood-key]'), function (btn) {
        btn.setAttribute('aria-pressed',
          btn.getAttribute('data-mood-key') === key ? 'true' : 'false');
      });
    }

    range.addEventListener('input', apply);

    Array.prototype.forEach.call(box.querySelectorAll('[data-mood-go]'), function (btn) {
      btn.addEventListener('click', function () {
        range.value = btn.getAttribute('data-mood-go');
        apply();
      });
    });

    moodRefresh = apply;
    apply();
  }

  /* =======================================================================
     Carrusel de capturas
     ======================================================================= */
  function initRail() {
    var rail = document.querySelector('[data-rail]');
    if (!rail) return;
    var prev = document.querySelector('[data-rail-prev]');
    var next = document.querySelector('[data-rail-next]');

    function step(dir) {
      var card = rail.querySelector('.shot');
      var amount = card ? card.getBoundingClientRect().width + 22 : 240;
      rail.scrollBy({ left: dir * amount * 2, behavior: 'smooth' });
    }

    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });

    function sync() {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max;
    }
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  /* =======================================================================
     Arranque
     ======================================================================= */
  function start() {
    initTheme();
    initLang();
    initMenu();
    initHeader();
    initActiveNav();
    initReveal();
    initMood();
    initRail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
