import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const W = 1280, H = 720;
const NAVY = "#102432", CREAM = "#F6F0E4", GOLD = "#D4A94E";
const INK = "#172A35", MUTED = "#667984", WHITE = "#FFFDF8";
const FONT = "Microsoft JhengHei";
const ROOT = "E:/vault/work/presentations/jung-v2";
const ASSETS = ROOT + "/tmp/assets";
const OUT = "E:/vault/03 Projects（專案）/輸出內容/榮格心理學入門-分享簡報-v2.pptx";

const slides = [
  {type:"cover", title:"榮格心理學入門", sub:"自我重生的人生旅程", kicker:"讀書分享｜序章至第三章", image:"cover.png"},
  {type:"section", chapter:"PROLOGUE", title:"活出自我的榮格心理學", sub:"在自由卻不安的時代，如何找到自己的方向", image:"cover.png"},
  {title:"這三十年來，編織「失去安心的故事」的日本人們", bullets:["人們與會產生負面情緒的「重話」保持距離。","高度經濟成長曾帶來「獲得安心的故事」。","泡沫經濟破滅後的三十年，成為「喪失安心的故事」。","疫情、戰爭、災害與經濟變動，使未來更難預測。"]},
  {title:"名為自由的牢籠", bullets:["男人被困在有無數門扉的建築物裡，只能選一扇門。","門後可能是出口、深淵、獅子，也可能是寶藏。","因為沒有選擇能保證正確，他最後放棄選擇。","不做任何選擇，也是一種選擇。"], dark:true},
  {type:"interaction", title:"能自由選擇事物，究竟代表著什麼呢？", sub:"快速舉手｜你心裡是否也有一個「一直沒選」的選擇？", note:"30 秒；不必解釋原因。"},
  {title:"價值多元的困境", bullets:["婚姻、工作方式、生活地點與性別認同都有更多可能。","共同相信的價值逐漸失去力量，選項卻持續增加。","自由保障多重選項，卻不保證一定能做出正確選擇。","選擇之後的風險與結果，只能由自己承擔。"]},
  {title:"學習榮格心理學是在開咖啡？", bullets:["作者決定前往瑞士榮格研究所時，曾被問「為什麼現在才想到？」","重視實證的心理治療成為主流，榮格心理學看來不合時代。","作者仍感受到榮格心理學在內心大聲作響。","它重視「個性」，也讓作者感到「這樣就好」。"], dark:true},
  {type:"section", chapter:"CHAPTER 1", title:"失敗與落敗是改變的契機", sub:"——個體化——", image:"chapter1.png"},
  {title:"「榮格心理學」這副眼鏡", bullets:["心理學像一副觀看心所需要的眼鏡。","眼鏡因設計與用途不同，卻不分絕對好壞。","重要的不是哪一派萬能，而是此刻是否適合配戴的人。","若這副眼鏡適合你，也反映了你的個性。"]},
  {title:"讓人不安的「人生下半場」", bullets:["人生前半場偏向適應學校、公司與團體。","人生後半場逐漸轉向個人生活與自己的課題。","榮格稱中年階段為「人生的正午」。","年輕不再、老與死進入現實，內在的不安也更清楚。"]},
  {title:"遭遇人生轉折點時，內在的不安會更明顯", bullets:["不安顯著化的時間因人而異。","轉折常在原本順暢的事突然卡住時出現。","失敗或落敗，使舊有做法無法繼續。","這也是重新理解自己與生命方向的契機。"], dark:true},
  {title:"不要拚勝負，要以整體來看待事物", bullets:["只用輸贏判斷人生，容易忽略內在真正發生的事。","榮格心理學關心的不是立刻贏回來。","它試圖理解失敗在整個生命中具有什麼意義。","個體化要求人把未曾活過的部分也納入自己。"]},
  {title:"想要取得 MBA 的人不適合學習榮格心理學？", bullets:["作者以反問說明：榮格心理學不是快速成功的方法。","它不保證提升效率、績效或競爭優勢。","它要求人停下來，聆聽內在不願看見的部分。","這條路指向完整，不是勝負。"]},
  {title:"史蒂芬・賈伯斯可以說是每個人都羨慕的勝利者嗎？", bullets:["外在看來成功的人，也可能必須壓抑真正的自己。","待在人生勝利組，不等於內在沒有失敗。","如果放棄思考、諂媚權力，成功也可能伴隨深刻的落敗。","書中藉此追問：誰有資格定義勝利？"], dark:true},
  {title:"意識與無意識間的溝通", bullets:["為了理解自己，需要讓意識與無意識彼此接觸。","無意識並不是與「我」毫無關係的外部世界。","對話使原本無意識的部分逐漸被意識到。","心的意識範圍也因此擴大。"]},
  {title:"榮格所思考的「心」與「無意識」", bullets:["榮格所說的「心」，包含「我」尚未意識到的部分。","心必須作為一個整體來理解。","當意識與無意識無法溝通，心就失去平衡。","治療的方向，是讓雙方重新接觸。"]},
  {title:"為心找到「家」", bullets:["書中以家與房間比喻心的構造。","主要使用的房間接近意識，倉庫與地下室則遠離意識。","平常關閉的房門，有時會突然打開。","夢裡的家與房間，讓心的不同區域變得可見。"], dark:true},
  {title:"榮格關於家的夢與因為對夢的解釋相左，而與佛洛伊德決裂", bullets:["榮格的家之夢向下通往更古老的樓層。","佛洛伊德傾向從個人經驗與壓抑理解夢。","榮格則看見比個人更深、更古老的無意識層次。","兩人對夢的理解差異，成為決裂的重要背景。"]},
  {type:"interaction", title:"有印象的夢境通常帶有重要的意義", sub:"安靜回想一個至今仍記得的夢。", note:"30 秒｜只記下人物、場景與最強烈的感受。"},
  {type:"section", chapter:"CHAPTER 2", title:"聽從內在的聲音", sub:"——榮格學派的夢的解析——", image:"chapter2.png"},
  {title:"失去的東西不會再回來", bullets:["因失敗而求助的人，常希望回復到失敗前的狀態。","治療者無法讓時間倒流，也不能保證拿回失去的東西。","能做的是傾聽痛苦與悲傷，陪伴對方走一段。","重生要從放下回復原狀的期望開始。"], dark:true},
  {title:"夢境是由無意識發出的訊息，是原創的材料", bullets:["夢不是治療者預先準備好的答案。","它來自做夢者自己的無意識。","夢的內容會隨個性與人生而不同。","因此，夢是理解那個人不可替代的材料。"]},
  {title:"榮格學派的夢的解析是協同作業", bullets:["治療者不能單方面宣布夢的答案。","做夢者的聯想與感受是解析的核心。","雙方一起檢視夢如何與當下生活相連。","解析是一段共同工作，而不是權威判決。"]},
  {title:"治療者與個案的關係是對等且平等的", bullets:["心理治療從彼此都能承受的距離開始。","個案不是被動接受解釋的人。","治療者也必須承認自己不知道答案。","平等關係讓做夢者保有自己人生的主體性。"]},
  {type:"interaction", title:"夢境的解答在那個人的心中", sub:"兩人一組：只問聯想，不替對方解夢。", note:"你想到什麼？當時感受如何？它像最近哪件事？"},
  {title:"陰影——自己都不想認識的自己——", bullets:["陰影是自己不願承認、不想認識的部分。","也可能是沒有機會活出來的自己。","陰影不等於單純的邪惡或缺點。","人一生都可能透過陰影，逐漸知道未曾活過的自己。"], dark:true},
  {title:"對投射了內在陰影的人或物抱有負面情緒", bullets:["書中請讀者想一位自己不喜歡的藝人。","對方令人討厭的特質，可能觸及自己的陰影。","投射使內在內容看起來像只屬於外部的人。","負面情緒因此也可能成為理解自己的入口。"]},
  {title:"阿尼瑪與阿尼姆斯——內心中的異性部分——", bullets:["夢中的異性人物，有時是內在人格的一部分。","書中以阿尼瑪與阿尼姆斯理解這些人物。","它們可能透過投射出現在關係與好感對象中。","夢境讓人與未被意識的內在部分相遇。"]},
  {title:"人格面具——在社會期待中被要求演繹角色的自己——", bullets:["人在社會中必須回應角色與期待。","人格面具幫助我們適應團體生活。","但過度認同角色，可能失去真正的自己。","夢會提醒被角色遮住的內在聲音。"]},
  {title:"智慧老人——引導自己的「內在先知」——", bullets:["面對心理課題後，夢中有時會出現具有智慧的引導者。","引導者可能以老人、老師或其他人物出現。","他不是外部權威的標準答案。","他呈現內心已經知道、但自我尚未理解的方向。"], dark:true},
  {title:"自性與曼陀羅", bullets:["自性是超越自我的心靈整體。","它在夢中可能以圓、正方形或中心意象出現。","曼陀羅呈現秩序、穩定與整體性。","榮格以此理解心靈朝向完整的運動。"]},
  {title:"重生的象徵與無止盡的過程", bullets:["嬰兒或孩子可能與內心的新發展同時出現在夢中。","這些夢常發生在漫長而痛苦的過程之後。","重生不是一次解決所有問題。","人生可能是不斷經歷死亡與重生的過程。"]},
  {type:"section", chapter:"CHAPTER 3", title:"接納人生的不合理", sub:"——內在父親與母親——", image:"chapter3.png"},
  {title:"母親情結與父親情結", bullets:["雙親是內心居民中存在感特別巨大的部分。","情結由情緒、記憶與意象聚集而成。","現實中的雙親會被內化成心理形象。","我們後來面對的，不只是真實父母，也有內在父母。"]},
  {title:"積極與消極的母親情結／積極與消極的父親情結", bullets:["積極的母親情結常伴隨較高的自我肯定感。","積極的父親情結有助於參與社會與團體生活。","消極情結可能帶來否定、批判與壓抑自己的聲音。","積極與消極不是對人的簡單分類，而是內在關係的傾向。"]},
  {title:"母親原型・父親原型與現實間的差距", bullets:["情結以原型為核心形塑而成。","孩子對父母的意象，不一定等同現實中的父母。","內在父母可能被理想化，也可能被妖魔化。","察覺意象與現實的差距，是重要的心理課題。"], dark:true},
  {title:"同性的雙親與角色模型／異性的雙親與阿尼瑪、阿尼姆斯", bullets:["同性雙親常被看作與自己相似的型態或未來樣貌。","異性雙親可能影響內在異性意象與好感對象。","關係中出現的投射，也可能帶有跨世代要素。","書中以此討論雙親如何成為內在參照。"]},
  {type:"interaction", title:"雙親是「扭蛋（靠運氣的）」嗎？", sub:"個人書寫｜不知道「出發地點」，就無法理解自己。", note:"可以只寫，不必分享：我的出發地點留下了什麼？"},
  {title:"雙親或一個家族所背負的業與世代間的鎖鏈", bullets:["雙親未能處理的心理課題，可能由孩子承接。","書中的東歐家庭案例呈現跨世代的不信任。","孩子即使沒有直接經歷事件，也可能活出其影響。","理解傳承不是為了責怪，而是看見自己從何處出發。"]},
  {title:"接受被賦予的命運", bullets:["人無法選擇所有出身、遭遇與失去。","真摯面對心理課題後，人生可能變得比較輕鬆。","接納不等於合理化傷害或停止設立界線。","它是為自己必須承擔的命運尋找意義。"], dark:true},
  {title:"與榮格心理學相通的是《鋼之鍊金術師》", bullets:["兄弟為取回失去的身體，踏上尋找賢者之石的旅程。","作品中的鍊金術與榮格研究的鍊金術並不相同。","但它同樣追問：人如何接受被賦予的命運？","失去無法取消，卻能在經歷中形成一顆心。"]},
  {title:"當不再怪罪雙親，才開始了自己「真正的人生」", bullets:["把一切都歸罪於雙親，會讓人生主導權仍停留在他們手中。","理解影響，不等於否定傷害或責任。","當人開始思考自己要如何回應，真正的人生才展開。","為命運找到屬於自己的意義，生命才有方向。"], closing:true}
];

