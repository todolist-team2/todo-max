import { rest } from "msw";

export const handlers = [
  // 카테고리별 카드 목록 불러오기
  rest.get("/api/cards", async (req, res, ctx) => {
    const categoryId = req.url.searchParams.get("categoryId");
    if (!categoryId) {
      return res(ctx.status(200), ctx.json(allData));
    }
    
    const numberCategoryId = parseInt(categoryId);

    if (isNaN(numberCategoryId)) {
      return res(ctx.status(400), ctx.json({ error: "categoryId must be numeric" }));
    }

    const categoryIndex = allData.findIndex((column) => column.categoryId === numberCategoryId);

    if (categoryIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: "categoryId not found" }));
    }

    return res(ctx.status(200), ctx.json(allData[categoryIndex]));
  }),

  // 카드 추가(등록)
  rest.post<{ title: string; content: string }>("/api/cards", async (req, res, ctx) => {
    const categoryId = req.url.searchParams.get("categoryId");
    if (!categoryId) {
      return res(ctx.status(400), ctx.json({ error: "categoryId is required" }));
    }
    const numberCategoryId = parseInt(categoryId);
    const category = allData.find((category) => category.categoryId === numberCategoryId);

    if (!category) {
      return res(ctx.status(400), ctx.json({ error: "categoryId is invalid" }));
    }

    const { title, content } = req.body;
    if (!title || !content) {
      return res(ctx.status(400), ctx.json({ error: "title or content is required" }));
    }

    const newCardId = generateUniqueId();

    category.cards = [{
      id: newCardId,
      title,
      content,
      nickname: "unknown",
    }, ...category.cards];

    return res(ctx.status(200), ctx.json({ cardId: newCardId }));
  }),

  // 카드 삭제
  rest.delete("/api/cards/:cardId", async (req, res, ctx) => {
    const { cardId } = req.params;
    if (!cardId) {
      return res(ctx.status(400), ctx.json({ error: "cardId is required" }));
    }

    if (typeof cardId !== "string") {
      return res(ctx.status(400), ctx.json({ error: "cardId is invalid" }));
    }

    const numberCardId = parseInt(cardId);
    const category = allData.find((category) => category.cards.some((card) => card.id === numberCardId));

    if (!category) {
      return res(ctx.status(400), ctx.json({ error: "cardId is invalid" }));
    }

    category.cards = category.cards.filter((card) => card.id!== numberCardId);

    return res(ctx.status(200), ctx.json({}));
  }),

  // 카드 수정
  rest.put<{title: string, content: string}>('/api/cards/:cardId', async (req, res, ctx) => {
    const { cardId } = req.params;

    if (!cardId) {
      return res(ctx.status(400), ctx.json({ error: "cardId is required" }));
    }

    if (typeof cardId !== 'string') {
      return res(ctx.status(400), ctx.json({ error: "typeof cardId is invalid(not string)" }));
    }

    const { title, content } = req.body;
    if (!title || !content) {
      return res(ctx.status(400), ctx.json({ error: "title or content is required" }));
    }

    const numberCardId = parseInt(cardId);
    const category = allData.find((category) => category.cards.some((card) => card.id === numberCardId));

    if (!category) {
      return res(ctx.status(400), ctx.json({ error: "category doesn't exist which contains card having cardId" }));
    }

    const cardIndex = category.cards.findIndex((card) => card.id=== numberCardId);
    if (cardIndex === -1) {
      return res(ctx.status(400), ctx.json({ error: "card is not found" }));
    }

    category.cards[cardIndex] = {...category.cards[cardIndex], title, content };

    return res(ctx.status(200), ctx.json(category.cards[cardIndex]));
  })

  // 카드 이동
];

function generateUniqueId() {
  const characters = "0123456789";
  const length = 8;
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return parseInt(id);
}

const allData = [
  {
    categoryId: 1,
    categoryName: "todo",
    cards: [
      {
        id: 1,
        title: "title1",
        content: "content",
        nickname: "nickname",
      },
      {
        id: 2,
        title: "title2",
        content: "content2",
        nickname: "nickname2",
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: "doing",
    cards: [
      {
        id: 1,
        title: "title1",
        content: "content",
        nickname: "nickname",
      },
      {
        id: 2,
        title: "title2",
        content: "content2",
        nickname: "nickname2",
      },
    ],
  },
];
