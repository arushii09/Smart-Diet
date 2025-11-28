const T = {
  en: {
    title: "Food Barcode Scanner",
    subtitle: "Scan a barcode with your camera to fetch product info (OpenFoodFacts) — AI optional.",
    manual: "Manual barcode / UPC",
    start: "Start camera",
    stop: "Stop",
    lookup: "Lookup",
    enableAI: "Enable AI lookup",
    aiRun: "Run AI",
    statusIdle: "Idle",
    statusScanning: "Scanning",
    statusFound: "Found",
    noImage: "No image",
    openOnOFF: "Open on OpenFoodFacts",
    clear: "Clear",
    noProduct: "No product scanned",
    fetching: "Fetching…",
    productNotFound: "Product not found",
  },
  hi: {
    title: "फूड बारकोड स्कैनर",
    subtitle: "कैमरे से बारकोड स्कैन करें और उत्पाद जानकारी प्राप्त करें (OpenFoodFacts) — AI वैकल्पिक।",
    manual: "मैनुअल बारकोड / UPC",
    start: "कैमरा चालू करें",
    stop: "रोकें",
    lookup: "खोजें",
    enableAI: "AI लुकअप सक्षम करें",
    aiRun: "AI चलाएँ",
    statusIdle: "निष्क्रिय",
    statusScanning: "स्कैन हो रहा है",
    statusFound: "मिला",
    noImage: "कोई छवि नहीं",
    openOnOFF: "OpenFoodFacts पर खोलें",
    clear: "साफ़ करें",
    noProduct: "कोई उत्पाद स्कैन नहीं हुआ",
    fetching: "प्राप्त कर रहे हैं…",
    productNotFound: "उत्पाद नहीं मिला",
  },
  es: {
    title: "Escáner de Códigos",
    subtitle: "Escanea un código con la cámara para obtener info del producto (OpenFoodFacts) — AI opcional.",
    manual: "Código / UPC manual",
    start: "Iniciar cámara",
    stop: "Detener",
    lookup: "Buscar",
    enableAI: "Habilitar AI",
    aiRun: "Ejecutar AI",
    statusIdle: "Inactivo",
    statusScanning: "Escaneando",
    statusFound: "Encontrado",
    noImage: "Sin imagen",
    openOnOFF: "Abrir en OpenFoodFacts",
    clear: "Limpiar",
    noProduct: "Ningún producto escaneado",
    fetching: "Buscando…",
    productNotFound: "Producto no encontrado",
  },
  fr: {
    title: "Scanner de Codes-barres",
    subtitle: "Scannez un code avec la caméra pour récupérer les infos (OpenFoodFacts) — AI optionnel.",
    manual: "Code / UPC manuel",
    start: "Démarrer la caméra",
    stop: "Arrêter",
    lookup: "Rechercher",
    enableAI: "Activer AI",
    aiRun: "Exécuter AI",
    statusIdle: "Inactif",
    statusScanning: "Scanning",
    statusFound: "Trouvé",
    noImage: "Pas d'image",
    openOnOFF: "Ouvrir sur OpenFoodFacts",
    clear: "Effacer",
    noProduct: "Aucun produit scanné",
    fetching: "Récupération…",
    productNotFound: "Produit introuvable",
  },
  ar: {
    title: "ماسح باركود الطعام",
    subtitle: "امسح الباركود بالكاميرا للحصول على معلومات المنتج (OpenFoodFacts) — AI اختياري.",
    manual: "باركود يدوي / UPC",
    start: "تشغيل الكاميرا",
    stop: "إيقاف",
    lookup: "بحث",
    enableAI: "تمكين AI",
    aiRun: "تشغيل AI",
    statusIdle: "خامل",
    statusScanning: "جارٍ المسح",
    statusFound: "تم العثور",
    noImage: "لا توجد صورة",
    openOnOFF: "فتح على OpenFoodFacts",
    clear: "مسح",
    noProduct: "لم يتم مسح أي منتج",
    fetching: "جاري التحميل…",
    productNotFound: "لم يتم العثور على المنتج",
  }
};

/* DOM helpers */
const $ = id => document.getElementById(id);
const langSelect = $('lang');

/* app state */
let scanner = null;
let currentLang = 'en';
let lastBarcode = '';
let openFoodFactsUrl = '';