function addShape(slide, x,y,w,h, fill, radius="roundRect") {
  return slide.shapes.add({geometry:radius, position:{left:x,top:y,width:w,height:h}, fill, line:{style:"solid",fill:"none",width:0}});
}
function addText(slide, text, x,y,w,h, size=20, color=INK, bold=false, align="left") {
  const s=slide.shapes.add({geometry:"textbox",position:{left:x,top:y,width:w,height:h},fill:"none",line:{style:"solid",fill:"none",width:0}});
  s.text=text;
  s.text.style={fontSize:size,color,bold,typeface:FONT,alignment:align};
  return s;
}
async function addImage(slide, file, pos, opacity=1) {
  const b=await fs.readFile(file);
  const ab=b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
  return slide.images.add({blob:ab,contentType:"image/png",alt:"概念插畫",fit:"cover",position:pos,opacity});
}
function footer(slide, n, dark=false) {
  addText(slide,"《榮格心理學入門》｜序章至第三章",64,678,560,18,10,dark?"#AFC0C8":"#7B8A91",false);
  addText(slide,String(n).padStart(2,"0"),1160,674,56,22,11,dark?CREAM:INK,true,"right");
}
function titleBlock(slide,title,dark=false,kicker="BOOK HEADING"){
  addText(slide,kicker,72,48,400,24,12,GOLD,true);
  addText(slide,title,72,86,1136,84,title.length>25?27:31,dark?CREAM:INK,true);
  addShape(slide,72,176,92,6,GOLD);
}
function addBullets(slide, bullets, dark=false, startY=220) {
  const color=dark?"#E9E2D5":MUTED;
  bullets.slice(0,4).forEach((b,i)=>{
    addText(slide,"●",88,startY+i*96,30,30,15,GOLD,true);
    addText(slide,b,126,startY-2+i*96,1030,68,19,color,false);
  });
}
function addMotif(slide, idx, dark=false){
  const x=1088, y=546;
  addShape(slide,x,y,82,82,dark?"#183746":"#E7DDC9");
  addText(slide,String((idx%9)+1),x,y+19,82,40,28,dark?GOLD:NAVY,true,"center");
}

