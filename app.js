(() => {
  "use strict";

  const STORAGE_KEY = "kvadro-partners-demo-v2";
  const DEMO_TODAY = "2026-08-07";
  const stages = ["Новый", "Встреча", "Расчёт", "Проектирование", "Согласование", "Договор", "Закрыт"];
  const commissionStatuses = ["Начислена", "Согласована", "К выплате", "Выплачена"];
  const months = ["янв.", "февр.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."];

  const partnerSeed = [
    ["Елена Соколова","Sokolova Interior","Дизайнер","Ярославль","A","Активный","+7 910 820-14-32","sokolova@interior.ru",12,5,6840000,342000,"2026-08-05"],
    ["Алексей Воронцов","AV Architecture","Архитектор","Ярославль","A","Активный","+7 920 117-46-88","alex@avarch.ru",10,4,5920000,296000,"2026-08-03"],
    ["Мария Белова","Belo Design","Дизайнер","Москва","A","Активный","+7 916 443-26-70","maria@belodesign.ru",9,4,5170000,258500,"2026-08-06"],
    ["Дмитрий Лебедев","Лебедев Строй","Строитель","Ярославль","A","Развитие","+7 903 691-72-41","d.lebedev@stroy.ru",8,3,4260000,213000,"2026-07-28"],
    ["Ольга Миронова","OM Home","Комплектатор","Кострома","B","Активный","+7 915 903-55-19","olga@omhome.ru",7,3,3780000,189000,"2026-08-01"],
    ["Ирина Кузнецова","IK Design","Дизайнер","Рыбинск","B","Активный","+7 905 637-09-14","hello@ikdesign.ru",6,2,2910000,145500,"2026-08-04"],
    ["Сергей Орлов","Орлов Проект","Прораб","Ярославль","B","Активный","+7 980 118-32-47","orlov@proekt.ru",5,2,2460000,123000,"2026-07-31"],
    ["Анна Волкова","Volkova Studio","Дизайнер","Иваново","B","Развитие","+7 915 772-13-64","anna@volkova.studio",5,2,2180000,109000,"2026-07-24"],
    ["Михаил Романов","Романов Архитекторы","Архитектор","Ярославль","A","Активный","+7 910 665-29-08","office@romanov.ru",8,3,4080000,204000,"2026-08-02"],
    ["Наталья Морозова","NM Décor","Декоратор","Ярославль","B","Активный","+7 903 826-57-03","nm@decor.ru",4,1,1390000,69500,"2026-07-29"],
    ["Павел Тихонов","Тихонов Ремонт","Строитель","Кострома","B","Развитие","+7 920 650-71-26","pavel@tihonov.ru",4,1,1240000,62000,"2026-07-22"],
    ["Ксения Фролова","Forma Space","Дизайнер","Москва","B","Активный","+7 926 202-80-61","ksenia@forma.space",6,2,2650000,132500,"2026-08-05"],
    ["Виктор Громов","Громов Строй","Строитель","Рыбинск","C","Пауза","+7 905 130-44-91","gromov@stroy.ru",2,0,0,0,"2026-06-18"],
    ["Светлана Новикова","Nova Interiors","Дизайнер","Ярославль","C","Развитие","+7 980 701-16-82","sveta@nova.ru",3,1,890000,44500,"2026-07-26"],
    ["Андрей Попов","AP Project","Архитектор","Иваново","C","Развитие","+7 910 304-72-17","andrey@approject.ru",2,0,0,0,"2026-07-20"],
    ["Людмила Зайцева","LZ Home","Комплектатор","Ярославль","B","Активный","+7 903 881-05-43","lz@home.ru",4,1,1160000,58000,"2026-07-30"],
    ["Роман Егоров","Егоров Бюро","Архитектор","Кострома","C","Пауза","+7 915 538-70-92","roman@egorov.ru",2,0,0,0,"2026-06-29"],
    ["Татьяна Семёнова","Semyonova Design","Дизайнер","Рыбинск","C","Развитие","+7 920 414-86-25","tanya@semyonova.ru",3,1,760000,38000,"2026-07-18"],
    ["Игорь Макаров","Макаров Отделка","Прораб","Ярославль","C","Пауза","+7 905 277-34-60","makarov@otdelka.ru",1,0,0,0,"2026-06-05"],
    ["Дарья Власова","DV Studio","Дизайнер","Ярославль","C","Новый","+7 980 159-28-73","daria@dvstudio.ru",1,0,0,0,"2026-08-06"]
  ];

  const objectSeed = [
    ["Кухня в ЖК «Династия»","Виктория Громова",0,5,1420000,"2026-07-06","2026-08-09","Согласовать финальную спецификацию"],
    ["Дом в Карабихе","Андрей Нестеров",1,6,1980000,"2026-05-14","2026-08-12","Получить отзыв и фото"],
    ["Квартира на Волжской","Оксана Юдина",2,5,1260000,"2026-06-18","2026-08-10","Подписание договора"],
    ["Загородный дом «Сосны»","Илья Котов",3,6,2140000,"2026-04-22","2026-08-15","Закрыть расчёты"],
    ["Апартаменты River Park","Полина Савина",4,5,1180000,"2026-07-01","2026-08-11","Внести правки в договор"],
    ["Квартира на Свободе","Евгений Ларин",5,6,960000,"2026-05-29","2026-08-13","Запросить рекомендацию"],
    ["Дом в Некрасовском","Артём Панов",6,5,1540000,"2026-06-25","2026-08-09","Получить оригинал договора"],
    ["Кухня для шоурума","Вера Казакова",7,6,870000,"2026-04-18","2026-08-18","Подготовить кейс"],
    ["Квартира в ЖК «Сердце»","Максим Фомин",8,5,1360000,"2026-07-11","2026-08-10","Согласовать дату монтажа"],
    ["Дом на Туношне","Лариса Крылова",9,6,1120000,"2026-05-03","2026-08-14","Финальная оплата"],
    ["Кухня Loft","Никита Щербаков",10,5,780000,"2026-07-15","2026-08-11","Отправить договор клиенту"],
    ["Квартира на Которосли","Алёна Киселёва",11,6,1240000,"2026-05-20","2026-08-20","Собрать фото проекта"],
    ["Дом «Белый берег»","Олег Жуков",0,4,1760000,"2026-07-24","2026-08-08","Получить согласование фасадов"],
    ["Квартира на Угличской","Елена Федотова",1,4,890000,"2026-07-27","2026-08-09","Утвердить материалы"],
    ["Дом в Заволжье","Глеб Сорокин",4,3,1490000,"2026-07-29","2026-08-12","Подготовить визуализацию"],
    ["Студия на Победы","Марина Баранова",5,3,620000,"2026-08-01","2026-08-08","Показать первый проект"],
    ["Квартира в Брагино","Денис Наумов",8,2,930000,"2026-08-02","2026-08-09","Отправить расчёт"],
    ["Дом в Прусово","Инна Комарова",11,2,1670000,"2026-07-31","2026-08-10","Уточнить бюджет техники"],
    ["Кухня «Тёплый камень»","Софья Давыдова",14,2,740000,"2026-08-03","2026-08-08","Подготовить три варианта"],
    ["Квартира на Чехова","Вадим Голубев",15,1,1090000,"2026-08-04","2026-08-08","Провести встречу в салоне"],
    ["Дом в Кормилицино","Юлия Ершова",6,1,1880000,"2026-08-05","2026-08-09","Выезд на замер"],
    ["Апартаменты «Панорама»","Кирилл Анисимов",2,1,1350000,"2026-08-05","2026-08-10","Обсудить референсы"],
    ["Кухня в ЖК «Новый город»","Надежда Осипова",12,0,810000,"2026-08-06","2026-08-08","Первичный звонок"],
    ["Квартира на Московском","Степан Куликов",17,0,970000,"2026-08-06","2026-08-08","Назначить встречу"],
    ["Дом в Красном Бору","Екатерина Маслова",19,0,1630000,"2026-08-07","2026-08-09","Уточнить состав проекта"]
  ];

  function defaultData() {
    const partners = partnerSeed.map((p, i) => ({
      id: "P" + String(i + 1).padStart(3, "0"), name:p[0], company:p[1], type:p[2], region:p[3],
      category:p[4], status:p[5], phone:p[6], email:p[7], requests:p[8], contracts:p[9],
      revenue:p[10], commission:p[11], lastContact:p[12],
      source: i % 3 === 0 ? "Личная рекомендация" : i % 3 === 1 ? "Мероприятие" : "Профессиональное сообщество",
      nextAction: i % 4 === 0 ? "Позвонить и обсудить новый объект" : i % 4 === 1 ? "Пригласить на встречу в студию" : i % 4 === 2 ? "Отправить подборку новых материалов" : "Уточнить планы на ближайший месяц",
      nextActionDate: ["2026-08-08","2026-08-09","2026-08-12","2026-08-15"][i % 4],
      interactions: [
        {id:"I"+i+"a", date:p[12], type:i%2 ? "Звонок" : "Встреча", note:i%2 ? "Обсудили текущие проекты и ближайшие задачи." : "Встреча в студии, показали новые образцы фасадов."},
        {id:"I"+i+"b", date:"2026-07-"+String(8+(i%18)).padStart(2,"0"), type:"Сообщение", note:"Отправили презентацию партнёрской программы и условия."}
      ]
    }));

    const objects = objectSeed.map((o, i) => ({
      id:"O"+String(i+1).padStart(3,"0"), number:"КП-"+String(2601+i), name:o[0], client:o[1],
      partnerId:partners[o[2]].id, stage:o[3], budget:o[4], created:o[5], nextDate:o[6], nextAction:o[7],
      description:i%2 ? "Мебель для кухни и основных жилых зон. Требуется согласование материалов и сроков." : "Индивидуальный проект корпусной мебели по дизайн-проекту партнёра.",
      contact:"+7 9"+String(10+i).padStart(2,"0")+" "+String(300+i)+"-"+String(20+i)+"-"+String(10+i)
    }));

    const contractObjects = objects.filter(o => o.stage >= 5);
    const contracts = contractObjects.map((o, i) => ({
      id:"D"+String(i+1).padStart(3,"0"), number:"ДП-"+String(1180+i), objectId:o.id, partnerId:o.partnerId,
      amount:o.budget, date:"2026-"+(i<5?"07":"06")+"-"+String(5+(i%20)).padStart(2,"0"),
      status:o.stage===6 ? "Исполнен" : "В работе"
    }));

    const commissions = contracts.map((c, i) => ({
      id:"C"+String(i+1).padStart(3,"0"), contractId:c.id, objectId:c.objectId, partnerId:c.partnerId,
      base:c.amount, rate:i%5===0?7:5, amount:Math.round(c.amount*(i%5===0?.07:.05)),
      status:commissionStatuses[i%4], dueDate:"2026-"+(i<7?"08":"09")+"-"+String(10+(i%16)).padStart(2,"0")
    }));

    partners.forEach(p => {
      const partnerObjects = objects.filter(o => o.partnerId === p.id);
      const partnerContracts = contracts.filter(c => c.partnerId === p.id);
      const partnerCommissions = commissions.filter(c => c.partnerId === p.id);
      p.requests = partnerObjects.length;
      p.contracts = partnerContracts.length;
      p.revenue = partnerContracts.reduce((sum, c) => sum + c.amount, 0);
      p.commission = partnerCommissions.reduce((sum, c) => sum + c.amount, 0);
    });

    const events = [
      {id:"E001",title:"Закрытый завтрак для дизайнеров",date:"2026-08-20",place:"Студия «Квадро»",status:"Запланировано",budget:65000,participants:24,newPartners:8,requests:5,contracts:2,revenue:2460000,result:"Ожидаемая окупаемость ×37,8",partnerIds:partners.slice(0,8).map(p=>p.id),description:"Камерная встреча с презентацией новых материалов, разбором кейсов и знакомством с производством."},
      {id:"E002",title:"Экскурсия на производство",date:"2026-07-18",place:"Производственная площадка",status:"Проведено",budget:38000,participants:16,newPartners:5,requests:4,contracts:2,revenue:1980000,result:"Окупаемость ×52,1",partnerIds:partners.slice(5,14).map(p=>p.id),description:"Показали полный путь заказа от проекта до монтажа и ответили на технические вопросы."},
      {id:"E003",title:"Design Community Ярославль",date:"2026-06-26",place:"Лофт «Фабрика»",status:"Проведено",budget:92000,participants:46,newPartners:11,requests:7,contracts:3,revenue:3720000,result:"Окупаемость ×40,4",partnerIds:partners.slice(1,17).map(p=>p.id),description:"Партнёрское участие в профессиональном вечере дизайнеров и архитекторов."},
      {id:"E004",title:"Презентация коллекции фасадов",date:"2026-09-12",place:"Студия «Квадро»",status:"Подготовка",budget:78000,participants:30,newPartners:9,requests:6,contracts:2,revenue:2840000,result:"Плановая окупаемость ×36,4",partnerIds:partners.slice(9,20).map(p=>p.id),description:"Презентация новой коллекции и практическая сессия по сочетанию материалов."}
    ];

    const tasks = [
      {id:"T001",title:"Позвонить Елене Соколовой",meta:"Обсудить объект «Белый берег»",time:"10:00",priority:"high",linkType:"partner",linkId:"P001",done:false},
      {id:"T002",title:"Согласовать комиссию по КП-2601",meta:"342 000 ₽ · договор ДП-1180",time:"11:30",priority:"high",linkType:"commission",linkId:"C001",done:false},
      {id:"T003",title:"Отправить расчёт Денису Наумову",meta:"Квартира в Брагино",time:"13:00",priority:"normal",linkType:"object",linkId:"O017",done:false},
      {id:"T004",title:"Подтвердить участников завтрака",meta:"Закрытый завтрак для дизайнеров",time:"15:00",priority:"normal",linkType:"event",linkId:"E001",done:false},
      {id:"T005",title:"Подготовить образцы для встречи",meta:"Встреча с Андреем Поповым",time:"17:00",priority:"normal",linkType:"partner",linkId:"P015",done:false}
    ];
    return {partners,objects,contracts,commissions,events,tasks,analyticsPeriod:90};
  }

  function loadData(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(parsed && parsed.partners && parsed.objects) return parsed;
    } catch(e) {}
    return defaultData();
  }

  let data = loadData();
  let currentPage = "today";
  let partnerTab = "overview";
  let objectView = "kanban";
  let commissionFilter = "";
  let modalMode = "";
  let modalContext = {};
  let drawerState = null;
  let showCompletedTasks = true;

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
  const initials = (name) => name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  const money = (value) => new Intl.NumberFormat("ru-RU",{maximumFractionDigits:0}).format(Number(value)||0)+" ₽";
  const shortMoney = (value) => {
    value=Number(value)||0;
    if(value>=1000000) return (value/1000000).toFixed(value%1000000?1:0).replace(".",",")+" млн ₽";
    if(value>=1000) return Math.round(value/1000)+" тыс. ₽";
    return money(value);
  };
  const dateRu = (value) => {
    if(!value) return "—";
    const d = new Date(value+"T12:00:00");
    return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
  };
  const daysSince = (value) => Math.floor((new Date(DEMO_TODAY+"T12:00:00")-new Date(value+"T12:00:00"))/86400000);
  const conversion = (p) => p.requests ? Math.round(p.contracts/p.requests*100) : 0;
  const partnerById = id => data.partners.find(p=>p.id===id);
  const objectById = id => data.objects.find(o=>o.id===id);
  const contractById = id => data.contracts.find(c=>c.id===id);
  const statusClass = status => ({
    "Активный":"green","Развитие":"gold","Пауза":"gray","Новый":"blue",
    "Начислена":"gold","Согласована":"blue","К выплате":"red","Выплачена":"green",
    "Проведено":"green","Запланировано":"blue","Подготовка":"gold","Исполнен":"green","В работе":"blue"
  }[status] || "gray");

  function save(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
    $("#partnersNavCount").textContent=data.partners.length;
    $("#objectsNavCount").textContent=data.objects.length;
  }

  function metric(label,value,note,icon="",extra=""){
    return `<div class="metric-card ${extra}" ${extra.includes("clickable")?'tabindex="0" role="button"':""}>
      <div class="metric-top"><span class="metric-label">${esc(label)}</span><span class="metric-icon">${esc(icon)}</span></div>
      <div><div class="metric-value">${esc(value)}</div><div class="metric-note">${note}</div></div>
    </div>`;
  }

  function badge(text, cls=""){ return `<span class="badge ${cls}">${esc(text)}</span>`; }

  function toast(title, message=""){
    const el=document.createElement("div");
    el.className="toast";
    el.innerHTML=`<strong>${esc(title)}</strong>${message?`<span>${esc(message)}</span>`:""}`;
    $("#toastRegion").appendChild(el);
    setTimeout(()=>el.remove(),3200);
  }

  function navigate(page, updateHistory=true){
    if(!$("#page-"+page)) return;
    currentPage=page;
    $(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));
    $(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
    $("#breadcrumbTitle").textContent=$("#page-"+page).dataset.title;
    $("#sidebar").classList.remove("open");
    $("#sidebarBackdrop").classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
    renderPage(page);
    const hash="#"+page;
    if(updateHistory && location.hash!==hash) history.pushState({page},"",hash);
  }

  function renderAll(){
    save();
    renderToday();
    renderPartners();
    renderObjects();
    renderAnalytics();
    renderEvents();
    renderCommissions();
  }

  function renderPage(page){
    ({today:renderToday,partners:renderPartners,objects:renderObjects,analytics:renderAnalytics,events:renderEvents,commissions:renderCommissions}[page]||(()=>{}))();
  }

  function renderToday(){
    const overdue=data.partners.filter(p=>daysSince(p.lastContact)>14);
    const dormant=data.partners.filter(p=>daysSince(p.lastContact)>30);
    const newObjects=data.objects.filter(o=>daysSince(o.created)<=7);
    const pending=data.commissions.filter(c=>c.status==="К выплате").reduce((s,c)=>s+c.amount,0);
    const upcoming=data.events.filter(e=>e.date>="2026-08-07").sort((a,b)=>a.date.localeCompare(b.date));
    const openTasks=data.tasks.filter(t=>!t.done).length;
    $("#todayMetrics").innerHTML=[
      metric("Задачи на сегодня",String(openTasks),openTasks?"Осталось выполнить":"Всё выполнено","✓","clickable"),
      metric("Просроченные контакты",String(overdue.length),overdue.length?"Более 14 дней без связи":"Просрочек нет","!","clickable"),
      metric("Без активности",String(dormant.length),dormant.length?"Более 30 дней":"База активна","○","clickable"),
      metric("Новые объекты",String(newObjects.length),"За последние 7 дней","+","clickable"),
      metric("Комиссии к выплате",shortMoney(pending),"Ожидают проведения","₽","clickable"),
      metric("Ближайшие мероприятия",String(upcoming.length),upcoming[0]?dateRu(upcoming[0].date):"Не запланированы","●","clickable")
    ].join("");
    const metricActions=["tasks","overdue","dormant","new-objects","pending-commissions","events"];
    $("#todayMetrics .metric-card").forEach((el,i)=>{
      el.dataset.summaryAction=metricActions[i];
      el.onclick=()=>handleSummaryAction(metricActions[i]);
      el.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();handleSummaryAction(metricActions[i]);}};
    });
    const stalled=data.objects.filter(o=>o.stage<5&&daysSince(o.created)>7).length;
    const alertCount=overdue.length+stalled+data.commissions.filter(c=>c.status==="К выплате").length;
    $("#notificationCount").textContent=String(alertCount);
    $("#notificationCount").hidden=alertCount===0;
    $("#notificationBtn").setAttribute("aria-label",alertCount?alertCount+" записей требуют внимания":"Нет новых уведомлений");

    const visibleTasks=showCompletedTasks?data.tasks:data.tasks.filter(t=>!t.done);
    $("#tasksProgress").textContent=data.tasks.filter(t=>t.done).length+" из "+data.tasks.length+" выполнено";
    $("#showAllTasksBtn").textContent=showCompletedTasks?"Скрыть выполненные":"Показать все";
    $("#taskList").innerHTML=visibleTasks.length?visibleTasks.map(t=>`
      <div class="task-row ${t.done?"done":""}">
        <input class="task-check" type="checkbox" data-task-id="${t.id}" ${t.done?"checked":""} aria-label="Отметить задачу">
        <div class="task-content"><div class="task-title">${esc(t.title)}</div><div class="task-meta"><span class="priority ${t.priority}"></span><span>${esc(t.time)}</span><span>·</span><span>${esc(t.meta)}</span></div></div>
        <button class="task-link" data-open-type="${t.linkType}" data-open-id="${t.linkId}">Открыть →</button>
      </div>`).join(""):`<div class="empty-state"><b>Все задачи выполнены</b><p>На сегодня больше ничего не запланировано.</p></div>`;

    const attention=[
      ...overdue.slice(0,2).map(p=>({mark:"!",cls:"",title:p.name,text:"Нет контакта "+daysSince(p.lastContact)+" дней",type:"partner",id:p.id})),
      ...data.objects.filter(o=>o.stage<5 && daysSince(o.created)>7).slice(0,2).map(o=>({mark:"○",cls:"gold",title:o.name,text:"Этап «"+stages[o.stage]+"» требует действия",type:"object",id:o.id}))
    ].slice(0,4);
    $("#attentionList").innerHTML=attention.length?attention.map(a=>`<div class="attention-item"><span class="attention-mark ${a.cls}">${a.mark}</span><div class="attention-text"><b>${esc(a.title)}</b><span>${esc(a.text)}</span></div><button data-open-type="${a.type}" data-open-id="${a.id}" aria-label="Открыть">→</button></div>`).join(""):`<div class="empty-state"><b>Всё под контролем</b><p>Записей, требующих внимания, нет.</p></div>`;

    $("#recentObjects").innerHTML=[...data.objects].sort((a,b)=>b.created.localeCompare(a.created)).slice(0,5).map(o=>{
      const p=partnerById(o.partnerId);
      return `<div class="compact-row"><button data-open-type="object" data-open-id="${o.id}">${esc(o.name)}</button><span class="muted">${esc(p?p.name:"Без партнёра")}</span>${badge(stages[o.stage],o.stage>=5?"green":o.stage>=3?"gold":"blue")}<b class="money">${shortMoney(o.budget)}</b></div>`;
    }).join("");

    const event=upcoming[0]||data.events[0];
    $("#nextEvent").innerHTML=event?`<div class="event-spotlight"><div class="event-date-box"><b>${new Date(event.date+"T12:00:00").getDate()}</b><span>${months[new Date(event.date+"T12:00:00").getMonth()]}<br>${new Date(event.date+"T12:00:00").getFullYear()}</span></div><h3>${esc(event.title)}</h3><p>${esc(event.place)} · ${esc(event.description)}</p><div class="event-stats"><div><b>${event.participants}</b><span>участников</span></div><div><b>${money(event.budget)}</b><span>бюджет</span></div><div><b>${event.requests}</b><span>план заявок</span></div></div><button class="secondary-button" data-open-type="event" data-open-id="${event.id}">Открыть мероприятие</button></div>`:"";
  }

  function handleSummaryAction(action){
    if(action==="tasks"){navigate("today");setTimeout(()=>$(".tasks-panel")?.scrollIntoView({behavior:"smooth",block:"start"}),0);return;}
    if(action==="overdue"||action==="dormant"){
      resetPartnerFilters(false);
      $("#partnerActivityFilter").value=action;
      navigate("partners");
      return;
    }
    if(action==="new-objects"){
      resetObjectFilters(false);
      $("#objectRecencyFilter").value="7";
      navigate("objects");
      return;
    }
    if(action==="pending-commissions"){
      commissionFilter="К выплате";
      navigate("commissions");
      return;
    }
    if(action==="events") navigate("events");
  }

  function resetPartnerFilters(shouldRender=true){
    $("#partnerSearch").value="";
    ["partnerTypeFilter","partnerRegionFilter","partnerCategoryFilter","partnerStatusFilter","partnerActivityFilter"].forEach(id=>$("#"+id).value="");
    if(shouldRender)renderPartners();
  }

  function resetObjectFilters(shouldRender=true){
    $("#objectSearch").value="";
    $("#objectStageFilter").value="";
    $("#objectRecencyFilter").value="";
    if(shouldRender)renderObjects();
  }

  function populatePartnerFilters(){
    const sets={partnerTypeFilter:[...new Set(data.partners.map(p=>p.type))],partnerRegionFilter:[...new Set(data.partners.map(p=>p.region))],partnerStatusFilter:[...new Set(data.partners.map(p=>p.status))]};
    Object.entries(sets).forEach(([id,values])=>{
      const el=$("#"+id), current=el.value, first=el.options[0].outerHTML;
      el.innerHTML=first+values.sort().map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join("");
      el.value=current;
    });
  }

  function filteredPartners(){
    const q=$("#partnerSearch").value.trim().toLowerCase(),type=$("#partnerTypeFilter").value,region=$("#partnerRegionFilter").value,cat=$("#partnerCategoryFilter").value,status=$("#partnerStatusFilter").value,activity=$("#partnerActivityFilter").value;
    return data.partners.filter(p=>{
      const hay=[p.name,p.company,p.phone,p.email].join(" ").toLowerCase();
      const age=daysSince(p.lastContact);
      const activityMatch=!activity||(activity==="fresh"&&age<=14)||(activity==="overdue"&&age>14)||(activity==="dormant"&&age>30);
      return (!q||hay.includes(q))&&(!type||p.type===type)&&(!region||p.region===region)&&(!cat||p.category===cat)&&(!status||p.status===status)&&activityMatch;
    });
  }

  function renderPartners(){
    populatePartnerFilters();
    const active=data.partners.filter(p=>p.status==="Активный").length;
    const totalRevenue=data.partners.reduce((s,p)=>s+p.revenue,0);
    const totalRequests=data.partners.reduce((s,p)=>s+p.requests,0);
    const totalContracts=data.partners.reduce((s,p)=>s+p.contracts,0);
    $("#partnerMetrics").innerHTML=[
      metric("Всего партнёров",data.partners.length,"В партнёрской базе","20"),
      metric("Активные",active,"С регулярными контактами","A"),
      metric("Средняя конверсия",(totalRequests?Math.round(totalContracts/totalRequests*100):0)+"%","Из заявки в договор","%"),
      metric("Партнёрская выручка",shortMoney(totalRevenue),"За весь период","₽")
    ].join("");
    const list=filteredPartners();
    $("#partnersFound").textContent="Найдено: "+list.length;
    $("#partnersEmpty").classList.toggle("hidden",list.length>0);
    $("#partnersTableBody").innerHTML=list.map((p,i)=>`<tr data-open="partner" data-id="${p.id}">
      <td><div class="person-cell"><span class="avatar ${i%2?"green":""}">${initials(p.name)}</span><div><b>${esc(p.name)}</b><span>${esc(p.company)}</span></div></div></td>
      <td><b>${esc(p.type)}</b><div class="muted">${esc(p.region)}</div></td>
      <td>${badge(p.category,"category "+(p.category==="A"?"green":p.category==="B"?"gold":"gray"))}</td>
      <td>${badge(p.status,statusClass(p.status))}</td><td>${p.requests}</td><td>${p.contracts}</td><td>${conversion(p)}%</td>
      <td class="money">${shortMoney(p.revenue)}</td><td class="money">${shortMoney(p.commission)}</td>
      <td><b>${dateRu(p.lastContact)}</b><div class="muted">${daysSince(p.lastContact)} дн. назад</div></td>
    </tr>`).join("");
  }

  function filteredObjects(){
    const q=$("#objectSearch").value.trim().toLowerCase(),stage=$("#objectStageFilter").value,recency=$("#objectRecencyFilter").value;
    return data.objects.filter(o=>{
      const p=partnerById(o.partnerId); const hay=[o.name,o.client,o.number,p?p.name:""].join(" ").toLowerCase();
      return (!q||hay.includes(q))&&(stage===""||String(o.stage)===stage)&&(!recency||daysSince(o.created)<=Number(recency));
    });
  }

  function renderObjects(){
    const stageSelect=$("#objectStageFilter"), current=stageSelect.value;
    stageSelect.innerHTML='<option value="">Все этапы</option>'+stages.map((s,i)=>`<option value="${i}">${s}</option>`).join("");
    stageSelect.value=current;
    const list=filteredObjects();
    $("#objectsFound").textContent="Найдено: "+list.length;
    $("#objectsEmpty").classList.toggle("hidden",list.length>0);
    $("#kanbanBoard").classList.toggle("hidden",objectView!=="kanban"||!list.length);
    $("#objectsTablePanel").classList.toggle("hidden",objectView!=="table"||!list.length);
    $$(".view-switch button").forEach(b=>b.classList.toggle("active",b.dataset.objectView===objectView));
    $("#kanbanBoard").innerHTML=stages.map((stage,i)=>{
      const items=list.filter(o=>o.stage===i);
      return `<div class="kanban-column" data-stage="${i}"><div class="kanban-head"><h3>${stage}</h3><span>${items.length}</span></div><div class="kanban-list">${items.map(objectCard).join("")}</div></div>`;
    }).join("");
    $("#objectsTableBody").innerHTML=list.map(o=>{
      const p=partnerById(o.partnerId);
      return `<tr data-open="object" data-id="${o.id}"><td><b>${esc(o.name)}</b><div class="muted">${esc(o.number)}</div></td><td>${esc(o.client)}</td><td>${esc(p?p.name:"—")}</td><td>${badge(stages[o.stage],o.stage>=5?"green":o.stage>=3?"gold":"blue")}</td><td class="money">${money(o.budget)}</td><td><b>${esc(o.nextAction)}</b><div class="muted">${dateRu(o.nextDate)}</div></td></tr>`;
    }).join("");
    bindKanban();
  }

  function objectCard(o){
    const p=partnerById(o.partnerId);
    return `<article class="object-card" draggable="true" data-object-id="${o.id}"><div class="object-card-top"><h4>${esc(o.name)}</h4><span class="object-number">${esc(o.number)}</span></div><div class="object-client">${esc(o.client)}</div><div class="object-partner"><span class="avatar green">${p?initials(p.name):"—"}</span><span>${esc(p?p.name:"Без партнёра")}</span></div><div class="object-foot"><b>${shortMoney(o.budget)}</b><span>до ${dateRu(o.nextDate).replace(" 2026","")}</span></div></article>`;
  }

  function bindKanban(){
    $$(".object-card").forEach(card=>{
      card.addEventListener("dragstart",e=>{card.classList.add("dragging");e.dataTransfer.setData("text/plain",card.dataset.objectId)});
      card.addEventListener("dragend",()=>card.classList.remove("dragging"));
      card.addEventListener("click",()=>openObject(card.dataset.objectId));
    });
    $$(".kanban-column").forEach(col=>{
      col.addEventListener("dragover",e=>{e.preventDefault();col.classList.add("drag-over")});
      col.addEventListener("dragleave",()=>col.classList.remove("drag-over"));
      col.addEventListener("drop",e=>{
        e.preventDefault();col.classList.remove("drag-over");
        const o=objectById(e.dataTransfer.getData("text/plain"));
        if(o){o.stage=Number(col.dataset.stage);save();renderAll();toast("Этап объекта изменён",stages[o.stage]);}
      });
    });
  }

  function renderAnalytics(){
    const factor={30:.45,90:1,365:2.65}[data.analyticsPeriod]||1;
    $$("#periodSwitch button").forEach(b=>b.classList.toggle("active",Number(b.dataset.period)===data.analyticsPeriod));
    const active=data.partners.filter(p=>p.status==="Активный").length;
    const requests=Math.round(data.partners.reduce((s,p)=>s+p.requests,0)*factor);
    const contracts=Math.round(data.contracts.length*factor);
    const revenue=Math.round(data.contracts.reduce((s,c)=>s+c.amount,0)*factor);
    const commissions=Math.round(data.commissions.reduce((s,c)=>s+c.amount,0)*factor);
    const net=revenue-commissions;
    $("#analyticsMetrics").innerHTML=[
      metric("Активные партнёры",active,"из "+data.partners.length+" в базе","A"),
      metric("Заявки",requests,"за выбранный период","+"),
      metric("Договоры",contracts,requests?Math.round(contracts/requests*100)+"% конверсия":"0% конверсия","✓"),
      metric("Конверсия",requests?Math.round(contracts/requests*100)+"%":"0%","заявка → договор","%"),
      metric("Партнёрская выручка",shortMoney(revenue),"по заключённым договорам","₽"),
      metric("Комиссии",shortMoney(commissions),"начислено партнёрам","₽"),
      metric("После комиссий",shortMoney(net),"чистая выручка канала","₽"),
      metric("Средний договор",shortMoney(contracts?revenue/contracts:0),"по партнёрским сделкам","Ø")
    ].join("");

    const funnel=[
      ["Заявки",Math.max(requests,1)],["Встречи",Math.round(requests*.74)],["Расчёты",Math.round(requests*.55)],["Проекты",Math.round(requests*.41)],["Договоры",Math.max(contracts,1)]
    ];
    const max=funnel[0][1];
    $("#funnelChart").innerHTML=funnel.map((f,i)=>`<div class="funnel-row"><span>${f[0]}</span><div class="funnel-track"><div class="funnel-fill" style="width:${Math.max(10,f[1]/max*100)}%;opacity:${1-i*.09}">${Math.round(f[1]/max*100)}%</div></div><b>${f[1]}</b></div>`).join("");

    const cats=["A","B","C"].map(c=>[c,data.partners.filter(p=>p.category===c).length]);
    renderBars("#categoryChart",cats);
    const regions=[...new Set(data.partners.map(p=>p.region))].map(r=>[r,data.partners.filter(p=>p.region===r).length]).sort((a,b)=>b[1]-a[1]);
    renderBars("#regionChart",regions);

    $("#partnerRanking").innerHTML=[...data.partners].sort((a,b)=>b.revenue-a.revenue).slice(0,6).map((p,i)=>`<div class="ranking-row" data-open="partner" data-id="${p.id}"><span class="rank-number">${i+1}</span><div class="person-cell"><span class="avatar ${i%2?"green":""}">${initials(p.name)}</span><div><b>${esc(p.name)}</b><span>${esc(p.type)} · ${esc(p.region)}</span></div></div><span>${p.requests} заявок</span><span>${p.contracts} договора</span><b class="money">${shortMoney(p.revenue)}</b></div>`).join("");
  }

  function renderBars(selector,rows){
    const max=Math.max(...rows.map(r=>r[1]),1);
    $(selector).innerHTML=rows.map(r=>`<div class="bar-row"><span>${esc(r[0])}</span><div class="bar-track"><div class="bar-fill" style="width:${r[1]/max*100}%"></div></div><b>${r[1]}</b></div>`).join("");
  }

  function renderEvents(){
    const totalBudget=data.events.reduce((s,e)=>s+e.budget,0),participants=data.events.reduce((s,e)=>s+e.participants,0),requests=data.events.reduce((s,e)=>s+e.requests,0),revenue=data.events.reduce((s,e)=>s+e.revenue,0);
    $("#eventMetrics").innerHTML=[
      metric("Мероприятий",data.events.length,"2 проведено · 2 в плане","●"),
      metric("Участников",participants,"Совокупный охват","人"),
      metric("Расходы",shortMoney(totalBudget),"Общий бюджет","₽"),
      metric("Связанная выручка",shortMoney(revenue),requests+" заявок с мероприятий","₽")
    ].join("");
    $("#eventGrid").innerHTML=[...data.events].sort((a,b)=>b.date.localeCompare(a.date)).map(e=>`<article class="panel event-card" data-open="event" data-id="${e.id}">
      <div class="event-card-head"><div><span class="eyebrow">${dateRu(e.date)} · ${esc(e.place)}</span><h2>${esc(e.title)}</h2><p>${esc(e.description)}</p></div>${badge(e.status,statusClass(e.status))}</div>
      <div class="event-kpis"><div><b>${e.participants}</b><span>участников</span></div><div><b>${e.newPartners}</b><span>новых партнёров</span></div><div><b>${e.requests}</b><span>заявок</span></div><div><b>${e.contracts}</b><span>договоров</span></div></div>
      <div class="event-result"><span>Расходы: <b>${money(e.budget)}</b></span><strong>${esc(e.result)}</strong></div>
    </article>`).join("");
  }

  function renderCommissions(){
    const sums=commissionStatuses.map(st=>data.commissions.filter(c=>c.status===st).reduce((s,c)=>s+c.amount,0));
    $("#commissionMetrics").innerHTML=[
      metric("Начислено",shortMoney(sums[0]),data.commissions.filter(c=>c.status==="Начислена").length+" позиций","₽","clickable"),
      metric("Согласовано",shortMoney(sums[1]),data.commissions.filter(c=>c.status==="Согласована").length+" позиций","✓","clickable"),
      metric("К выплате",shortMoney(sums[2]),data.commissions.filter(c=>c.status==="К выплате").length+" ожидают оплаты","!","clickable"),
      metric("Выплачено",shortMoney(sums[3]),data.commissions.filter(c=>c.status==="Выплачена").length+" завершено","✓","clickable")
    ].join("");
    $("#commissionMetrics .metric-card").forEach((el,i)=>{
      el.onclick=()=>{commissionFilter=commissionStatuses[i];renderCommissions();};
      el.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();commissionFilter=commissionStatuses[i];renderCommissions();}};
    });
    $("#commissionTabs button").forEach(b=>b.classList.toggle("active",b.dataset.status===commissionFilter));
    const list=data.commissions.filter(c=>!commissionFilter||c.status===commissionFilter);
    $("#commissionsEmpty").classList.toggle("hidden",list.length>0);
    $("#commissionsTableBody").innerHTML=list.map(c=>{
      const p=partnerById(c.partnerId),o=objectById(c.objectId),d=contractById(c.contractId),idx=commissionStatuses.indexOf(c.status);
      const action=idx<3?`<button class="action-button commission-action" data-id="${c.id}">${idx===0?"Согласовать":idx===1?"К выплате":"Отметить выплату"}</button>`:"<span class=\"muted\">Готово</span>";
      return `<tr><td><div class="person-cell"><span class="avatar green">${p?initials(p.name):"—"}</span><div><b>${esc(p?p.name:"—")}</b><span>${esc(p?p.company:"")}</span></div></div></td><td><b>${esc(o?o.name:"—")}</b><div class="muted">${esc(d?d.number:"—")}</div></td><td class="money">${money(c.base)}</td><td>${c.rate}%</td><td class="money"><b>${money(c.amount)}</b></td><td>${badge(c.status,statusClass(c.status))}</td><td>${dateRu(c.dueDate)}</td><td>${action}</td></tr>`;
    }).join("");
  }

  function openPartner(id,tab="overview"){
    const p=partnerById(id); if(!p)return;
    partnerTab=tab; drawerState={type:"partner",id};
    $("#drawerHeading").innerHTML=`<p class="eyebrow">Карточка партнёра</p><h2>${esc(p.name)}</h2>`;
    const relatedObjects=data.objects.filter(o=>o.partnerId===p.id),relatedContracts=data.contracts.filter(c=>c.partnerId===p.id),relatedCommissions=data.commissions.filter(c=>c.partnerId===p.id),relatedEvents=data.events.filter(e=>e.partnerIds.includes(p.id));
    const tabs=[["overview","Обзор"],["interactions","Взаимодействия"],["objects","Объекты"],["contracts","Договоры"],["commissions","Комиссии"],["events","Мероприятия"]];
    let content="";
    if(partnerTab==="overview") content=`<div class="info-grid"><div class="info-item"><span>Телефон</span><b>${esc(p.phone)}</b></div><div class="info-item"><span>Почта</span><b>${esc(p.email)}</b></div><div class="info-item"><span>Компания</span><b>${esc(p.company)}</b></div><div class="info-item"><span>Источник</span><b>${esc(p.source)}</b></div><div class="info-item"><span>Последний контакт</span><b>${dateRu(p.lastContact)}</b></div><div class="info-item"><span>Регион</span><b>${esc(p.region)}</b></div></div><div class="next-action"><div><span>Следующее действие · ${dateRu(p.nextActionDate)}</span><b>${esc(p.nextAction)}</b></div><button class="action-button" data-action="add-contact" data-partner-id="${p.id}">Зафиксировать</button></div>`;
    if(partnerTab==="interactions") content=`<div class="detail-section"><div class="detail-section-head"><h3>История контактов</h3><button class="secondary-button" data-action="add-contact" data-partner-id="${p.id}">＋ Добавить контакт</button></div><div class="timeline">${[...p.interactions].sort((a,b)=>b.date.localeCompare(a.date)).map(i=>`<div class="timeline-item"><b>${esc(i.type)}</b><p>${esc(i.note)}</p><time>${dateRu(i.date)}</time></div>`).join("")}</div></div>`;
    if(partnerTab==="objects") content=detailRows(relatedObjects.map(o=>[o.name,stages[o.stage],shortMoney(o.budget),o.id,"object"]),"У партнёра пока нет объектов");
    if(partnerTab==="contracts") content=detailRows(relatedContracts.map(c=>{const o=objectById(c.objectId);return [c.number,c.status,money(c.amount),o?o.id:"","object"]}),"Договоров пока нет");
    if(partnerTab==="commissions") content=detailRows(relatedCommissions.map(c=>[objectById(c.objectId)?.name||c.id,c.status,money(c.amount),"",""]),"Комиссий пока нет");
    if(partnerTab==="events") content=detailRows(relatedEvents.map(e=>[e.title,e.status,dateRu(e.date),e.id,"event"]),"Участие в мероприятиях не зафиксировано");
    $("#drawerBody").innerHTML=`<div class="detail-hero" style="margin-top:20px"><span class="avatar green">${initials(p.name)}</span><div><b>${esc(p.company)}</b><div class="detail-meta">${badge(p.type,"blue")}${badge("Категория "+p.category,p.category==="A"?"green":p.category==="B"?"gold":"gray")}${badge(p.status,statusClass(p.status))}</div></div></div><div class="detail-stats"><div class="detail-stat"><b>${p.requests}</b><span>заявок</span></div><div class="detail-stat"><b>${p.contracts}</b><span>договоров</span></div><div class="detail-stat"><b>${conversion(p)}%</b><span>конверсия</span></div><div class="detail-stat"><b>${shortMoney(p.revenue)}</b><span>выручка</span></div></div><div class="detail-tabs">${tabs.map(t=>`<button class="${partnerTab===t[0]?"active":""}" data-partner-tab="${t[0]}">${t[1]}</button>`).join("")}</div>${content}`;
    openDrawer();
  }

  function detailRows(rows,empty){
    if(!rows.length)return `<div class="empty-state"><b>${esc(empty)}</b></div>`;
    return `<div class="detail-list">${rows.map(r=>`<div class="detail-list-row" ${r[4]?`data-open="${r[4]}" data-id="${r[3]}" style="cursor:pointer"`:""}><b>${esc(r[0])}</b>${badge(r[1],statusClass(r[1]))}<span class="money">${esc(r[2])}</span></div>`).join("")}</div>`;
  }

  function openObject(id){
    const o=objectById(id);if(!o)return;const p=partnerById(o.partnerId),contract=data.contracts.find(c=>c.objectId===o.id),comm=data.commissions.find(c=>c.objectId===o.id);
    drawerState={type:"object",id};
    $("#drawerHeading").innerHTML=`<p class="eyebrow">Карточка объекта · ${esc(o.number)}</p><h2>${esc(o.name)}</h2>`;
    $("#drawerBody").innerHTML=`<div class="detail-stats"><div class="detail-stat"><b>${shortMoney(o.budget)}</b><span>бюджет</span></div><div class="detail-stat"><b>${dateRu(o.created).replace(" 2026","")}</b><span>создан</span></div><div class="detail-stat"><b>${esc(stages[o.stage])}</b><span>этап</span></div><div class="detail-stat"><b>${contract?"Да":"Нет"}</b><span>договор</span></div></div>
      <div class="stage-stepper">${stages.map((s,i)=>`<div class="stage-step ${i<o.stage?"done":i===o.stage?"current":""}">${esc(s)}</div>`).join("")}</div>
      <div class="detail-section"><div class="detail-section-head"><h3>Этап объекта</h3></div><select id="drawerStageSelect" style="width:100%">${stages.map((s,i)=>`<option value="${i}" ${i===o.stage?"selected":""}>${s}</option>`).join("")}</select></div>
      <div class="detail-section"><h3>Основная информация</h3><div class="info-grid" style="margin-top:10px"><div class="info-item"><span>Клиент</span><b>${esc(o.client)}</b></div><div class="info-item"><span>Телефон клиента</span><b>${esc(o.contact)}</b></div><div class="info-item" data-open="partner" data-id="${p?p.id:""}" style="cursor:pointer"><span>Партнёр</span><b>${esc(p?p.name:"—")} →</b></div><div class="info-item"><span>Договор</span><b>${esc(contract?contract.number:"Ещё не заключён")}</b></div></div><p class="muted" style="line-height:1.6">${esc(o.description)}</p></div>
      <div class="next-action"><div><span>Следующее действие · ${dateRu(o.nextDate)}</span><b>${esc(o.nextAction)}</b></div></div>
      ${comm?`<div class="detail-section"><h3>Комиссия партнёра</h3><div class="info-grid" style="margin-top:10px"><div class="info-item"><span>Сумма</span><b>${money(comm.amount)}</b></div><div class="info-item"><span>Статус</span><b>${esc(comm.status)}</b></div></div></div>`:""}`;
    openDrawer();
    $("#drawerStageSelect").addEventListener("change",e=>{o.stage=Number(e.target.value);save();renderAll();openObject(o.id);toast("Этап обновлён",stages[o.stage]);});
  }

  function openEvent(id){
    const e=data.events.find(x=>x.id===id);if(!e)return;drawerState={type:"event",id};
    $("#drawerHeading").innerHTML=`<p class="eyebrow">Карточка мероприятия</p><h2>${esc(e.title)}</h2>`;
    const participants=e.partnerIds.map(partnerById).filter(Boolean);
    $("#drawerBody").innerHTML=`<div class="detail-meta" style="margin-top:20px">${badge(e.status,statusClass(e.status))}${badge(dateRu(e.date),"blue")}</div><p class="muted" style="line-height:1.7">${esc(e.description)}</p><div class="info-grid"><div class="info-item"><span>Место</span><b>${esc(e.place)}</b></div><div class="info-item"><span>Расходы</span><b>${money(e.budget)}</b></div></div><div class="detail-stats"><div class="detail-stat"><b>${e.participants}</b><span>участников</span></div><div class="detail-stat"><b>${e.newPartners}</b><span>новых</span></div><div class="detail-stat"><b>${e.requests}</b><span>заявок</span></div><div class="detail-stat"><b>${e.contracts}</b><span>договоров</span></div></div><div class="detail-section"><h3>Результат</h3><div class="next-action"><div><span>Связанная выручка ${money(e.revenue)}</span><b>${esc(e.result)}</b></div></div></div><div class="detail-section"><h3>Партнёры-участники</h3><div class="detail-list" style="margin-top:10px">${participants.map(p=>`<div class="detail-list-row" data-open="partner" data-id="${p.id}" style="cursor:pointer"><b>${esc(p.name)}</b><span>${esc(p.type)}</span><span>${esc(p.region)}</span></div>`).join("")}</div></div>`;
    openDrawer();
  }

  function setQuickAdd(open){
    $("#quickAddMenu").classList.toggle("open",open);
    $("#quickAddBtn").setAttribute("aria-expanded",String(open));
  }

  function openDrawer(){
    $("#detailDrawer").classList.add("open");$("#drawerBackdrop").classList.add("open");document.body.style.overflow="hidden";
  }
  function closeDrawer(){
    $("#detailDrawer").classList.remove("open");$("#drawerBackdrop").classList.remove("open");document.body.style.overflow="";drawerState=null;
  }

  function openModal(mode,context={}){
    modalMode=mode;modalContext=context;$("#modalBackdrop").classList.add("open");document.body.style.overflow="hidden";
    const titles={partner:["Новая запись","Добавить партнёра","Добавить партнёра"],object:["Новый объект","Добавить объект","Добавить объект"],contact:["История взаимодействий","Зафиксировать контакт","Сохранить контакт"]};
    const t=titles[mode];$("#modalEyebrow").textContent=t[0];$("#modalTitle").textContent=t[1];$("#modalSubmitBtn").textContent=t[2];
    if(mode==="partner") $("#modalBody").innerHTML=`<div class="form-grid"><div class="field"><label>Имя и фамилия *</label><input name="name" required placeholder="Елена Соколова"></div><div class="field"><label>Компания / студия</label><input name="company" placeholder="Название студии"></div><div class="field"><label>Тип партнёра *</label><select name="type" required><option value="">Выберите тип</option>${["Дизайнер","Архитектор","Строитель","Прораб","Комплектатор","Декоратор","Другое"].map(x=>`<option>${x}</option>`).join("")}</select></div><div class="field"><label>Регион *</label><input name="region" required value="Ярославль"></div><div class="field"><label>Телефон *</label><input name="phone" required placeholder="+7 900 000-00-00"></div><div class="field"><label>Электронная почта</label><input name="email" type="email" placeholder="name@studio.ru"></div><div class="field"><label>Категория</label><select name="category"><option>C</option><option>B</option><option>A</option></select></div><div class="field"><label>Статус</label><select name="status"><option>Новый</option><option>Развитие</option><option>Активный</option><option>Пауза</option></select></div><div class="field full"><label>Следующее действие</label><input name="nextAction" placeholder="Позвонить и договориться о встрече"></div></div>`;
    if(mode==="object") $("#modalBody").innerHTML=`<div class="form-grid"><div class="field full"><label>Название объекта *</label><input name="name" required placeholder="Кухня в ЖК «Название»"></div><div class="field"><label>Клиент *</label><input name="client" required placeholder="Имя клиента"></div><div class="field"><label>Телефон клиента</label><input name="contact" placeholder="+7 900 000-00-00"></div><div class="field full"><label>Партнёр *</label><select name="partnerId" required><option value="">Выберите партнёра</option>${data.partners.map(p=>`<option value="${p.id}">${esc(p.name)} · ${esc(p.type)}</option>`).join("")}</select></div><div class="field"><label>Ориентировочный бюджет *</label><input name="budget" required type="number" min="0" step="10000" placeholder="1000000"></div><div class="field"><label>Этап</label><select name="stage">${stages.map((s,i)=>`<option value="${i}">${s}</option>`).join("")}</select></div><div class="field full"><label>Следующее действие</label><input name="nextAction" value="Провести первичный звонок"></div><div class="field"><label>Дата действия</label><input name="nextDate" type="date" value="2026-08-10"></div><div class="field full"><label>Комментарий</label><textarea name="description" placeholder="Краткое описание задачи и пожеланий клиента"></textarea></div></div>`;
    if(mode==="contact") {
      const selected=context.partnerId||"";
      $("#modalBody").innerHTML=`<div class="form-grid"><div class="field full"><label>Партнёр *</label><select name="partnerId" required><option value="">Выберите партнёра</option>${data.partners.map(p=>`<option value="${p.id}" ${p.id===selected?"selected":""}>${esc(p.name)} · ${esc(p.company)}</option>`).join("")}</select></div><div class="field"><label>Тип контакта</label><select name="type"><option>Звонок</option><option>Встреча</option><option>Сообщение</option><option>Письмо</option><option>Мероприятие</option></select></div><div class="field"><label>Дата *</label><input name="date" type="date" required value="2026-08-07"></div><div class="field full"><label>Результат контакта *</label><textarea name="note" required placeholder="Что обсудили и к чему договорились"></textarea></div><div class="field full"><label>Следующее действие</label><input name="nextAction" placeholder="Например: отправить подборку материалов"></div><div class="field"><label>Дата следующего действия</label><input name="nextDate" type="date" value="2026-08-12"></div></div>`;
    }
    setTimeout(()=>$("#modalBody input, #modalBody select, #modalBody textarea")?.focus(),50);
  }

  function closeModal(){
    $("#modalBackdrop").classList.remove("open");document.body.style.overflow=$("#detailDrawer").classList.contains("open")?"hidden":"";$("#modalForm").reset();modalMode="";modalContext={};
  }

  function submitModal(form){
    const fd=Object.fromEntries(new FormData(form).entries());
    if(modalMode==="partner"){
      const id="P"+String(Math.max(0,...data.partners.map(p=>Number(p.id.slice(1))))+1).padStart(3,"0");
      data.partners.unshift({id,name:fd.name.trim(),company:fd.company.trim()||fd.name.trim(),type:fd.type,region:fd.region.trim(),category:fd.category,status:fd.status,phone:fd.phone.trim(),email:fd.email.trim(),requests:0,contracts:0,revenue:0,commission:0,lastContact:"2026-08-07",source:"Добавлен вручную",nextAction:fd.nextAction.trim()||"Познакомиться и обсудить формат работы",nextActionDate:"2026-08-12",interactions:[{id:"I"+Date.now(),date:"2026-08-07",type:"Добавление",note:"Партнёр добавлен в базу."}]});
      save();closeModal();renderAll();navigate("partners");toast("Партнёр добавлен",fd.name);
    } else if(modalMode==="object"){
      const id="O"+String(Math.max(0,...data.objects.map(o=>Number(o.id.slice(1))))+1).padStart(3,"0"),num=Math.max(2600,...data.objects.map(o=>Number(o.number.replace(/\D/g,""))))+1;
      data.objects.unshift({id,number:"КП-"+num,name:fd.name.trim(),client:fd.client.trim(),contact:fd.contact.trim()||"Не указан",partnerId:fd.partnerId,stage:Number(fd.stage),budget:Number(fd.budget),created:"2026-08-07",nextDate:fd.nextDate||"2026-08-10",nextAction:fd.nextAction.trim()||"Связаться с клиентом",description:fd.description.trim()||"Новый партнёрский объект."});
      const p=partnerById(fd.partnerId);if(p)p.requests+=1;
      save();closeModal();renderAll();navigate("objects");toast("Объект добавлен",fd.name);
    } else if(modalMode==="contact"){
      const p=partnerById(fd.partnerId);if(!p)return;
      p.interactions.unshift({id:"I"+Date.now(),date:fd.date,type:fd.type,note:fd.note.trim()});p.lastContact=fd.date;
      if(fd.nextAction.trim())p.nextAction=fd.nextAction.trim();if(fd.nextDate)p.nextActionDate=fd.nextDate;
      const reopen=drawerState&&drawerState.type==="partner"&&drawerState.id===p.id;
      save();closeModal();renderAll();if(reopen)openPartner(p.id,"interactions");toast("Контакт сохранён",p.name);
    }
  }

  function openByType(type,id){
    if(type==="partner")openPartner(id);
    else if(type==="object")openObject(id);
    else if(type==="event")openEvent(id);
    else if(type==="commission"){navigate("commissions");const c=data.commissions.find(x=>x.id===id);if(c)toast("Комиссия "+c.status,money(c.amount));}
  }

  document.addEventListener("click",e=>{
    const nav=e.target.closest("[data-navigate]");if(nav){navigate(nav.dataset.navigate);return;}
    const action=e.target.closest("[data-action]");if(action){
      const map={"add-partner":"partner","add-object":"object","add-contact":"contact"};
      if(map[action.dataset.action]){openModal(map[action.dataset.action],{partnerId:action.dataset.partnerId});setQuickAdd(false);return;}
    }
    const open=e.target.closest("[data-open]");if(open){openByType(open.dataset.open,open.dataset.id);return;}
    const typed=e.target.closest("[data-open-type]");if(typed){openByType(typed.dataset.openType,typed.dataset.openId);return;}
    const tab=e.target.closest("[data-partner-tab]");if(tab&&drawerState?.type==="partner"){openPartner(drawerState.id,tab.dataset.partnerTab);return;}
  });

  $("#mainNav").addEventListener("click",e=>{const b=e.target.closest(".nav-item");if(b)navigate(b.dataset.page)});
  $("#menuBtn").onclick=()=>{$("#sidebar").classList.add("open");$("#sidebarBackdrop").classList.add("open")};
  $("#sidebarBackdrop").onclick=()=>{$("#sidebar").classList.remove("open");$("#sidebarBackdrop").classList.remove("open")};
  $("#quickAddBtn").onclick=e=>{e.stopPropagation();setQuickAdd(!$("#quickAddMenu").classList.contains("open"))};
  document.addEventListener("click",e=>{if(!e.target.closest(".add-menu-wrap"))setQuickAdd(false)});
  $("#notificationBtn").onclick=()=>{navigate("today");setTimeout(()=>$(".attention-panel")?.scrollIntoView({behavior:"smooth",block:"start"}),0)};
  $("#showAllTasksBtn").onclick=()=>{showCompletedTasks=!showCompletedTasks;renderToday()};
  $("#taskList").addEventListener("change",e=>{if(e.target.matches(".task-check")){const t=data.tasks.find(x=>x.id===e.target.dataset.taskId);if(t){t.done=e.target.checked;save();renderToday();toast(t.done?"Задача выполнена":"Задача возвращена",t.title)}}});
  ["partnerSearch","partnerTypeFilter","partnerRegionFilter","partnerCategoryFilter","partnerStatusFilter","partnerActivityFilter"].forEach(id=>$("#"+id).addEventListener(id==="partnerSearch"?"input":"change",renderPartners));
  $("#partnerFiltersReset").onclick=()=>resetPartnerFilters();
  $("#objectSearch").addEventListener("input",renderObjects);
  ["objectStageFilter","objectRecencyFilter"].forEach(id=>$("#"+id).addEventListener("change",renderObjects));
  $("#objectFiltersReset").onclick=()=>resetObjectFilters();
  $(".view-switch button").forEach(b=>b.onclick=()=>{objectView=b.dataset.objectView;renderObjects()});
  $("#periodSwitch").onclick=e=>{const b=e.target.closest("[data-period]");if(b){data.analyticsPeriod=Number(b.dataset.period);save();renderAnalytics();toast("Период аналитики изменён",b.textContent)}};
  $("#commissionTabs").onclick=e=>{const b=e.target.closest("[data-status]");if(b){commissionFilter=b.dataset.status;renderCommissions()}};
  $("#commissionsTableBody").onclick=e=>{const b=e.target.closest(".commission-action");if(b){const c=data.commissions.find(x=>x.id===b.dataset.id);if(c){const idx=commissionStatuses.indexOf(c.status);c.status=commissionStatuses[Math.min(idx+1,3)];save();renderAll();toast("Статус комиссии обновлён",c.status)}}};
  $("#closeDrawerBtn").onclick=closeDrawer;$("#drawerBackdrop").onclick=closeDrawer;
  $("#closeModalBtn").onclick=closeModal;$("#cancelModalBtn").onclick=closeModal;
  $("#modalBackdrop").addEventListener("click",e=>{if(e.target===$("#modalBackdrop"))closeModal()});
  $("#modalForm").addEventListener("submit",e=>{e.preventDefault();if(e.currentTarget.reportValidity())submitModal(e.currentTarget)});
  $("#resetDemoBtn").onclick=()=>$("#confirmBackdrop").classList.add("open");
  $("#cancelResetBtn").onclick=()=>$("#confirmBackdrop").classList.remove("open");
  $("#confirmBackdrop").addEventListener("click",e=>{if(e.target===$("#confirmBackdrop"))$("#confirmBackdrop").classList.remove("open")});
  $("#confirmResetBtn").onclick=()=>{localStorage.removeItem(STORAGE_KEY);data=defaultData();$("#confirmBackdrop").classList.remove("open");closeDrawer();renderAll();navigate("today");toast("Демо восстановлено","Исходные данные загружены")};
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){
    if($("#confirmBackdrop").classList.contains("open"))$("#confirmBackdrop").classList.remove("open");
    else if($("#modalBackdrop").classList.contains("open"))closeModal();
    else if($("#detailDrawer").classList.contains("open"))closeDrawer();
    else if($("#sidebar").classList.contains("open")){$("#sidebar").classList.remove("open");$("#sidebarBackdrop").classList.remove("open");}
    else setQuickAdd(false);
  }});
  window.addEventListener("popstate",()=>navigate(location.hash.slice(1)||"today",false));

  $("#todayDate").textContent="Пятница, 7 августа 2026";
  renderAll();
  const initialPage=$("#page-"+location.hash.slice(1))?location.hash.slice(1):"today";
  history.replaceState({page:initialPage},"","#"+initialPage);
  navigate(initialPage,false);
})();