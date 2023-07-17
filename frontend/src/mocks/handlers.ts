import { rest } from "msw";

export const handlers = [
  // 전체 카드 목록 불러오기
  rest.get('/api/cards', async(req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allData));
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
    const newCard = {
      id: generateUniqueId(),
      title,
      content,
      nickname: "unknown",
    }

    category.cards = [
      newCard,
      ...category.cards,
    ];
    
    return res(ctx.status(200), ctx.json(newCard));
  }),

  // 카드 삭제

  // 카드 수정

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