const pres=Presentation.create({slideSize:{width:W,height:H}});
for(let i=0;i<slides.length;i++){
  const spec=slides[i], slide=pres.slides.add();
  if(spec.type==="cover"){
    slide.background.fill=NAVY;
    await addImage(slide,ASSETS+"/"+spec.image,{left:0,top:0,width:W,height:H});
    addShape(slide,0,0,660,H,"#102432DD","rect");
    addText(slide,spec.kicker,76,82,460,28,14,GOLD,true);
    addText(slide,spec.title,76,178,500,76,54,CREAM,true);
    addText(slide,spec.sub,78,274,460,44,24,"#E2D7C4",false);
    addText(slide,"山根久美子",78,604,260,30,16,"#C8B98F",false);
    footer(slide,i+1,true);
  } else if(spec.type==="section"){
    slide.background.fill=NAVY;
    await addImage(slide,ASSETS+"/"+spec.image,{left:0,top:0,width:W,height:H});
    addShape(slide,0,0,620,H,"#102432D8","rect");
    addText(slide,spec.chapter,74,84,360,28,14,GOLD,true);
    addText(slide,spec.title,74,184,500,132,38,CREAM,true);
    addText(slide,spec.sub,76,342,480,58,21,"#D8CCB7",false);
    footer(slide,i+1,true);
  } else if(spec.type==="interaction"){
    slide.background.fill=NAVY;
    addText(slide,"INTERACTION｜互動",72,56,360,28,13,GOLD,true);
    addText(slide,spec.title,96,168,1080,150,spec.title.length>24?31:38,CREAM,true,"center");
    addShape(slide,264,360,752,4,GOLD);
    addText(slide,spec.sub,154,408,972,60,22,"#E9DFC9",false,"center");
    addText(slide,spec.note,240,512,800,44,16,"#AFC0C8",false,"center");
    footer(slide,i+1,true);
  } else {
    const dark=!!spec.dark || !!spec.closing;
    slide.background.fill=dark?NAVY:CREAM;
    const chapterLabel = i < 7
      ? "序章｜活出自我的榮格心理學"
      : i < 19
        ? "第一章｜個體化"
        : i < 32
          ? "第二章｜夢的解析"
          : "第三章｜內在父親與母親";
    titleBlock(slide,spec.title,dark,chapterLabel);
    addBullets(slide,spec.bullets,dark,222);
    if(spec.closing) addShape(slide,0,652,W,68,GOLD,"rect");
    footer(slide,i+1,dark);
  }
}

await fs.mkdir(ROOT+"/tmp/slides",{recursive:true});
await fs.mkdir(ROOT+"/tmp/layout",{recursive:true});
for (let i=0;i<pres.slides.items.length;i++){
  const slide=pres.slides.items[i], stem=String(i+1).padStart(2,"0");
  const png=await pres.export({slide,format:"png",scale:1});
  await fs.writeFile(ROOT+"/tmp/slides/slide-"+stem+".png",new Uint8Array(await png.arrayBuffer()));
  const layout=await slide.export({format:"layout"});
  await fs.writeFile(ROOT+"/tmp/layout/slide-"+stem+".json",await layout.text());
}
const montage=await pres.export({format:"webp",montage:true,scale:0.5});
await fs.writeFile(ROOT+"/tmp/montage.webp",new Uint8Array(await montage.arrayBuffer()));
const pptx=await PresentationFile.exportPptx(pres);
await pptx.save(OUT);
console.log(JSON.stringify({out:OUT,slides:slides.length,montage:ROOT+"/tmp/montage.webp"}));
