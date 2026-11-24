import pathlib, re

p = pathlib.Path('mugeniki-kalkulyator.html')
s = p.read_text()

# 1. catalog data: all 13 items, prices from src/data/products.ts, volumes are estimates
new_skus = '''  var SKUS = [
    {n:"Konoha round donburi, большая", p:4235, v:0.0045, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Kohanako round donburi, большая", p:4235, v:0.0045, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Canelé mug", p:2750, v:0.0025, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Hana-musubi bowl, мокко", p:3080, v:0.0018, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Sanbō naburi bowl", p:3300, v:0.0022, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Rinka plate, большая", p:3850, v:0.0035, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Kikuzaki oval plate, младший размер", p:1760, v:0.0016, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Rim octagonal plate, младший размер", p:1650, v:0.0014, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Shinogi soba cup", p:null, v:0.0012, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Shōchikubai, набор из трёх", p:6050, v:0.0035, w:"皓洋窯 (Kōyōgama), Арита"},
    {n:"Tea bowls, разные глазури", p:null, v:0.0016, w:"嘉祥窯 (Kashogama), Киото"},
    {n:"Mizusashi, сосуд для воды", p:null, v:0.0060, w:"嘉祥窯 (Kashogama), Киото"},
    {n:"Bespoke tableware для отеля", p:null, v:0.0040, w:"嘉祥窯 (Kashogama), Киото"}
  ];'''
s = re.sub(r'  var SKUS = \[.*?\n  \];', new_skus, s, flags=re.S)

# 2. markup: presets -> select with groups
old_markup = '''    <div class="presets" id="presets"></div>'''
new_markup = '''    <label for="sku">Позиция каталога</label>
    <select id="sku" style="margin-bottom:14px"></select>
    <p class="hint" id="sku_hint" style="margin:-6px 0 14px"></p>'''
s = s.replace(old_markup, new_markup)

# 3. JS: build the select instead of buttons
old_js = '''  var box = document.getElementById("presets");
  SKUS.forEach(function(s,i){
    var b = document.createElement("button");
    b.type = "button"; b.textContent = s[0]; b.dataset.i = i;
    b.setAttribute("aria-pressed", i===0 ? "true" : "false");
    b.addEventListener("click", function(){
      el.retail.value = s[1]; el.m3.value = s[2];
      [].forEach.call(box.children, function(x){ x.setAttribute("aria-pressed","false"); });
      b.setAttribute("aria-pressed","true");
      render();
    });
    box.appendChild(b);
  });'''
new_js = '''  var sel = document.getElementById("sku");
  var hint = document.getElementById("sku_hint");
  var groups = {};
  var groupOrder = [];
  SKUS.forEach(function(s,i){
    if (!groups[s.w]) { groups[s.w] = []; groupOrder.push(s.w); }
    groups[s.w].push(i);
  });
  var own = document.createElement("option");
  own.value = "-1"; own.textContent = "Своя позиция"; sel.appendChild(own);
  groupOrder.forEach(function(g){
    var og = document.createElement("optgroup"); og.label = g;
    groups[g].forEach(function(i){
      var o = document.createElement("option");
      o.value = String(i);
      o.textContent = SKUS[i].n + (SKUS[i].p === null ? " (цена по запросу)" : "");
      og.appendChild(o);
    });
    sel.appendChild(og);
  });
  sel.value = "0";

  function applySku(i){
    if (i < 0) { hint.textContent = "Введите розничную цену, объём штуки и остальные параметры вручную."; return; }
    var s = SKUS[i];
    el.m3.value = s.v;
    if (s.p !== null) { el.retail.value = s.p; }
    hint.textContent = s.p === null
      ? "Цена мастерской не опубликована — в поле розницы стоит прежнее значение, поставьте свою оценку."
      : s.w;
    render();
    if (s.p === null) { hint.textContent = "Цена мастерской не опубликована — в поле розницы стоит прежнее значение, поставьте свою оценку."; }
  }
  sel.addEventListener("change", function(){ applySku(parseInt(sel.value,10)); });
  applySku(0);'''
s = s.replace(old_js, new_js)

# 4. render(): drop the aria-pressed bookkeeping
old_block = s[s.find('    var btn = document.querySelector(".presets button[aria-pressed=true]");'):s.find('  }\n\n  var sel = document.getElementById("sku");')]
if old_block:
    s = s.replace(old_block, '')

# 5. table: handle items without a published price
old_rows = '''    SKUS.forEach(function(s){
      var x = calc(s[1], s[2]);
      rows += "<tr><td>" + s[0] + "</td><td class='r'>" + eur(x.landed) +
              "</td><td class='r'>" + eur(x.wholesale) + "</td><td class='r'>" + eur(x.wholesale*2) + "</td></tr>";
    });'''
new_rows = '''    SKUS.forEach(function(s){
      if (s.p === null) {
        rows += "<tr><td>" + s.n + "</td><td class='r' colspan='3'>цена по запросу</td></tr>";
        return;
      }
      var x = calc(s.p, s.v);
      rows += "<tr><td>" + s.n + "</td><td class='r'>" + eur(x.landed) +
              "</td><td class='r'>" + eur(x.wholesale) + "</td><td class='r'>" + eur(x.wholesale*2) + "</td></tr>";
    });'''
s = s.replace(old_rows, new_rows)

# 6. footer note about volumes
s = s.replace("Доля ex-works 55 %, упаковка 2,20 €, бой 2 %, платежи 1,5 % — допущения",
              "Объём штуки — оценка по габаритам, а не измерение коробки. Доля ex-works 55 %, упаковка 2,20 €, бой 2 %, платежи 1,5 % — допущения")

p.write_text(s)
print("patched:", len(s))
for probe in ["var SKUS", "id=\"sku\"", "applySku", "цена по запросу"]:
    print(probe, s.count(probe))