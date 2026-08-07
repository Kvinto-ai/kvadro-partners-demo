const { test, expect } = require("@playwright/test");

const APP = "https://kvinto-ai.github.io/kvadro-partners-demo/";

async function cleanStart(page) {
  await page.goto(APP, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("#page-today")).toBeVisible();
}

async function go(page, id) {
  await page.locator('.nav-item[data-page="' + id + '"]').click();
  await expect(page.locator("#page-" + id)).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  page.runtimeErrors = [];
  page.on("pageerror", error => page.runtimeErrors.push("pageerror: " + error.message));
  page.on("console", message => {
    if (message.type() === "error") page.runtimeErrors.push("console: " + message.text());
  });
  await cleanStart(page);
});

test.afterEach(async ({ page }) => {
  expect(page.runtimeErrors, "В консоли браузера не должно быть ошибок").toEqual([]);
});

test("навигация, хэши и кнопки Назад/Вперёд", async ({ page }) => {
  const sections = [
    ["partners", "Партнёры"],
    ["objects", "Объекты"],
    ["analytics", "Аналитика"],
    ["events", "Мероприятия"],
    ["commissions", "Комиссии"],
    ["today", "Сегодня"]
  ];

  for (const [id, title] of sections) {
    await go(page, id);
    await expect(page.locator("#breadcrumbTitle")).toHaveText(title);
    await expect(page).toHaveURL(new RegExp("#" + id + "$"));
  }

  await page.goBack();
  await expect(page.locator("#page-commissions")).toBeVisible();
  await page.goForward();
  await expect(page.locator("#page-today")).toBeVisible();
});

test("поиск, фильтры и карточка партнёра", async ({ page }) => {
  await go(page, "partners");

  await page.locator("#partnerSearch").fill("Елена Соколова");
  await expect(page.locator("#partnersFound")).toHaveText("Найдено: 1");
  await expect(page.locator("#partnersTableBody tr")).toHaveCount(1);

  await page.locator("#partnerCategoryFilter").selectOption("A");
  await page.locator("#partnerStatusFilter").selectOption("Активный");
  await expect(page.locator("#partnersTableBody tr")).toHaveCount(1);

  await page.locator("#partnerFiltersReset").click();
  await expect(page.locator("#partnersFound")).toHaveText("Найдено: 20");

  await page.locator("#partnerTypeFilter").selectOption({ label: "Дизайнер" });
  await expect(page.locator("#partnersTableBody tr").first()).toBeVisible();
  await page.locator("#partnerFiltersReset").click();

  await page.locator("#partnersTableBody tr").filter({ hasText: "Елена Соколова" }).click();
  await expect(page.locator("#detailDrawer")).toHaveClass(/open/);
  await expect(page.locator("#drawerHeading")).toContainText("Елена Соколова");

  for (const tab of ["Взаимодействия", "Объекты", "Договоры", "Комиссии", "Мероприятия", "Обзор"]) {
    await page.locator(".detail-tabs button", { hasText: tab }).click();
    await expect(page.locator(".detail-tabs button", { hasText: tab })).toHaveClass(/active/);
  }

  await page.locator("#closeDrawerBtn").click();
  await expect(page.locator("#detailDrawer")).not.toHaveClass(/open/);
});

test("добавление партнёра и контакта сохраняется после перезагрузки", async ({ page }) => {
  await go(page, "partners");
  await page.locator('#page-partners [data-action="add-partner"]').click();
  await expect(page.locator("#modalBackdrop")).toHaveClass(/open/);

  await page.locator('#modalForm [name="name"]').fill("Тестовый Партнёр");
  await page.locator('#modalForm [name="company"]').fill("Тест Студия");
  await page.locator('#modalForm [name="type"]').selectOption({ label: "Дизайнер" });
  await page.locator('#modalForm [name="region"]').fill("Ярославль");
  await page.locator('#modalForm [name="phone"]').fill("+7 900 111-22-33");
  await page.locator("#modalForm").getByRole("button", { name: "Добавить партнёра" }).click();

  await expect(page.locator("#partnersNavCount")).toHaveText("21");
  await page.locator("#partnerSearch").fill("Тестовый Партнёр");
  await expect(page.locator("#partnersFound")).toHaveText("Найдено: 1");

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#partnerSearch").fill("Тестовый Партнёр");
  await expect(page.locator("#partnersFound")).toHaveText("Найдено: 1");
  await page.locator("#partnersTableBody tr").click();

  await page.getByRole("button", { name: "Зафиксировать" }).click();
  await expect(page.locator('#modalForm [name="partnerId"]')).toHaveValue("P021");
  await page.locator('#modalForm [name="note"]').fill("Проведена тестовая встреча");
  await page.locator('#modalForm [name="nextAction"]').fill("Отправить каталог");
  await page.locator("#modalForm").getByRole("button", { name: "Сохранить контакт" }).click();

  await expect(page.locator("#drawerBody")).toContainText("Проведена тестовая встреча");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#partnerSearch").fill("Тестовый Партнёр");
  await page.locator("#partnersTableBody tr").click();
  await page.getByRole("button", { name: "Взаимодействия" }).click();
  await expect(page.locator("#drawerBody")).toContainText("Проведена тестовая встреча");
});