/* UI elements */
const startBtn = $('startBtn');
const stopBtn = $('stopBtn');
const lookupBtn = $('lookupBtn');
const readerEl = $('reader');
const manualInput = $('manualInput');
const statusBadge = $('statusBadge');
const productTitle = $('productTitle');
const productBrand = $('productBrand');
const productImage = $('productImage');
const productDesc = $('productDesc');
const nutritionBox = $('nutritionBox');
const nutritionList = $('nutritionList');
const lastCode = $('lastCode');
const openProductBtn = $('openProductBtn');
const clearBtn = $('clearBtn');
const aiToggle = $('aiToggle');
const aiPanel = $('aiPanel');
const aiRun = $('aiRun');
const aiOutput = $('aiOutput');
const aiTitle = $('aiTitle');

/* translations application */
function applyLang(lang){
  currentLang = lang;
  const t = T[lang] || T.en;
  $('title').textContent = t.title;
  $('subtitle').textContent = t.subtitle;
  $('label-manual').textContent = t.manual;
  startBtn.textContent = t.start;
  stopBtn.textContent = t.stop;
  lookupBtn.textContent = t.lookup;
  $('aiTitle').textContent = t.aiRun;
  statusBadge.textContent = t.statusIdle;
  openProductBtn.textContent = t.openOnOFF;
  clearBtn.textContent = t.clear;
  aiRun.textContent = t.aiRun;
  aiPanel.style.display = aiToggle.checked ? 'block' : 'none';
  // Arabic: set RTL
  if(lang === 'ar') document.documentElement.setAttribute('dir','rtl');
  else document.documentElement.removeAttribute('dir');
}
langSelect.addEventListener('change', ()=> applyLang(langSelect.value));
applyLang(currentLang);

/* start camera scanner */
startBtn.addEventListener('click', async () => {
  try {
    // If already running, ignore
    if(scanner) return;
    statusBadge.textContent = T[currentLang].statusScanning;
    readerEl.innerHTML = '';
    // create scanner
    scanner = new Html5Qrcode("reader", /* verbose= */ false);
    const cameras = await Html5Qrcode.getCameras();
    const cameraId = cameras && cameras.length ? cameras[0].id : undefined;
    await scanner.start(
      cameraId ? { deviceId: { exact: cameraId } } : { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 300, height: 100 },
        experimentalFeatures: { useBarCodeDetectorIfSupported: true }
      },
      decodedText => {
        // On successful scan
        if (!decodedText) return;
        // Avoid duplicates
        if(decodedText === lastBarcode) return;
        lastBarcode = decodedText;
        onBarcodeScanned(decodedText);
      },
      errorMessage => {
        // ignore scanning errors
      }
    );
  } catch(err){
    console.error("camera error", err);
    alert("Camera failed — check permissions or use manual lookup.");
    statusBadge.textContent = T[currentLang].statusIdle;
    if(scanner){ try{ await scanner.stop(); scanner = null; }catch(e){} }
  }
});

/* stop scanner */
stopBtn.addEventListener('click', async () => {
  if(!scanner) return;
  try{
    await scanner.stop();
    scanner.clear();
  }catch(e){/*ignore*/}
  scanner = null;
  statusBadge.textContent = T[currentLang].statusIdle;
});

/* manual lookup */
lookupBtn.addEventListener('click', () => {
  const code = manualInput.value.trim();
  if(!code) { alert("Enter a barcode"); return; }
  onBarcodeScanned(code);
});

/* when scanned */
async function onBarcodeScanned(code){
  statusBadge.textContent = T[currentLang].statusFound;
  lastCode.textContent = code;
  $('lastCode').textContent = code;
  productTitle.textContent = T[currentLang].fetching;
  productBrand.textContent = "";
  productImage.innerHTML = '<span class="muted">'+T[currentLang].noImage+'</span>';
  productDesc.textContent = "";
  nutritionBox.style.display = 'none';
  openFoodFactsUrl = '';

  // OpenFoodFacts lookup
  try {
    const resp = await fetch(`https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`);
    const data = await resp.json();
    if(data.status === 1 && data.product) {
      const p = data.product;
      displayProductFromOFF(p, code);
    } else {
      productTitle.textContent = T[currentLang].productNotFound;
      productBrand.textContent = "";
    }
  } catch(e){
    console.error("lookup error", e);
    productTitle.textContent = "Lookup error";
    productDesc.textContent = String(e);
  }
}

/* display product info returned by OpenFoodFacts */
function displayProductFromOFF(p, code){
  const name = p.product_name || p.generic_name || p.brands || "Unnamed product";
  const brand = p.brands || "";
  const img = p.image_small_url || p.image_url || "";
  productTitle.textContent = name;
  productBrand.textContent = brand;
  if(img){
    productImage.innerHTML = `<img src="${img}" alt="${escapeHtml(name)}">`;
  } else {
    productImage.innerHTML = `<span class="muted">${T[currentLang].noImage}</span>`;
  }
  // short description
  const short = (p.ingredients_text || p.generic_name || p.quantity || "").slice(0,200);
  productDesc.textContent = short || (p.categories || "").slice(0,200);
  // nutrition
  if(p.nutriments){
    nutritionBox.style.display = 'block';
    nutritionList.innerHTML = `
      <div>Energy: ${(p.nutriments['energy-kcal_100g'] ?? p.nutriments['energy-kj_100g'] ?? '-')}</div>
      <div>Fat: ${p.nutriments['fat_100g'] ?? '-' } g</div>
      <div>Saturated fat: ${p.nutriments['saturated-fat_100g'] ?? '-'} g</div>
      <div>Sugars: ${p.nutriments['sugars_100g'] ?? '-'} g</div>
      <div>Salt: ${p.nutriments['salt_100g'] ?? '-'} g</div>
    `;
  } else {
    nutritionBox.style.display = 'none';
  }

  openFoodFactsUrl = `https://world.openfoodfacts.org/product/${encodeURIComponent(p.code || code)}`;
  $('openProductBtn').onclick = () => { window.open(openFoodFactsUrl, '_blank'); };

  // show ingredients preview
  const ingredientsText = p.ingredients_text || p.ingredients_text_en || "";
  // show in AI panel if enabled
  if(aiToggle.checked){
    $('aiPanel').style.display = 'block';
    // show ingredients in output area as initial content
    aiOutput.textContent = ingredientsText ? "Ingredients: " + ingredientsText : "No ingredients text available.";
  } else {
    $('aiPanel').style.display = 'none';
  }
}

/* Clear UI */
clearBtn.addEventListener('click', () => {
  lastBarcode = '';
  $('lastCode').textContent = '—';
  productTitle.textContent = T[currentLang].noProduct;
  productBrand.textContent = T[currentLang].noProduct;
  productImage.innerHTML = '<span class="muted">'+T[currentLang].noImage+'</span>';
  productDesc.textContent = '';
  nutritionBox.style.display = 'none';
  aiOutput.textContent = '';
});

/* AI toggle UI */
aiToggle.addEventListener('change', () => {
  aiPanel.style.display = aiToggle.checked ? 'block' : 'none';
});

/* AI run (client-side stub calls server) */
aiRun.addEventListener('click', async () => {
  const ingredients = aiOutput.textContent || '';
  if(!aiToggle.checked){
    alert("Enable AI toggle first to call server.");
    return;
  }
  if(!ingredients || ingredients.length < 3){
    alert("No ingredients text to analyze.");
    return;
  }

  // By default we DO NOT call any remote AI. Replace `AI_ENABLED` to true and set `aiEndpoint`
  const AI_ENABLED = false; // change to true AFTER you deploy server
  const aiEndpoint = "/api/parse-ingredients"; // update to your server URL

  if(!AI_ENABLED){
    // local demo output (no network)
    aiOutput.textContent = "Demo AI output (server not enabled):\n" +
      JSON.stringify({
        parsedIngredients: (ingredients || "").split(',').slice(0,10).map(s => s.trim()),
        possibleAllergens: /milk|soy|egg|peanut|almond|wheat|gluten/i.test(ingredients) ? ["milk"] : [],
        suggestions: ["Use smaller portions", "Consider lower-sugar alternative"]
      }, null, 2);
    return;
  }

  // if enabled: call server securely
  aiRun.textContent = "Running...";
  try {
    const resp = await fetch(aiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientsText: ingredients })
    });
    const json = await resp.json();
    aiOutput.textContent = JSON.stringify(json, null, 2);
  } catch(e){
    aiOutput.textContent = "AI error: " + (e.message || e);
  } finally {
    aiRun.textContent = T[currentLang].aiRun;
  }
});

/* tiny helper */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* initial state */
applyLang(currentLang);
productImage.innerHTML = `<span class="muted">${T[currentLang].noImage}</span>`;

/* accessibility: allow enter on manual input to lookup */
manualInput.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter') lookupBtn.click();
});