test("объекты: фильтры, виды, карточка, этап и новая запись", async ({ page }) => {
  await go(page, "objects");

  await page.locator("#objectStageFilter").selectOption("0");
  await expect(page.locator(".object-card").first()).toBeVisible();
  await page.locator("#objectRecencyFilter").selectOption("7");
  await page.locator("#objectFiltersReset").click();
  await expect(page.locator("#objectsFound")).toHaveText("Найдено: 25");

  await page.locator('[data-object-view="table"]').click();
  await expect(page.locator("#objectsTablePanel")).toBeVisible();
  const firstName = (await page.locator("#objectsTableBody tr").first().locator("td").first().innerText()).trim();
  await page.locator("#objectsTableBody tr").first().click();
  await expect(page.locator("#detailDrawer")).toHaveClass(/open/);
  await page.locator("#drawerStageSelect").selectOption("6");
  await expect(page.locator("#drawerStageSelect")).toHaveValue("6");
  await page.locator("#closeDrawerBtn").click();

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#objectSearch").fill(firstName);
  await page.locator(".object-card").first().click();
  await expect(page.locator("#drawerStageSelect")).toHaveValue("6");
  await page.locator("#closeDrawerBtn").click();

  await page.locator('#page-objects [data-action="add-object"]').click();
  await page.locator('#modalForm [name="name"]').fill("Тестовая кухня");
  await page.locator('#modalForm [name="client"]').fill("Иван Тестов");
  await page.locator('#modalForm [name="partnerId"]').selectOption("P001");
  await page.locator('#modalForm [name="budget"]').fill("1500000");
  await page.locator("#modalForm").getByRole("button", { name: "Добавить объект" }).click();

  await expect(page.locator("#objectsNavCount")).toHaveText("26");
  await page.locator("#objectSearch").fill("Тестовая кухня");
  await expect(page.locator("#objectsFound")).toHaveText("Найдено: 1");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator("#objectSearch").fill("Тестовая кухня");
  await expect(page.locator("#objectsFound")).toHaveText("Найдено: 1");
});

test("перетаскивание карточки канбана меняет этап", async ({ page }) => {
  await go(page, "objects");
  const source = page.locator('.kanban-column[data-stage="0"] .object-card').first();
  const target = page.locator('.kanban-column[data-stage="1"] .kanban-list');
  await expect(source).toBeVisible();
  const objectId = await source.getAttribute("data-object-id");
  await source.dragTo(target);
  await expect(page.locator('.kanban-column[data-stage="1"] .object-card[data-object-id="' + objectId + '"]')).toBeVisible();
});

test("аналитика, мероприятия, комиссии и задачи", async ({ page }) => {
  await go(page, "analytics");
  await page.locator('#periodSwitch [data-period="30"]').click();
  await expect(page.locator('#periodSwitch [data-period="30"]')).toHaveClass(/active/);
  await expect(page.locator("#analyticsMetrics .metric-card")).toHaveCount(8);

  await go(page, "events");
  await expect(page.locator(".event-card")).toHaveCount(4);
  await page.locator(".event-card").first().click();
  await expect(page.locator("#drawerHeading")).toContainText("Карточка мероприятия");
  await page.locator("#closeDrawerBtn").click();

  await go(page, "commissions");
  await page.locator('#commissionTabs [data-status="К выплате"]').click();
  const before = await page.locator("#commissionsTableBody tr").count();
  expect(before).toBeGreaterThan(0);
  await page.locator("#commissionsTableBody .commission-action").first().click();
  await expect(page.locator("#commissionsTableBody tr")).toHaveCount(before - 1);
  await page.locator('#commissionTabs [data-status=""]').click();
  await expect(page.locator("#commissionsTableBody tr")).toHaveCount(12);

  await go(page, "today");
  const task = page.locator(".task-check").first();
  await task.check();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".task-check").first()).toBeChecked();
  await page.locator("#showAllTasksBtn").click();
  await expect(page.locator(".task-row.done")).toHaveCount(0);
  await page.locator("#showAllTasksBtn").click();
});

test("сводные карточки, быстрое добавление, отмена и восстановление демо", async ({ page }) => {
  await page.locator('#todayMetrics [data-summary-action="overdue"]').click();
  await expect(page.locator("#page-partners")).toBeVisible();
  await expect(page.locator("#partnerActivityFilter")).toHaveValue("overdue");

  await go(page, "today");
  await page.locator("#quickAddBtn").click();
  await expect(page.locator("#quickAddMenu")).toHaveClass(/open/);
  await page.locator('#quickAddMenu [data-action="add-contact"]').click();
  await expect(page.locator("#modalBackdrop")).toHaveClass(/open/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#modalBackdrop")).not.toHaveClass(/open/);

  await page.locator("#resetDemoBtn").click();
  await expect(page.locator("#confirmBackdrop")).toHaveClass(/open/);
  await page.locator("#cancelResetBtn").click();
  await expect(page.locator("#confirmBackdrop")).not.toHaveClass(/open/);

  await page.locator("#resetDemoBtn").click();
  await page.locator("#confirmResetBtn").click();
  await expect(page.locator("#partnersNavCount")).toHaveText("20");
  await expect(page.locator("#objectsNavCount")).toHaveText("25");
});

test("мобильное меню и модальное окно работают на телефоне", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: "domcontentloaded" });

  await page.locator("#menuBtn").click();
  await expect(page.locator("#sidebar")).toHaveClass(/open/);
  await page.locator('.nav-item[data-page="analytics"]').click();
  await expect(page.locator("#page-analytics")).toBeVisible();
  await expect(page.locator("#sidebar")).not.toHaveClass(/open/);

  await page.locator("#quickAddBtn").click();
  await page.locator('#quickAddMenu [data-action="add-object"]').click();
  await expect(page.locator("#modalBackdrop")).toHaveClass(/open/);
  await expect(page.locator("#modalForm")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#modalBackdrop")).not.toHaveClass(/open/);
});
